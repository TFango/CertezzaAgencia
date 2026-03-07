import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" aria-label="Certezza - Ir al inicio">
          <img
            src="/logos/logo-gris.png"
            alt="Certezza"
            className={styles.logo}
          />
        </Link>
        <button className={styles.menu} aria-label="Abrir menú">
          <img src="/icons/menu.svg" alt="" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
