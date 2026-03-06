import styles from "./Hero.module.css";

import ParticlesCanvas from "@/components/ui/particlesCanvas";
import AnimatedWord from "@/components/ui/animatedWord";
import Button from "@/components/ui/button";

export default function Hero() {
  return (
    <main className={styles.main}>
      <ParticlesCanvas />

      <div className={styles.content}>
        <section className={styles.info}>
          <p className={styles.badge}>AGENCIA DIGITAL</p>
          <h1 className={styles.title}>
            Convertimos ideas en <br /> <AnimatedWord />
          </h1>
          <h2 className={styles.subtitle}>
            Creamos webs y estrategias digitales <br />
            que atraen clientes y potencian tu negocio
          </h2>
        </section>

        <section className={styles.buttons}>
          <Button variant="primary">Ver servicios</Button>
          <Button variant="secondary">Contactar</Button>
        </section>
      </div>
    </main>
  );
}
