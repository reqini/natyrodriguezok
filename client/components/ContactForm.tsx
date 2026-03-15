import { Mail, Phone, User, Building2, CheckCircle, X } from "lucide-react";
import { useState, useRef } from "react";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  queryType: "brand_collab" | "brand_budget" | "follower" | "general";
  budget?: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface SuccessState {
  show: boolean;
  name: string;
}

const QUERY_TYPES = [
  { value: "brand_collab", label: "Soy una marca y quiero colaborar" },
  { value: "brand_budget", label: "Soy una marca y quiero solicitar presupuesto" },
  { value: "follower", label: "Soy seguidor/a" },
  { value: "general", label: "Consulta general" },
];

const BUDGET_OPTIONS = [
  "$100 - $300 USD",
  "$300 - $700 USD",
  "$700 - $1,500 USD",
  "$1,500 - $3,000 USD",
  "$3,000 - $5,000 USD",
  "$5,000 - $10,000 USD",
  "$10,000 - $25,000 USD",
  "$25,000 - $50,000 USD",
  "$50,000+ USD",
  "Quiero ofertar otro monto",
  "Por consultar",
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    queryType: "brand_collab",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessState>({ show: false, name: "" });
  const formRef = useRef<HTMLFormElement>(null);

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
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Formspree endpoint (replace with your Formspree form ID)
      const FORMSPREE_URL = "https://formspree.io/f/xbjngwqg";
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(formRef.current!),
      });
      const data = await response.json();
      if (data.ok || data.success) {
        setSuccess({ show: true, name: formData.name });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          queryType: "brand_collab",
          budget: "",
          message: "",
        });
        setTimeout(() => setSuccess({ show: false, name: "" }), 8000);
      } else {
        alert("Error al enviar el mensaje. Intenta de nuevo.");
      }
    } catch (error) {
      alert("Error al enviar el mensaje. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
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
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="text-gradient">Trabajemos Juntos</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            ¿Sos una marca? ¿Querés una colaboración? Escribime tu propuesta y
            te contactaré lo antes posible.
          </p>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-beige-50 to-white rounded-2xl p-8 sm:p-12 shadow-xl border border-beige-100 animate-slide-up">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-coral-500" />
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre"
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all text-base ${
                  errors.name
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-beige-300 bg-white focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                }`}
                required
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-coral-500" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all text-base ${
                  errors.email
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-beige-300 bg-white focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-coral-500" />
                Teléfono (opcional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+54 9 11 2317-5048"
                className="w-full px-4 py-3 rounded-xl border-2 border-beige-300 bg-white focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-200 transition-all text-base"
              />
            </div>

            {/* Company Field */}
            <div>
              <label htmlFor="company" className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-coral-500" />
                Empresa / Marca (opcional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Nombre de tu empresa"
                className="w-full px-4 py-3 rounded-xl border-2 border-beige-300 bg-white focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-200 transition-all text-base"
              />
            </div>

            {/* Query Type */}
            <div>
              <label htmlFor="queryType" className="block text-sm font-bold text-slate-900 mb-3">
                ¿Qué te trae por aquí?
              </label>
              <select
                id="queryType"
                name="queryType"
                value={formData.queryType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-beige-300 bg-white focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-200 transition-all text-base"
                required
              >
                {QUERY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Field - shown only for brand budget queries */}
            {formData.queryType === "brand_budget" && (
              <div>
                <label htmlFor="budget" className="block text-sm font-bold text-slate-900 mb-3">
                  Presupuesto Estimado (opcional)
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-beige-300 bg-white focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-200 transition-all text-base"
                >
                  <option value="">Selecciona un rango</option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-3">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Cuéntame sobre tu propuesta, idea o consulta..."
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all resize-none text-base ${
                  errors.message
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-beige-300 bg-white focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                }`}
                required
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <span>⚠️</span> {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-coral-400 text-white font-bold rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-pink-300/50 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar Consulta"}
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              Tu información es confidencial y solo será usada para responder tu consulta.
            </p>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {success.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-slide-up">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-slate-900 mb-3">
              ¡Mensaje enviado!
            </h3>

            <p className="text-center text-slate-600 mb-6">
              Gracias por escribirme,{" "}
              <span className="font-semibold text-slate-900">{success.name}</span>.
              <br />
              Si sos una marca pronto voy a contactarte para explorar una posible
              colaboración.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="#reels"
                className="py-3 px-4 bg-gradient-to-r from-pink-500 to-coral-400 text-white font-bold rounded-xl text-center transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Ver mis Reels
              </a>
              <a
                href="https://instagram.com/natyy.rodriguezok"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 border-2 border-coral-400 text-coral-500 font-bold rounded-xl text-center transition-all hover:bg-coral-50"
              >
                Ir a Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
