import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentHero from '@/components/home/AgentHero';
import AgentCorridors from '@/components/home/AgentCorridors';
import AgentProperties from '@/components/home/AgentProperties';
import AgentProfile from '@/components/home/AgentProfile';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Agencia | Lotes Industriales, Comerciales y Logística</title>
        <meta
          name="description"
          content="Lotes industriales, comerciales y bodegas de almacenamiento o manufactura. Conectividad vial y logística en Saltillo, Ramos Arizpe y Nuevo León."
        />
        <meta name="keywords" content="inmobiliaria, industrial, comercial, lotes, bodegas, naves, monterrey, saltillo, ramos arizpe, logistica" />
      </Helmet>

      <Navbar />

      <main className="relative z-10 flex flex-col">
        {/* All sections blend seamlessly on the continuous canvas */}
        <AgentHero />
        <AgentCorridors />
        <AgentProperties />
        <AgentProfile />
      </main>

      <Footer />
    </>
  );
};

export default Index;
