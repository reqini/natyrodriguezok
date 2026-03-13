import { MessageCircle, Mail, Calendar } from "lucide-react";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  queryType: "collaboration" | "press" | "brand";
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    queryType: "collaboration",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Here you would normally send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        queryType: "collaboration",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="text-gradient">Trabajemos Juntos</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            ¿Querés trabajar conmigo o conocer más sobre mis proyectos?
            Escribime y te responderé lo antes posible
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Quick Contact Methods */}
          <div className="animate-slide-up space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">
              Contacto Rápido
            </h3>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/541123175048"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="p-4 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-xl group-hover:shadow-lg transition-all">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">WhatsApp</h4>
                <p className="text-sm text-slate-600">+54 9 11 2317-5048</p>
              </div>
              <div className="ml-auto text-2xl group-hover:translate-x-2 transition-transform">
                →
              </div>
            </a>

            {/* Email Button */}
            <a
              href="mailto:essen.nutricion@gmail.com"
              className="group flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="p-4 bg-gradient-to-br from-blue-400 to-indigo-600 text-white rounded-xl group-hover:shadow-lg transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Email</h4>
                <p className="text-sm text-slate-600">essen.nutricion@gmail.com</p>
              </div>
              <div className="ml-auto text-2xl group-hover:translate-x-2 transition-transform">
                →
              </div>
            </a>

            {/* Calendar Button */}
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="p-4 bg-gradient-to-br from-purple-400 to-pink-600 text-white rounded-xl group-hover:shadow-lg transition-all">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Agendar</h4>
                <p className="text-sm text-slate-600">Reserva una llamada</p>
              </div>
              <div className="ml-auto text-2xl group-hover:translate-x-2 transition-transform">
                →
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-left">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-beige-50 to-white rounded-2xl p-8 shadow-xl"
            >
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-xl animate-slide-up">
                  <p className="text-green-700 font-semibold">
                    ¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.
                  </p>
                </div>
              )}

              {/* Name Field */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${
                    errors.name
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-beige-300 bg-white focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${
                    errors.email
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-beige-300 bg-white focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-2">{errors.email}</p>
                )}
              </div>

              {/* Query Type */}
              <div className="mb-6">
                <label htmlFor="queryType" className="block text-sm font-bold text-slate-900 mb-2">
                  Tipo de Consulta
                </label>
                <select
                  id="queryType"
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-beige-300 bg-white focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-200 transition-all"
                >
                  <option value="collaboration">Colaboración</option>
                  <option value="press">Prensa</option>
                  <option value="brand">Marca</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Cuéntame tu propuesta o pregunta..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all resize-none ${
                    errors.message
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-beige-300 bg-white focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-600 text-sm mt-2">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-coral-400 text-white font-bold rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-pink-300/50 hover:-translate-y-1 active:scale-95"
              >
                Enviar Mensaje
              </button>

              <p className="text-xs text-slate-500 mt-4 text-center">
                Respetamos tu privacidad. Tus datos están seguros con nosotros.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
