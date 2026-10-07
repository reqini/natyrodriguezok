import { useEffect, useState } from "react";
import { Download, ArrowLeft, Instagram, Mail, Globe, Music2 } from "lucide-react";
import mediakitData from "@/data/mediakit.json";
import socialData from "@/data/social.json";
import audienceData from "@/data/audience.json";
import brandsData from "@/data/brands.json";

export type MediaKitContent = typeof mediakitData;

export interface MediaKitBundle {
  mediakit: MediaKitContent;
  social: typeof socialData;
  audience: typeof audienceData;
  brands: typeof brandsData;
}

export const PREVIEW_KEY = "naty-mediakit-preview";

const PAGE_WIDTH = 794; // A4 a 96dpi
const PAGE_HEIGHT = 1123;
const base = import.meta.env.BASE_URL;

const compact = (n: number) => {
  if (n >= 1_000_000) return `${(Math.floor(n / 100_000) / 10).toFixed(1).replace(".", ",")}M`;
  if (n >= 1000) return `${Math.floor(n / 1000)}K`;
  return String(n);
};

const money = (n: number) => `$${new Intl.NumberFormat("es-AR").format(n)}`;

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

/* Si el panel abrió esta página con ?preview=1, usamos los datos que dejó
   en el navegador (incluye cambios sin publicar). Si no, los publicados. */
function loadBundle(): MediaKitBundle {
  const published = {
    mediakit: mediakitData,
    social: socialData,
    audience: audienceData,
    brands: brandsData,
  };
  if (!new URLSearchParams(window.location.search).has("preview")) return published;
  try {
    const raw = localStorage.getItem(PREVIEW_KEY);
    return raw ? { ...published, ...JSON.parse(raw) } : published;
  } catch {
    return published;
  }
}

function useFitScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min(1, (window.innerWidth - 32) / PAGE_WIDTH));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export default function MediaKit() {
  const [bundle] = useState(loadBundle);
  const scale = useFitScale();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Media Kit - Naty Rodriguez";

    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&display=swap";
    document.head.appendChild(font);

    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);

    return () => {
      document.title = previousTitle;
      font.remove();
      robots.remove();
    };
  }, []);

  async function download() {
    await document.fonts.ready;
    window.print();
  }

  return (
    <div className="min-h-screen bg-[#e9e4ea] py-8 print:p-0 print:bg-white">
      <style>{PRINT_CSS}</style>

      <div className="no-print max-w-[794px] mx-auto px-4 mb-6 flex items-center justify-between gap-3">
        <a
          href="/admin"
          className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Panel
        </a>
        <button
          onClick={download}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-semibold shadow-lg hover:scale-105 transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Descargar PDF
        </button>
      </div>
      <p className="no-print text-center text-xs text-slate-500 mb-6 px-4">
        En la ventana de impresión elegí <strong>"Guardar como PDF"</strong> y activá{" "}
        <strong>"Gráficos de fondo"</strong>.
      </p>

      <div
        className="mk-fit mx-auto"
        style={{ width: PAGE_WIDTH * scale, height: (PAGE_HEIGHT * 2 + 32) * scale }}
      >
        <div
          className="mk-scale"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: PAGE_WIDTH }}
        >
          <CoverPage bundle={bundle} />
          <div className="h-8 print:hidden" />
          <RatesPage bundle={bundle} />
        </div>
      </div>
    </div>
  );
}

function Page({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <section
      className={`mk-page relative overflow-hidden shadow-2xl ${className}`}
      style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
    >
      {children}
    </section>
  );
}

