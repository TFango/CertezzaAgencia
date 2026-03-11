"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./services.module.css";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Link from "next/link";

const data = {
  marketing: {
    title: "Marketing Digital",
    icon: "/icons/marketing.svg",
    tags: ["Redes Sociales", "Gestión de Contenido", "Publicidad Digital", "SEO", "Estrategias"],
    description: "Llevamos tu marca a las personas correctas en el momento justo. Estrategias que generan visibilidad, engagement y ventas.",
    href: "/servicios/marketing",
    number: "1",
    tagClass: "marketingTag",
    btnVariant: "cardMarketing" as const,
  },
  web: {
    title: "Desarrollo Web",
    icon: "/icons/web.svg",
    tags: ["Landing Page", "Web Corporativa", "E-Commerce", "Diseño UX/UI", "Figma"],
    description: "Creamos sitios que convierten visitas en clientes. Rápidos, modernos y optimizados para que tu negocio se vea profesional desde el primer clic.",
    href: "/servicios/web",
    number: "2",
    tagClass: "webTag",
    btnVariant: "cardWeb" as const,
  },
};

type Variant = "marketing" | "web";

export default function Services() {
  const [hovered, setHovered] = useState<Variant | null>(null);

  const getFlex = (variant: Variant) => {
    if (hovered === null) return 1;
    return hovered === variant ? 2.33 : 1;
  };

  const getOpacity = (variant: Variant) => {
    if (hovered === null) return 1;
    return hovered === variant ? 1 : 0.4;
  };

  const getScale = (variant: Variant) => {
    if (hovered === null) return 1;
    return hovered === variant ? 1 : 0.97;
  };

  return (
    <section className={styles.section}>
      <div className={styles.info}>
        <h2 className={styles.title}>Nuestras soluciones</h2>
        <p className={styles.description}>
          Tecnología avanzada y diseño premium. <br />
          Creamos las herramientas para tu futuro.
        </p>
      </div>

      {/* Mobile/Tablet — Card original con sticky */}
      <div className={styles.cardsMobile}>
        <Card variant="marketing" />
        <Card variant="web" />
      </div>

      {/* Desktop — side by side con hover */}
      <div className={styles.cardsDesktop}>
        {(["marketing", "web"] as Variant[]).map((v) => {
          const d = data[v];
          return (
            <motion.div
              key={v}
              className={`${styles.card} ${styles[v]}`}
              animate={{
                flex: getFlex(v),
                opacity: getOpacity(v),
                scale: getScale(v),
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onHoverStart={() => setHovered(v)}
              onHoverEnd={() => setHovered(null)}
            >
              <div className={styles.titleRow}>
                <h2 className={styles.cardTitle}>{d.title}</h2>
                <img src={d.icon} alt="" className={styles.titleIcon} aria-hidden="true" />
              </div>
              <div className={styles.tags}>
                {d.tags.map((tag) => (
                  <p key={tag} className={`${styles.tag} ${styles[d.tagClass]}`}>{tag}</p>
                ))}
              </div>
              <p className={styles.cardDescription}>{d.description}</p>
              <Link href={d.href}>
                <Button variant={d.btnVariant}>Mas info</Button>
              </Link>
              <p className={styles.number}>{d.number}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}