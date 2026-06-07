import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";
import { useSiteUser } from "@/hooks/useSiteUser";

export default function SolicitaInmueble() {
  const { user } = useSiteUser();

  return (
    <>
      <Helmet>
        <title>Búsqueda Inteligente | Agencia</title>
        <meta
          name="description"
          content="Completa nuestra solicitud en 6 pasos y recibe opciones personalizadas de lotes industriales, bodegas y locales comerciales."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-20 relative overflow-hidden text-[#000F5A]">
        
        {/* Glows integration */}
        <div className="absolute top-[20%] left-[-15vw] w-[45vw] h-[45vw] bg-[#3B82F6]/3 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10vw] w-[40vw] h-[40vw] bg-[#3B82F6]/3 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Header de la Sección */}
          <div className="text-center mb-16 space-y-4">
            <span className="font-sans font-bold text-xs tracking-[0.25em] text-[#3B82F6] uppercase block animate-pulse">
              PERFILAMIENTO DINÁMICO
            </span>
            <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-[#000F5A] tracking-tight leading-tight">
              BÚSQUEDA INTELIGENTE INMOBILIARIA
            </h1>
            <p className="font-sans text-xs md:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed uppercase tracking-wider font-semibold">
              DEFINA SUS REQUERIMIENTOS OPERATIVOS, LOGÍSTICOS Y PRESUPUESTARIOS PARA SU PROCESO DE ADQUISICIÓN O ARRENDAMIENTO.
            </p>
          </div>

          {/* Formulario MultiStep wrapped in bright glass container */}
          <div className="relative rounded-[2rem] bg-white/70 backdrop-blur-xl border border-slate-200 p-6 md:p-10 shadow-elegant overflow-hidden">
            {/* Top accent glow line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent" />
            
            <FormularioMultiStep />
          </div>
          
        </div>
      </main>

      <Footer />
    </>
  );
}
