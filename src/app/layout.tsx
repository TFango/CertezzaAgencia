import "./global.css";

import Header from "@/components/layout/header";
import AppWrapper from "@/components/appWrapper";
import Footer from "@/components/layout/footer";

import { Inter } from "next/font/google";

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
    <html lang="es" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <AppWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