function CoverPage({ bundle }: { bundle: MediaKitBundle }) {
  const { mediakit, social, audience } = bundle;
  const m = mediakit.metrics;
  const engagement = ((m.accountsEngaged / m.reach) * 100).toFixed(1).replace(".", ",");
  const women = audience.gender.find((g) => g.label.toLowerCase().startsWith("mujer"));

  const stats = [
    { value: compact(social.instagram.followers), label: "Seguidores en Instagram" },
    { value: compact(m.views), label: "Visualizaciones al mes" },
    { value: compact(m.reach), label: "Cuentas alcanzadas al mes" },
    { value: `${engagement}%`, label: "Engagement" },
  ];

  return (
    <Page className="bg-[#1c0f1e] text-white mk-sans">
      <Glow className="-top-64 -right-56 w-[760px] h-[760px]" color="236,72,153" alpha={0.38} />
      <Glow className="top-[300px] -left-72 w-[640px] h-[640px]" color="251,146,60" alpha={0.22} />
      <Glow className="-bottom-72 -right-24 w-[620px] h-[620px]" color="192,38,211" alpha={0.24} />

      <div className="relative h-full flex flex-col px-14 pt-14 pb-10">
        <div className="flex gap-10">
          <div className="flex-1 pt-2">
            <p className="text-[11px] tracking-[0.25em] uppercase text-pink-300 font-semibold">
              Media kit · {new Date().getFullYear()}
            </p>
            <h1 className="mk-display mt-5 text-[92px] leading-[0.88] font-bold tracking-tight">
              <span className="block">Naty</span>
              <GradientText className="block italic">Rodriguez</GradientText>
            </h1>
            <p className="mt-5 text-[12px] tracking-[0.12em] uppercase text-white/60">
              {mediakit.role}
            </p>
            <p className="mk-display italic text-[30px] leading-tight mt-6 text-white">
              {mediakit.headline}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/75 max-w-[330px]">
              {mediakit.intro}
            </p>
          </div>

          <div className="relative w-[262px] shrink-0">
            <div className="rounded-[32px] p-[3px] bg-gradient-to-br from-pink-400 via-orange-300 to-fuchsia-500 rotate-[3deg]">
              <img
                src={`${base}images/foto-familiar-2.jpeg`}
                alt="Naty Rodriguez"
                className="w-full h-[340px] object-cover object-top rounded-[29px]"
              />
            </div>
            <div className="absolute -bottom-6 -left-14 w-[128px] rotate-[-7deg] bg-white p-[6px] pb-7 rounded-md shadow-2xl">
              <img
                src={`${base}images/foto-familiar-5.jpeg`}
                alt=""
                className="w-full h-[138px] object-cover rounded-sm"
              />
              <p className="mk-display italic text-[13px] text-[#1c0f1e] text-center mt-1.5">
                mamá x2
              </p>
            </div>
            <div className="absolute -top-4 -right-3 w-[78px] h-[78px] rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex flex-col items-center justify-center rotate-[12deg] shadow-xl">
              <span className="mk-display text-[22px] font-bold leading-none">
                {compact(social.instagram.followers)}
              </span>
              <span className="text-[8px] uppercase tracking-wider mt-0.5">en IG</span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-2">
          {mediakit.pillars.map((p) => (
            <span
              key={p}
              className="px-3 py-1 rounded-full border border-white/20 bg-white/[0.06] text-[11px] text-white/85"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="mt-9 grid grid-cols-4 rounded-3xl border border-white/10 bg-white/[0.05]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 py-6 ${i > 0 ? "border-l border-white/10" : ""}`}
            >
              <p className="mk-display text-[46px] leading-none font-bold">
                <GradientText>{s.value}</GradientText>
              </p>
              <p className="mt-2.5 text-[10px] uppercase tracking-[0.14em] text-white/60 leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-[12px]">
          <Highlight value={compact(m.interactions)} text="interacciones en el último mes" />
          <Highlight
            value={`${String(m.nonFollowerViewsPercent).replace(".", ",")}%`}
            text="de las vistas llegan a gente que todavía no me sigue"
          />
          <Highlight value={compact(m.topReelViews)} text="vistas en mi reel más visto del mes" />
        </div>

        <div className="mt-auto pt-6">
          <p className="text-[11px] tracking-[0.25em] uppercase text-pink-300 font-semibold mb-5">
            Mi comunidad
          </p>
          <div className="grid grid-cols-[150px_1fr_1fr] gap-8 items-start">
            <div>
              <p className="mk-display text-[64px] leading-none font-bold">
                {women?.percent ?? 0}
                <span className="text-[34px] text-pink-300">%</span>
              </p>
              <p className="mt-2 text-[12px] text-white/70 leading-snug">
                mujeres, en su mayoría mamás
              </p>
            </div>
            <Bars title="Edad" items={audience.ageGroups} />
            <Bars title="Países" items={audience.countries} />
          </div>
          <p className="mt-7 text-[9px] text-white/40">
            Datos de Instagram · {mediakit.metrics.periodLabel.toLowerCase()} al{" "}
            {formatDate(mediakit.metrics.updatedAt)}
          </p>
        </div>
      </div>
    </Page>
  );
}

const GRADIENT_FROM = [244, 114, 182]; // pink-400
const GRADIENT_TO = [251, 146, 60]; // orange-400

/* Degradé letra por letra. Con background-clip: text, Chrome deja líneas
   finas en los bordes de la caja al exportar a PDF; así no. */
function GradientText({ children, className = "" }: { children: string; className?: string }) {
  const chars = Array.from(children);
  const steps = Math.max(chars.length - 1, 1);
  return (
    <span className={className}>
      {chars.map((char, i) => {
        const t = i / steps;
        const [r, g, b] = GRADIENT_FROM.map((from, k) =>
          Math.round(from + (GRADIENT_TO[k] - from) * t),
        );
        return (
          <span key={i} style={{ color: `rgb(${r},${g},${b})` }}>
            {char}
          </span>
        );
      })}
    </span>
  );
}

/* Brillo de fondo con degradé radial: los filtros blur hacen que Chrome
   rasterice capas al imprimir y deja líneas finas alrededor del texto. */
function Glow({ className, color, alpha }: { className: string; color: string; alpha: number }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ background: `radial-gradient(circle, rgba(${color},${alpha}) 0%, rgba(${color},0) 65%)` }}
    />
  );
}

