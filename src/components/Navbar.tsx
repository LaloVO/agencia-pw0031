import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { site } = useSiteUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/mapa', label: 'Ver Mapa' },
    { href: '/solicita-inmueble', label: 'Búsqueda Inteligente' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'mx-auto my-4 w-[92%] max-w-7xl rounded-full bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-elegant px-6 py-3.5'
            : 'w-full bg-transparent px-6 py-6 md:px-12'
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo - Bold Executive Sans */}
          <Link
            to="/"
            className="flex items-center gap-2 group z-50"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#000F5A] to-[#3B82F6] text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
              R
            </div>
            <span className="font-sans font-extrabold text-xl md:text-2xl tracking-wider text-[#000F5A]">
              {site?.site_name?.toUpperCase().replace('-CBF', '').replace(' REGIA', '') ?? 'REGIA'}
              <span className="text-[#3B82F6] font-medium tracking-normal text-[10px] ml-1 bg-[#3B82F6]/5 border border-[#3B82F6]/15 px-1.5 py-0.5 rounded">
                INMOBILIARIA
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-sans font-bold text-xs tracking-widest text-slate-600">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`hover:text-[#3B82F6] transition-colors relative py-1 uppercase ${
                    isActive ? 'text-[#3B82F6]' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3B82F6] rounded-full" />
                  )}
                </Link>
              );
            })}
            
            <Link
              to="/solicita-inmueble"
              className="bg-[#000F5A] text-white hover:bg-[#3B82F6] font-sans font-bold text-xs tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              SOLICITAR
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 p-2 text-[#000F5A] hover:text-[#3B82F6] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-out Glass Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm z-50 bg-white/95 backdrop-blur-2xl border-l border-slate-200 p-8 shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-8 mt-16">
          <div className="border-b border-slate-100 pb-6">
            <span className="font-sans font-extrabold text-xl tracking-wider text-[#000F5A]">
              REGIA <span className="text-[#3B82F6]">INMOBILIARIA</span>
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-sans font-bold text-lg tracking-wider transition-colors ${
                    isActive ? 'text-[#3B82F6]' : 'text-slate-600 hover:text-[#000F5A]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/solicita-inmueble"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-[#000F5A] text-white hover:bg-[#3B82F6] font-sans font-bold text-center tracking-widest py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
          >
            BÚSQUEDA INTELIGENTE
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-semibold">
            Conectividad & Operación Industrial
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
