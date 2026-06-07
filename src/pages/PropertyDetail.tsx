import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Bed, Bath, Square, Car, MapPin, MessageCircle, Sparkles, Building2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperty, formatPrice } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSiteUser();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const whatsappNumber = user?.telefono_usuario?.replace(/\D/g, '') ?? '';
  const whatsappMsg = property
    ? encodeURIComponent(`Hola, me interesa la propiedad: ${property.nombre}`)
    : '';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-background px-6 md:px-12 max-w-[90rem] mx-auto animate-pulse">
          <div className="h-8 bg-slate-200 rounded-2xl w-1/3 mb-8" />
          <div className="aspect-video bg-slate-200 rounded-3xl mb-8" />
          <div className="h-10 bg-slate-200 rounded-2xl w-1/2 mb-4" />
          <div className="h-4 bg-slate-200 rounded-2xl w-1/3" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="font-sans font-bold text-2xl text-slate-400">Propiedad no encontrada</p>
            <Link to="/mapa" className="inline-block text-sm text-[#3B82F6] underline hover:text-[#000F5A] transition-colors">
              Ver todas las propiedades
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = property.imagenes_propiedades ?? [];
  const mainImage = images[0]?.image_url ?? 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(', ');

  // Detect type (Industrial/Bodega, Terreno, Local, etc.)
  const isIndustrial = property.tipo?.toLowerCase().includes('industrial') || 
                       property.tipo?.toLowerCase().includes('bodega') ||
                       property.tipo?.toLowerCase().includes('terreno');

  return (
    <>
      <Helmet>
        <title>{property.nombre} | {user?.nombre_usuario ?? 'Agencia'}</title>
        <meta name="description" content={property.descripcion ?? property.nombre} />
      </Helmet>

      <Navbar />

      <main className="pt-[72px] min-h-screen bg-background text-[#000F5A]">
        {/* Back navigation */}
        <div className="px-6 md:px-12 py-6 max-w-[90rem] mx-auto">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#3B82F6] transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            VER INVENTARIO COMPLETO
          </Link>
        </div>

        {/* Images Grid */}
        <div className="px-6 md:px-12 max-w-[90rem] mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-3xl overflow-hidden border border-slate-200 shadow-elegant">
            <div className="aspect-[4/3] md:aspect-auto md:row-span-2 overflow-hidden">
              <img src={mainImage} alt={property.nombre} className="w-full h-full object-cover hover:scale-102 transition-transform duration-700" />
            </div>
            {images.slice(1, 3).map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden">
                <img src={img.image_url} alt={`${property.nombre} ${i + 2}`} className="w-full h-full object-cover hover:scale-102 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 md:px-12 max-w-[90rem] mx-auto pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 bg-[#3B82F6] text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded-full">
                  {badge}
                </span>
                {property.tipo && (
                  <span className="px-3.5 py-1 bg-white text-slate-600 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-slate-200">
                    {property.tipo}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-[#000F5A] tracking-tight leading-tight">
                  {property.nombre}
                </h1>

                {location && (
                  <p className="flex items-center gap-2 text-slate-500 font-sans text-sm font-semibold">
                    <MapPin className="w-4 h-4 text-[#3B82F6]" />
                    {location}
                  </p>
                )}
              </div>

              {/* Stats / Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.area != null && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center shadow-sm">
                    <Square className="w-5 h-5 mx-auto mb-2 text-[#3B82F6]" />
                    <p className="font-sans font-extrabold text-2xl text-[#000F5A]">{property.area}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">m² Superficie</p>
                  </div>
                )}
                
                {isIndustrial ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center shadow-sm">
                    <Building2 className="w-5 h-5 mx-auto mb-2 text-[#3B82F6]" />
                    <p className="font-sans font-extrabold text-lg text-[#000F5A] uppercase tracking-wider">Industrial</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">Vocación de Uso</p>
                  </div>
                ) : (
                  <>
                    {property.habitaciones != null && (
                      <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center shadow-sm">
                        <Bed className="w-5 h-5 mx-auto mb-2 text-[#3B82F6]" />
                        <p className="font-sans font-extrabold text-2xl text-[#000F5A]">{property.habitaciones}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Recámaras</p>
                      </div>
                    )}
                    {property.banios != null && (
                      <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center shadow-sm">
                        <Bath className="w-5 h-5 mx-auto mb-2 text-[#3B82F6]" />
                        <p className="font-sans font-extrabold text-2xl text-[#000F5A]">{property.banios}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Baños</p>
                      </div>
                    )}
                  </>
                )}

                {property.estacionamientos != null && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center shadow-sm">
                    <Car className="w-5 h-5 mx-auto mb-2 text-[#3B82F6]" />
                    <p className="font-sans font-extrabold text-2xl text-[#000F5A]">{property.estacionamientos}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Cajones</p>
                  </div>
                )}
              </div>

              {property.descripcion && (
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h2 className="font-sans font-extrabold text-lg text-[#000F5A] uppercase tracking-widest">
                    Descripción de Operación
                  </h2>
                  <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                    {property.descripcion}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Contact Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white border border-slate-200 rounded-3xl p-6 shadow-elegant space-y-6">
                <div>
                  <span className="block text-[10px] font-sans font-extrabold tracking-widest text-slate-500 uppercase mb-1">
                    {badge === 'Renta' ? 'Monto de Arrendamiento' : 'Monto de Adquisición'}
                  </span>
                  <p className="font-sans font-black text-3xl text-[#000F5A]">{formatPrice(property.precio)}</p>
                </div>

                {user && (
                  <div className="flex items-center gap-3.5 py-4 border-y border-slate-200">
                    {user.imagen_perfil_usuario ? (
                      <img
                        src={user.imagen_perfil_usuario}
                        alt={user.nombre_usuario}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-sans font-bold text-sm text-[#000F5A]">
                        {user.nombre_usuario[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-sans font-bold text-sm text-[#000F5A]">{user.nombre_usuario}</p>
                      <p className="font-sans text-xs text-slate-500">Asesor de Negocios e Industria</p>
                    </div>
                  </div>
                )}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  CONTACTAR POR WHATSAPP
                </a>

                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-sans font-bold text-sm text-[#3B82F6] uppercase tracking-wider">
                    ¿Requieres un Traje a la Medida?
                  </h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Si esta ficha no cumple al 100% tus requisitos de patio de maniobras, altura libre o subestación eléctrica, solicita una propuesta de Búsqueda Inteligente.
                  </p>
                  <Link
                    to="/solicita-inmueble"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-slate-200 hover:border-[#3B82F6]/50 text-[#000F5A] hover:text-[#3B82F6] rounded-full font-sans font-bold text-[10px] tracking-widest uppercase transition-all duration-300 bg-slate-50/50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                    BÚSQUEDA INTELIGENTE
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PropertyDetail;
