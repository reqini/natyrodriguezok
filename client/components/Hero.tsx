import { ChevronDown } from "lucide-react";

interface HeroProps {
  onViewReels: () => void;
  onContact: () => void;
}

export default function Hero({ onViewReels, onContact }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-beige-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-pink-200 to-transparent rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-coral-200 to-transparent rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Hero content with fade-in animation */}
        <div className="animate-fade-in space-y-8">
          {/* Main greeting */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gradient">
                Hola, soy Natalia Rodriguez,
              </span>
              <span className="block text-slate-700 mt-2">
                creo contenido que conecta y educa
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto font-light">
              Reels que inspiran, entretienen y generan impacto
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={onViewReels}
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-coral-400 text-white font-bold rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-pink-300/50 hover:-translate-y-1 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                Ver mis Reels
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={onContact}
              className="group px-8 py-4 bg-white border-2 border-coral-400 text-coral-500 font-bold rounded-xl text-lg transition-all duration-300 hover:bg-coral-50 hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                Contactar Marca
              </span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-coral-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
