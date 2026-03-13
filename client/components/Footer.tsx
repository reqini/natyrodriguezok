import { MessageCircle, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

interface FooterProps {
  onScrollTop: () => void;
}

export default function Footer({ onScrollTop }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-gradient">[Nombre]</span>
            </h3>
            <p className="text-gray-300">
              Creadora de contenido apasionada por conectar con mi audiencia a
              través de reels, historias y momentos auténticos.
            </p>
            <div className="flex gap-4 pt-4">
              {[
                { name: "Instagram", url: "https://instagram.com" },
                { name: "TikTok", url: "https://tiktok.com" },
                { name: "YouTube", url: "https://youtube.com" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-coral-400 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-300">
              {[
                { label: "Ver Reels", href: "#reels" },
                { label: "Mi Historia", href: "#timeline" },
                { label: "Métricas", href: "#metrics" },
                { label: "Contacto", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-coral-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              {[
                { label: "Política de Privacidad", href: "#privacy" },
                { label: "Términos de Servicio", href: "#terms" },
                { label: "Aviso Legal", href: "#legal" },
                { label: "Cookies", href: "#cookies" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-coral-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} [Nombre]. Todos los derechos
            reservados.
          </p>
          <p>Hecho con ❤️ para conectar con mi comunidad</p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 hover:-translate-y-2 animate-bounce"
        title="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={onScrollTop}
          className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-pink-500 to-coral-400 text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 hover:-translate-y-2 animate-fade-in"
          title="Volver al inicio"
        >
          <ChevronUp className="w-7 h-7" />
        </button>
      )}
    </footer>
  );
}
