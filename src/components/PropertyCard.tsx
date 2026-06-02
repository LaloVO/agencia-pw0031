import { Link } from 'react-router-dom';
import { Square, Building2, MapPin } from 'lucide-react';
import { CBFProperty, formatPrice } from '@/lib/cbf';

interface PropertyCardProps {
  property: CBFProperty;
  variant?: 'default' | 'compact';
}

const PropertyCard = ({ property, variant = 'default' }: PropertyCardProps) => {
  const image = property.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(' • ') || 'Corredor Industrial';

  // Detect type (Industrial/Bodega, Terreno, Local, etc.)
  const isIndustrial = property.tipo?.toLowerCase().includes('industrial') || 
                       property.tipo?.toLowerCase().includes('bodega') ||
                       property.tipo?.toLowerCase().includes('terreno');

  if (variant === 'compact') {
    return (
      <Link 
        to={`/properties/${property.id}`} 
        className="group block rounded-3xl overflow-hidden transition-all duration-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-white/30 shadow-sm group-hover:shadow-elegant group-hover:border-[#3B82F6]/30 transition-all duration-500">
          <img src={image} alt={property.nombre} className="w-full h-full object-cover image-zoom" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-[#3B82F6] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded-full">
              {badge}
            </span>
            {property.tipo && (
              <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-[#000F5A] text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-slate-200">
                {property.tipo}
              </span>
            )}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-white font-sans font-extrabold text-xl tracking-tight drop-shadow">
              {formatPrice(property.precio)}
            </span>
          </div>
        </div>
        <div className="py-4 px-1">
          <h3 className="font-sans font-bold text-base text-[#000F5A] group-hover:text-[#3B82F6] transition-colors mb-1 truncate">
            {property.nombre}
          </h3>
          <p className="font-sans text-xs text-slate-500 mb-2 flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
            {location}
          </p>
          <div className="flex gap-4 text-xs font-bold text-slate-500 border-t border-slate-200/50 pt-2">
            {property.area != null && (
              <span className="flex items-center gap-1">
                <Square className="w-3.5 h-3.5 text-[#3B82F6]" />
                {property.area} m²
              </span>
            )}
            {isIndustrial ? (
              <span className="flex items-center gap-1 ml-auto">
                <Building2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                Industrial
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/properties/${property.id}`} 
      className="min-w-[85vw] md:min-w-[40vw] group cursor-pointer snap-center block"
    >
      <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-3xl border border-slate-200 bg-white/30 shadow-sm group-hover:shadow-elegant group-hover:border-[#3B82F6]/30 transition-all duration-500">
        <img src={image} alt={property.nombre} className="w-full h-full object-cover image-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-[#3B82F6] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded-full shadow-md">
            {badge}
          </span>
          {property.tipo && (
            <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-[#000F5A] text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-slate-200">
              {property.tipo}
            </span>
          )}
        </div>
        <div className="absolute bottom-5 left-6">
          <span className="font-sans font-extrabold text-2xl text-white drop-shadow">
            {formatPrice(property.precio)}
          </span>
        </div>
      </div>
      <div className="px-1 flex justify-between items-start gap-4">
        <div>
          <h3 className="font-sans font-bold text-lg md:text-xl text-[#000F5A] mb-1.5 group-hover:text-[#3B82F6] transition-colors leading-snug">
            {property.nombre}
          </h3>
          <p className="font-sans text-xs md:text-sm text-slate-500 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#3B82F6] shrink-0" />
            {location}{property.area ? ` • ${property.area} m²` : ''}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
