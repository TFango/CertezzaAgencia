"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PackCard.module.css";

export type Pack = {
  number: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
};

type Props = {
  packs: Pack[];
  accentColor?: string;
};

function Card({ number, title, icon, description, items, accentColor }: Pack & { accentColor: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${styles.card} ${open ? styles.cardOpen : ""}`}
      style={{ "--accent": accentColor } as React.CSSProperties}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardNumber}>{number}</span>
        <button
          className={styles.toggleBtn}
          onClick={() => setOpen((p) => !p)}
          aria-label={open ? "Cerrar" : "Ver más"}
        >
          <motion.span
            className={styles.toggleIcon}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            +
          </motion.span>
        </button>
      </div>

      <div className={styles.titleRow}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {/* Ícono solo en mobile */}
        <img src={icon} alt="" className={`${styles.cardIcon} ${styles.cardIconMobile}`} aria-hidden="true" />
      </div>

      <p className={styles.cardDescription}>{description}</p>

      {/* Ver más — solo mobile */}
      <button className={`${styles.verMas} ${styles.verMasMobile}`} onClick={() => setOpen((p) => !p)}>
        {open ? "Ver menos" : "Ver más"}
      </button>

      {/* Items mobile — desplegables */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={`${styles.cardItems} ${styles.cardItemsMobile}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
              opacity: { duration: 0.25, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
          >
            <ul className={styles.itemsList}>
              {items.map((item, i) => (
                <motion.li
                  key={item}
                  className={styles.item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.3, ease: "easeOut" }}
                >
                  <span className={styles.itemDot} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items desktop — siempre visibles */}
      <div className={styles.cardItemsDesktop}>
        <ul className={styles.itemsList}>
          {items.map((item, i) => (
            <motion.li
              key={item}
              className={styles.item}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.3, ease: "easeOut" }}
            >
              <span className={styles.itemDot} />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PackCard({ packs, accentColor = "#d49dfb" }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => goTo(current === 0 ? packs.length - 1 : current - 1);
  const next = () => goTo(current === packs.length - 1 ? 0 : current + 1);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <>
      {/* Mobile/Tablet — apiladas */}
      <div className={styles.cardsMobile}>
        {packs.map((pack) => (
          <Card key={pack.number} {...pack} accentColor={accentColor} />
        ))}
      </div>

      {/* Desktop — carrusel */}
      <div className={styles.carouselDesktop}>
        {/* Flecha izquierda */}
        <button
          className={styles.arrow}
          onClick={prev}
          aria-label="Anterior"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Card con animación */}
        <div className={styles.carouselTrack}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className={styles.carouselCard}
            >
              <Card {...packs[current]} accentColor={accentColor} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Flecha derecha */}
        <button
          className={styles.arrow}
          onClick={next}
          aria-label="Siguiente"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots indicadores */}
      <div className={styles.dotsDesktop}>
        {packs.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Ir al pack ${i + 1}`}
            style={{ "--accent": accentColor } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}