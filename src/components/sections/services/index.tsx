import styles from "./services.module.css";

import Card from "@/components/ui/card";

export default function Services() {
  return (
    <section className={styles.section}>
      <Card variant="marketing" />
      <Card variant="web" />
    </section>
  );
}
