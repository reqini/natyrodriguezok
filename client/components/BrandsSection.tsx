import { Users, BarChart2, Globe2 } from "lucide-react";

export default function AudienceStatsSection() {
  const stats = {
    totalFollowers: 122500,
    ageGroups: [
      { label: "18-24", percent: 38 },
      { label: "25-34", percent: 34 },
      { label: "35-44", percent: 12 },
      { label: "45+", percent: 16 },
    ],
    gender: [
      { label: "Mujeres", percent: 55 },
      { label: "Hombres", percent: 45 },
    ],
    countries: [
      { label: "Argentina", percent: 85 },
      { label: "Uruguay", percent: 6 },
      { label: "Paraguay", percent: 4 },
      { label: "España", percent: 5 }
    ],
  };

  const cards = [
    {
      title: "Edad",
      icon: <BarChart2 className="w-6 h-6 text-pink-500" />,
      color: "from-pink-500 to-fuchsia-500",
      data: stats.ageGroups,
    },
    {
      title: "Género",
      icon: <Users className="w-6 h-6 text-purple-500" />,
      color: "from-purple-500 to-indigo-500",
      data: stats.gender,
    },
    {
      title: "Países",
      icon: <Globe2 className="w-6 h-6 text-blue-500" />,
      color: "from-blue-500 to-cyan-500",
      data: stats.countries,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            ¿Quiénes me siguen?
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base">
            Comunidad real, activa y segmentada
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
              {/* Header card */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shadow">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {card.title}
                </h3>
              </div>

              {/* Bars */}
              <div className="space-y-4">
                {card.data.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 font-medium">
                        {item.label}
                      </span>
                      <span className="text-slate-800 font-semibold">
                        {item.percent}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${card.color} rounded-full transition-all duration-700`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-12 text-center">
          <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-6 py-3 text-lg font-semibold shadow">
            Seguidores: {stats.totalFollowers.toLocaleString()}k
          </span>
        </div>
      </div>
    </section>
  );
}
