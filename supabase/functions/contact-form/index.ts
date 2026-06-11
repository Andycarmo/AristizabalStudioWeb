import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // 🔥 CORS preflight (OBLIGATORIO)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Supabase client (server-side)
// DEBUG

console.log("CONTACT-FORM VERSION 1");

const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

console.log("KEY EXISTS:", !!serviceKey);
console.log(
  "KEY PREFIX:",
  serviceKey?.substring(0, 20)
);

// Supabase client (server-side)
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  serviceKey!
);

    // Parse body
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { headers: corsHeaders, status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;

    // Check if customer exists
    const { data: customer, error: findError } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (findError) {
      return Response.json(
        { ok: false, error: findError.message },
        { headers: corsHeaders, status: 500 }
      );
    }

    // CREATE NEW CUSTOMER
    if (!customer) {
      const { error: insertError } = await supabase.from("customers").insert({
        name: fullName,
        email,
        source: "contact_form",
        customer_type: "lead",
        last_subject: subject,
        last_message: message,
        interactions_count: 1,
      });

      if (insertError) {
        return Response.json(
          { ok: false, error: insertError.message },
          { headers: corsHeaders, status: 500 }
        );
      }

      return Response.json(
        { ok: true, status: "created" },
        { headers: corsHeaders }
      );
    }

    // UPDATE EXISTING CUSTOMER
    const { error: updateError } = await supabase
      .from("customers")
      .update({
        name: fullName,
        last_subject: subject,
        last_message: message,
        interactions_count: (customer?.interactions_count ?? 0) + 1,
      })
      .eq("id", customer.id);

    if (updateError) {
      return Response.json(
        { ok: false, error: updateError.message },
        { headers: corsHeaders, status: 500 }
      );
    }

    return Response.json(
      { ok: true, status: "updated" },
      { headers: corsHeaders }
    );
  } catch (error) {
    return Response.json(
      { ok: false, error: error.message || "Unexpected error" },
      { headers: corsHeaders, status: 500 }
    );
  }
});