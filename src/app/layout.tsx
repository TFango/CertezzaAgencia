import "./global.css";

import Header from "@/components/layout/header";
import AppWrapper from "@/components/appWrapper";

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
    <html lang="es" className={inter.variable}>
      <body>
        <AppWrapper>
          <Header />
          <main>{children}</main>
        </AppWrapper>
      </body>
    </html>
  );
}
