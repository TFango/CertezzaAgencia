import styles from "./Card.module.css";

import Button from "../button";
import Link from "next/link";

type Props = {
  variant: "marketing" | "web";
};

const tags = {
  marketing: [
    "Redes Sociales",
    "Gestión de Contenido",
    "Publicidad Digital",
    "SEO",
    "Estrategias",
  ],
  web: [
    "Landing Page",
    "Web Corporativa",
    "E-Commerce",
    "Diseño UX/UI",
    "Figma",
  ],
};

const titles = {
  marketing: "Marketing Digital",
  web: "Desarrollo Web",
};

const descriptions = {
  marketing:
    "Llevamos tu marca a las personas correctas en el momento justo. Estrategias que generan visibilidad, engagement y ventas.",
  web: "Creamos sitios que convierten visitas en clientes. Rápidos, modernos y optimizados para que tu negocio se vea profesional desde el primer clic.",
};

const icons = {
  marketing: "/icons/marketing.svg",
  web: "/icons/web.svg",
};

export default function Card({ variant }: Props) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{titles[variant]}</h1>
        <img
          src={icons[variant]}
          alt=""
          className={styles.titleIcon}
          aria-hidden="true"
        />
      </div>

      <div className={styles.tags}>
        {tags[variant].map((tag) => (
          <p key={tag} className={`${styles.tag} ${styles[variant + "Tag"]}`}>
            {tag}
          </p>
        ))}
      </div>

      <p className={styles.description}>{descriptions[variant]}</p>

      <Link
        href={
          variant === "marketing" ? "/servicios/marketing" : "/servicios/web"
        }
      >
        <Button variant={variant === "marketing" ? "cardMarketing" : "cardWeb"}>
          Mas info
        </Button>
      </Link>

      <p className={styles.number}>{variant === "marketing" ? "1" : "2"}</p>
    </div>
  );
}
