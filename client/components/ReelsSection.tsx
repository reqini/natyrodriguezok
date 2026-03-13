import { Eye, Heart, Share2, Calendar } from "lucide-react";
import { useState } from "react";

interface Reel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  views: number;
  likes: number;
  shares: number;
  date: string;
  category?: string;
}

const SAMPLE_REELS: Reel[] = [
  {
    id: "1",
    title: "Reel 1 – Viaje a París",
    description: "Un viaje mágico a la ciudad de la luz",
    thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=500&fit=crop",
    views: 245000,
    likes: 18500,
    shares: 3200,
    date: "2024-01-15",
    category: "Viajes",
  },
  {
    id: "2",
    title: "Reel 2 – Tutorial Maquillaje",
    description: "Maquillaje de noche en 5 minutos",
    thumbnail: "https://images.unsplash.com/photo-1487412992651-9e8c0907a14b?w=400&h=500&fit=crop",
    views: 512000,
    likes: 42300,
    shares: 7800,
    date: "2024-01-12",
    category: "Beauty",
  },
  {
    id: "3",
    title: "Reel 3 – Challenge Viral",
    description: "Únete al challenge más viral del momento",
    thumbnail: "https://images.unsplash.com/photo-1522869635100-82f4e9c40801?w=400&h=500&fit=crop",
    views: 890000,
    likes: 65200,
    shares: 12100,
    date: "2024-01-10",
    category: "Trends",
  },
  {
    id: "4",
    title: "Reel 4 – Día en la playa",
    description: "Mis mejores momentos de verano",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop",
    views: 345000,
    likes: 28900,
    shares: 4500,
    date: "2024-01-08",
    category: "Viajes",
  },
  {
    id: "5",
    title: "Reel 5 – Receta Rápida",
    description: "Receta vegana lista en 15 minutos",
    thumbnail: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=500&fit=crop",
    views: 178000,
    likes: 14200,
    shares: 2100,
    date: "2024-01-05",
    category: "Comida",
  },
  {
    id: "6",
    title: "Reel 6 – Tips de Fitness",
    description: "Rutina matinal de 10 minutos",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop",
    views: 421000,
    likes: 32100,
    shares: 5900,
    date: "2024-01-02",
    category: "Fitness",
  },
];

interface ReelsSectionProps {
  onReelClick?: (reel: Reel) => void;
}

export default function ReelsSection({ onReelClick }: ReelsSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(SAMPLE_REELS.map((r) => r.category)));
  const filteredReels = selectedCategory
    ? SAMPLE_REELS.filter((r) => r.category === selectedCategory)
    : SAMPLE_REELS;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="text-gradient">Mis Reels</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explora mi contenido más impactante y viral
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-slide-up">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-pink-500 to-coral-400 text-white shadow-lg"
                : "bg-beige-100 text-slate-700 hover:bg-beige-200"
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-pink-500 to-coral-400 text-white shadow-lg"
                  : "bg-beige-100 text-slate-700 hover:bg-beige-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReels.map((reel, index) => (
            <div
              key={reel.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(reel.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                onClick={() => onReelClick?.(reel)}
                className="w-full text-left group"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[9/16] bg-slate-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-pink-200/50 hover:-translate-y-2">
                  {/* Thumbnail */}
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Metadata overlay - shown on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end transition-all duration-300 ${
                      hoveredId === reel.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="space-y-3">
                      <h3 className="text-white font-bold text-lg line-clamp-2">
                        {reel.title}
                      </h3>
                      <p className="text-gray-200 text-sm line-clamp-2">
                        {reel.description}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/20">
                        <div className="flex flex-col items-center gap-1">
                          <Eye className="w-4 h-4 text-pink-300" />
                          <span className="text-xs text-white font-semibold">
                            {formatNumber(reel.views)}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Heart className="w-4 h-4 text-pink-300" />
                          <span className="text-xs text-white font-semibold">
                            {formatNumber(reel.likes)}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Share2 className="w-4 h-4 text-pink-300" />
                          <span className="text-xs text-white font-semibold">
                            {formatNumber(reel.shares)}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Calendar className="w-4 h-4 text-pink-300" />
                          <span className="text-xs text-white font-semibold">
                            {formatDate(reel.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Play button indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-0 h-0 border-l-6 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
