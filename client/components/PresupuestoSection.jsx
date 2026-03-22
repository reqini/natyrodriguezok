import React from "react";

const features = [
  {
    title: "Estrategia personalizada",
    desc: "Analizo tu marca, tu producto y el objetivo de la campaña antes de crear cualquier contenido.",
  },
  {
    title: "Contenido pensado para conversión",
    desc: "Cada pieza se diseña para captar atención, generar confianza y motivar a la audiencia a conocer tu producto.",
  },
  {
    title: "Producción optimizada para redes",
    desc: "Videos y fotos adaptados a formatos que funcionan en Instagram, TikTok y campañas publicitarias.",
  },
  {
    title: "Propuesta a medida",
    desc: "Cada colaboración se arma según la cantidad de piezas, tipo de contenido y objetivos de tu marca.",
  },
];

const steps = [
  "Me contás sobre tu marca, producto y objetivos.",
  "Analizo la mejor forma de integrar el contenido dentro de tu estrategia.",
  "Recibís una propuesta personalizada según tus necesidades.",
];

const PresupuestoSection = () => {
  return (
    <section className="py-20 px-4 bg-[#f7f4fb] text-center">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 
        bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Presupuesto personalizado
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          Cada marca tiene objetivos, audiencias y necesidades diferentes. 
          Por eso cada colaboración se diseña de forma estratégica para lograr 
          el mayor impacto posible.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm 
              hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <h3 className="text-xl md:text-2xl font-semibold mb-6">
          Cómo solicitar tu presupuesto
        </h3>

        <div className="max-w-xl mx-auto space-y-4 mb-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm px-6 py-4 rounded-xl shadow-sm text-sm text-gray-600"
            >
              {step}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="px-8 py-4 rounded-full font-semibold text-white
          bg-gradient-to-r from-pink-500 to-purple-500
          hover:scale-105 transition-transform shadow-lg"
        >
          Solicitar presupuesto personalizado
        </button>
      </div>
    </section>
  );
};

export default PresupuestoSection;
