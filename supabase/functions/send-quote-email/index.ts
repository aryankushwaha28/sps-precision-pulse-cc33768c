import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Allowed origins for CORS - restrict to production domains
const ALLOWED_ORIGINS = [
  'https://id-preview--869fdebf-ca77-4e18-a559-e63436cc6a3c.lovable.app',
  'https://869fdebf-ca77-4e18-a559-e63436cc6a3c.lovable.app',
  // Add your custom domain here when configured
];

// Function to get CORS headers based on origin validation
function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) || 
    origin.endsWith('.lovable.app')
  );
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin! : 'null',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Server-side recipient - never trust client input for this
const TO_EMAIL = 'sps.bsk2011@gmail.com';

// Rate limiting configuration
const RATE_LIMIT = {
  perMinute: 2,    // Max 2 requests per minute per IP
  perHour: 5,      // Max 5 requests per hour per IP
  perDay: 15,      // Max 15 requests per day per IP
};

// Input length limits
const FIELD_LIMITS = {
  from_name: 100,
  from_email: 254,
  company: 150,
  phone: 20,
  product_name: 200,
  message: 2000,
};

interface QuoteEmailRequest {
  from_name: string;
  from_email: string;
  company?: string;
  phone?: string;
  product_name: string;
  message?: string;
}

