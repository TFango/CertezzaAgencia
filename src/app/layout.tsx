import "./global.css";

import Header from "@/components/layout/header";
import AppWrapper from "@/components/appWrapper";
import Footer from "@/components/layout/footer";

import { Inter } from "next/font/google";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://certezza.com.ar"),
  title: {
    default: "Certezza | Agencia de Marketing Digital y Desarrollo Web",
    template: "%s | Certezza",
  },
  description:
    "Certezza es una agencia especializada en marketing digital y desarrollo web en Mar del Plata. Creamos sitios web profesionales y estrategias digitales que convierten visitas en clientes.",
  keywords: [
    "agencia digital Mar del Plata",
    "desarrollo web Mar del Plata",
    "marketing digital Mar del Plata",
    "diseño web",
    "redes sociales",
    "publicidad digital",
    "Meta Ads",
    "Google Ads",
    "Certezza",
  ],
  authors: [{ name: "Certezza", url: "https://certezza.com.ar" }],
  creator: "Certezza",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://certezza.com.ar",
    siteName: "Certezza",
    title: "Certezza | Agencia de Marketing Digital y Desarrollo Web",
    description:
      "Creamos sitios web profesionales y estrategias digitales que convierten visitas en clientes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Certezza - Agencia Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certezza | Agencia de Marketing Digital y Desarrollo Web",
    description:
      "Creamos sitios web profesionales y estrategias digitales que convierten visitas en clientes.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <AppWrapper>
          <Header />
          {children}
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
