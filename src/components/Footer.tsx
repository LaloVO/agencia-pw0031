import { Link } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const { site, user } = useSiteUser();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent pt-32 pb-16 px-6 md:px-12 overflow-hidden">
      {/* Background glow integration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative hairline glow replacing solid <hr> */}
      <div className="max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent mb-16 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-6 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-black font-black text-base shadow-sm">
                R
              </div>
              <span className="font-sans font-extrabold text-xl tracking-wider text-white">
                AGENCIA
              </span>
            </Link>
            <p className="font-sans text-xs md:text-sm text-slate-400 max-w-sm leading-relaxed uppercase tracking-wider font-medium">
              OPERACIÓN, LOGÍSTICA Y CONECTIVIDAD QUE IMPULSA EL CRECIMIENTO INDUSTRIAL Y COMERCIAL DE MÉXICO.
            </p>
          </div>

          {/* Socials & Navigation */}
          <div className="md:col-span-6 flex flex-wrap md:justify-end gap-x-12 gap-y-6">
            <div className="space-y-4">
              <span className="block font-sans font-extrabold text-[10px] text-slate-500 uppercase tracking-widest">
                Navegación
              </span>
              <div className="flex flex-col gap-2 font-sans font-bold text-xs tracking-wider">
                <Link to="/" className="text-slate-300 hover:text-[#3B82F6] transition-colors uppercase">
                  Inicio
                </Link>
                <Link to="/mapa" className="text-slate-300 hover:text-[#3B82F6] transition-colors uppercase">
                  Explorar Mapa
                </Link>
                <Link to="/solicita-inmueble" className="text-slate-300 hover:text-[#3B82F6] transition-colors uppercase">
                  Búsqueda Inteligente
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <span className="block font-sans font-extrabold text-[10px] text-slate-500 uppercase tracking-widest">
                Contacto
              </span>
              <div className="flex flex-col gap-2 font-sans font-bold text-xs tracking-wider">
                <a 
                  href={`https://wa.me/${user?.telefono_usuario?.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-300 hover:text-[#3B82F6] transition-colors uppercase flex items-center gap-1"
                >
                  WhatsApp <ArrowUpRight className="w-3 h-3" />
                </a>
                <a href={`mailto:${user?.email_usuario}`} className="text-slate-300 hover:text-[#3B82F6] transition-colors uppercase">
                  {user?.email_usuario ?? 'contacto@regiainmobiliaria.com'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="mt-20 pt-8 border-t border-white/5 text-[9px] text-slate-500 font-bold uppercase tracking-widest flex flex-col sm:flex-row justify-between gap-4">
          <span>© {currentYear} AGENCIA. TODOS LOS DERECHOS RESERVADOS.</span>
          <div className="flex gap-6">
            <span>SITIO SATÉLITE PREMIUM</span>
            <span>POWERED BY CBF CONNECT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
