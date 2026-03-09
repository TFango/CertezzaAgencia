"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./HowMarketingWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Entendemos tu negocio",
    text: "Antes de publicar o hacer campañas analizamos tu marca, tu mercado y a quién querés llegar. Esto nos permite definir qué necesita realmente tu negocio para crecer.",
  },
  {
    number: "02",
    title: "Diseñamos la estrategia",
    text: "Definimos el tipo de contenido, el tono de comunicación y las acciones que vamos a implementar para atraer a tu público y posicionar tu marca.",
  },
  {
    number: "03",
    title: "Creamos y ejecutamos",
    text: "Desarrollamos las piezas de contenido, gestionamos las redes y ponemos en marcha campañas publicitarias para llegar a las personas correctas.",
  },
  {
    number: "04",
    title: "Medimos y mejoramos",
    text: "Analizamos métricas, evaluamos qué funciona mejor y optimizamos continuamente la estrategia para mejorar resultados.",
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
          Nuestro proceso está pensado para entender tu negocio, comunicarlo
          correctamente y generar resultados reales.
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
