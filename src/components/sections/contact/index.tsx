"use client";

import { useState } from "react";
import ParticlesCanvas from "@/components/ui/particlesCanvas";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.contact}>
      <ParticlesCanvas />

      <div className={styles.content}>
        <h2 className={styles.title}>
          ¿Listo para recuperar tiempo <br /> y hacer crecer tu negocio?
        </h2>
        <p className={styles.subtitle}>
          Modernizá tu presencia digital junto a nosotros.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" name="honeypot" style={{ display: "none" }} />

          <input
            name="name"
            type="text"
            placeholder="Tu nombre"
            className={styles.input}
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Tu email"
            className={styles.input}
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className={styles.field}>
            <label className={styles.label} htmlFor="service">
              Servicio de interés
            </label>
            <select
              id="service"
              name="service"
              className={`${styles.input} ${styles.select}`}
              value={form.service}
              onChange={handleChange}
            >
              <option value="" disabled>Seleccioná uno</option>
              <option value="Marketing Digital">Marketing Digital</option>
              <option value="Desarrollo Web">Desarrollo Web</option>
              <option value="Ambos">Ambos</option>
            </select>
          </div>

          <textarea
            name="message"
            placeholder="Contanos sobre tu proyecto"
            className={`${styles.input} ${styles.textarea}`}
            value={form.message}
            onChange={handleChange}
            rows={4}
            required
          />

          <button
            type="submit"
            className={styles.button}
            disabled={status === "loading" || status === "sent"}
          >
            {status === "loading" && "Enviando..."}
            {status === "sent" && "¡Mensaje enviado!"}
            {status === "error" && "Reintentar"}
            {status === "idle" && "Enviar mensaje"}
          </button>

          {status === "error" && (
            <p className={styles.errorMsg}>
              Hubo un error al enviar. Intentá de nuevo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}