import styles from "./Footer.module.css";
import Link from "next/link";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Por qué elegirnos", href: "/#porQueElegirnos" },
  { label: "Como trabajmos", href: "/#comoTrabajamos" },
  { label: "Contacto", href: "/#contacto" },
];
const services = [
  { label: "Desarrollo Web", href: "/servicios/web" },
  { label: "Marketing Digital", href: "/servicios/marketing" },
];
const socials = [
  { name: "Instagram", href: "https://instagram.com/certezzaagencia" },
  { name: "LinkedIn", href: "https://linkedin.com/company/certezza-agencia" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <p className={styles.colTitle}>Links</p>
            <ul className={styles.list}>
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Redes sociales</p>
            <ul className={styles.list}>
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Servicios</p>
            <ul className={styles.list}>
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className={styles.link}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Contacto</p>
            <ul className={styles.list}>
              <li>
                <a
                  href="mailto:certezzaagencia@gmail.com"
                  className={styles.link}
                >
                  certezzaagencia@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+542233126017" className={styles.link}>
                  2233126017
                </a>
              </li>
              <li>
                <span className={styles.link}>Mar del Plata, Buenos Aires</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className={styles.divider} />

        {/* Logo */}
        <div className={styles.bottom}>
          <img
            src="/logos/logo-footer.svg"
            alt="Certezza"
            className={styles.logo}
          />
          <p className={styles.copy}>
            © 2026 Certezza. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
