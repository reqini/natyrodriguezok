import { ChevronDown, ArrowRight } from "lucide-react";

interface HeroProps {
  onViewReels: () => void;
  onContact: () => void;
}

export default function Hero({ onViewReels, onContact }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white via-beige-50 to-white pt-10 pb-6 px-2 sm:px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-l from-pink-200/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-coral-200/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-6 group w-48 sm:w-64">
          <div className="absolute inset-0 rounded-[2rem] blur-2xl bg-gradient-to-tr from-pink-400/50 via-orange-300/50 to-purple-400/50 scale-105 transition-all duration-300 group-hover:scale-110 group-hover:blur-3xl z-0" />
          <div className="relative z-10 rounded-[2rem] p-[3px] bg-gradient-to-tr from-pink-500 via-orange-400 to-purple-500 shadow-2xl shadow-pink-300/40 transition-transform duration-300 group-hover:scale-[1.02]">
            <img
              src={`${import.meta.env.BASE_URL}images/foto-familiar-2.jpeg`}
              alt="Natalia Rodriguez"
              className="w-full aspect-[4/5] rounded-[1.75rem] object-cover border-4 border-white"
              loading="lazy"
            />
          </div>
        </div>
        <div className="space-y-4 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold">
            Creadora de Contenido
          </span>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            <span className="block text-slate-900">Hola, soy</span>
            <span className="block text-gradient">Natalia Rodriguez</span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl text-slate-600 max-w-xs sm:max-w-md mx-auto font-light leading-relaxed">
            Creo contenido que inspira, educa y conecta con miles de personas a través de reels.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 py-6 w-full">
          <div className="flex-1 min-w-[90px] space-y-1">
            <p className="text-xl sm:text-2xl font-bold text-gradient">116K</p>
            <p className="text-xs sm:text-sm text-slate-600">Seguidores IG</p>
          </div>
          <div className="flex-1 min-w-[90px] space-y-1">
            <p className="text-xl sm:text-2xl font-bold text-gradient">4.8K</p>
            <p className="text-xs sm:text-sm text-slate-600">Seguidores TikTok</p>
          </div>
          {/* <div className="flex-1 min-w-[90px] space-y-1">
            <p className="text-xl sm:text-2xl font-bold text-gradient">1.2M</p>
            <p className="text-xs sm:text-sm text-slate-600">Alcance Mensual</p>
          </div> */}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs mx-auto pt-4">
          <button
            onClick={onViewReels}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold text-base shadow-md hover:scale-105 transition"
          >
            Ver Reels
          </button>
          <button
            onClick={onContact}
            className="w-full py-3 px-4 rounded-lg border border-pink-400 text-pink-600 font-semibold text-base bg-white shadow hover:bg-pink-50 transition"
          >
            Contactar
          </button>
        </div>
      </div>
    </section>
  );
}
