import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const SkeletonCard = () => (
  <div className="w-full aspect-[4/3] rounded-3xl bg-white border border-slate-200 animate-pulse p-5 flex flex-col justify-end space-y-3">
    <div className="h-6 bg-slate-200 rounded w-1/3" />
    <div className="h-4 bg-slate-200 rounded w-2/3" />
  </div>
);

const RegiaProperties = () => {
  const { properties, isLoading } = useProperties({ limit: 6 });

  return (
    <section className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Reveal>
              <span className="font-sans font-bold text-xs tracking-[0.25em] text-[#3B82F6] uppercase block">
                PORTAFOLIO ACTIVO
              </span>
              <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[#000F5A] tracking-tight leading-tight mt-2">
                PROPIEDADES DESTACADAS
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <Link
              to="/mapa"
              className="group text-xs uppercase tracking-widest text-[#3B82F6] font-bold pb-1 hover:text-[#000F5A] transition-colors flex items-center gap-2"
            >
              INVENTARIO COMPLETO
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : properties.map((property, index) => (
                <Reveal key={property.id} delay={index * 100}>
                  <PropertyCard property={property} variant="compact" />
                </Reveal>
              ))}
        </div>

        {/* Mobile View CTA Link */}
        <div className="mt-12 text-center md:hidden">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#3B82F6] font-bold pb-1 border-b border-[#3B82F6]/40"
          >
            VER TODAS LAS PROPIEDADES
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegiaProperties;
