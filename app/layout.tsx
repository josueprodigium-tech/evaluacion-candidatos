import type { Metadata } from "next";
import "./globals.css";

const title = "Evaluación inicial | Proceso de selección";
const description =
  "Completa tu evaluación inicial y elige un horario para tu entrevista.";

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
        url: "/evaluacion-candidatos/og.png",
        width: 1536,
        height: 1024,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/evaluacion-candidatos/og.png"],
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
