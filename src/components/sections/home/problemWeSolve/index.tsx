"use client";

import { useRef } from "react";
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
          <p className={styles.description}>
            Las marcas pierden clientes todos los días por no tener una web
            profesional, redes sin estrategia y anuncios que no convierten. El
            problema no es tu producto, es cómo lo estás comunicando.
          </p>
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
        </div>
      </div>
    </section>
  );
}
