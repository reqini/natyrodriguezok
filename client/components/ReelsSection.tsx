import { Eye, Heart, Share2, Calendar, X } from "lucide-react";
import { useState } from "react";

interface Reel {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  views: number;
  likes: number;
  shares: number;
  date: string;
}

const SAMPLE_REELS: Reel[] = [
  {
    id: "1",
    title: "Tutorial Saludable",
    description: "Desayuno proteico en 5 minutos",
    videoUrl: "https://media.giphy.com/media/l0HlUaQ6WyZf0XO1i/giphy.mp4",
    views: 245000,
    likes: 18500,
    shares: 3200,
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Receta Rápida",
    description: "Bowl saludable con 3 ingredientes",
    videoUrl: "https://media.giphy.com/media/l3q2K6YNbCRSwzvpS/giphy.mp4",
    views: 512000,
    likes: 42300,
    shares: 7800,
    date: "2024-01-12",
  },
  {
    id: "3",
    title: "Tips Nutrición",
    description: "10 alimentos imprescindibles en tu despensa",
    videoUrl: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.mp4",
    views: 890000,
    likes: 65200,
    shares: 12100,
    date: "2024-01-10",
  },
  {
    id: "4",
    title: "Snacks Saludables",
    description: "Opciones bajas en calorías",
    videoUrl: "https://media.giphy.com/media/l3q2KcFGrFyTQKIhO/giphy.mp4",
    views: 345000,
    likes: 28900,
    shares: 4500,
    date: "2024-01-08",
  },
  {
    id: "5",
    title: "Hidratación Correcta",
    description: "¿Cuánta agua realmente necesitas?",
    videoUrl: "https://media.giphy.com/media/l0HlNaQ9NcI7l0XO8/giphy.mp4",
    views: 178000,
    likes: 14200,
    shares: 2100,
    date: "2024-01-05",
  },
  {
    id: "6",
    title: "Ejercicio en Casa",
    description: "Rutina de 10 minutos sin equipo",
    videoUrl: "https://media.giphy.com/media/l3q2K5jW8SAkQwLDG/giphy.mp4",
    views: 421000,
    likes: 32100,
    shares: 5900,
    date: "2024-01-02",
  },
];

interface ReelsSectionProps {
  onReelClick?: (reel: Reel) => void;
}

export default function ReelsSection({ onReelClick }: ReelsSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [videoRefs, setVideoRefs] = useState<Record<string, HTMLVideoElement | null>>({});

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

  const handleReelHover = (reelId: string) => {
    setHoveredId(reelId);
    const video = videoRefs[reelId];
    if (video) {
      video.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  };

  const handleReelLeave = (reelId: string) => {
    setHoveredId(null);
    const video = videoRefs[reelId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
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
            Contenido que inspira, educa y transforma
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SAMPLE_REELS.map((reel, index) => (
            <div
              key={reel.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => handleReelHover(reel.id)}
              onMouseLeave={() => handleReelLeave(reel.id)}
            >
              <button
                onClick={() => {
                  setSelectedReel(reel);
                  onReelClick?.(reel);
                }}
                className="w-full text-left group"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[9/16] bg-slate-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-pink-200/50 hover:-translate-y-2">
                  {/* Video */}
                  <video
                    ref={(el) => {
                      if (el) setVideoRefs((prev) => ({ ...prev, [reel.id]: el }));
                    }}
                    src={reel.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    loop
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

      {/* Fullscreen Modal */}
      {selectedReel && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-2xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedReel(null)}
              className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black">
              <video
                src={selectedReel.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                controls
              />
            </div>

            <div className="mt-6 text-white space-y-2">
              <h3 className="text-2xl font-bold">{selectedReel.title}</h3>
              <p className="text-gray-300">{selectedReel.description}</p>
              <p className="text-sm text-gray-400">{formatDate(selectedReel.date)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
