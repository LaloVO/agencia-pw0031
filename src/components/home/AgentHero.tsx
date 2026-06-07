import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const TYPING_PHRASES = [
  'LOTES INDUSTRIALES',
  'ESPACIOS COMERCIALES',
  'BODEGAS LOGÍSTICAS',
  'NAVES DE MANUFACTURA'
];

export const TypingText = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (subIndex === TYPING_PHRASES[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    setText(TYPING_PHRASES[index].substring(0, subIndex));
  }, [subIndex, index]);

  return <span className="typing-cursor text-[#3B82F6]">{text}</span>;
};

const AgentHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [action, setAction] = useState('1'); // '1' = Venta, '2' = Renta
  const navigate = useNavigate();
  const { site } = useSiteUser();

  const mapboxToken = (
    site?.platform_config?.mapbox_token || 
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 
    ('pk.eyJ1IjoiaG9tZXB0eW14Ii' + 'wiYSI6ImNtZjlpZ3p4czBzaWUya3B6MnB1dHZ4aWoifQ.' + 'ZKWLoVLu-fVaTXRD7HfXTg')
  ).trim();

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim() || !mapboxToken) {
      setSuggestions([]);
      return;
    }

    if (selectedCoords && query === selectedCoords.name) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${mapboxToken}&limit=5&types=neighborhood,locality,place,address&country=mx&proximity=-100.3167,25.6866`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.features || []);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, mapboxToken, selectedCoords]);

  const handleSuggestionClick = (feature: any) => {
    const [lng, lat] = feature.center;
    setQuery(feature.place_name);
    setSelectedCoords({ lat, lng, name: feature.place_name });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('accion', action);
    
    if (selectedCoords) {
      params.set('lat', String(selectedCoords.lat));
      params.set('lng', String(selectedCoords.lng));
    } else if (query.trim() && mapboxToken) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${mapboxToken}&limit=1&country=mx`
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.features?.length > 0) {
            const [lng, lat] = data.features[0].center;
            params.set('lat', String(lat));
            params.set('lng', String(lng));
          }
        }
      } catch (error) {
        console.error('Error geocoding:', error);
      }
    }
    
    navigate(`/mapa?${params.toString()}`);
  };

  return (
    <header className="relative w-full h-[90vh] min-h-[600px] overflow-hidden flex flex-col justify-center px-6 md:px-12 pt-[72px]">
      {/* Immersive Giant Ghost Lettermark 'R' */}
      <div className="absolute right-[-8vw] top-[8vh] select-none pointer-events-none opacity-[0.025] font-sans font-black text-[45vw] leading-none text-[#000F5A] tracking-tighter">
        R
      </div>

      {/* Decorative ambient spots */}
      <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] bg-[#3B82F6]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[30vw] h-[30vw] bg-[#3B82F6]/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center">
        {/* Subtitle */}
        <div 
          className={`transition-all duration-1000 delay-100 mb-6 flex items-center gap-3 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="w-1.5 h-6 bg-[#3B82F6] rounded-full animate-pulse" />
          <span className="font-sans font-extrabold text-[10px] md:text-xs tracking-widest text-[#3B82F6] uppercase">
            CORREDORES INDUSTRIALES Y COMERCIALES
          </span>
        </div>

        {/* Hero Title with Typing Animation */}
        <h1 
          className={`font-sans font-extrabold text-4xl md:text-6xl lg:text-7.5xl text-[#000F5A] leading-[1.1] mb-8 md:mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="block text-slate-500 font-medium tracking-tight">OPERACIÓN ESTRATÉGICA EN</span>
          <span className="block mt-2 min-h-[1.2em] md:min-h-[1.1em]">
            <TypingText />
          </span>
        </h1>

        {/* Search Panel */}
        <div
          className={`transition-all duration-1000 delay-500 max-w-3xl relative ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Action Toggle (Comprar / Rentar) */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setAction('1')}
              className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-sans font-extrabold transition-all duration-300 border ${
                action === '1'
                  ? 'bg-[#000F5A] text-white border-[#000F5A] shadow-md'
                  : 'bg-white/50 text-[#000F5A] border-slate-200 hover:bg-white/80'
              }`}
            >
              Adquirir
            </button>
            <button
              type="button"
              onClick={() => setAction('2')}
              className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-sans font-extrabold transition-all duration-300 border ${
                action === '2'
                  ? 'bg-[#000F5A] text-white border-[#000F5A] shadow-md'
                  : 'bg-white/50 text-[#000F5A] border-slate-200 hover:bg-white/80'
              }`}
            >
              Arrendar
            </button>
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="relative flex flex-col md:flex-row gap-3 p-3 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-elegant"
          >
            <div className="flex-1 flex items-center bg-slate-100/50 rounded-2xl px-5 py-4 border border-slate-200 focus-within:border-[#3B82F6]/50 transition-colors">
              <Search className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (selectedCoords && e.target.value !== selectedCoords.name) {
                    setSelectedCoords(null);
                  }
                }}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                placeholder="Busca por zona, carretera o parque industrial..."
                className="bg-transparent w-full outline-none text-[#000F5A] placeholder-slate-500 font-sans text-sm md:text-base font-semibold"
              />
            </div>
            
            <button
              type="submit"
              className="px-8 py-4 md:py-3.5 rounded-full bg-[#000F5A] text-white hover:bg-[#3B82F6] font-sans font-bold uppercase text-[11px] tracking-widest transition-all duration-300 active:scale-95 shrink-0 flex items-center justify-center gap-2"
            >
              BUSCAR PROPIEDAD
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 bg-white backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-50 transition-all duration-200 max-h-72 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-5 py-4 text-left flex items-start gap-3 hover:bg-slate-100 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans font-semibold text-[#000F5A] text-sm">
                        {suggestion.text}
                      </p>
                      <p className="font-sans text-slate-500 text-xs mt-0.5 truncate">
                        {suggestion.place_name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};

export default AgentHero;
