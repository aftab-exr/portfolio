import { AssetStatus, ChatResponse, ChatTurn, Profile, Project } from "./types";

const PUBLIC_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const SERVER_API = process.env.INTERNAL_API_URL || PUBLIC_API;

export function getPublicApiBase(): string {
  return PUBLIC_API.replace(/\/$/, "");
}

export function resolveAssetUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${getPublicApiBase()}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function formatBytes(bytes: number | null | undefined): string {
  if (!bytes || bytes <= 0) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export async function fetchPortfolioSnapshot(): Promise<{
  profile: Profile;
  projects: Project[];
  assets: AssetStatus[];
}> {
  const base = SERVER_API.replace(/\/$/, "");

  const [profileRes, projectsRes, assetsRes] = await Promise.all([
    fetch(`${base}/api/profile`, { cache: "no-store" }).catch(() => null),
    fetch(`${base}/api/projects`, { cache: "no-store" }).catch(() => null),
    fetch(`${base}/api/assets/status`, { cache: "no-store" }).catch(() => null),
  ]);

  const fallbackProfile: Profile = {
    full_name: "Aaftab",
    role_title: "Full-Stack & AI Systems Engineer",
    location: "New Delhi, India",
    bio: "Building deterministic full-stack web applications, mobile platforms, and AI-integrated developer tools.",
    future_goals: "Architecting autonomous developer workflows, production-grade AI agents, and cross-platform software products.",
    skills: ["Python", "FastAPI", "TypeScript", "Next.js", "React Native", "PostgreSQL", "Docker", "Gemini API"],
    github_username: "aftab-exr",
    linkedin_url: null,
    email: null,
    updated_at: new Date().toISOString(),
  };

  const profile: Profile =
    profileRes && profileRes.ok ? await profileRes.json() : fallbackProfile;
  const projects: Project[] =
    projectsRes && projectsRes.ok ? await projectsRes.json() : [];
  const assets: AssetStatus[] =
    assetsRes && assetsRes.ok ? await assetsRes.json() : [];

  return { profile, projects, assets };
}

export async function sendPortfolioChat(
  message: string,
  history: ChatTurn[]
): Promise<ChatResponse> {
  const res = await fetch(`${getPublicApiBase()}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Unable to reach AI assistant.");
  }

  return res.json();
}
