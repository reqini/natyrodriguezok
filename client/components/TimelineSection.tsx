interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  image?: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    year: 2018,
    title: "Primer Reel Viral",
    description: "Mi primer video se hizo viral y alcanzó 1M de views en una semana",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop",
  },
  {
    id: "2",
    year: 2019,
    title: "100k Seguidores en Instagram",
    description: "Alcancé el hito de 100k seguidores gracias a vuestro apoyo",
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=300&h=300&fit=crop",
  },
  {
    id: "3",
    year: 2020,
    title: "Colaboración con Marca X",
    description: "Primera colaboración importante con una de las marcas más reconocidas del país",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=300&fit=crop",
  },
  {
    id: "4",
    year: 2023,
    title: "Lanzamiento de Curso Online",
    description: "Lancé mi curso de creación de contenido con más de 5000 estudiantes",
    image: "https://images.unsplash.com/photo-1516534775068-bb57928b2edf?w=300&h=300&fit=crop",
  },
];

export default function TimelineSection() {
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

                {/* Image */}
                <div className="flex-1">
                  <div className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
                    />
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
