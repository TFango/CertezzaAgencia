import styles from "./Footer.module.css";
import Link from "next/link";

const links = ["Inicio", "Servicios", "Sobre nosotros", "Contacto"];
const services = ["Desarrollo Web", "Marketing Digital"];
const socials = [
  { name: "Instagram", href: "https://instagram.com/certezza" },
  { name: "LinkedIn", href: "https://linkedin.com/company/certezza" },
  { name: "Facebook", href: "https://facebook.com/certezza" },
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
                <li key={l}>
                  <Link href="#" className={styles.link}>
                    {l}
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
                <li key={s}>
                  <Link href="#" className={styles.link}>
                    {s}
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
            © 2025 Certezza. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
