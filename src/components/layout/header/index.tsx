"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./Header.module.css";

const navItems = [
  { number: "01", label: "Inicio", href: "#inicio" },
  { number: "02", label: "Servicios", href: "#servicios" },
  { number: "03", label: "Por que elegirnos?", href: "#PorQueElegirnos" },
  { number: "04", label: "Nosotros", href: "#nosotros" },
  { number: "05", label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.container}>
          <Link
            href="/"
            aria-label="Certezza - Ir al inicio"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/logos/logo-gris.svg"
              alt="Certezza"
              className={styles.logo}
            />
          </Link>
          <motion.button
            className={styles.menu}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((prev) => !prev)}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src={open ? "/icons/close.svg" : "/icons/menu.svg"}
              alt=""
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* Nav */}
            <nav className={styles.nav}>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                >
                  <Link
                    href={item.href}
                    className={styles.navItem}
                    onClick={() => setOpen(false)}
                  >
                    <span className={styles.navNumber}>{item.number}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Divisor */}
            <div className={styles.overlayDivider} />

            {/* Footer del menú */}
            <div className={styles.overlayFooter}>
              <div className={styles.socials}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    className={styles.socialIcon}
                  />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    className={styles.socialIcon}
                  />
                </a>
              </div>

              <button
                className={styles.langButton}
                disabled
                title="Próximamente"
              >
                <span className={styles.langActive}>ES</span>
                <span className={styles.langDivider}>/</span>
                <span className={styles.langInactive}>EN</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
