"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./HowWebWorks.module.css";

const steps = [
  {
    id: "01",
    title: "Entendemos tu negocio",
    description:
      "Analizamos tu marca, tus objetivos y qué debe lograr la web para ayudarte a captar clientes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Diseñamos la experiencia",
    description:
      "Definimos la estructura, la navegación y el diseño para que tu web sea clara, profesional y fácil de usar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Desarrollamos la web",
    description:
      "Construimos el sitio optimizado para todos los dispositivos e incorporamos las funcionalidades necesarias.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Lanzamos y optimizamos",
    description:
      "Publicamos la web y realizamos ajustes para asegurar buen rendimiento, velocidad y estabilidad.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const ACCENT = "#449bff";

function Step({
  id, title, description, icon, delay, isHovered, isDimmed, onMouseEnter, onMouseLeave,
}: (typeof steps)[0] & {
  delay: number; isHovered: boolean; isDimmed: boolean;
  onMouseEnter: () => void; onMouseLeave: () => void;
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
          borderColor: isHovered ? ACCENT : "#2a2a2a",
          boxShadow: isHovered
            ? `0 0 24px rgba(68, 155, 255, 0.25), 0 4px 20px rgba(0,0,0,0.35)`
            : "0 4px 20px rgba(0,0,0,0.35)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <motion.span
          className={styles.dIconSvg}
          animate={{ color: isHovered ? ACCENT : "#e3e3d9" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {icon}
        </motion.span>

        <motion.span
          className={styles.dStepBadge}
          animate={{ background: isHovered ? ACCENT : "#e3e3d9" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {id}
        </motion.span>
      </motion.div>

      <div className={styles.dStepContent}>
        <motion.h3
          className={styles.dStepTitle}
          animate={{ color: isHovered ? ACCENT : "#e3e3d9" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {title}
        </motion.h3>
        <p className={styles.dStepDescription}>{description}</p>
      </div>
    </motion.div>
  );
}

export default function HowWebWorks() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      {/* ── Mobile/Tablet — diseño original ── */}
      <section className={styles.mSection}>
        <header className={styles.mHeader}>
          <h2 className={styles.mTitle}>Cómo trabajamos</h2>
          <p className={styles.mSubtitle}>
            Un proceso claro para transformar tu negocio en una presencia digital
            profesional.
          </p>
        </header>
        <div className={styles.mSteps}>
          {steps.map((step) => (
            <div key={step.id} className={styles.mStep}>
              <span className={styles.mNumber}>{step.id}</span>
              <div className={styles.mContent}>
                <h3 className={styles.mStepTitle}>{step.title}</h3>
                <p className={styles.mStepText}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Desktop — timeline horizontal ── */}
      <section className={styles.dSection}>
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
            className={styles.dCta}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <p className={styles.dCtaText}>
              ¿Listo para lanzar <em>tu sitio web</em>?
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
