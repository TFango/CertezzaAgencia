"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    trustLines: [
      "Respondemos en menos de 24 horas",
      "Sin compromisos ni contratos forzados",
      "Primera consulta sin costo",
    ],
  },
  marketing: {
    title: "¿Querés potenciar tu marca en redes?",
    subtitle: "Contanos tu proyecto y te armamos una propuesta a medida.",
    button: "Quiero potenciar mi marca",
    defaultService: "Marketing Digital",
    autoSelectedMsg: "Seleccionamos Marketing Digital automáticamente porque estás en nuestra página de marketing.",
    trustLines: [
      "Respondemos en menos de 24 horas",
      "Propuesta personalizada sin costo",
      "Sin compromisos iniciales",
    ],
  },
  web: {
    title: "¿Querés una web que convierta visitas en clientes?",
    subtitle: "Contanos tu proyecto y te armamos una propuesta a medida.",
    button: "Quiero mi sitio web",
    defaultService: "Desarrollo Web",
    autoSelectedMsg: "Seleccionamos Desarrollo Web automáticamente porque estás en nuestra página de web.",
    trustLines: [
      "Respondemos en menos de 24 horas",
      "Propuesta personalizada sin costo",
      "Sin compromisos iniciales",
    ],
  },
};

export default function Contact({ variant = "home" }: Props) {
  const { title, subtitle, button, defaultService, autoSelectedMsg, trustLines } = config[variant];

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: defaultService,
    message: "",
    honeypot: "",
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
        setForm({ name: "", email: "", service: defaultService, message: "", honeypot: "" });
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

        {/* Columna izquierda — título + trust signals */}
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <span className={styles.badge}>Contacto</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>

            <ul className={styles.trustList}>
              {trustLines.map((line) => (
                <li key={line} className={styles.trustItem}>
                  <span className={styles.trustDot} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna derecha — formulario */}
        <div className={styles.right}>
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                className={styles.successState}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>¡Mensaje enviado!</h3>
                <p className={styles.successDesc}>
                  Recibimos tu consulta. Te respondemos en menos de 24 horas.
                </p>
                <button
                  className={styles.successBtn}
                  onClick={() => setStatus("idle")}
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">Nombre</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      className={styles.input}
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className={styles.input}
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="service">Servicio de interés</label>

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

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Contanos sobre tu proyecto"
                    className={`${styles.input} ${styles.textarea}`}
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={styles.button}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Enviando..." : status === "error" ? "Reintentar" : button}
                </button>

                {status === "error" && (
                  <p className={styles.errorMsg}>
                    Hubo un error al enviar. Intentá de nuevo.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
