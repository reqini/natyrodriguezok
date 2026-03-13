import { useState } from "react";

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  media: string;
  mediaType: "image" | "video" | "gif";
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    year: 2018,
    title: "Mi Primer Reel Viral",
    description: "Compartí mi primer video receta que alcanzó 1M de views",
    media: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop",
    mediaType: "image",
  },
  {
    id: "2",
    year: 2019,
    title: "100k Seguidores",
    description: "Alcancé 100k seguidores gracias a vuestra confianza",
    media: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=300&h=300&fit=crop",
    mediaType: "image",
  },
  {
    id: "3",
    year: 2021,
    title: "Lanzamiento de Contenido Premium",
    description: "Comencé a crear contenido educativo de nutrición certificado",
    media: "https://media.giphy.com/media/l0HlNaQ9NcI7l0XO8/giphy.mp4",
    mediaType: "gif",
  },
  {
    id: "4",
    year: 2023,
    title: "500k Seguidores",
    description: "Superé medio millón de seguidores en mis redes",
    media: "https://images.unsplash.com/photo-1516534775068-bb57928b2edf?w=300&h=300&fit=crop",
    mediaType: "image",
  },
];

export default function TimelineSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [videoRefs, setVideoRefs] = useState<Record<string, HTMLVideoElement | null>>({});

  const handleMediaHover = (eventId: string, mediaType: string) => {
    setHoveredId(eventId);
    if (mediaType !== "image") {
      const video = videoRefs[eventId];
      if (video) {
        video.play().catch(() => {
          // Handle autoplay restrictions
        });
      }
    }
  };

  const handleMediaLeave = (eventId: string, mediaType: string) => {
    setHoveredId(null);
    if (mediaType !== "image") {
      const video = videoRefs[eventId];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-beige-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="text-gradient">Mi Historia</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Un viaje increíble desde mis inicios hasta hoy
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-300 via-coral-300 to-beige-400 -translate-x-1/2" />

          {/* Timeline events */}
          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, index) => (
              <div
                key={event.id}
                className={`animate-slide-up lg:flex ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 items-center`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Content */}
                <div className="flex-1 lg:text-right" style={
                  index % 2 === 1 ? { textAlign: 'right' } : {}
                }>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="inline-block bg-gradient-to-r from-pink-500 to-coral-400 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                      {event.year}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex justify-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-coral-400 rounded-full ring-4 ring-white shadow-lg" />
                </div>

                {/* Media */}
                <div className="flex-1 group">
                  <div
                    className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => handleMediaHover(event.id, event.mediaType)}
                    onMouseLeave={() => handleMediaLeave(event.id, event.mediaType)}
                  >
                    {event.mediaType === "image" ? (
                      <img
                        src={event.media}
                        alt={event.title}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="relative w-full h-72 bg-slate-100">
                        <video
                          ref={(el) => {
                            if (el) setVideoRefs((prev) => ({ ...prev, [event.id]: el }));
                          }}
                          src={event.media}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          muted
                          loop
                        />
                        {/* Play indicator for GIFs/Videos */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                          {hoveredId !== event.id && (
                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-300">
                              <div className="w-0 h-0 border-l-4 border-l-white border-t-3 border-t-transparent border-b-3 border-b-transparent ml-0.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section divider with different colors */}
        <div className="mt-20 py-12 bg-white rounded-2xl">
          <div className="text-center space-y-6 animate-fade-in">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Y esto es solo el comienzo...
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Cada día trabajamos para traerte contenido más creativo, auténtico
              e impactante. ¡Gracias por ser parte de este viaje!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
