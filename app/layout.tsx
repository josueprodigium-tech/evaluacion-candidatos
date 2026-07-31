import type { Metadata } from "next";
import "./globals.css";

const title = "Evaluación inicial | Proceso de selección";
const description =
  "Completa 15 situaciones laborales y continúa con tu proceso de selección.";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://josueprodigium-tech.github.io/evaluacion-candidatos/",
  ),
  title,
  description,
  icons: {
    icon: "/evaluacion-candidatos/favicon.svg",
    shortcut: "/evaluacion-candidatos/favicon.svg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: "https://josueprodigium-tech.github.io/evaluacion-candidatos/og.jpg?v=3",
        width: 1200,
        height: 632,
        alt: "Tu próxima oportunidad empieza aquí — Evaluación inicial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      "https://josueprodigium-tech.github.io/evaluacion-candidatos/og.jpg?v=3",
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
