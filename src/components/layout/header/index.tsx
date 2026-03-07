"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.container}>
        <Link href="/" aria-label="Certezza - Ir al inicio">
          <img
            src="/logos/logo-gris.svg"
            alt="Certezza"
            className={styles.logo}
          />
        </Link>
        <motion.button
          className={styles.menu}
          aria-label="Abrir menú"
          whileTap={{ scale: 0.9 }}
        >
          <img src="/icons/menu.svg" alt="" aria-hidden="true" />
        </motion.button>
      </div>
    </motion.header>
  );
}
