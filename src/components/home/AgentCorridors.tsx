import { Truck, MapPin, Gauge } from 'lucide-react';
import Reveal from './Reveal';

const CORRIDOR_STATS = [
  {
    icon: Truck,
    number: "500m²",
    label: "Espacios Desde",
    description: "Lotes modulares y naves industriales adaptables a tus requerimientos operativos de almacenamiento o logística."
  },
  {
    icon: MapPin,
    number: "01",
    label: "Conexión Directa",
    description: "Ubicación en los corredores logísticos más transitados de México, conectando de forma ágil con aduanas y fronteras."
  },
  {
    icon: Gauge,
    number: "100%",
    label: "Eficiencia Operativa",
    description: "Infraestructura de primer nivel diseñada para reducir tiempos de traslado y optimizar procesos de manufactura."
  }
];

const AgentCorridors = () => {
  return (
    <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-transparent">
      {/* Subtle background glow */}
      <div className="absolute top-[40%] right-[-10vw] w-[35vw] h-[35vw] bg-[#3B82F6]/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Editorial Split (Grid-based but borderless, no cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <span className="font-sans font-bold text-xs tracking-[0.25em] text-[#3B82F6] uppercase block">
                DISEÑO & EFICIENCIA INDUSTRIAL
              </span>
              <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[#000F5A] tracking-tight leading-tight text-balance mt-2">
                CONECTIVIDAD QUE IMPULSA TU OPERACIÓN
              </h2>
            </Reveal>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6 lg:pt-4">
            <Reveal delay={150}>
              <p className="font-sans font-medium text-slate-700 text-lg leading-relaxed">
                En <strong className="text-[#000F5A]">Agencia</strong> entendemos la velocidad de los mercados industriales y comerciales. Especialistas en lotes, bodegas y naves de servicio en los corredores más estratégicos del país, brindamos el soporte de infraestructura que tu negocio requiere.
              </p>
              <p className="font-sans text-slate-500 text-sm md:text-base leading-relaxed mt-4">
                Desde el corredor Saltillo - Ramos Arizpe hasta las zonas logísticas clave de Nuevo León, seleccionamos ubicaciones privilegiadas con conectividad directa a las principales carreteras, garantizando accesibilidad y un flujo de demanda constante.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Feature Stats Grid (No border boxes, just clean spacing and hover glow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200/60">
          {CORRIDOR_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="group space-y-5">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-200 group-hover:border-[#3B82F6] transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <span className="font-sans font-black text-5xl md:text-6xl text-[#000F5A]/5 group-hover:text-[#3B82F6]/10 transition-colors leading-none tracking-tight">
                      {stat.number}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans font-bold text-sm tracking-widest text-[#3B82F6] uppercase">
                      {stat.label}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AgentCorridors;
