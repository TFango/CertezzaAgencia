"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ProblemWeSolve.module.css";

const cards = [
  {
    title: '"Mi web se ve desactualizada o directamente no tengo"',
    description:
      "En 2026 no tener presencia web profesional es perder clientes antes de que te conozcan.",
  },
  {
    title: '"Publico en redes pero no veo resultados"',
    description:
      "Tener presencia no alcanza. Necesitás una estrategia que convierta seguidores en clientes.",
  },
  {
    title: '"No tengo tiempo para manejar todo esto"',
    description:
      "Gestionar contenido, campañas y una web al mismo tiempo es un trabajo full-time.",
  },
  {
    title: '"No sé si lo que invierto en publicidad está funcionando"',
    description:
      "Sin métricas claras, estás tirando dinero sin saber qué funciona.",
  },
];

function DesktopCards() {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
      setKey((prev) => prev + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (i: number) => {
    setActive(i);
    setKey((prev) => prev + 1);
  };

  return (
    <div className={styles.desktopCards}>
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={`${styles.desktopCard} ${active === i ? styles.desktopCardActive : ""}`}
          onClick={() => handleClick(i)}
          animate={{
            opacity: active === i ? 1 : 0.3,
            x: active === i ? 8 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className={styles.desktopCardIndicator}>
            <motion.div
              className={styles.desktopCardDot}
              animate={{ scale: active === i ? 1.3 : 1 }}
              transition={{ duration: 0.3 }}
            />
            {active === i && (
              <motion.div
                key={key}
                className={styles.desktopCardProgress}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 2.8, ease: "linear" }}
                style={{ originY: 0 }}
              />
            )}
          </div>

          <div className={styles.desktopCardContent}>
            <h3 className={styles.desktopCardTitle}>{card.title}</h3>
            <p className={styles.desktopCardDesc}>{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProblemWeSolve() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-60px" });
  const dragRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const getConstraints = () => {
    if (!dragRef.current || !cardsRef.current) return { left: -800, right: 0 };
    const limit = cardsRef.current.scrollWidth - dragRef.current.offsetWidth;
    return { left: -limit, right: 0 };
  };

  return (
    <section className={styles.problemWeSolve}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2 className={styles.title}>
            Sentís que tu negocio tiene potencial,{" "}
            <span className={styles.highlight}>
              pero tu presencia digital no lo refleja?
            </span>
          </h2>
          <p className={styles.subtitle}>
            Certezza combina desarrollo web y marketing digital para que tu
            negocio se vea como lo que es: una opción seria.
          </p>
        </div>

        <div className={styles.identify}>
          <motion.h2
            ref={titleRef}
            className={styles.titleIdentify}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            ¿Te identificas?
          </motion.h2>

          {/* Mobile/Tablet — carrusel horizontal */}
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
                {cards.map((card, i) => (
                  <motion.div
                    key={i}
                    className={styles.card}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className={styles.titleCard}>{card.title}</h3>
                    <p className={styles.descriptionCard}>{card.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Flechas indicadoras */}
            <div className={styles.carouselHint}>
              <span className={styles.hintArrow}>←</span>
              <span className={styles.hintText}>deslizá</span>
              <span className={styles.hintArrow}>→</span>
            </div>
          </div>

          <DesktopCards />
        </div>
      </div>
    </section>
  );
}
