import { ExternalLink, Users } from "lucide-react";

interface SocialNetwork {
  id: string;
  name: string;
  handle: string;
  followers: number;
  icon: string;
  url: string;
  color: string;
  bgColor: string;
  recentPosts: Array<{
    id: string;
    image: string;
    description: string;
  }>;
}

const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@[NombreIG]",
    followers: 320000,
    icon: "📷",
    url: "https://instagram.com",
    color: "from-pink-500 to-orange-400",
    bgColor: "bg-gradient-to-br from-pink-50 to-orange-50",
    recentPosts: [
      {
        id: "1",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=200&h=200&fit=crop",
        description: "Viaje a Bali",
      },
      {
        id: "2",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        description: "Sesión de fotos",
      },
      {
        id: "3",
        image: "https://images.unsplash.com/photo-1495867881649-86de58701004?w=200&h=200&fit=crop",
        description: "Evento VIP",
      },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@[NombreTik]",
    followers: 450000,
    icon: "🎵",
    url: "https://tiktok.com",
    color: "from-black to-slate-600",
    bgColor: "bg-gradient-to-br from-slate-50 to-gray-100",
    recentPosts: [
      {
        id: "1",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=200&fit=crop",
        description: "Challenge viral",
      },
      {
        id: "2",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
        description: "Trending sound",
      },
      {
        id: "3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        description: "Coreografía",
      },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "Canal Oficial",
    followers: 100000,
    icon: "🎥",
    url: "https://youtube.com",
    color: "from-red-500 to-red-700",
    bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
    recentPosts: [
      {
        id: "1",
        image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=200&h=200&fit=crop",
        description: "Documental",
      },
      {
        id: "2",
        image: "https://images.unsplash.com/photo-1497206365907-3ff1591cced9?w=200&h=200&fit=crop",
        description: "Tutorial",
      },
      {
        id: "3",
        image: "https://images.unsplash.com/photo-1535395891245-ab7cc9cebf35?w=200&h=200&fit=crop",
        description: "Vlog semanal",
      },
    ],
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
                className={`h-full ${social.bgColor} rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{social.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {social.name}
                      </h3>
                      <p className="text-slate-600 text-sm">{social.handle}</p>
                    </div>
                  </div>
                </div>

                {/* Followers */}
                <div className="flex items-center gap-2 mb-6 p-4 bg-white/50 rounded-xl">
                  <Users className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-xs text-slate-500">Seguidores</p>
                    <p className="text-lg font-bold text-slate-900">
                      {formatNumber(social.followers)}
                    </p>
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Publicaciones Recientes
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {social.recentPosts.map((post) => (
                      <div
                        key={post.id}
                        className="relative group/post overflow-hidden rounded-lg aspect-square bg-slate-200"
                      >
                        <img
                          src={post.image}
                          alt={post.description}
                          className="w-full h-full object-cover group-hover/post:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/post:bg-black/50 transition-all duration-300 flex items-end p-2">
                          <p className="text-white text-xs font-semibold opacity-0 group-hover/post:opacity-100 transition-opacity line-clamp-1">
                            {post.description}
                          </p>
                        </div>
                      </div>
                    ))}
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
