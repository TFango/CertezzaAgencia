"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Header.module.css";

const homeNav = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "#servicios" },
  { label: "Por qué elegirnos", href: "#porQueElegirnos" },
  { label: "Cómo trabajamos", href: "#comoTrabajamos" },
  { label: "Contacto", href: "#contacto" },
];

const marketingNav = [
  { label: "Inicio", href: "/" },
  { label: "Packs", href: "#packs" },
  { label: "Cómo trabajamos", href: "#comoTrabajamos" },
  { label: "Contacto", href: "#contacto" },
];

const webNav = [
  { label: "Inicio", href: "/" },
  { label: "Packs", href: "#packs" },
  { label: "Cómo trabajamos", href: "#comoTrabajamos" },
  { label: "Contacto", href: "#contacto" },
];

export default function HeaderDesktop() {
  const pathname = usePathname();

  const navItems =
    pathname === "/servicios/marketing" ? marketingNav
    : pathname === "/servicios/web" ? webNav
    : homeNav;

  return (
    <motion.header
      className={styles.dHeader}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.dContainer}>
        <Link href="/" aria-label="Certezza - Ir al inicio">
          <img src="/logos/logo-gris.svg" alt="Certezza" className={styles.dLogo} />
        </Link>

        <nav className={styles.dNav}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={styles.dNavItem}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
