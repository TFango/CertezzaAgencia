"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import styles from "./services.module.css";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Link from "next/link";

type Side = "marketing" | "web" | null;

const services = {
  marketing: {
    title: "Marketing Digital",
    icon: "/icons/marketing.svg",
    tags: ["Redes Sociales", "Gestión de Contenido", "Publicidad Digital", "Estrategias"],
    description: "Llevamos tu marca a las personas correctas en el momento justo. Estrategias que generan visibilidad, engagement y ventas.",
    href: "/servicios/marketing",
    btnVariant: "cardMarketing" as const,
  },
  web: {
    title: "Desarrollo Web",
    icon: "/icons/web.svg",
    tags: ["Landing Page", "Web Corporativa", "E-Commerce", "Diseño UX/UI", "Figma"],
    description: "Creamos sitios que convierten visitas en clientes. Rápidos, modernos y optimizados para que tu negocio se vea profesional desde el primer clic.",
    href: "/servicios/web",
    btnVariant: "cardWeb" as const,
  },
};

export default function Services() {
  const [active, setActive] = useState<Side>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const rawX = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const dividerX = useTransform(springX, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const onMove = (e: MouseEvent) => {
      const rect = arena.getBoundingClientRect();
      const rel = (e.clientX - rect.left) / rect.width;
      rawX.set(Math.max(0.12, Math.min(0.88, rel)));
    };

    const onLeave = () => {
      rawX.set(0.5);
      setActive(null);
    };

    arena.addEventListener("mousemove", onMove);
    arena.addEventListener("mouseleave", onLeave);
    return () => {
      arena.removeEventListener("mousemove", onMove);
      arena.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX]);

  const marketingActive = active === "marketing";
  const webActive = active === "web";
  const anyActive = active !== null;

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Header */}
      <motion.div
        className={styles.info}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className={styles.title}>Nuestras soluciones</h2>
        <p className={styles.description}>
          Tecnología avanzada y diseño premium. <br />
          Creamos las herramientas para tu futuro.
        </p>
      </motion.div>

      {/* Mobile/Tablet */}
      <div className={styles.cardsMobile}>
        <Card variant="marketing" />
        <Card variant="web" />
      </div>

      {/* Desktop — Orbital split */}
      <div className={styles.arenaWrapper}>
      <motion.div
        className={styles.arena}
        ref={arenaRef}
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Marketing hemisphere */}
        <motion.div
          className={`${styles.hemisphere} ${styles.hemisphereMarketing}`}
          animate={{
            opacity: webActive ? 0.35 : 1,
            scale: webActive ? 0.98 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onHoverStart={() => setActive("marketing")}
        >
          <div className={styles.hemisphereInner}>
            <motion.div
              className={styles.serviceLabel}
              animate={{ opacity: anyActive && !marketingActive ? 0 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <span className={styles.serviceNumber}>01</span>
            </motion.div>

            <div className={styles.titleBlock}>
              <motion.h2
                className={`${styles.hemisphereTitle} ${styles.marketingTitle}`}
                animate={{
                  scale: marketingActive ? 1.03 : 1,
                  x: marketingActive ? -8 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Marketing<br />Digital
              </motion.h2>
              <img src="/icons/marketing.svg" alt="" className={styles.hemisphereIcon} aria-hidden="true" />
            </div>

            <motion.div
              className={styles.tagLine}
              animate={{ opacity: webActive ? 0.2 : 0.55 }}
              transition={{ duration: 0.3 }}
            >
              {services.marketing.tags.join(" · ")}
            </motion.div>

            <motion.div
              className={styles.revealContent}
              animate={{
                opacity: marketingActive ? 1 : 0,
                y: marketingActive ? 0 : 16,
                pointerEvents: marketingActive ? "auto" : "none",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className={styles.hemisphereDescription}>
                {services.marketing.description}
              </p>
              <Link href={services.marketing.href}>
                <Button variant="cardMarketing">Ver servicio →</Button>
              </Link>
            </motion.div>
          </div>

          <div className={`${styles.fog} ${styles.fogMarketing}`} />
        </motion.div>

        {/* Divider */}
        <div className={styles.divider}>
          <motion.div
            className={styles.dividerLine}
            style={{ left: dividerX }}
          />
          <motion.div
            className={styles.dividerHalo}
            style={{ left: dividerX }}
            animate={{ opacity: anyActive ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Web hemisphere */}
        <motion.div
          className={`${styles.hemisphere} ${styles.hemisphereWeb}`}
          animate={{
            opacity: marketingActive ? 0.35 : 1,
            scale: marketingActive ? 0.98 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onHoverStart={() => setActive("web")}
        >
          <div className={`${styles.hemisphereInner} ${styles.hemisphereInnerWeb}`}>
            <motion.div
              className={`${styles.serviceLabel} ${styles.serviceLabelWeb}`}
              animate={{ opacity: anyActive && !webActive ? 0 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <span className={styles.serviceNumber}>02</span>
            </motion.div>

            <div className={`${styles.titleBlock} ${styles.titleBlockWeb}`}>
              <img src="/icons/web.svg" alt="" className={styles.hemisphereIcon} aria-hidden="true" />
              <motion.h2
                className={`${styles.hemisphereTitle} ${styles.webTitle}`}
                animate={{
                  scale: webActive ? 1.03 : 1,
                  x: webActive ? 8 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Desarrollo<br />Web
              </motion.h2>
            </div>

            <motion.div
              className={`${styles.tagLine} ${styles.tagLineWeb}`}
              animate={{ opacity: marketingActive ? 0.2 : 0.55 }}
              transition={{ duration: 0.3 }}
            >
              {services.web.tags.join(" · ")}
            </motion.div>

            <motion.div
              className={`${styles.revealContent} ${styles.revealContentWeb}`}
              animate={{
                opacity: webActive ? 1 : 0,
                y: webActive ? 0 : 16,
                pointerEvents: webActive ? "auto" : "none",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className={styles.hemisphereDescription}>
                {services.web.description}
              </p>
              <Link href={services.web.href}>
                <Button variant="cardWeb">Ver servicio →</Button>
              </Link>
            </motion.div>
          </div>

          <div className={`${styles.fog} ${styles.fogWeb}`} />
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
