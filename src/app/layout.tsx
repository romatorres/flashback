import type { Metadata } from "next";
import { Geist, Outfit, Gravitas_One } from "next/font/google";
import "./globals.css";

const gravitasOne = Gravitas_One({
  variable: "--font-gravitas-one",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Banda Flashback",
  description:
    "Reviva a magia dos anos 60 e 70 com clássicos que marcaram gerações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${outfitSans.variable} ${gravitasOne.variable} font-outfit-sans antialiased`}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
