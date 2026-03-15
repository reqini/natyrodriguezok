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
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              ¿Quiénes me siguen?
            </span>
          </h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">
            Un vistazo real a mi comunidad en Instagram y TikTok. <br />
            Datos actualizados manualmente.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-pink-500">Edad</h3>
            <ul className="space-y-1">
              {stats.ageGroups.map((g) => (
                <li key={g.label} className="text-slate-700">
                  {g.label}: <span className="font-semibold">{g.percent}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 text-purple-500">Género</h3>
            <ul className="space-y-1">
              {stats.gender.map((g) => (
                <li key={g.label} className="text-slate-700">
                  {g.label}: <span className="font-semibold">{g.percent}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 text-blue-500">Países</h3>
            <ul className="space-y-1">
              {stats.countries.map((c) => (
                <li key={c.label} className="text-slate-700">
                  {c.label}: <span className="font-semibold">{c.percent}%</span>
                </li>
              ))}
            </ul>
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
