const API = "https://api.github.com";

export interface RepoConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export const DEFAULT_REPO = { owner: "reqini", repo: "natyrodriguezok", branch: "main" };

const STORAGE_KEY = "naty-admin-config";

export function loadConfig(): RepoConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveConfig(config: RepoConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function clearConfig() {
  localStorage.removeItem(STORAGE_KEY);
}

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function decodeBase64(base64: string): string {
  const binary = atob(base64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function request(config: RepoConfig, url: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `GitHub respondió ${res.status}`);
  }

  return res.status === 204 ? null : res.json();
}

export async function checkAccess(config: RepoConfig): Promise<void> {
  await request(config, `${API}/repos/${config.owner}/${config.repo}`);
}

/** Lee un archivo del repo. Devuelve el contenido parseado y su sha. */
export async function readJsonFile<T>(
  config: RepoConfig,
  filePath: string,
): Promise<{ data: T; sha: string }> {
  const data = await request(
    config,
    `${API}/repos/${config.owner}/${config.repo}/contents/${filePath}?ref=${config.branch}`,
  );
  return { data: JSON.parse(decodeBase64(data.content)), sha: data.sha };
}

/** Commitea un archivo JSON al repo. El push dispara el deploy automático. */
export async function writeJsonFile(
  config: RepoConfig,
  filePath: string,
  content: unknown,
  message: string,
  sha: string,
): Promise<string> {
  const result = await request(
    config,
    `${API}/repos/${config.owner}/${config.repo}/contents/${filePath}`,
    {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: encodeBase64(JSON.stringify(content, null, 2) + "\n"),
        sha,
        branch: config.branch,
      }),
    },
  );
  return result.content.sha;
}

/** Dispara el workflow que trae los números actualizados de Instagram. */
export async function triggerInstagramSync(config: RepoConfig): Promise<void> {
  await request(
    config,
    `${API}/repos/${config.owner}/${config.repo}/actions/workflows/sync-instagram.yml/dispatches`,
    {
      method: "POST",
      body: JSON.stringify({ ref: config.branch }),
    },
  );
}
