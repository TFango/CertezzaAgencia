"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./HowWeWork.module.css";

const steps = [
  {
    number: "Etapa 1",
    title: "Reunión inicial",
    description:
      "Nos contás tu proyecto, tus objetivos y tu presupuesto. Sin compromiso.",
  },
  {
    number: "Etapa 2",
    title: "Propuesta personalizada",
    description:
      "Armamos una estrategia o plan a medida según lo que necesita tu negocio.",
  },
  {
    number: "Etapa 3",
    title: "Ejecución",
    description:
      "Nos ponemos a trabajar. Vos te enfocás en tu negocio, nosotros en el resto.",
  },
  {
    number: "Etapa 4",
    title: "Seguimiento",
    description:
      "Reportes, ajustes y comunicación constante para que siempre estés al tanto.",
  },
];

function Step({
  number,
  title,
  description,
  delay,
}: (typeof steps)[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={styles.step}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <div className={styles.stepHeader}>
        <span className={styles.stepNumber}>{number}</span>
        <div className={styles.stepTitleRow}>
          <h3 className={styles.stepTitle}>{title}</h3>
          <img
            src="/icons/arrow-circle.svg"
            alt=""
            className={styles.icon}
            aria-hidden="true"
          />
        </div>
      </div>
      <p className={styles.stepDescription}>{description}</p>
    </motion.div>
  );
}

export default function HowWeWork() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section className={styles.howWeWork}>
      <div className={styles.container}>
        <motion.h2
          ref={titleRef}
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Cómo trabajamos en Certezza
        </motion.h2>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <Step key={step.number} {...step} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
