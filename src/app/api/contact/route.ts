import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, service, message, honeypot } = await req.json();

    // Si el honeypot tiene valor es un bot
    if (honeypot) {
      return Response.json({ ok: true });
    }

    // Validación básica
    if (!name || !email || !message) {
      return Response.json({ error: "Campos requeridos" }, { status: 400 });
    }

    await resend.emails.send({
      from: "onboarding@resend.dev", // cambiar por contacto@certezza.com.ar cuando tengas el dominio
      to: "fakuj305@gmail.com", // ← tu email real acá
      subject: `Nueva consulta de ${name}`,
      html: `
        <h2>Nueva consulta desde certezza.com.ar</h2>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Servicio:</b> ${service || "No especificado"}</p>
        <p><b>Mensaje:</b></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: "Error al enviar" }, { status: 500 });
  }
}
