import { Mail, Instagram, Phone, User, Building2, CheckCircle, X } from "lucide-react";
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
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Columna 1: Foto */}
        <div className="flex justify-center w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src="/natyrodriguezok/images/foto-familiar-6.jpeg"
            alt="Natalia Rodriguez contacto"
            className="rounded-3xl shadow-2xl w-full max-w-xs md:max-w-sm object-cover border-4 border-white"
            loading="lazy"
          />
        </div>
        {/* Columna 2: Bloque de contacto */}
        <div className="w-full md:w-1/2">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Contacto directo</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto md:mx-0">
              Por el momento el formulario está deshabilitado.<br />
              Podés contactarme por cualquiera de estos medios:
            </p>
          </div>
          <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto md:mx-0">
            {/* Instagram */}
            <a href="https://instagram.com/natyy.rodriguezok" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-coral-50 rounded-2xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition group">
              <Instagram className="w-12 h-12 mb-2 text-coral-500 group-hover:scale-110 group-hover:text-pink-600 transition" />
              <span className="font-bold text-lg text-coral-500">Instagram</span>
              <span className="text-slate-600">@natyy.rodriguezok</span>
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/5491123175048" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition group">
              <Phone className="w-12 h-12 mb-2 text-green-600 group-hover:scale-110 group-hover:text-green-700 transition" />
              <span className="font-bold text-lg text-green-600">WhatsApp</span>
              <span className="text-slate-600">+54 9 11 2317-5048</span>
            </a>
            {/* TikTok */}
            <a href="https://www.tiktok.com/@natyy.rodriguezok" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center bg-gradient-to-br from-black to-slate-800 rounded-2xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition group">
              <User className="w-12 h-12 mb-2 text-white group-hover:scale-110 group-hover:text-pink-400 transition" />
              <span className="font-bold text-lg text-white">TikTok</span>
              <span className="text-slate-300">@natyy.rodriguezok</span>
            </a>
            {/* Email */}
            <a href="mailto:essen.nutricion@gmail.com" className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition group">
              <Mail className="w-12 h-12 mb-2 text-blue-600 group-hover:scale-110 group-hover:text-blue-800 transition" />
              <span className="font-bold text-lg text-blue-600">Email</span>
              <span className="text-slate-600">essen.nutricion@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
