"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./HowWebWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Entendemos tu negocio",
    text: "Analizamos tu marca, tus objetivos y qué debe lograr la web para ayudarte a captar clientes.",
  },
  {
    number: "02",
    title: "Diseñamos la experiencia",
    text: "Definimos la estructura, la navegación y el diseño para que tu web sea clara, profesional y fácil de usar.",
  },
  {
    number: "03",
    title: "Desarrollamos la web",
    text: "Construimos el sitio optimizado para todos los dispositivos e incorporamos las funcionalidades necesarias.",
  },
  {
    number: "04",
    title: "Lanzamos y optimizamos",
    text: "Publicamos la web y realizamos ajustes para asegurar buen rendimiento, velocidad y estabilidad.",
  },
];

function Step({
  number,
  title,
  text,
  index,
}: (typeof steps)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={styles.step}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <span className={styles.number}>{number}</span>
      <div className={styles.content}>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepText}>{text}</p>
      </div>
    </motion.div>
  );
}

export default function HowMarketingWorks() {
  const headerRef = useRef<HTMLElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className={styles.section}>
      <motion.header
        ref={headerRef}
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className={styles.title}>Cómo trabajamos</h2>
        <p className={styles.subtitle}>
          Un proceso claro para transformar tu negocio en una presencia digital
          profesional.
        </p>
      </motion.header>

      <div className={styles.steps}>
        {steps.map((step, i) => (
          <Step key={step.number} {...step} index={i} />
        ))}
      </div>
    </section>
  );
}
