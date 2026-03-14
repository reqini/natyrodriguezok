import { RequestHandler } from "express";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  queryType: "brand_collab" | "brand_budget" | "follower" | "general";
  budget?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, company, queryType, budget, message } =
      req.body as ContactFormData;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Nombre, email y mensaje son requeridos",
      } as ContactResponse);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Email inválido",
      } as ContactResponse);
    }

    // If no email configuration, return success anyway (for demo)
    // In production, configure SMTP credentials
    const recipientEmail = process.env.CONTACT_EMAIL || "essen.nutricion@gmail.com";

    // Build email content
    const emailContent = `
Nueva consulta recibida desde la landing de Natalia Rodriguez

DATOS DE CONTACTO:
─────────────────
Nombre: ${name}
Email: ${email}
${phone ? `Teléfono: ${phone}` : ""}
${company ? `Empresa / Marca: ${company}` : ""}

CONSULTA:
─────────────────
Tipo: ${getQueryTypeLabel(queryType)}
${budget ? `Presupuesto estimado: ${budget}` : ""}

MENSAJE:
─────────────────
${message}

─────────────────
Consulta enviada desde la landing oficial de Natalia Rodriguez
    `.trim();

    // Try to send email using Resend API if configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "noreply@nataliarodriguez.com",
            to: recipientEmail,
            replyTo: email,
            subject: "Nueva consulta desde landing de Natalia Rodriguez",
            html: formatEmailHTML(name, email, phone, company, queryType, budget, message),
          }),
        });
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Continue even if email fails, return success to user
      }
    } else {
      // Log to console for development
      console.log("📧 Email content:", emailContent);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Consulta enviada correctamente. Pronto nos contactaremos contigo.",
    } as ContactResponse);
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      error: "Error al procesar la consulta",
    } as ContactResponse);
  }
};

function getQueryTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    brand_collab: "Soy una marca y quiero colaborar",
    brand_budget: "Soy una marca y quiero solicitar presupuesto",
    follower: "Soy seguidor/a",
    general: "Consulta general",
  };
  return labels[type] || type;
}

function formatEmailHTML(
  name: string,
  email: string,
  phone: string | undefined,
  company: string | undefined,
  queryType: string,
  budget: string | undefined,
  message: string
): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #e86aa8; margin-bottom: 20px;">Nueva consulta recibida</h2>
        
        <div style="background: #f9f5f0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 12px;">Datos de contacto:</h3>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${company ? `<p><strong>Empresa / Marca:</strong> ${escapeHtml(company)}</p>` : ""}
        </div>

        <div style="background: #fffbf7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 12px;">Detalles de la consulta:</h3>
          <p><strong>Tipo:</strong> ${getQueryTypeLabel(queryType)}</p>
          ${budget ? `<p><strong>Presupuesto estimado:</strong> ${escapeHtml(budget)}</p>` : ""}
        </div>

        <div style="background: #fff; border-left: 4px solid #e86aa8; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 12px;">Mensaje:</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          Consulta enviada desde la landing oficial de Natalia Rodriguez
        </p>
      </div>
    </div>
  `;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
