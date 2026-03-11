import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting simple en memoria
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 3; // máx requests
const RATE_WINDOW = 60 * 1000; // por minuto

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.timestamp > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

// Escapa HTML para evitar XSS
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Valida email
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    // Rate limiting por IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Demasiadas solicitudes, esperá un momento" },
        { status: 429 },
      );
    }

    const { name, email, service, message, honeypot } = await req.json();

    // Honeypot
    if (honeypot) return Response.json({ ok: true });

    // Validaciones
    if (!name || !email || !message) {
      return Response.json({ error: "Campos requeridos" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Email inválido" }, { status: 400 });
    }

    if (name.length > 100 || message.length > 2000) {
      return Response.json(
        { error: "Campos demasiado largos" },
        { status: 400 },
      );
    }

    // Sanitizá antes de meter en HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service || "No especificado");
    const safeMessage = escapeHtml(message);

    await resend.emails.send({
      from: "Certezza <contacto@certezza.com.ar>",
      to: ["certezzaempresa@gmail.com"],
      replyTo: safeEmail,
      subject: `Nueva consulta de ${safeName}`,
      html: `
        <h2>Nueva consulta desde certezza.com.ar</h2>
        <p><b>Nombre:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Servicio:</b> ${safeService}</p>
        <p><b>Mensaje:</b></p>
        <p>${safeMessage}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: "Error al enviar" }, { status: 500 });
  }
}