function Highlight({ value, text }: { value: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 flex items-center gap-3">
      <span className="mk-display text-[24px] font-bold text-orange-300 shrink-0">{value}</span>
      <span className="text-white/70 leading-snug">{text}</span>
    </div>
  );
}

function Bars({ title, items }: { title: string; items: { label: string; percent: number }[] }) {
  const max = Math.max(...items.map((i) => i.percent), 1);
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/50 mb-3">{title}</p>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-[12px]">
            <span className="w-[74px] text-white/80 shrink-0">{item.label}</span>
            <div className="flex-1 h-[7px] rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400"
                style={{ width: `${(item.percent / max) * 100}%` }}
              />
            </div>
            <span className="w-[34px] text-right font-semibold shrink-0">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RatesPage({ bundle }: { bundle: MediaKitBundle }) {
  const { mediakit, social, brands } = bundle;
  const { rates, contact } = mediakit;

  return (
    <Page className="bg-[#fbf5f1] text-[#1c0f1e] mk-sans">

      <div className="relative h-full flex flex-col px-14 pt-14 pb-0">
        <h2 className="mk-display text-[52px] leading-none font-bold">
          Sobre <GradientText className="italic">mí</GradientText>
        </h2>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {mediakit.about.map((block, i) => (
            <div key={block.title} className="rounded-3xl bg-white p-5 shadow-sm border border-[#f0e4e8]">
              <p className="mk-display text-[34px] leading-none font-bold text-pink-500/30">
                0{i + 1}
              </p>
              <p className="mt-2 text-[15px] font-bold">{block.title}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-[#1c0f1e]/70">{block.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-pink-600 mb-3">
            Marcas que confiaron en mí
          </p>
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {brands.map((b) => (
              <span
                key={b.id}
                className="px-3 py-1.5 rounded-full bg-white border border-[#efdfe5] text-[11.5px] font-medium"
              >
                {b.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-9 flex items-end justify-between">
          <h2 className="mk-display text-[52px] leading-none font-bold">
            Mi <GradientText className="italic">tarifario</GradientText>
          </h2>
          <p className="text-[11px] text-[#1c0f1e]/50 pb-1">Valores en {rates.currency}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <RateCard
            title="Reels"
            items={rates.reels}
            className="bg-[#1c0f1e] text-white"
            accent="text-pink-300"
          />
          <RateCard
            title="Historias"
            items={rates.stories}
            className="bg-gradient-to-br from-pink-500 via-pink-500 to-orange-400 text-white"
            accent="text-white/80"
          />
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[11.5px] text-[#1c0f1e]/70">
          {rates.notes.map((note) => (
            <li key={note} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-auto -mx-14 bg-[#1c0f1e] text-white px-14 py-8">
          <div className="flex items-center justify-between gap-6">
            <p className="mk-display text-[34px] leading-tight font-bold">
              Trabajemos <GradientText className="italic">juntos</GradientText>
            </p>
            <div className="grid grid-cols-2 gap-x-7 gap-y-2.5 text-[12px] text-white/85">
              <Contact icon={<Instagram className="w-3.5 h-3.5" />} text={social.instagram.handle} />
              <Contact icon={<Music2 className="w-3.5 h-3.5" />} text={social.tiktok.handle} />
              <Contact icon={<Mail className="w-3.5 h-3.5" />} text={contact.email} />
              <Contact icon={<Globe className="w-3.5 h-3.5" />} text={contact.website} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

function RateCard({
  title,
  items,
  className,
  accent,
}: {
  title: string;
  items: { label: string; price: number }[];
  className: string;
  accent: string;
}) {
  return (
    <div className={`rounded-3xl p-6 shadow-xl ${className}`}>
      <p className={`text-[11px] uppercase tracking-[0.22em] font-semibold ${accent}`}>{title}</p>
      <div className="mt-4 divide-y divide-white/15">
        {items.map((item) => (
          <div key={item.label} className="flex items-baseline justify-between gap-3 py-3">
            <span className="text-[13px] text-white/85">{item.label}</span>
            <span className="mk-display text-[28px] font-bold leading-none whitespace-nowrap">
              {money(item.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center shrink-0">
        {icon}
      </span>
      {text}
    </span>
  );
}

const PRINT_CSS = `
  .mk-sans { font-family: Inter, system-ui, sans-serif; }
  .mk-display { font-family: Fraunces, Georgia, serif; font-optical-sizing: auto; }
  .mk-page :where(p, span, h1, h2) { overflow-wrap: normal; word-break: normal; }
  .mk-page { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

  @page { size: A4; margin: 0; }
  @media print {
    html, body { margin: 0; background: #fff; }
    .no-print { display: none !important; }
    .mk-fit { width: auto !important; height: auto !important; }
    .mk-scale { transform: none !important; }
    .mk-page { box-shadow: none !important; break-after: page; }
    .mk-page:last-child { break-after: auto; }
    [data-sonner-toaster], .fixed { display: none !important; }
  }
`;
