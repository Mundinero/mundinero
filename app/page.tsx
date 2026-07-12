import Ticker from "@/components/Ticker";
import ManchetaNav from "@/components/ManchetaNav";
import PortadaGrid from "@/components/PortadaGrid";
import Breves from "@/components/Breves";
import NoticiasDia from "@/components/NoticiasDia";
import RadarMundinero from "@/components/RadarMundinero";
import ArticulosGrid from "@/components/ArticulosGrid";
import PulsoMX from "@/components/PulsoMX";
import Calculadoras from "@/components/Calculadoras";
import LaColumna from "@/components/LaColumna";
import Eventos from "@/components/Eventos";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Ticker />
      <ManchetaNav />
      <main>
        <PortadaGrid />
        <Breves />
        <NoticiasDia />
        <RadarMundinero />
        <ArticulosGrid />
        <PulsoMX />
        <Calculadoras />
        <LaColumna />
        <Eventos />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
