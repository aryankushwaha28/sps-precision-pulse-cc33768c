import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

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

    // Send email via Resend API
    const emailResponse = await resend.emails.send({
      from: 'SPS Quote Request <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: sanitizedData.from_email,
      subject: `Quote Request: ${sanitizedData.product_name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Product:</strong> ${sanitizedData.product_name}</p>
        <hr>
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${sanitizedData.from_name}</p>
        <p><strong>Email:</strong> ${sanitizedData.from_email}</p>
        <p><strong>Company:</strong> ${sanitizedData.company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
        <hr>
        <h3>Message</h3>
        <p>${sanitizedData.message || 'No additional details provided'}</p>
      `,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in send-quote-email function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
