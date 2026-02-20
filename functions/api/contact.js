// functions/api/contact.js
export async function onRequest(context) {
  // Handle CORS preflight (important for form submissions)
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Only allow POST
  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const formData = await context.request.json();
    const { name, phone, address, message, website } = formData;

    // Honeypot spam check
    if (website) {
      // Silently succeed to fool bots
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    // Validate required fields
    if (!name || !phone || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    // Get Resend API key from environment variables
    const RESEND_API_KEY = context.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Baymax Automations <onboarding@resend.dev>", // Use your verified domain later
        to: ["your-email@gmail.com"], // 🔁 REPLACE with your email address
        subject: `New Contact Form Message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address || "Not provided"}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
        reply_to: "contact@baymaxautomations.com", // Optional
      }),
    });

    const result = await emailResponse.json();

    if (emailResponse.ok) {
      return new Response(JSON.stringify({ success: true, id: result.id }), {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    } else {
      console.error("Resend error:", result);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
