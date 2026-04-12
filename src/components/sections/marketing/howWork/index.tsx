"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./HowMarketingWorks.module.css";

const steps = [
  {
    id: "01",
    title: "Entendemos tu negocio",
    description:
      "Antes de publicar o hacer campañas analizamos tu marca, tu mercado y a quién querés llegar. Esto nos permite definir qué necesita realmente tu negocio para crecer.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Diseñamos la estrategia",
    description:
      "Definimos el tipo de contenido, el tono de comunicación y las acciones que vamos a implementar para atraer a tu público y posicionar tu marca.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Creamos y ejecutamos",
    description:
      "Desarrollamos las piezas de contenido, gestionamos las redes y ponemos en marcha campañas publicitarias para llegar a las personas correctas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Medimos y mejoramos",
    description:
      "Analizamos métricas, evaluamos qué funciona mejor y optimizamos continuamente la estrategia para mejorar resultados.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const ACCENT = "#cd9afa";

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
            ? `0 0 24px rgba(205, 154, 250, 0.25), 0 4px 20px rgba(0,0,0,0.35)`
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

export default function HowMarketingWorks() {
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
            Nuestro proceso está pensado para entender tu negocio, comunicarlo
            correctamente y generar resultados reales.
          </p>
        </header>
        <div className={styles.mSteps}>
          {steps.map((step, i) => (
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
              ¿Listo para potenciar <em>tu marca</em>?
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
