import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegiaHero from '@/components/home/RegiaHero';
import RegiaCorridors from '@/components/home/RegiaCorridors';
import RegiaProperties from '@/components/home/RegiaProperties';
import RegiaProfile from '@/components/home/RegiaProfile';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Regia Inmobiliaria | Lotes Industriales, Comerciales y Logística</title>
        <meta
          name="description"
          content="Lotes industriales, comerciales y bodegas de almacenamiento o manufactura. Conectividad vial y logística en Saltillo, Ramos Arizpe y Nuevo León."
        />
        <meta name="keywords" content="inmobiliaria, industrial, comercial, lotes, bodegas, naves, monterrey, saltillo, ramos arizpe, logistica" />
      </Helmet>

      <Navbar />

      <main className="relative z-10 flex flex-col">
        {/* All sections blend seamlessly on the continuous canvas */}
        <RegiaHero />
        <RegiaCorridors />
        <RegiaProperties />
        <RegiaProfile />
      </main>

      <Footer />
    </>
  );
};

export default Index;
