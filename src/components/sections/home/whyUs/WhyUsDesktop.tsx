"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./WhyUsDesktop.module.css";

const hero = {
  value: "100%",
  label: "Proyectos entregados en tiempo y forma",
  description: "No manejamos expectativas, manejamos fechas. Cada entrega tiene un plazo acordado y lo cumplimos, porque el tiempo de tu negocio vale.",
};

const secondaryMetrics = [
  { value: "+20", label: "Proyectos completados" },
  { value: "X3",  label: "Retorno promedio de inversión" },
  { value: "+2",  label: "Años de experiencia" },
];

const values = [
  {
    title: "Sin intermediarios",
    description: "Trabajás directo con quien diseña y ejecuta. Sin cuentas que no saben el detalle, sin teléfono descompuesto entre vos y el equipo.",
  },
  {
    title: "Decisiones con fundamento",
    description: "Cada propuesta viene con un porqué. No seguimos tendencias porque sí, elegimos lo que tiene sentido para tu negocio en este momento.",
  },
  {
    title: "La relación no termina en la entrega",
    description: "Cuando lanzamos, seguimos. Medimos, ajustamos y proponemos mejoras. El objetivo no es cerrar el proyecto, es que funcione.",
  },
];

function parseValue(value: string) {
  const match = value.match(/^([^\d]*)(\d+)([^\d]*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return { prefix: match[1], number: parseInt(match[2]), suffix: match[3] };
}

function useCounter(target: number, isActive: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isActive, target, duration]);
  return count;
}

function HeroMetric() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { prefix, number, suffix } = parseValue(hero.value);
  const count = useCounter(number, isInView);

  return (
    <motion.div
      ref={ref}
      className={styles.heroMetric}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className={styles.heroValue}>
        {prefix}{count}{suffix}
      </span>
      <div className={styles.heroMeta}>
        <span className={styles.heroLabel}>{hero.label}</span>
        <p className={styles.heroDescription}>{hero.description}</p>
      </div>
    </motion.div>
  );
}

function SecondaryMetric({ value, label, delay, index }: {
  value: string; label: string; delay: number; index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { prefix, number, suffix } = parseValue(value);
  const count = useCounter(number, isInView);
  const isLast = index === secondaryMetrics.length - 1;

  return (
    <motion.div
      ref={ref}
      className={`${styles.secondaryItem} ${isLast ? styles.secondaryItemLast : ""}`}
      initial={{ opacity: 0, x: 16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className={styles.secondaryValue}>
        {prefix}{count}{suffix}
      </span>
      <span className={styles.secondaryLabel}>{label}</span>
    </motion.div>
  );
}

export default function WhyUsDesktop() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section className={styles.whyUs} ref={sectionRef}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className={styles.badge}>Por qué elegirnos</span>
          <h2 className={styles.title}>
            Lo que nos diferencia<br />no es lo que decimos
          </h2>
        </motion.div>

        {/* ── Zona de métricas: héroe izq + secundarias der ── */}
        <div className={styles.metricsZone}>
          <HeroMetric />

          {/* Separador vertical */}
          <motion.div
            className={styles.verticalDivider}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />

          <div className={styles.secondaryMetrics}>
            {secondaryMetrics.map((m, i) => (
              <SecondaryMetric key={i} {...m} delay={0.1 + i * 0.1} index={i} />
            ))}
          </div>
        </div>

        {/* ── Divisor ── */}
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* ── Cards de valores ── */}
        <div className={styles.valuesRow}>
          {values.map((v, i) => (
            <motion.div
              key={i}
              className={styles.valueCard}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className={styles.valueAccent} />
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
