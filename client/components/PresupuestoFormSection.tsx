import { useState } from "react";

export default function PresupuestoFormSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    tipoAccion: "",
    redSocial: "",
    presupuesto: "",
    alcance: "",
    mensaje: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // El formulario no se envía, solo redirige a WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `¡Hola! Me gustaría cotizar una campaña.%0A` +
      `Empresa: ${form.empresa}%0A` +
      `Nombre: ${form.nombre}%0A` +
      `Email: ${form.email}%0A` +
      `Teléfono: ${form.telefono}%0A` +
      `Tipo de acción: ${form.tipoAccion}%0A` +
      `Red social: ${form.redSocial}%0A` +
      `Presupuesto estimado: ${form.presupuesto}%0A` +
      `Alcance deseado: ${form.alcance}%0A` +
      `Mensaje: ${form.mensaje}`;
    window.open(`https://wa.me/5491123175048?text=${msg}`, "_blank");
  };

  return (
    <section className="py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gradient">
            Consulta presupuesto personalizado
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            ¿Querés una propuesta a medida para tu marca, evento o consulta personal? Completá el formulario y te responderé a la brevedad.
          </p>
        </div>
        <div className="bg-white/80 rounded-3xl shadow-2xl p-6 md:p-12 backdrop-blur-lg">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Empresa</label>
              <input
                type="text"
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                placeholder="Nombre de la empresa o marca"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                  placeholder="Ej: 11 2345-6789"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Tipo de acción</label>
                <select
                  name="tipoAccion"
                  value={form.tipoAccion}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                >
                  <option value="">Seleccioná una opción</option>
                  <option value="Campaña de influencers">Campaña de influencers</option>
                  <option value="Cobertura de evento">Cobertura de evento</option>
                  <option value="Contenido para redes">Contenido para redes</option>
                  <option value="Difusión de producto">Difusión de producto</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Red social</label>
                <select
                  name="redSocial"
                  value={form.redSocial}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                >
                  <option value="">Seleccioná una red</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Twitch">Twitch</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Presupuesto estimado</label>
                <select
                  name="presupuesto"
                  value={form.presupuesto}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                >
                  <option value="">Seleccioná un rango</option>
                  <option value="Menos de $100.000">Menos de $100.000</option>
                  <option value="$100.000 - $300.000">$100.000 - $300.000</option>
                  <option value="$300.000 - $1.000.000">$300.000 - $1.000.000</option>
                  <option value="Más de $1.000.000">Más de $1.000.000</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Alcance deseado</label>
                <select
                  name="alcance"
                  value={form.alcance}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                >
                  <option value="">Seleccioná un alcance</option>
                  <option value="Local">Local</option>
                  <option value="Regional">Regional</option>
                  <option value="Nacional">Nacional</option>
                  <option value="Internacional">Internacional</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Mensaje</label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                placeholder="Contanos tu idea, requerimientos o detalles extra..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-bold text-lg shadow-lg hover:from-green-600 hover:to-green-800 transition"
            >
              Cotizar por WhatsApp
            </button>
            <div className="text-xs text-slate-400 text-center pt-2">El formulario se enviará directo a WhatsApp</div>
          </form>
        </div>
      </div>
    </section>
  );
}
