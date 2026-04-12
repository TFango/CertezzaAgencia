"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ProblemWeSolve.module.css";

const problems = [
  {
    number: "04",
    quote: '"Mi web se ve desactualizada o directamente no tengo"',
    description:
      "En 2026 no tener presencia web profesional es perder clientes antes de que te conozcan.",
  },
  {
    number: "03",
    quote: '"Publico en redes pero no veo resultados"',
    description:
      "Tener presencia no alcanza. Necesitás una estrategia que convierta seguidores en clientes.",
  },
  {
    number: "02",
    quote: '"No tengo tiempo para manejar todo esto"',
    description:
      "Gestionar contenido, campañas y una web al mismo tiempo es un trabajo full-time.",
  },
  {
    number: "01",
    quote: '"No sé si lo que invierto en publicidad está funcionando"',
    description:
      "Sin métricas claras, estás tirando dinero sin saber qué funciona.",
  },
];


export default function ProblemWeSolve() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);
  const [autoKey, setAutoKey] = useState(0);

  // Auto-rotate
  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setActive(0), 600);
    return () => clearTimeout(timeout);
  }, [isInView]);

  useEffect(() => {
    if (active === null) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev === null ? 0 : (prev + 1) % problems.length));
      setAutoKey((k) => k + 1);
    }, 3400);
    return () => clearInterval(interval);
  }, [active, autoKey]);

  const handleActivate = (i: number) => {
    setActive(i);
    setAutoKey((k) => k + 1);
  };

  // Mobile carousel state
  const dragRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const getConstraints = () => {
    if (!dragRef.current || !cardsRef.current) return { left: -800, right: 0 };
    const limit = cardsRef.current.scrollWidth - dragRef.current.offsetWidth;
    return { left: -limit, right: 0 };
  };

  return (
    <section className={styles.problemWeSolve} ref={sectionRef}>

      {/* ── Mobile/Tablet ── */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileInfo}>
          <h2 className={styles.mobileTitle}>
            Sentís que tu negocio tiene potencial,{" "}
            <span className={styles.highlight}>
              pero tu presencia digital no lo refleja?
            </span>
          </h2>
          <p className={styles.mobileSubtitle}>
            Certezza combina desarrollo web y marketing digital para que tu
            negocio se vea como lo que es: una opción seria.
          </p>
        </div>

        <div className={styles.mobileIdentify}>
          <h3 className={styles.mobileTitleIdentify}>¿Te identificás?</h3>

          <div className={styles.carouselOuter}>
            <div className={styles.carouselWrapper} ref={dragRef}>
              <motion.div
                ref={cardsRef}
                className={styles.cards}
                drag="x"
                dragConstraints={getConstraints()}
                dragElastic={0.08}
                dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
                whileDrag={{ cursor: "grabbing" }}
              >
                {problems.map((p, i) => (
                  <motion.div key={i} className={styles.card} whileTap={{ scale: 0.98 }}>
                    <h3 className={styles.titleCard}>{p.quote}</h3>
                    <p className={styles.descriptionCard}>{p.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className={styles.carouselHint}>
              <span className={styles.hintArrow}>←</span>
              <span className={styles.hintText}>deslizá</span>
              <span className={styles.hintArrow}>→</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop — Frases apiladas ── */}
      <div className={styles.desktopLayout}>

        {/* Columna izquierda: título de sección */}
        <motion.div
          className={styles.leftCol}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <h2 className={styles.sectionTitle}>
            ¿Te identificás con alguno de estos escenarios?
          </h2>
          <p className={styles.sectionSubtitle}>
            Certezza combina desarrollo web y marketing digital para que tu
            negocio se vea como lo que es: una opción seria.
          </p>
        </motion.div>

        {/* Columna derecha: frases apiladas */}
        <div className={styles.rightCol}>
          {problems.map((p, i) => {
            const isActive = active === i;
            const isInactive = active !== null && !isActive;
            return (
              <motion.div
                key={i}
                className={`${styles.problemRow} ${isActive ? styles.problemRowActive : ""} ${isInactive ? styles.problemRowInactive : ""}`}
                onClick={() => handleActivate(i)}
                initial={{ opacity: 0, x: 32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Borde superior con progreso */}
                <div className={styles.rowBorder}>
                  {isActive && (
                    <motion.span
                      className={styles.rowProgress}
                      key={autoKey}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3.2, ease: "linear" }}
                      style={{ originX: 0 }}
                    />
                  )}
                </div>

                <div className={styles.rowInner}>
                  <span className={styles.rowNumber}>{p.number}</span>

                  <div className={styles.rowBody}>
                    <p className={styles.rowQuote}>{p.quote}</p>
                    <motion.p
                      className={styles.rowDescription}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6, height: isActive ? "auto" : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {p.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
