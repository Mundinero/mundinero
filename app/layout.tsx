import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es" className="dark">
      <head>
        {/* Fraunces variable — WONK 0 / SOFT 0 / opsz range 9–144 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..700,0,0;1,9..144,400..700,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-tinta text-crema min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
