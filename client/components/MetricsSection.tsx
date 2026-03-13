import { TrendingUp, Users, Eye, Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface Metric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
}

const METRICS: Metric[] = [
  {
    id: "reach",
    label: "Alcance Mensual",
    value: 1200000,
    suffix: "",
    icon: <Eye className="w-8 h-8" />,
    color: "from-pink-400 to-pink-600",
  },
  {
    id: "engagement",
    label: "Engagement Promedio",
    value: 8.5,
    suffix: "%",
    icon: <Heart className="w-8 h-8" />,
    color: "from-coral-400 to-coral-600",
  },
  {
    id: "followers",
    label: "Seguidores Instagram",
    value: 320000,
    suffix: "",
    icon: <Users className="w-8 h-8" />,
    color: "from-orange-400 to-orange-600",
  },
  {
    id: "views",
    label: "Visualizaciones Promedio",
    value: 450000,
    suffix: "",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "from-rose-400 to-rose-600",
  },
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix, duration = 2 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const currentValue = Math.floor(value * progress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <span>
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="text-gradient">Mis Métricas</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Números que demuestran el impacto de mi contenido educativo sobre nutrición y bienestar
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {METRICS.map((metric, index) => (
            <div
              key={metric.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`relative group bg-gradient-to-br ${metric.color} p-1 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
              >
                {/* Gradient border effect */}
                <div className="relative bg-white rounded-2xl p-8 space-y-6">
                  {/* Icon background */}
                  <div className="flex justify-between items-start">
                    <div
                      className={`bg-gradient-to-br ${metric.color} p-3 rounded-xl text-white shadow-lg`}
                    >
                      {metric.icon}
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>

                  {/* Label */}
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-2">
                      {metric.label}
                    </p>
                    {/* Animated counter */}
                    <p className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                      <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className={`h-1 bg-gradient-to-r ${metric.color} rounded-full transform origin-left transition-all duration-300 group-hover:scale-x-125`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
          {/* Growth Chart placeholder */}
          <div className="bg-gradient-to-br from-beige-50 to-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Crecimiento Anual
            </h3>
            <div className="space-y-4">
              {[
                { label: "2021", value: 45 },
                { label: "2022", value: 72 },
                { label: "2023", value: 88 },
                { label: "2024", value: 96 },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="text-slate-600">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-coral-400 h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Stats */}
          <div className="bg-gradient-to-br from-beige-50 to-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Datos Clave
            </h3>
            <div className="space-y-4">
              {[
                { label: "Tasa de Crecimiento Mensual", value: "12.5%" },
                { label: "Público Primario", value: "18-34 años" },
                { label: "Mejor Hora de Publicación", value: "7-9 PM" },
                { label: "Dispositivo Principal", value: "Mobile (94%)" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center p-3 bg-white rounded-lg border border-beige-200 hover:border-coral-300 transition-colors"
                >
                  <span className="text-slate-700 font-medium">{item.label}</span>
                  <span className="text-coral-500 font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
