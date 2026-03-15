import { useState } from "react";

const base = import.meta.env.BASE_URL;
const fotos = [
  `${base}images/foto-familiar-1.jpeg`,
  `${base}images/foto-familiar-2.jpeg`,
  `${base}images/foto-familiar-3.jpeg`,
  `${base}images/foto-familiar-4.jpeg`,
  `${base}images/foto-familiar-5.jpeg`,
  `${base}images/foto-familiar-6.jpeg`,
];

export default function QuienSoySection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-32 bg-gradient-to-b from-white to-rose-50 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}

        <div className="text-center mb-20">

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Quién Soy
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Detrás de cada receta hay una historia, una familia y una pasión por compartir.
          </p>

        </div>

        {/* DESKTOP */}

        <div className="hidden md:grid grid-cols-2 gap-16 items-center">

          {/* TEXTO */}

          <div className="space-y-7 text-lg text-slate-700 leading-relaxed">

            <h3 className="text-3xl font-bold text-slate-900">
              Hola, soy Natalia
            </h3>

            <p>
              Mamá, creadora de contenido y apasionada por ayudar a las personas
              a mejorar su alimentación de una manera simple, real y sin
              complicaciones.
            </p>

            <p>
              Todo comenzó compartiendo pequeñas recetas desde mi cocina,
              intentando mostrar que comer mejor no tiene que ser difícil,
              ni caro, ni aburrido.
            </p>

            <p>
              Con el tiempo esa simple idea se transformó en una comunidad
              increíble de personas que buscan lo mismo: vivir mejor,
              sentirse mejor y disfrutar la comida sin culpa.
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100">

              <p className="text-xl font-semibold text-slate-900">
                Hoy miles de personas forman parte de este viaje.
              </p>

              <p className="text-slate-600 mt-2">
                Y todo empezó compartiendo momentos reales de mi vida.
              </p>

            </div>

          </div>

          {/* COLLAGE */}

          <div className="relative h-[520px]">

            {fotos.map((foto, i) => (

              <img
                key={i}
                src={foto}
                onMouseEnter={() => setActive(i)}
                className={`absolute rounded-3xl shadow-2xl object-cover transition-all duration-500 cursor-pointer
                  
                  ${i === 0 && "w-48 left-0 top-0 rotate-[-8deg]"}
                  ${i === 1 && "w-52 right-0 top-8 rotate-[6deg]"}
                  ${i === 2 && "w-44 left-10 bottom-0 rotate-[4deg]"}
                  ${i === 3 && "w-56 right-12 bottom-6 rotate-[-6deg]"}
                  ${i === 4 && "w-40 left-36 top-40 rotate-[10deg]"}
                  ${i === 5 && "w-48 right-36 top-44 rotate-[-10deg]"}
                  
                  ${active === i
                    ? "scale-110 z-20"
                    : "opacity-90 hover:scale-105"}
                `}
              />

            ))}

          </div>

        </div>



{/* MOBILE SLIDER */}

<div className="md:hidden">

  <div className="text-center space-y-5 text-lg text-slate-700 mb-10">

    <h3 className="text-2xl font-bold text-slate-900">
      Hola, soy Natalia
    </h3>

    <p>
      Mamá y creadora de contenido. Comparto recetas, ideas y momentos
      de mi vida para demostrar que comer mejor puede ser simple.
    </p>

    <p className="font-semibold text-slate-900">
      Esta comunidad nació desde mi casa… y hoy somos miles.
    </p>

  </div>

  {/* SLIDER */}

  <div className="relative w-full overflow-hidden">

    <div
      className="flex transition-transform duration-500"
      style={{
        transform: `translateX(-${active * 100}%)`
      }}
    >

      {fotos.map((foto, i) => (

        <div
          key={i}
          className="min-w-full px-4 flex justify-center"
        >

          <img
            src={foto}
            className="w-full max-w-sm h-[420px] object-cover rounded-3xl shadow-xl"
          />

        </div>

      ))}

    </div>

  </div>

  {/* CONTROLES */}

  <div className="flex justify-center gap-6 mt-6">

    <button
      onClick={() =>
        setActive((prev) =>
          prev === 0 ? fotos.length - 1 : prev - 1
        )
      }
      className="bg-white shadow-lg px-4 py-2 rounded-full"
    >
      ←
    </button>

    <button
      onClick={() =>
        setActive((prev) =>
          prev === fotos.length - 1 ? 0 : prev + 1
        )
      }
      className="bg-white shadow-lg px-4 py-2 rounded-full"
    >
      →
    </button>

  </div>

  {/* INDICADORES */}

  <div className="flex justify-center gap-2 mt-4">

    {fotos.map((_, i) => (

      <div
        key={i}
        onClick={() => setActive(i)}
        className={`w-2.5 h-2.5 rounded-full transition cursor-pointer
          
          ${
            active === i
              ? "bg-pink-500 scale-125"
              : "bg-slate-300"
          }
        `}
      />

    ))}

  </div>

</div>

      </div>

    </section>
  );
}

