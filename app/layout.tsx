import type { Metadata } from "next";
import { Cormorant_Garamond, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mundinero — El futuro del dinero habla.",
  description: "Medio financiero editorial de México y el mundo. Por Monexus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${barlow.variable} dark`}
    >
      <body className="bg-tinta text-crema min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
