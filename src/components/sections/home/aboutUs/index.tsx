"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import styles from "./AboutUs.module.css";

const team = [
  {
    image: "/images/cande.png",
    role: "Marketing Digital",
    name: "Candela Flores",
    bio: "Desde pequeña que juego al valo y no subo de oro, debo de jugar otro juego",
  },
  {
    image: "/images/emita.png",
    role: "Desarrollador Web",
    name: "Emanuel Bustos",
    bio: "Pro player de valorant desde la beta, mainea todos los pj",
  },
];

function Card({ image, role, name, bio }: typeof team[0]) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={styles.card}
      onClick={() => setOpen((prev) => !prev)}
      animate={{ scale: open ? 1.02 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <img src={image} alt={name} className={styles.photo} />

      <div className={styles.topRow}>
        <motion.span
          className={styles.plus}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
        <span className={styles.role}>{role}</span>
      </div>

      <div className={styles.bottomRow}>
        <h3 className={styles.name}>{name}</h3>
        <AnimatePresence>
          {open && (
            <motion.p
              className={styles.bio}
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 4, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {bio}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function AboutUs() {
  const infoRef = useRef(null);
  const isInView = useInView(infoRef, { once: true, margin: "-60px" });

  return (
    <section className={styles.aboutUs}>
      <div className={styles.container}>

        <motion.div
          ref={infoRef}
          className={styles.info}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className={styles.title}>
            Dos especialidades,<br />Una misma visión
          </h2>
          <p className={styles.description}>
            Acompañamos a marcas que buscan crecer: alineamos su marca, atraemos
            clientes y asentamos las bases sólidas para su futuro
          </p>
          <p className={styles.nameAgency}>Descubre a Certezza</p>
        </motion.div>

        <div className={styles.us}>
          {team.map((member) => (
            <Card key={member.name} {...member} />
          ))}
        </div>

      </div>
    </section>
  );
}