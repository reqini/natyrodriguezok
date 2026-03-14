import { ChevronDown, ArrowRight } from "lucide-react";

interface HeroProps {
  onViewReels: () => void;
  onContact: () => void;
}

export default function Hero({ onViewReels, onContact }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-beige-50 to-white pt-20 pb-10">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-pink-200/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-coral-200/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="animate-fade-in order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
                  Creadora de Contenido
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-slate-900">
                  Hola, soy
                </span>
                <span className="block text-gradient">
                  Natalia Rodriguez
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-600 max-w-xl font-light leading-relaxed">
                Creo contenido que inspira, educa y conecta con miles de personas a través de reels.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">320K</p>
                <p className="text-sm text-slate-600">Seguidores IG</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">450K</p>
                <p className="text-sm text-slate-600">Seguidores TikTok</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">1.2M</p>
                <p className="text-sm text-slate-600">Alcance Mensual</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                onClick={onViewReels}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-coral-400 text-white font-bold rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-pink-300/50 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Ver mis Reels</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={onContact}
                className="group px-8 py-4 bg-white border-2 border-coral-400 text-coral-500 font-bold rounded-xl text-lg transition-all duration-300 hover:bg-coral-50 hover:shadow-lg hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Colaborar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="animate-slide-left order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Image container with gradient background */}
              <div className="relative">
                {/* Gradient circle background */}
                <div className="absolute -inset-6 bg-gradient-to-br from-pink-200 via-coral-100 to-transparent rounded-3xl blur-2xl opacity-60"></div>
                
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  <img
                    src="https://i.ibb.co/q3sDGBL1/foto-naty.jpg"
                    alt="Natalia Rodriguez"
                    className="w-full h-auto object-cover aspect-[3/4] hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-beige-100 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-coral-400"></div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">Educación</p>
                    <p className="text-xs text-slate-600">+ Inspiración</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <ChevronDown className="w-6 h-6 text-coral-400" />
        </div>
      </div>
    </section>
  );
}
