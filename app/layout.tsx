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
      <body className="bg-tinta text-crema min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
