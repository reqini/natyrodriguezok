export default function AudienceStatsSection() {
  // Datos manuales, editar aquí
  const stats = {
    totalFollowers: 18500,
    ageGroups: [
      { label: "18-24", percent: 32 },
      { label: "25-34", percent: 48 },
      { label: "35-44", percent: 15 },
      { label: "45+", percent: 5 },
    ],
    gender: [
      { label: "Mujeres", percent: 82 },
      { label: "Hombres", percent: 18 },
    ],
    countries: [
      { label: "Argentina", percent: 74 },
      { label: "Uruguay", percent: 8 },
      { label: "Chile", percent: 6 },
      { label: "España", percent: 5 },
      { label: "Otros", percent: 7 },
    ],
  };

  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">¿Quiénes me siguen?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Un vistazo real a mi comunidad en Instagram y TikTok.<br />
            Datos actualizados manualmente.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Edad */}
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-1 rounded-2xl shadow-lg">
            <div className="bg-white rounded-2xl p-8 h-full flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-pink-500">Edad</h3>
              <ul className="space-y-2 w-full">
                {stats.ageGroups.map((g) => (
                  <li key={g.label} className="flex justify-between text-slate-700 text-lg">
                    <span>{g.label}</span>
                    <span className="font-semibold">{g.percent}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Género */}
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-1 rounded-2xl shadow-lg">
            <div className="bg-white rounded-2xl p-8 h-full flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-purple-500">Género</h3>
              <ul className="space-y-2 w-full">
                {stats.gender.map((g) => (
                  <li key={g.label} className="flex justify-between text-slate-700 text-lg">
                    <span>{g.label}</span>
                    <span className="font-semibold">{g.percent}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Países */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-1 rounded-2xl shadow-lg">
            <div className="bg-white rounded-2xl p-8 h-full flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-blue-500">Países</h3>
              <ul className="space-y-2 w-full">
                {stats.countries.map((c) => (
                  <li key={c.label} className="flex justify-between text-slate-700 text-lg">
                    <span>{c.label}</span>
                    <span className="font-semibold">{c.percent}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-6 py-3 text-lg font-bold shadow">
            Seguidores totales: {stats.totalFollowers.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}
