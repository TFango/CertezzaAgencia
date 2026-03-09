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
    <div className={`${styles.card} ${open ? styles.cardOpen : ""}`}
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
        <img src={icon} alt="" className={styles.cardIcon} aria-hidden="true" />
      </div>

      <p className={styles.cardDescription}>{description}</p>

      <button className={styles.verMas} onClick={() => setOpen((p) => !p)}>
        {open ? "Ver menos" : "Ver más"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.cardItems}
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
                  transition={{
                    delay: 0.15 + i * 0.05,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <span className={styles.itemDot} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PackCard({ packs, accentColor = "#d49dfb" }: Props) {
  return (
    <div className={styles.cards}>
      {packs.map((pack) => (
        <Card key={pack.number} {...pack} accentColor={accentColor} />
      ))}
    </div>
  );
}