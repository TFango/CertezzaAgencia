"use client";

import { useState } from "react";
import ParticlesCanvas from "@/components/ui/particlesCanvas";
import styles from "./Contact.module.css";

type ContactVariant = "home" | "marketing" | "web";

type Props = {
  variant?: ContactVariant;
};

const config = {
  home: {
    title: "¿Listo para recuperar tiempo y hacer crecer tu negocio?",
    subtitle: "Modernizá tu presencia digital junto a nosotros.",
    button: "Enviar mensaje",
    defaultService: "",
    autoSelectedMsg: null,
  },
  marketing: {
    title: "¿Querés potenciar tu marca en redes?",
    subtitle: "Contanos tu proyecto y te armamos una propuesta a medida.",
    button: "Quiero potenciar mi marca",
    defaultService: "Marketing Digital",
    autoSelectedMsg: "Seleccionamos Marketing Digital automáticamente porque estás en nuestra página de marketing.",
  },
  web: {
    title: "¿Querés una web que convierta visitas en clientes?",
    subtitle: "Contanos tu proyecto y te armamos una propuesta a medida.",
    button: "Quiero mi sitio web",
    defaultService: "Desarrollo Web",
    autoSelectedMsg: "Seleccionamos Desarrollo Web automáticamente porque estás en nuestra página de web.",
  },
};

export default function Contact({ variant = "home" }: Props) {
  const { title, subtitle, button, defaultService, autoSelectedMsg } = config[variant];

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: defaultService,
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
        setForm({ name: "", email: "", service: defaultService, message: "" });
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
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>

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

            {variant !== "home" ? (
              <div className={styles.serviceFixed}>
                <span className={styles.serviceFixedValue}>{defaultService}</span>
                {autoSelectedMsg && (
                  <p className={styles.autoMsg}>{autoSelectedMsg}</p>
                )}
              </div>
            ) : (
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
            )}
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
            {status === "idle" && button}
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