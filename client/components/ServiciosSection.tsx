import React from "react";

const services = [
  {
    icon: "🎬",
    title: "Creación de contenido UGC",
    description:
      "Videos y fotos pensados específicamente para publicidad y conversión de tu marca.",
  },
  {
    icon: "📱",
    title: "Contenido para redes sociales",
    description:
      "Reels, TikTok y stories optimizados para Instagram y TikTok orgánico.",
  },
  {
    icon: "📦",
    title: "Unboxing y demostraciones",
    description:
      "Presentación natural y auténtica de tu producto en video.",
  },
  {
    icon: "✨",
    title: "Lifestyle integrado",
    description:
      "Tu producto en rutinas reales: belleza, cocina, familia, autocuidado.",
  },
  {
    icon: "🎥",
    title: "Contenido para lanzamientos",
    description:
      "Cobertura de eventos, lanzamientos y experiencias de marca.",
  },
  {
    icon: "👍",
    title: "Reviews y testimonios",
    description:
      "Opiniones honestas que generan confianza e identificación con tu audiencia.",
  },
];

export default function ServiciosSection() {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-4">
            Servicios para marcas
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Colaboraciones diseñadas para conectar tu marca con audiencias reales y auténticas
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-pink-100 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base md:text-lg">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
