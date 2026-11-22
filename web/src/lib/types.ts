export interface Project {
  id: number;
  title: string;
  tagline: string | null;
  description: string;
  github_url: string;
  live_url: string | null;
  screenshot_url: string;
  tech_stack: string[];
  highlights: string[];
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  full_name: string;
  role_title: string;
  location: string;
  bio: string;
  future_goals: string;
  skills: string[];
  github_username: string | null;
  linkedin_url: string | null;
  email: string | null;
  updated_at: string;
}

export interface AssetStatus {
  asset_type: "resume" | "apk";
  available: boolean;
  original_filename: string | null;
  file_size_bytes: number | null;
  version_label: string | null;
  download_url: string | null;
  updated_at: string | null;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  referenced_projects: string[];
  suggested_questions: string[];
}
