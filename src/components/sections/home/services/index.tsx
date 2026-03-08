import styles from "./services.module.css";

import Card from "@/components/ui/card";

export default function Services() {
  return (
    <section className={styles.section}>
      <div className={styles.info}>
        <h2 className={styles.title}>Nuestras soluciones</h2>
        <p className={styles.description}>
          Tecnología avanzada y diseño premium. <br />
          Creamos las herramientas para tu futuro.
        </p>
      </div>
      <Card variant="marketing" />
      <Card variant="web" />
    </section>
  );
}
