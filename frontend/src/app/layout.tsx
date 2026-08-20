import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["cyrillic", "latin"], display: "swap" });
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://labelcloud.ru"),
  title: "LabelCloud | Операционная система музыкального лейбла",
  description: "Артисты, релизы, договоры, отчёты и выплаты в едином рабочем пространстве музыкального лейбла.",
  openGraph: {
    title: "LabelCloud",
    description: "Операционная система музыкального лейбла.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = { colorScheme: "dark", themeColor: "#111110" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
