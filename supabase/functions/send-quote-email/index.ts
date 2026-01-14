import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Server-side recipient - never trust client input for this
const TO_EMAIL = 'sps.bsk2011@gmail.com';

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

// Sanitize input: remove newlines/carriage returns (email header injection prevention)
function sanitizeInput(str: string | undefined, maxLength: number): string {
  if (!str) return '';
  return str
    .replace(/[\r\n]/g, ' ')  // Remove newlines to prevent header injection
    .replace(/<[^>]*>/g, '')  // Remove HTML tags
    .trim()
    .substring(0, maxLength);  // Enforce length limit
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

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitizedEmail = sanitizeInput(body.from_email, FIELD_LIMITS.from_email);
  if (!emailRegex.test(sanitizedEmail)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Sanitize all fields with length limits
  const sanitizedData: QuoteEmailRequest = {
    from_name: sanitizeInput(body.from_name, FIELD_LIMITS.from_name),
    from_email: sanitizedEmail,
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const EMAILJS_SERVICE_ID = Deno.env.get('EMAILJS_SERVICE_ID');
    const EMAILJS_TEMPLATE_ID = Deno.env.get('EMAILJS_TEMPLATE_ID');
    const EMAILJS_PUBLIC_KEY = Deno.env.get('EMAILJS_PUBLIC_KEY');
    const EMAILJS_PRIVATE_KEY = Deno.env.get('EMAILJS_PRIVATE_KEY');

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
      console.error('Missing EmailJS configuration');
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

    // Send email via EmailJS API with sanitized data and server-side recipient
    // For server-side usage, use accessToken with the private key
    const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: sanitizedData.from_name,
          from_email: sanitizedData.from_email,
          company: sanitizedData.company || 'Not provided',
          phone: sanitizedData.phone || 'Not provided',
          product_name: sanitizedData.product_name,
          message: sanitizedData.message || 'No additional details provided',
          to_email: TO_EMAIL,  // Use server-side constant, not client input
        },
      }),
    });

    if (!emailjsResponse.ok) {
      const errorText = await emailjsResponse.text();
      console.error('EmailJS API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Email sent successfully for product:', sanitizedData.product_name);
    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-quote-email function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
