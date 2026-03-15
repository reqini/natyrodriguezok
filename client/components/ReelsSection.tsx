import { Eye, Heart, Share2, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Reel {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  views: number;
  likes: number;
  shares: number;
}

const base = import.meta.env.BASE_URL;
const SAMPLE_REELS: Reel[] = [
  {
    id: "1",
    title: "Desayuno proteico",
    description: "5 minutos y listo",
    videoUrl: `${base}videos/video-1.mp4`,
    views: 245000,
    likes: 18500,
    shares: 3200,
  },
  {
    id: "2",
    title: "Receta rápida",
    description: "Bowl saludable",
    videoUrl: `${base}videos/video-2.mp4`,
    views: 512000,
    likes: 42300,
    shares: 7800,
  },
  {
    id: "3",
    title: "Tips nutrición",
    description: "10 alimentos clave",
    videoUrl: `${base}videos/video-3.mp4`,
    views: 890000,
    likes: 65200,
    shares: 12100,
  },
  {
    id: "4",
    title: "Snacks saludables",
    description: "Opciones bajas en calorías",
    videoUrl: `${base}videos/video-4.mp4`,
    views: 345000,
    likes: 28900,
    shares: 4500,
  },
  {
    id: "5",
    title: "Hidratación",
    description: "Cuánta agua tomar",
    videoUrl: `${base}videos/video-1.mp4`,
    views: 178000,
    likes: 14200,
    shares: 2100,
  },
  {
    id: "6",
    title: "Rutina en casa",
    description: "10 minutos fitness",
    videoUrl: `${base}videos/video-2.mp4`,
    views: 421000,
    likes: 32100,
    shares: 5900,
  },
  {
    id: "7",
    title: "Meal prep",
    description: "Comidas de la semana",
    videoUrl: `${base}videos/video-3.mp4`,
    views: 368000,
    likes: 28000,
    shares: 4300,
  },
  {
    id: "8",
    title: "Tips energía",
    description: "Cómo tener más energía",
    videoUrl: `${base}videos/video-4.mp4`,
    views: 310000,
    likes: 22000,
    shares: 3800,
  },
];

export default function ReelsSection() {
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const mobileRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const playVideo = (id: string) => {
    videoRefs.current[id]?.play().catch(() => {});
  };

  const stopVideo = (id: string) => {
    const v = videoRefs.current[id];
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  // MOBILE autoplay solo del reel visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");

          if (!id) return;

          const video = videoRefs.current[id];

          if (entry.isIntersecting) {
            video?.play().catch(() => {});
          } else {
            video?.pause();
          }
        });
      },
      {
        threshold: 0.75,
      }
    );

    Object.values(mobileRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-white to-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="text-center mb-20">

          <h2 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Mis Reels
            </span>
          </h2>

          <p className="text-slate-600 text-xl max-w-xl mx-auto">
            Recetas, tips y contenido que transforma tu alimentación
          </p>

        </div>

        {/* DESKTOP GRID */}

        <div className="hidden md:grid grid-cols-4 gap-8">

          {SAMPLE_REELS.map((reel, i) => (

            <div
              key={reel.id}
              onMouseEnter={() => playVideo(reel.id)}
              onMouseLeave={() => stopVideo(reel.id)}
              onClick={() => setSelectedReel(reel)}
              className={`group cursor-pointer
                ${i % 2 === 0 ? "mt-12" : ""}
                ${i % 3 === 0 ? "mt-24" : ""}
              `}
            >

              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                <video
                  ref={(el) => (videoRefs.current[reel.id] = el)}
                  src={reel.videoUrl}
                  muted
                  loop
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">

                  <h3 className="text-white font-semibold text-lg">
                    {reel.title}
                  </h3>

                  <p className="text-gray-200 text-sm">
                    {reel.description}
                  </p>

                  <div className="flex gap-4 mt-3 text-white text-xs">

                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {formatNumber(reel.views)}
                    </span>

                    <span className="flex items-center gap-1">
                      <Heart size={14} />
                      {formatNumber(reel.likes)}
                    </span>

                    <span className="flex items-center gap-1">
                      <Share2 size={14} />
                      {formatNumber(reel.shares)}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* MOBILE SLIDER */}

        <div className="md:hidden flex gap-5 overflow-x-auto snap-x snap-mandatory pb-8">

          {SAMPLE_REELS.map((reel) => (

            <div
              key={reel.id}
              ref={(el) => (mobileRefs.current[reel.id] = el)}
              data-id={reel.id}
              className="snap-center min-w-[85%]"
              onClick={() => setSelectedReel(reel)}
            >

              <div className="rounded-3xl overflow-hidden shadow-xl">

                <video
                  ref={(el) => (videoRefs.current[reel.id] = el)}
                  src={reel.videoUrl}
                  muted
                  loop
                  playsInline
                  className="w-full aspect-[9/16] object-cover"
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* MODAL */}

      {selectedReel && (

        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6">

          <button
            onClick={() => setSelectedReel(null)}
            className="absolute top-8 right-8 text-white"
          >
            <X size={36} />
          </button>

          <div className="max-w-md w-full">

            <video
              src={selectedReel.videoUrl}
              autoPlay
              controls
              className="w-full rounded-2xl"
            />

            <div className="text-white mt-4">

              <h3 className="text-2xl font-bold">
                {selectedReel.title}
              </h3>

              <p className="text-gray-300">
                {selectedReel.description}
              </p>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}
