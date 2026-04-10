"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import styles from "./HowWeWork.module.css";

const steps = [
  {
    id: "01",
    title: "Conversamos",
    description:
      "Entendemos tu negocio y tus desafíos. En 30 minutos tenés claridad sobre qué necesitás y cómo resolverlo. Sin compromiso.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Diseñamos",
    description:
      "Creamos juntos la solución ideal. Prototipos, flujos y una propuesta clara antes de escribir código.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Desarrollamos",
    description:
      "Construimos con las mejores prácticas. Te mantenemos al tanto del progreso en cada etapa.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Acompañamos",
    description:
      "El lanzamiento es solo el comienzo. Soporte continuo, mejoras y evolución de tu solución.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3" />
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
      </svg>
    ),
  },
];

function Step({
  id,
  title,
  description,
  icon,
  delay,
  isHovered,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: (typeof steps)[0] & {
  delay: number;
  isHovered: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={styles.dStep}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: isDimmed ? 0.4 : 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "default" }}
    >
      <motion.div
        className={styles.dIconWrapper}
        animate={{
          borderColor: isHovered ? "#c6b099" : "#333333",
          boxShadow: isHovered
            ? "0 0 24px rgba(198, 176, 153, 0.3), 0 4px 20px rgba(0,0,0,0.35)"
            : "0 4px 20px rgba(0,0,0,0.35)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <motion.span
          className={styles.dIconSvg}
          animate={{ color: isHovered ? "#c6b099" : "#e3e3d9" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {icon}
        </motion.span>

        <motion.span
          className={styles.dStepBadge}
          animate={{
            background: isHovered ? "#c6b099" : "#e3e3d9",
            color: "#202020",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {id}
        </motion.span>
      </motion.div>

      <div className={styles.dStepContent}>
        <motion.h3
          className={styles.dStepTitle}
          animate={{ color: isHovered ? "#c6b099" : "#e3e3d9" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {title}
        </motion.h3>
        <p className={styles.dStepDescription}>{description}</p>
      </div>
    </motion.div>
  );
}

export default function HowWeWorkDesktop() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className={styles.dHowWeWork}>
      <div className={styles.dContainer}>

        <motion.div
          ref={headerRef}
          className={styles.dHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className={styles.dBadge}>Cómo trabajamos</span>
          <p className={styles.dTitle}>Proceso</p>
        </motion.div>

        <div className={styles.dTimeline}>
          {steps.map((step, i) => (
            <Step
              key={step.id}
              {...step}
              delay={i * 0.15}
              isHovered={hoveredId === step.id}
              isDimmed={hoveredId !== null && hoveredId !== step.id}
              onMouseEnter={() => setHoveredId(step.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        <motion.div
          ref={ctaRef}
          className={styles.dCta}
          initial={{ opacity: 0, y: 16 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <p className={styles.dCtaText}>
            ¿Listo para comenzar <em>tu proyecto</em>?
          </p>
        </motion.div>

      </div>
    </section>
  );
}
