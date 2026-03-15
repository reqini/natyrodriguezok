import { motion } from "framer-motion";

interface Brand {
  id: number;
  name: string;
  logo: string;
}

const base = import.meta.env.BASE_URL;
const BRANDS: Brand[] = [
  { id: 1, name: "Twistshake", logo: `${base}images/marca-1.jpeg` },
  { id: 2, name: "Minimoka", logo: `${base}images/marca-2.jpeg` },
  { id: 3, name: "Grupolar", logo: `${base}images/marca-3.jpeg` },
  { id: 4, name: "Los Rojeles de Marcela", logo: `${base}images/marca-4.jpeg` }
];

export default function MarcasSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Marcas que confían en mí
            </span>
          </h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">
            Trabajo con marcas líderes del sector salud y bienestar para llevar contenido de calidad a miles de personas.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {BRANDS.map((brand) => (
            <motion.div
              key={brand.id}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-md p-6 w-full flex items-center justify-center h-[110px] transition group-hover:shadow-xl">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-14 object-contain grayscale group-hover:grayscale-0 transition"
                />
              </div>
              <p className="mt-4 text-slate-700 font-medium">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
