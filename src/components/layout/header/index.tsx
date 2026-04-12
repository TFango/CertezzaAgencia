"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./Header.module.css";

const homeNav = [
  { number: "01", label: "Inicio", href: "/", isCta: false },
  { number: "02", label: "Nuestro enfoque", href: "#problemasQueResolvemos", isCta: false },
  { number: "03", label: "Servicios", href: "#servicios", isCta: false },
  { number: "04", label: "Por qué elegirnos", href: "#porQueElegirnos", isCta: false },
  { number: "05", label: "Cómo trabajamos", href: "#comoTrabajamos", isCta: false },
  { number: "06", label: "Contacto", href: "#contacto", isCta: true },
];

const marketingNav = [
  { number: "01", label: "Inicio", href: "/", isCta: false },
  { number: "02", label: "Packs", href: "#packs", isCta: false },
  { number: "03", label: "Cómo trabajamos", href: "#comoTrabajamos", isCta: false },
  { number: "04", label: "Contacto", href: "#contacto", isCta: true },
];

const webNav = [
  { number: "01", label: "Inicio", href: "/", isCta: false },
  { number: "02", label: "Packs", href: "#packs", isCta: false },
  { number: "03", label: "Cómo trabajamos", href: "#comoTrabajamos", isCta: false },
  { number: "04", label: "Contacto", href: "#contacto", isCta: true },
];

// IDs de secciones para scroll spy
const homeSections = [
  { href: "/", id: null },
  { href: "#servicios", id: "servicios" },
  { href: "#problemasQueResolvemos", id: "problemasQueResolvemos" },
  { href: "#porQueElegirnos", id: "porQueElegirnos" },
  { href: "#comoTrabajamos", id: "comoTrabajamos" },
  { href: "#contacto", id: "contacto" },
];

const subpageSections = [
  { href: "/", id: null },
  { href: "#packs", id: "packs" },
  { href: "#comoTrabajamos", id: "comoTrabajamos" },
  { href: "#contacto", id: "contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("/");
  const pathname = usePathname();

  // Scroll behavior — píldora se comprime
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy — sección activa
  useEffect(() => {
    const isSubpage =
      pathname === "/servicios/marketing" || pathname === "/servicios/web";
    if (pathname !== "/" && !isSubpage) return;

    const sections = isSubpage ? subpageSections : homeSections;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sections.find((s) => s.id === entry.target.id);
            if (matched) setActiveHref(matched.href);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      if (id) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    });

    // Si está en el top, marcar Inicio
    const onScroll = () => {
      if (window.scrollY < 80) setActiveHref("/");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navItems =
    pathname === "/servicios/marketing" ? marketingNav
    : pathname === "/servicios/web" ? webNav
    : homeNav;

  const navLinks = navItems.filter((i) => !i.isCta);
  const ctaItem = navItems.find((i) => i.isCta);

  return (
    <>
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.container}
          animate={{ height: scrolled ? 42 : 48 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Certezza - Ir al inicio"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={styles.logoLink}
          >
            <img src="/logos/logo-gris.svg" alt="Certezza" className={styles.logo} />
          </Link>

          {/* Separador vertical */}
          <span className={styles.divider} aria-hidden="true" />

          {/* Nav desktop */}
          <nav className={styles.desktopNav}>
            {navLinks.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.desktopNavItem} ${isActive ? styles.desktopNavItemActive : ""}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      className={styles.activeDot}
                      layoutId="nav-active-dot"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA — Contacto */}
          {ctaItem && (
            <Link href={ctaItem.href} className={styles.desktopCta}>
              {ctaItem.label}
            </Link>
          )}

          {/* Hamburguesa — oculto en laptop */}
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
        </motion.div>
      </motion.header>

      {/* Overlay mobile/tablet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
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

            <div className={styles.overlayDivider} />

            <div className={styles.overlayFooter}>
              <div className={styles.socials}>
                <a
                  href="https://www.instagram.com/certezzaagencia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img src="/icons/instagram.svg" alt="Instagram" className={styles.socialIcon} />
                </a>
                <a
                  href="https://www.linkedin.com/company/certezza-agencia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img src="/icons/linkedin.svg" alt="LinkedIn" className={styles.socialIcon} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
