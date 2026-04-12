"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./HowWeWork.module.css";

const steps = [
  {
    number: "Etapa 1",
    title: "Reunión inicial",
    description:
      "Una llamada de 30 minutos para entender tu negocio, tus objetivos y tus dolores reales. Sin formularios ni plantillas.",
  },
  {
    number: "Etapa 2",
    title: "Propuesta personalizada",
    description:
      "Traducimos lo que hablamos en una propuesta concreta con estructura, flujos y decisiones claras. Todo definido antes de arrancar.",
  },
  {
    number: "Etapa 3",
    title: "Ejecución",
    description:
      "Ejecutamos con criterio y te mantenemos en el loop. Cada avance es visible y cada decisión tiene un porqué.",
  },
  {
    number: "Etapa 4",
    title: "Seguimiento",
    description:
      "Lanzamos y no desaparecemos. Reportes claros, ajustes según resultados y nuevas ideas cuando el negocio lo pide.",
  },
];

function Step({
  number,
  title,
  description,
  delay,
}: (typeof steps)[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={styles.mStep}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className={styles.mStepHeader}>
        <span className={styles.mStepNumber}>{number}</span>
        <div className={styles.mStepTitleRow}>
          <h3 className={styles.mStepTitle}>{title}</h3>
          <img
            src="/icons/arrow-circle.svg"
            alt=""
            className={styles.mIcon}
            aria-hidden="true"
          />
        </div>
      </div>
      <p className={styles.mStepDescription}>{description}</p>
    </motion.div>
  );
}

export default function HowWeWorkMobile() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section className={styles.mHowWeWork}>
      <div className={styles.mContainer}>
        <motion.h2
          ref={titleRef}
          className={styles.mTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Cómo trabajamos en Certezza
        </motion.h2>

        <div className={styles.mSteps}>
          {steps.map((step, i) => (
            <Step key={step.number} {...step} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
