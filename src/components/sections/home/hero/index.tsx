import styles from "./Hero.module.css";

import ParticlesCanvas from "@/components/ui/particlesCanvas";
import AnimatedWord from "@/components/ui/animatedWord";
import Button from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.main}>
      <ParticlesCanvas />

      <div className={styles.content}>
        {/* Bloque central */}
        <div className={styles.center}>
          <div className={styles.info}>
            <span className={styles.badge}>AGENCIA DIGITAL</span>
            <h1 className={styles.title}>
              Convertimos ideas en <br /> <AnimatedWord />
            </h1>
            <p className={styles.subtitle}>
              Agencia digital en Mar del Plata. Creamos webs y estrategias
              digitales que atraen clientes y potencian tu negocio.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link href="#servicios">
              <Button variant="primary">Ver servicios</Button>
            </Link>
            <Link href="#contacto">
              <Button variant="secondary">Contactar</Button>
            </Link>
          </div>
        </div>

        {/* Bloque inferior */}
        <div className={styles.bottom}>
          <div className={styles.recomend}>
            <p className={styles.description}>Ellos confiaron en nosotros</p>
            {/* <Marquee /> */}
          </div>
          <div className={styles.divider}>
            <hr className={styles.hr} />
            <p className={styles.scroll}>SCROLL</p>
            <img src="/icons/arrow.svg" alt="scroll" />
            <div className={styles.dot}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
