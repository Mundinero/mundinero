import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import RadarMundinero from "@/components/RadarMundinero";
import ArticulosGrid from "@/components/ArticulosGrid";
import PulsoMX from "@/components/PulsoMX";
import LaColumna from "@/components/LaColumna";
import Eventos from "@/components/Eventos";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Ticker />
      <Nav />
      <main>
        <Hero />
        <RadarMundinero />
        <ArticulosGrid />
        <PulsoMX />
        <LaColumna />
        <Eventos />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
