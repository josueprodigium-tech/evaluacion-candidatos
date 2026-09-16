import type { Metadata } from "next";
import "./globals.css";

const title = "Evaluación inicial | Proceso de selección";
const description =
  "Completa 10 situaciones laborales para una vacante presencial en Ciudad Juárez, Chihuahua.";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://josueprodigium-tech.github.io/evaluacion-candidatos/",
  ),
  title,
  description,
  alternates: {
    canonical:
      "https://josueprodigium-tech.github.io/evaluacion-candidatos/?v=whatsapp2026",
  },
  icons: {
    icon: "/evaluacion-candidatos/favicon.svg",
    shortcut: "/evaluacion-candidatos/favicon.svg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_MX",
    siteName: "Proceso de selección",
    url: "https://josueprodigium-tech.github.io/evaluacion-candidatos/?v=whatsapp2026",
    images: [
      {
        url: "https://josueprodigium-tech.github.io/evaluacion-candidatos/vista-previa-whatsapp.jpg",
        secureUrl:
          "https://josueprodigium-tech.github.io/evaluacion-candidatos/vista-previa-whatsapp.jpg",
        width: 1200,
        height: 632,
        type: "image/jpeg",
        alt: "Tu próxima oportunidad empieza aquí — Evaluación inicial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      "https://josueprodigium-tech.github.io/evaluacion-candidatos/vista-previa-whatsapp.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
