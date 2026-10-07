import { motion } from "framer-motion";
import { useState } from "react";
import brandsData from "@/data/brands.json";

interface Brand {
  id: string;
  name: string;
  logo: string;
}

const base = import.meta.env.BASE_URL;
const BRANDS: Brand[] = brandsData;

/* Mientras no esté subido el archivo del logo, la tarjeta muestra el nombre
   de la marca en vez de una imagen rota. */
function BrandLogo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(!brand.logo);

  if (failed) {
    return (
      <span className="text-lg font-semibold text-slate-400 text-center px-2 leading-tight break-normal transition-colors duration-300 group-hover:text-slate-700">
        {brand.name}
      </span>
    );
  }

  return (
    <img
      src={`${base}${brand.logo}`}
      alt={brand.name}
      onError={() => setFailed(true)}
      className="max-h-20 max-w-full object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
    />
  );
}

export default function MarcasSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Marcas que confían en mí
            </span>
          </h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">
            Trabajo con diferentes empresas y marcas para generar contenido de calidad que llegue a una gran audiencia.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
          {BRANDS.map((brand) => (
            <motion.div
              key={brand.id}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 w-full flex items-center justify-center h-[140px] transition-all duration-300 group-hover:shadow-xl group-hover:border-pink-200 group-hover:shadow-pink-100">
                <BrandLogo brand={brand} />
              </div>
              <p className="mt-4 text-slate-700 font-medium text-sm sm:text-base">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
