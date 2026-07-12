import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

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
    <html lang="es" data-theme="light">
      <head>
        {/* Sin FOUC: aplica tema guardado antes de pintar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('mundinero-theme');document.documentElement.setAttribute('data-theme',t||'light');}catch(e){}`,
          }}
        />
        {/* Fraunces variable — WONK 0 / SOFT 0 / opsz range 9–144 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..700,0,0;1,9..144,400..700,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-tinta text-crema min-h-screen antialiased font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