// HTML entity encoding for email safety
function htmlEncode(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Sanitize input: remove newlines/carriage returns (email header injection prevention)
// Then apply HTML encoding for safe email rendering
function sanitizeInput(str: string | undefined, maxLength: number): string {
  if (!str) return '';
  const cleaned = str
    .replace(/[\r\n]/g, ' ')  // Remove newlines to prevent header injection
    .replace(/<[^>]*>/g, '')  // Remove HTML tags
    .trim()
    .substring(0, maxLength);  // Enforce length limit
  return htmlEncode(cleaned);
}

// Sanitize email without HTML encoding (for reply_to header)
function sanitizeEmail(str: string | undefined, maxLength: number): string {
  if (!str) return '';
  return str
    .replace(/[\r\n]/g, '')  // Remove newlines to prevent header injection
    .replace(/<[^>]*>/g, '')  // Remove HTML tags
    .trim()
    .substring(0, maxLength);
}

// Validate and sanitize all inputs
function validateAndSanitize(body: QuoteEmailRequest): { 
  valid: boolean; 
  error?: string; 
  data?: QuoteEmailRequest 
} {
  // Check required fields exist
  if (!body.from_name || !body.from_email || !body.product_name) {
    return { valid: false, error: 'Missing required fields: name, email, and product name are required' };
  }

  // Validate email format (use non-encoded email for validation)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitizedEmail = sanitizeEmail(body.from_email, FIELD_LIMITS.from_email);
  if (!emailRegex.test(sanitizedEmail)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Sanitize all fields with length limits
  const sanitizedData: QuoteEmailRequest = {
    from_name: sanitizeInput(body.from_name, FIELD_LIMITS.from_name),
    from_email: sanitizedEmail, // Keep email without HTML encoding for reply_to
    company: sanitizeInput(body.company, FIELD_LIMITS.company),
    phone: sanitizeInput(body.phone, FIELD_LIMITS.phone),
    product_name: sanitizeInput(body.product_name, FIELD_LIMITS.product_name),
    message: sanitizeInput(body.message, FIELD_LIMITS.message),
  };

  // Verify required fields aren't empty after sanitization
  if (!sanitizedData.from_name || !sanitizedData.from_email || !sanitizedData.product_name) {
    return { valid: false, error: 'Required fields cannot be empty' };
  }

  return { valid: true, data: sanitizedData };
}

// Rate limiting check using Deno KV
async function checkRateLimit(ip: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  try {
    const kv = await Deno.openKv();
    const now = Date.now();

    // Check minute limit
    const minuteKey = ['rate_limit', 'minute', ip];
    const minuteData = await kv.get<{ count: number; resetAt: number }>(minuteKey);
    
    if (minuteData.value) {
      if (now < minuteData.value.resetAt) {
        if (minuteData.value.count >= RATE_LIMIT.perMinute) {
          const retryAfter = Math.ceil((minuteData.value.resetAt - now) / 1000);
          await kv.close();
          return { allowed: false, retryAfter };
        }
      }
    }

    // Check hour limit
    const hourKey = ['rate_limit', 'hour', ip];
    const hourData = await kv.get<{ count: number; resetAt: number }>(hourKey);
    
    if (hourData.value) {
      if (now < hourData.value.resetAt) {
        if (hourData.value.count >= RATE_LIMIT.perHour) {
          const retryAfter = Math.ceil((hourData.value.resetAt - now) / 1000);
          await kv.close();
          return { allowed: false, retryAfter };
        }
      }
    }

    // Check day limit
    const dayKey = ['rate_limit', 'day', ip];
    const dayData = await kv.get<{ count: number; resetAt: number }>(dayKey);
    
    if (dayData.value) {
      if (now < dayData.value.resetAt) {
        if (dayData.value.count >= RATE_LIMIT.perDay) {
          const retryAfter = Math.ceil((dayData.value.resetAt - now) / 1000);
          await kv.close();
          return { allowed: false, retryAfter };
        }
      }
    }

    await kv.close();
    return { allowed: true };
  } catch (error) {
    // If KV fails, allow the request but log the error
    console.error('Rate limit check failed:', error);
    return { allowed: true };
  }
}

// Increment rate limit counters
async function incrementRateLimitCounters(ip: string): Promise<void> {
  try {
    const kv = await Deno.openKv();
    const now = Date.now();

    // Increment minute counter
    const minuteKey = ['rate_limit', 'minute', ip];
    const minuteData = await kv.get<{ count: number; resetAt: number }>(minuteKey);
    const minuteResetAt = now + 60000; // 1 minute
    
    if (minuteData.value && now < minuteData.value.resetAt) {
      await kv.set(minuteKey, { count: minuteData.value.count + 1, resetAt: minuteData.value.resetAt });
    } else {
      await kv.set(minuteKey, { count: 1, resetAt: minuteResetAt });
    }

    // Increment hour counter
    const hourKey = ['rate_limit', 'hour', ip];
    const hourData = await kv.get<{ count: number; resetAt: number }>(hourKey);
    const hourResetAt = now + 3600000; // 1 hour
    
    if (hourData.value && now < hourData.value.resetAt) {
      await kv.set(hourKey, { count: hourData.value.count + 1, resetAt: hourData.value.resetAt });
    } else {
      await kv.set(hourKey, { count: 1, resetAt: hourResetAt });
    }

    // Increment day counter
    const dayKey = ['rate_limit', 'day', ip];
    const dayData = await kv.get<{ count: number; resetAt: number }>(dayKey);
    const dayResetAt = now + 86400000; // 24 hours
    
    if (dayData.value && now < dayData.value.resetAt) {
      await kv.set(dayKey, { count: dayData.value.count + 1, resetAt: dayData.value.resetAt });
    } else {
      await kv.set(dayKey, { count: 1, resetAt: dayResetAt });
    }

    await kv.close();
  } catch (error) {
    console.error('Failed to increment rate limit counters:', error);
  }
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate origin for non-OPTIONS requests
  const isAllowedOrigin = origin && (
    ALLOWED_ORIGINS.includes(origin) || 
    origin.endsWith('.lovable.app')
  );
  
  if (!isAllowedOrigin) {
    console.warn(`Rejected request from unauthorized origin: ${origin}`);
    return new Response(
      JSON.stringify({ error: 'Unauthorized origin' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Extract client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('x-real-ip') || 
               req.headers.get('cf-connecting-ip') || 
               'unknown';

    // Check rate limit
    const rateLimitResult = await checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.retryAfter || 60)
          } 
        }
      );
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    let body: QuoteEmailRequest;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate and sanitize inputs
    const validation = validateAndSanitize(body);
    if (!validation.valid || !validation.data) {
      console.error('Validation failed:', validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sanitizedData = validation.data;
    console.log('Received quote email request for product:', sanitizedData.product_name);

    // Send email via Resend REST API
    // Note: sanitizedData fields are already HTML-encoded for safe email rendering
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SPS Quote Request <onboarding@resend.dev>',
        to: [TO_EMAIL],
        reply_to: sanitizedData.from_email,
        subject: `Quote Request: ${sanitizedData.product_name}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Product:</strong> ${sanitizedData.product_name}</p>
          <hr>
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> ${sanitizedData.from_name}</p>
          <p><strong>Email:</strong> ${htmlEncode(sanitizedData.from_email)}</p>
          <p><strong>Company:</strong> ${sanitizedData.company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
          <hr>
          <h3>Message</h3>
          <p>${sanitizedData.message || 'No additional details provided'}</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Resend API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Increment rate limit counters on successful email send
    await incrementRateLimitCounters(ip);

    const responseData = await emailResponse.json();
    console.log('Email sent successfully:', responseData);

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in send-quote-email function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
