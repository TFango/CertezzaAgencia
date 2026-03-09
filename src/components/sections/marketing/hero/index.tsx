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
              src="/icons/marketing.svg"
              alt=""
              className={styles.badgeIcon}
              aria-hidden="true"
            />
            Marketing Digital
          </span>
          <h1 className={styles.title}>Tu marca merece ser vista</h1>
          <p className={styles.description}>
            Gestionamos tu presencia digital de punta a punta, contenido,
            comunidad y campañas que convierten seguidores en clientes.
          </p>
        </div>

        <Link href="#contacto">
          <Button variant="cardMarketing">Quiero potenciar mi marca</Button>
        </Link>
      </div>
    </section>
  );
}
