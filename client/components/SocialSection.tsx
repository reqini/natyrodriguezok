import { ExternalLink, Users, Instagram, MessageCircle, Youtube } from "lucide-react";

interface SocialNetwork {
  id: string;
  name: string;
  handle: string;
  followers: number;
  icon: React.ReactNode;
  url: string;
  color: string;
  bgColor: string;
}

const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@nataliarodriguez.fit",
    followers: 320000,
    icon: <Instagram className="w-8 h-8" />,
    url: "https://instagram.com/nataliarodriguez.fit",
    color: "from-pink-500 to-orange-400",
    bgColor: "bg-gradient-to-br from-pink-50 to-orange-50",
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@natalia.fit",
    followers: 450000,
    icon: <MessageCircle className="w-8 h-8" />,
    url: "https://tiktok.com/@natalia.fit",
    color: "from-black to-slate-600",
    bgColor: "bg-gradient-to-br from-slate-50 to-gray-100",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "Natalia Fitness",
    followers: 100000,
    icon: <Youtube className="w-8 h-8" />,
    url: "https://youtube.com/@nataliafitness",
    color: "from-red-500 to-red-700",
    bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
};

export default function SocialSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="text-gradient">Mis Redes</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Sígueme en todas mis plataformas para no perderte ningún contenido
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOCIAL_NETWORKS.map((social, index) => (
            <div
              key={social.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className={`h-full ${social.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br ${social.color} text-white rounded-xl`}>
                      {social.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {social.name}
                      </h3>
                      <p className="text-slate-600 text-sm">{social.handle}</p>
                    </div>
                  </div>
                </div>

                {/* Followers */}
                <div className="flex items-center gap-2 mb-8 p-4 bg-white/50 rounded-xl">
                  <Users className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-xs text-slate-500">Seguidores</p>
                    <p className="text-lg font-bold text-slate-900">
                      {formatNumber(social.followers)}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full block text-center py-3 px-4 bg-gradient-to-r ${social.color} text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg group-hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2`}
                >
                  <span>Seguir Ahora</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in">
          <p className="text-lg text-slate-600 mb-6">
            ¿Todavía no me sigues? ¡Únete a mi comunidad de{" "}
            <span className="text-gradient font-bold">+1M de seguidores</span>!
          </p>
        </div>
      </div>
    </section>
  );
}
