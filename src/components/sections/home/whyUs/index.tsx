"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./WhyUs.module.css";

const metrics = [
  {
    icon: "/icons/acute.svg",
    value: "100%",
    label: "Proyectos entregados en tiempo y forma",
  },
  {
    icon: "/icons/article.svg",
    value: "+20",
    label: "Proyectos completados",
  },
  {
    icon: "/icons/bar_chart.svg",
    value: "X3",
    label: "Retorno promedio de inversión en campañas pagas",
  },
  {
    icon: "/icons/diamond.svg",
    value: "+2",
    label: "Años de experiencia en marketing y web",
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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isActive, target, duration]);

  return count;
}

function MetricCard({
  icon,
  value,
  label,
  delay,
}: {
  icon: string;
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { prefix, number, suffix } = parseValue(value);
  const count = useCounter(number, isInView);

  return (
    <motion.article
      ref={ref}
      className={styles.article}
      initial={{ opacity: 0, y: 20, borderColor: "rgba(255,255,255,0)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, borderColor: "rgba(255,255,255,0.12)" }
          : {}
      }
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      //whileTap={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      <img src={icon} alt="" className={styles.logo} />
      <p className={styles.percent}>
        {prefix}
        {count}
        {suffix}
      </p>
      <p className={styles.infoArticle}>{label}</p>
    </motion.article>
  );
}

export default function WhyUs() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section className={styles.whyUs}>
      <div className={styles.container}>
        <motion.div
          ref={titleRef}
          className={styles.info}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className={styles.title}>
            Resultados reales <br /> Sin promesas vacías
          </h2>
          <p className={styles.subtitle}>
            Tu presencia digital pensada para atraer, convertir y crecer.
          </p>
        </motion.div>

        <div className={styles.articles}>
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
