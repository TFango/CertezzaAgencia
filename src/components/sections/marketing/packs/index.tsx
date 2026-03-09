"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Packs.module.css";
import PackList from "@/components/ui/packCard";

const packs = [
  {
    number: "01",
    title: "Gestión estratégica de redes sociales",
    icon: "/icons/message.svg",
    description:
      "Nos ocupamos de planificar, publicar y gestionar tu contenido para que tu marca tenga presencia constante y construya una comunidad activa.",
    items: [
      "Optimización de perfil",
      "Planificación de contenido",
      "Publicación y programación",
      "Gestión de comentarios y mensajes",
      "Reporte mensual de resultados",
    ],
  },
  {
    number: "02",
    title: "Contenido que posiciona tu marca",
    icon: "/icons/camera.svg",
    description:
      "Creamos contenido visual y creativo pensado para captar atención, comunicar tu propuesta y fortalecer la identidad de tu marca.",
    items: [
      "Producción de fotos y videos",
      "Edición de contenido para redes",
      "Ideas creativas y guiones",
      "Adaptación de contenido a cada plataforma",
    ],
  },
  {
    number: "03",
    title: "Campañas publicitarias orientadas a resultados",
    icon: "/icons/bar_chart.svg",
    description:
      "Diseñamos campañas en Meta Ads y Google Ads para atraer personas que realmente puedan convertirse en clientes.",
    items: [
      "Estrategia y configuración de campañas",
      "Redacción de anuncios publicitarios",
      "Optimización continua de campañas",
      "Control y gestión del presupuesto",
      "Reportes de resultados",
    ],
  },
];

function PackCard({
  number,
  title,
  icon,
  description,
  items,
}: (typeof packs)[0]) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.card} ${open ? styles.cardOpen : ""}`}>
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
                    duration: 0.2,
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

export default function Packs() {
  return (
    <section className={styles.packs}>
      <div className={styles.container}>
        <h2 className={styles.title}>Te presentamos los packs</h2>

        <PackList packs={packs} accentColor="#d49dfb" />
      </div>
    </section>
  );
}
