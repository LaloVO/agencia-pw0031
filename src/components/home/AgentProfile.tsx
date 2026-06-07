import { useSiteUser } from '@/hooks/useSiteUser';
import { Award, Clock, MapPin, MessageSquare, Mail, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

const AgentProfile = () => {
  const { user } = useSiteUser();

  const whatsappUrl = user?.telefono_usuario
    ? `https://wa.me/${user.telefono_usuario.replace(/\D/g, '')}?text=Hola,%20me%20interesa%20obtener%20asesoría%20sobre%20lotes%20y%20naves%20industriales.`
    : '#';

  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden bg-transparent">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[-10vw] w-[40vw] h-[40vw] bg-[#3B82F6]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-[#3B82F6]/2 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Photo / Executive Card - Borderless Glass */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="relative group rounded-[2rem] overflow-hidden aspect-[4/5] max-w-md mx-auto border border-slate-200 bg-white/40 backdrop-blur-xl shadow-elegant p-8 flex flex-col justify-between">
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6]">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-sans font-extrabold tracking-widest text-[#3B82F6] bg-white border border-slate-200 px-3 py-1 rounded-full uppercase">
                    ASESOR VERIFICADO
                  </span>
                </div>

                {/* Bio Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-sans font-extrabold text-2xl text-[#000F5A]">
                      {user?.nombre_usuario ?? 'Agencia'}
                    </h3>
                    <p className="font-sans text-xs text-[#3B82F6] font-bold tracking-widest uppercase mt-1">
                      Especialista Industrial y Comercial
                    </p>
                  </div>

                  <div className="space-y-2 text-slate-600 font-sans text-xs md:text-sm font-semibold pt-4 border-t border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#3B82F6]" />
                      <span>Respuesta en menos de 24 horas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#3B82F6]" />
                      <span>Monterrey • Ramos Arizpe • Saltillo</span>
                    </div>
                  </div>
                </div>

                {/* Contact actions */}
                <div className="grid grid-cols-2 gap-3 pt-6">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#000F5A] text-white hover:bg-[#3B82F6] font-sans font-bold text-xs tracking-widest py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WHATSAPP
                  </a>
                  <a
                    href={`mailto:${user?.email_usuario}`}
                    className="bg-white text-[#000F5A] hover:bg-slate-50 border border-slate-200 font-sans font-bold text-xs tracking-widest py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    CORREO
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Copy & Form Highlight */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={150}>
              <div className="space-y-4">
                <span className="font-sans font-bold text-xs tracking-[0.25em] text-[#3B82F6] uppercase block">
                  ASESORÍA PERSONALIZADA
                </span>
                <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[#000F5A] tracking-tight leading-tight">
                  ¿BUSCAS UN ESPACIO ESPECÍFICO?
                </h2>
                <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed mt-2">
                  El mercado de naves industriales, bodegas logísticas y locales comerciales requiere un análisis profundo de conectividad, factibilidad y uso de suelo. Permítenos ayudarte a encontrar la ubicación exacta que impulsará la eficiencia operativa de tu empresa.
                </p>
              </div>
            </Reveal>

            {/* Quick value statements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Reveal delay={250}>
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 font-sans font-extrabold text-xs text-[#3B82F6] shrink-0 shadow-sm">
                    01
                  </span>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#000F5A] uppercase tracking-wider">
                      Factibilidad de Suelo
                    </h4>
                    <p className="font-sans text-xs text-slate-500 mt-1">
                      Garantizamos que el lote o nave cuente con el uso de suelo correcto para tu industria.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={350}>
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 font-sans font-extrabold text-xs text-[#3B82F6] shrink-0 shadow-sm">
                    02
                  </span>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#000F5A] uppercase tracking-wider">
                      Análisis de Accesibilidad
                    </h4>
                    <p className="font-sans text-xs text-slate-500 mt-1">
                      Evaluamos las principales carreteras y el acceso a mano de obra calificada en la zona.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* CTA Container */}
            <div className="pt-6">
              <Reveal delay={450}>
                <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#3B82F6]/30 shadow-elegant transition-all duration-500">
                  <div className="space-y-1">
                    <h4 className="font-sans font-extrabold text-base md:text-lg text-[#000F5A]">
                      Prueba nuestra Búsqueda Inteligente
                    </h4>
                    <p className="font-sans text-xs text-slate-500">
                      Completa un formulario dinámico y recibe opciones personalizadas en menos de 24 hrs.
                    </p>
                  </div>
                  <a
                    href="/solicita-inmueble"
                    className="bg-[#000F5A] text-white hover:bg-[#3B82F6] font-sans font-bold text-xs tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 whitespace-nowrap shrink-0"
                  >
                    SOLICITAR PROPUESTA
                  </a>
                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AgentProfile;
