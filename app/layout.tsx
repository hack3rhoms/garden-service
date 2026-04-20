import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ScrollRevealInit } from "./components/ScrollRevealInit";

export const metadata: Metadata = {
  title: "Garden Service | Sakarya Bahce Bakim ve Peyzaj Hizmetleri",
  description:
    "Sakarya, Sapanca ve Izmit bolgelerinde agac budama, cim bicme, bahce temizligi ve peyzaj hizmetleri. Tek sayfada hizmetler, hakkimizda ve iletisim.",
  keywords: [
    "Sakarya agac budama",
    "Sapanca bahce bakim",
    "Izmit cim bicme",
    "Sakarya peyzaj",
    "bahce bakimi Sakarya",
    "bahce temizligi Sapanca",
    "Izmit peyzaj hizmetleri",
  ],
  authors: [{ name: "Garden Service" }],
  creator: "Garden Service",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <Toaster position="top-center" />
        {children}
        <ScrollRevealInit />
      </body>
    </html>
  );
}
