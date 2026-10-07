import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Film,
  Store,
  Share2,
  PieChart,
  Settings,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  LogOut,
  FileDown,
  ExternalLink,
  Loader2,
} from "lucide-react";
import {
  DEFAULT_REPO,
  RepoConfig,
  checkAccess,
  clearConfig,
  loadConfig,
  readJsonFile,
  saveConfig,
  triggerInstagramSync,
  writeJsonFile,
} from "@/lib/github";
import { MediaKitContent, PREVIEW_KEY } from "./MediaKit";

interface Reel {
  videoFile: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  shares: number;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface SocialNetwork {
  handle: string;
  url: string;
  followers: number;
  posts?: number;
  autoSync: boolean;
  lastSyncedAt: string | null;
}

interface Social {
  instagram: SocialNetwork;
  tiktok: SocialNetwork;
}

interface Segment {
  label: string;
  percent: number;
}

interface Audience {
  ageGroups: Segment[];
  gender: Segment[];
  countries: Segment[];
}

const FILES = {
  reels: "client/data/reels.json",
  brands: "client/data/brands.json",
  social: "client/data/social.json",
  audience: "client/data/audience.json",
  mediakit: "client/data/mediakit.json",
} as const;

type Section = keyof typeof FILES;

interface Loaded<T> {
  data: T;
  sha: string;
}

const TABS: { id: Section | "ajustes"; label: string; icon: typeof Film }[] = [
  { id: "reels", label: "Reels", icon: Film },
  { id: "brands", label: "Marcas", icon: Store },
  { id: "social", label: "Redes", icon: Share2 },
  { id: "audience", label: "Audiencia", icon: PieChart },
  { id: "mediakit", label: "Media kit", icon: FileDown },
  { id: "ajustes", label: "Ajustes", icon: Settings },
];

export default function Admin() {
  const [config, setConfig] = useState<RepoConfig | null>(null);
  const [tab, setTab] = useState<Section | "ajustes">("reels");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<Section | null>(null);

  const [reels, setReels] = useState<Loaded<Reel[]> | null>(null);
  const [brands, setBrands] = useState<Loaded<Brand[]> | null>(null);
  const [social, setSocial] = useState<Loaded<Social> | null>(null);
  const [audience, setAudience] = useState<Loaded<Audience> | null>(null);
  const [mediakit, setMediakit] = useState<Loaded<MediaKitContent> | null>(null);

  useEffect(() => {
    const stored = loadConfig();
    if (stored) setConfig(stored);

    document.title = "Panel de contenido";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!config) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const [r, b, s, a, mk] = await Promise.all([
          readJsonFile<Reel[]>(config, FILES.reels),
          readJsonFile<Brand[]>(config, FILES.brands),
          readJsonFile<Social>(config, FILES.social),
          readJsonFile<Audience>(config, FILES.audience),
          readJsonFile<MediaKitContent>(config, FILES.mediakit),
        ]);
        if (cancelled) return;
        setReels(r);
        setBrands(b);
        setSocial(s);
        setAudience(a);
        setMediakit(mk);
      } catch (error) {
        if (!cancelled) toast.error(`No pude leer el contenido: ${(error as Error).message}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [config]);

  async function publish(section: Section, content: unknown, sha: string, label: string) {
    if (!config) return;
    setSaving(section);
    try {
      const newSha = await writeJsonFile(
        config,
        FILES[section],
        content,
        `contenido: actualizar ${label} desde el panel`,
        sha,
      );
      const update = { data: content, sha: newSha };
      if (section === "reels") setReels(update as Loaded<Reel[]>);
      if (section === "brands") setBrands(update as Loaded<Brand[]>);
      if (section === "social") setSocial(update as Loaded<Social>);
      if (section === "audience") setAudience(update as Loaded<Audience>);
      if (section === "mediakit") setMediakit(update as Loaded<MediaKitContent>);
      toast.success(`${label} publicado. El sitio se actualiza en 2-3 minutos.`);
    } catch (error) {
      toast.error(`No se pudo publicar: ${(error as Error).message}`);
    } finally {
      setSaving(null);
    }
  }

  /* Abre el media kit con lo que está en pantalla, aunque no esté publicado. */
  function openMediaKit() {
    if (mediakit && social && audience && brands) {
      localStorage.setItem(
        PREVIEW_KEY,
        JSON.stringify({
          mediakit: mediakit.data,
          social: social.data,
          audience: audience.data,
          brands: brands.data,
        }),
      );
    }
    window.open("/media-kit?preview=1", "_blank", "noopener");
  }

  if (!config) return <SetupScreen onReady={setConfig} />;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Panel de contenido</h1>
            <p className="text-sm text-slate-500">natyrodriguez.online</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openMediaKit}
              className="px-3.5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-semibold flex items-center gap-1.5"
            >
              <FileDown className="w-4 h-4" /> Media kit PDF
            </button>
            <a
              href="/"
              className="text-sm text-slate-600 hover:text-pink-600 flex items-center gap-1.5"
            >
              Ver sitio <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                clearConfig();
                setConfig(null);
              }}
              className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1.5 pl-3 border-l border-slate-200"
            >
              Salir <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
                tab === id
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-500 py-20 justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
            Cargando el contenido publicado...
          </div>
        ) : (
          <>
            {tab === "reels" && reels && (
              <ReelsEditor
                reels={reels.data}
                saving={saving === "reels"}
                onChange={(data) => setReels({ ...reels, data })}
                onPublish={(data) => publish("reels", data, reels.sha, "los reels")}
              />
            )}
            {tab === "brands" && brands && (
              <BrandsEditor
                brands={brands.data}
                saving={saving === "brands"}
                onChange={(data) => setBrands({ ...brands, data })}
                onPublish={(data) => publish("brands", data, brands.sha, "las marcas")}
              />
            )}
            {tab === "social" && social && (
              <SocialEditor
                social={social.data}
                config={config}
                saving={saving === "social"}
                onChange={(data) => setSocial({ ...social, data })}
                onPublish={(data) => publish("social", data, social.sha, "las redes")}
              />
            )}
            {tab === "audience" && audience && (
              <AudienceEditor
                audience={audience.data}
                saving={saving === "audience"}
                onChange={(data) => setAudience({ ...audience, data })}
                onPublish={(data) => publish("audience", data, audience.sha, "la audiencia")}
              />
            )}
            {tab === "mediakit" && mediakit && (
              <MediaKitEditor
                mediakit={mediakit.data}
                saving={saving === "mediakit"}
                onChange={(data) => setMediakit({ ...mediakit, data })}
                onPublish={(data) => publish("mediakit", data, mediakit.sha, "el media kit")}
                onDownload={openMediaKit}
              />
            )}
            {tab === "ajustes" && <SettingsPanel config={config} />}
          </>
        )}
      </main>
    </div>
  );
}

function SetupScreen({ onReady }: { onReady: (config: RepoConfig) => void }) {
  const [token, setToken] = useState("");
  const [checking, setChecking] = useState(false);

  async function connect() {
    if (!token.trim()) return;
    setChecking(true);
    const config: RepoConfig = { ...DEFAULT_REPO, token: token.trim() };
    try {
      await checkAccess(config);
      saveConfig(config);
      onReady(config);
    } catch (error) {
      toast.error(`No pude conectar: ${(error as Error).message}`);
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Panel de contenido</h1>
        <p className="text-slate-600 text-sm mb-6">
          Pegá tu token de GitHub para poder editar y publicar el contenido del sitio.
          Queda guardado solo en este navegador.
        </p>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Token de acceso
        </label>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && connect()}
          placeholder="github_pat_..."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
        />

        <button
          onClick={connect}
          disabled={checking || !token.trim()}
          className="w-full mt-4 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {checking && <Loader2 className="w-4 h-4 animate-spin" />}
          Entrar
        </button>

        <details className="mt-6 text-sm text-slate-500">
          <summary className="cursor-pointer hover:text-slate-700">
            ¿Cómo consigo el token?
          </summary>
          <ol className="mt-3 space-y-1.5 list-decimal list-inside leading-relaxed">
            <li>
              Entrá a{" "}
              <a
                href="https://github.com/settings/personal-access-tokens/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline"
              >
                GitHub → tokens
              </a>
            </li>
            <li>
              En "Repository access" elegí solo el repo <code>natyrodriguezok</code>
            </li>
            <li>
              En permisos dale <strong>Contents: Read and write</strong> y{" "}
              <strong>Actions: Read and write</strong>
            </li>
            <li>Generá el token y pegalo acá arriba</li>
          </ol>
        </details>
      </div>
    </div>
  );
}

function PublishButton({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
    >
      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
      Guardar y publicar
    </button>
  );
}

function SectionHeader({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{hint}</p>
      </div>
      {children}
    </div>
  );
}

const field =
  "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent";

function ReelsEditor({
  reels,
  saving,
  onChange,
  onPublish,
}: {
  reels: Reel[];
  saving: boolean;
  onChange: (reels: Reel[]) => void;
  onPublish: (reels: Reel[]) => void;
}) {
  function update(index: number, patch: Partial<Reel>) {
    onChange(reels.map((reel, i) => (i === index ? { ...reel, ...patch } : reel)));
  }

  return (
    <div>
      <SectionHeader
        title="Reels"
        hint="Los videos se suben a client/videos/ desde la compu. Acá editás textos y números."
      >
        <PublishButton onClick={() => onPublish(reels)} saving={saving} />
      </SectionHeader>

      <div className="space-y-3">
        {reels.map((reel, index) => (
          <div
            key={reel.videoFile}
            className="bg-white rounded-xl border border-slate-200 p-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]"
          >
            <div className="md:col-span-2 flex items-center justify-between">
              <code className="text-xs text-slate-400">{reel.videoFile}</code>
              <button
                onClick={() => onChange(reels.filter((_, i) => i !== index))}
                className="text-slate-400 hover:text-red-500"
                title="Quitar del sitio"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <input
              value={reel.title}
              onChange={(e) => update(index, { title: e.target.value })}
              placeholder="Título"
              className={field}
            />
            <input
              value={reel.description}
              onChange={(e) => update(index, { description: e.target.value })}
              placeholder="Descripción"
              className={field}
            />

            <div className="md:col-span-3 grid grid-cols-3 gap-3">
              <NumberField
                label="Vistas"
                value={reel.views}
                onChange={(views) => update(index, { views })}
              />
              <NumberField
                label="Likes"
                value={reel.likes}
                onChange={(likes) => update(index, { likes })}
              />
              <NumberField
                label="Compartidos"
                value={reel.shares}
                onChange={(shares) => update(index, { shares })}
              />
            </div>
          </div>
        ))}
      </div>

      <AddRow
        label="Agregar reel"
        placeholder="video-22.mp4"
        onAdd={(videoFile) =>
          onChange([
            ...reels,
            { videoFile, title: "", description: "", views: 0, likes: 0, shares: 0 },
          ])
        }
      />
    </div>
  );
}

function BrandsEditor({
  brands,
  saving,
  onChange,
  onPublish,
}: {
  brands: Brand[];
  saving: boolean;
  onChange: (brands: Brand[]) => void;
  onPublish: (brands: Brand[]) => void;
}) {
  function update(index: number, patch: Partial<Brand>) {
    onChange(brands.map((brand, i) => (i === index ? { ...brand, ...patch } : brand)));
  }

  return (
    <div>
      <SectionHeader
        title="Marcas que confían en mí"
        hint="Si el logo todavía no está subido, igual se muestra el nombre de la marca."
      >
        <PublishButton onClick={() => onPublish(brands)} saving={saving} />
      </SectionHeader>

      <div className="space-y-3">
        {brands.map((brand, index) => (
          <div
            key={brand.id}
            className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-3 sm:items-center"
          >
            <div className="w-16 h-16 shrink-0 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden bg-slate-50">
              <img
                src={`${import.meta.env.BASE_URL}${brand.logo}`}
                alt=""
                className="max-w-full max-h-full object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <input
              value={brand.name}
              onChange={(e) => update(index, { name: e.target.value })}
              placeholder="Nombre"
              className={field}
            />
            <input
              value={brand.logo}
              onChange={(e) => update(index, { logo: e.target.value })}
              placeholder="images/marca-x.jpg"
              className={field}
            />
            <button
              onClick={() => onChange(brands.filter((_, i) => i !== index))}
              className="text-slate-400 hover:text-red-500 self-center"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <AddRow
        label="Agregar marca"
        placeholder="Nombre de la marca"
        onAdd={(name) =>
          onChange([
            ...brands,
            {
              id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
              name,
              logo: "",
            },
          ])
        }
      />
    </div>
  );
}

function SocialEditor({
  social,
  config,
  saving,
  onChange,
  onPublish,
}: {
  social: Social;
  config: RepoConfig;
  saving: boolean;
  onChange: (social: Social) => void;
  onPublish: (social: Social) => void;
}) {
  const [syncing, setSyncing] = useState(false);

  async function sync() {
    setSyncing(true);
    try {
      await triggerInstagramSync(config);
      toast.success("Pedido enviado. En un par de minutos se actualizan los números.");
    } catch (error) {
      toast.error(`No se pudo lanzar la sincronización: ${(error as Error).message}`);
    } finally {
      setSyncing(false);
    }
  }

  function update(network: keyof Social, patch: Partial<SocialNetwork>) {
    onChange({ ...social, [network]: { ...social[network], ...patch } });
  }

  return (
    <div>
      <SectionHeader
        title="Redes"
        hint="Instagram se actualiza solo todos los días. TikTok se carga a mano."
      >
        <PublishButton onClick={() => onPublish(social)} saving={saving} />
      </SectionHeader>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Instagram</h3>
            <button
              onClick={sync}
              disabled={syncing}
              className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
              Actualizar ahora
            </button>
          </div>

          <div className="space-y-3">
            <LabeledField label="Usuario">
              <input
                value={social.instagram.handle}
                onChange={(e) => update("instagram", { handle: e.target.value })}
                className={field}
              />
            </LabeledField>
            <NumberField
              label="Seguidores"
              value={social.instagram.followers}
              onChange={(followers) => update("instagram", { followers })}
            />
            <p className="text-xs text-slate-400">
              Última sincronización: {social.instagram.lastSyncedAt ?? "nunca"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">TikTok</h3>
          <div className="space-y-3">
            <LabeledField label="Usuario">
              <input
                value={social.tiktok.handle}
                onChange={(e) => update("tiktok", { handle: e.target.value })}
                className={field}
              />
            </LabeledField>
            <NumberField
              label="Seguidores"
              value={social.tiktok.followers}
              onChange={(followers) => update("tiktok", { followers })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceEditor({
  audience,
  saving,
  onChange,
  onPublish,
}: {
  audience: Audience;
  saving: boolean;
  onChange: (audience: Audience) => void;
  onPublish: (audience: Audience) => void;
}) {
  const groups: { key: keyof Audience; title: string }[] = [
    { key: "ageGroups", title: "Edad" },
    { key: "gender", title: "Género" },
    { key: "countries", title: "Países" },
  ];

  function update(key: keyof Audience, index: number, patch: Partial<Segment>) {
    onChange({
      ...audience,
      [key]: audience[key].map((item, i) => (i === index ? { ...item, ...patch } : item)),
    });
  }

  return (
    <div>
      <SectionHeader
        title="¿Quiénes me siguen?"
        hint="Los porcentajes los sacás de las estadísticas de Instagram."
      >
        <PublishButton onClick={() => onPublish(audience)} saving={saving} />
      </SectionHeader>

      <div className="grid gap-4 md:grid-cols-3">
        {groups.map(({ key, title }) => (
          <div key={key} className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
            <div className="space-y-3">
              {audience[key].map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={item.label}
                    onChange={(e) => update(key, index, { label: e.target.value })}
                    className={field}
                  />
                  <div className="relative w-24 shrink-0">
                    <input
                      type="number"
                      value={item.percent}
                      onChange={(e) =>
                        update(key, index, { percent: Number(e.target.value) || 0 })
                      }
                      className={`${field} pr-7`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                      %
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      onChange({
                        ...audience,
                        [key]: audience[key].filter((_, i) => i !== index),
                      })
                    }
                    className="text-slate-400 hover:text-red-500 px-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  onChange({ ...audience, [key]: [...audience[key], { label: "", percent: 0 }] })
                }
                className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel({ config }: { config: RepoConfig }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Ajustes</h2>
        <p className="text-sm text-slate-500">
          Cada vez que publicás, se guarda un cambio en el repositorio y el sitio se
          reconstruye solo. Tarda entre 2 y 3 minutos en verse.
        </p>
      </div>

      <dl className="text-sm space-y-2">
        <div className="flex justify-between py-2 border-b border-slate-100">
          <dt className="text-slate-500">Repositorio</dt>
          <dd className="font-medium text-slate-800">
            {config.owner}/{config.repo}
          </dd>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-100">
          <dt className="text-slate-500">Rama</dt>
          <dd className="font-medium text-slate-800">{config.branch}</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-slate-500">Token</dt>
          <dd className="font-medium text-slate-800">
            ···{config.token.slice(-4)} (solo en este navegador)
          </dd>
        </div>
      </dl>

      <a
        href={`https://github.com/${config.owner}/${config.repo}/actions`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-pink-600 hover:underline flex items-center gap-1.5"
      >
        Ver el estado de las publicaciones <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function LabeledField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <LabeledField label={label}>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className={field}
      />
    </LabeledField>
  );
}

function AddRow({
  label,
  placeholder,
  onAdd,
}: {
  label: string;
  placeholder: string;
  onAdd: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  function add() {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  }

  return (
    <div className="mt-4 flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && add()}
        placeholder={placeholder}
        className={`${field} max-w-xs`}
      />
      <button
        onClick={add}
        className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
      >
        <Plus className="w-4 h-4" />
        {label}
      </button>
    </div>
  );
}

function MediaKitEditor({
  mediakit,
  saving,
  onChange,
  onPublish,
  onDownload,
}: {
  mediakit: MediaKitContent;
  saving: boolean;
  onChange: (mediakit: MediaKitContent) => void;
  onPublish: (mediakit: MediaKitContent) => void;
  onDownload: () => void;
}) {
  type RateGroup = "reels" | "stories";

  function set<K extends keyof MediaKitContent>(key: K, value: MediaKitContent[K]) {
    onChange({ ...mediakit, [key]: value });
  }

  function setMetric(key: keyof MediaKitContent["metrics"], value: number | string) {
    set("metrics", { ...mediakit.metrics, [key]: value });
  }

  function setRates(group: RateGroup, items: MediaKitContent["rates"]["reels"]) {
    set("rates", { ...mediakit.rates, [group]: items });
  }

  const rateGroups: { key: RateGroup; title: string }[] = [
    { key: "reels", title: "Reels" },
    { key: "stories", title: "Historias" },
  ];

  const metricFields: { key: keyof MediaKitContent["metrics"]; label: string }[] = [
    { key: "views", label: "Visualizaciones" },
    { key: "reach", label: "Cuentas alcanzadas" },
    { key: "interactions", label: "Interacciones" },
    { key: "accountsEngaged", label: "Cuentas que interactuaron" },
    { key: "nonFollowerViewsPercent", label: "% vistas de no seguidores" },
    { key: "topReelViews", label: "Vistas del reel top" },
  ];

  return (
    <div>
      <SectionHeader
        title="Media kit"
        hint="Lo que mandás a las marcas. Seguidores, audiencia y marcas salen de las otras pestañas."
      >
        <div className="flex gap-2">
          <button
            onClick={onDownload}
            className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-white flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" /> Ver y descargar PDF
          </button>
          <PublishButton onClick={() => onPublish(mediakit)} saving={saving} />
        </div>
      </SectionHeader>

      <div className="grid gap-4 lg:grid-cols-2">
        {rateGroups.map(({ key, title }) => (
          <div key={key} className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Tarifas · {title}</h3>
            <div className="space-y-2">
              {mediakit.rates[key].map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={item.label}
                    onChange={(e) =>
                      setRates(
                        key,
                        mediakit.rates[key].map((r, i) =>
                          i === index ? { ...r, label: e.target.value } : r,
                        ),
                      )
                    }
                    className={field}
                  />
                  <div className="relative w-36 shrink-0">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        setRates(
                          key,
                          mediakit.rates[key].map((r, i) =>
                            i === index ? { ...r, price: Number(e.target.value) || 0 } : r,
                          ),
                        )
                      }
                      className={`${field} pl-7`}
                    />
                  </div>
                  <button
                    onClick={() => setRates(key, mediakit.rates[key].filter((_, i) => i !== index))}
                    className="text-slate-400 hover:text-red-500 px-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setRates(key, [...mediakit.rates[key], { label: "", price: 0 }])}
                className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1.5 pt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar
              </button>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-2">
          <LabeledField label="Notas del tarifario (una por línea)">
            <textarea
              rows={2}
              value={mediakit.rates.notes.join("\n")}
              onChange={(e) =>
                set("rates", {
                  ...mediakit.rates,
                  notes: e.target.value.split("\n").filter((line) => line.trim()),
                })
              }
              className={field}
            />
          </LabeledField>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-2 space-y-3">
          <h3 className="font-semibold text-slate-900">Presentación</h3>
          <LabeledField label="Rol">
            <input value={mediakit.role} onChange={(e) => set("role", e.target.value)} className={field} />
          </LabeledField>
          <LabeledField label="Frase principal">
            <input
              value={mediakit.headline}
              onChange={(e) => set("headline", e.target.value)}
              className={field}
            />
          </LabeledField>
          <LabeledField label="Intro">
            <textarea
              rows={3}
              value={mediakit.intro}
              onChange={(e) => set("intro", e.target.value)}
              className={field}
            />
          </LabeledField>
          <LabeledField label="Temas (separados por coma)">
            <input
              value={mediakit.pillars.join(", ")}
              onChange={(e) =>
                set(
                  "pillars",
                  e.target.value.split(",").map((p) => p.trim()).filter(Boolean),
                )
              }
              className={field}
            />
          </LabeledField>
          <div className="grid gap-3 md:grid-cols-3 pt-2">
            {mediakit.about.map((block, index) => (
              <div key={index} className="space-y-2">
                <input
                  value={block.title}
                  onChange={(e) =>
                    set(
                      "about",
                      mediakit.about.map((b, i) => (i === index ? { ...b, title: e.target.value } : b)),
                    )
                  }
                  className={`${field} font-semibold`}
                />
                <textarea
                  rows={5}
                  value={block.text}
                  onChange={(e) =>
                    set(
                      "about",
                      mediakit.about.map((b, i) => (i === index ? { ...b, text: e.target.value } : b)),
                    )
                  }
                  className={field}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-2">
          <h3 className="font-semibold text-slate-900 mb-1">Métricas del mes</h3>
          <p className="text-xs text-slate-500 mb-4">
            Copialas de Instagram → Panel profesional → Estadísticas (últimos 30 días).
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metricFields.map(({ key, label }) => (
              <NumberField
                key={key}
                label={label}
                value={mediakit.metrics[key] as number}
                onChange={(value) => setMetric(key, value)}
              />
            ))}
            <LabeledField label="Fecha de los datos">
              <input
                type="date"
                value={mediakit.metrics.updatedAt}
                onChange={(e) => setMetric("updatedAt", e.target.value)}
                className={field}
              />
            </LabeledField>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-2 grid gap-3 md:grid-cols-2">
          <LabeledField label="Email de contacto">
            <input
              value={mediakit.contact.email}
              onChange={(e) => set("contact", { ...mediakit.contact, email: e.target.value })}
              className={field}
            />
          </LabeledField>
          <LabeledField label="Sitio web">
            <input
              value={mediakit.contact.website}
              onChange={(e) => set("contact", { ...mediakit.contact, website: e.target.value })}
              className={field}
            />
          </LabeledField>
        </div>
      </div>
    </div>
  );
}
