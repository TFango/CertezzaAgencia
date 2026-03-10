"use client";

import styles from "./Packs.module.css";
import PackList from "@/components/ui/packCard";

const packs = [
  {
    number: "01",
    title: "Tu primera presencia en internet",
    icon: "/icons/landing.svg",
    description:
      "Ideal para emprendedores y negocios que arrancan. Una página prolija, rápida y lista para recibir clientes desde el día uno.",
    items: [
      "Diseño moderno",
      "Se ve bien en celular y computadora",
      "Secciones esenciales: inicio, servicios, contacto",
      "Formulario de contacto y botón de WhatsApp",
      "Posicionamiento básico en Google",
      "Publicación online incluida",
    ],
  },
  {
    number: "02",
    title: "Un sitio completo para tu empresa",
    icon: "/icons/webCompleto.svg",
    description:
      "Para negocios que necesitan más que una página. Un sitio profesional con varias secciones, diseño a medida y todo optimizado para crecer.",
    items: [
      "Hasta 6 páginas con diseño personalizado",
      "Se adapta a cualquier dispositivo",
      "Formulario de contacto y botón de WhatsApp",
      "Optimizado para aparecer en Google",
      "Carga rápida y experiencia fluida",
      "Publicación online incluida",
    ],
  },
  {
    number: "03",
    title: "Una plataforma hecha a medida",
    icon: "/icons/aMedida.svg",
    description:
      "Para proyectos que necesitan más que un sitio web. Desarrollamos sistemas, plataformas y aplicaciones con lógica propia adaptada a tu negocio.",
    items: [
      "Registro e inicio de sesión de usuarios",
      "Panel de administración",
      "Base de datos y lógica de negocio",
      "Conexión con servicios externos",
      "Seguridad y protección de datos",
      "Dashboard con métricas e información clave",
    ],
  },
  {
    number: "04",
    title: "Mantenemos tu sitio siempre activo",
    icon: "/icons/mantenimiento.svg",
    description:
      "Tu web necesita cuidado continuo. Nos encargamos de que funcione siempre, esté actualizada y cualquier cambio menor esté resuelto rápido.",
    items: [
      "Actualizaciones periódicas",
      "Copias de seguridad automáticas",
      "Cambios y ajustes menores incluidos",
    ],
  },
];

export default function Packs() {
  return (
    <section className={styles.packs}>
      <div className={styles.container}>
        <h2 className={styles.title}>Te presentamos los packs</h2>

        <PackList packs={packs} accentColor="#449bff" />
      </div>
    </section>
  );
}
