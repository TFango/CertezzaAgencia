import ParticlesCanvas from "@/components/ui/particlesCanvas";
import styles from "./Hero.module.css";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <ParticlesCanvas />

      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.badge}>
            <img
              src="/icons/web.svg"
              alt=""
              className={styles.badgeIcon}
              aria-hidden="true"
            />
            Desarrollo Web
          </span>
          <h1 className={styles.title}>Tu web, tu mejor vendedor</h1>
          <p className={styles.description}>
            Diseñamos y desarrollamos sitios rápidos, modernos y optimizados
            para que tu negocio se vea profesional y convierta visitas en
            clientes.
          </p>
        </div>

        <Link href="#contacto">
          <Button variant="cardWeb">Quiero mi sitio web</Button>
        </Link>
      </div>
    </section>
  );
}
