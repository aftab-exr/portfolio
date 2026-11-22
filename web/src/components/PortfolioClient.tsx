"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Download,
  FileText,
  FolderGit2,
  Github,
  Layers,
  MapPin,
  MessageSquare,
  Smartphone,
  Target,
} from "lucide-react";
import { formatBytes, resolveAssetUrl } from "@/lib/api";
import { AssetStatus, Profile, Project } from "@/lib/types";
import { ChatDrawer } from "./ChatDrawer";
import { Navbar } from "./Navbar";

interface PortfolioClientProps {
  profile: Profile;
  projects: Project[];
  assets: AssetStatus[];
}

export function PortfolioClient({ profile, projects, assets }: PortfolioClientProps) {
  const [chatOpen, setChatOpen] = useState(false);

  const apkAsset = assets.find((a) => a.asset_type === "apk" && a.available);
  const resumeAsset = assets.find((a) => a.asset_type === "resume" && a.available);

  const apkDownloadUrl = apkAsset ? resolveAssetUrl(apkAsset.download_url) : null;
  const resumeDownloadUrl = resumeAsset ? resolveAssetUrl(resumeAsset.download_url) : null;

  return (
    <div className="min-h-[100dvh] bg-white text-[#0D0D0F]">
      <Navbar name={profile.full_name} apkUrl={apkDownloadUrl} onOpenChat={() => setChatOpen(true)} />

      <main>
        <section className="mx-auto max-w-[1280px] px-6 pt-16 pb-20 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="animate-entry lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-[8px] border border-[#E4E4E7] bg-[#F7F7F8] px-3 py-1.5 font-mono-tech text-xs font-medium text-[#0D0D0F]">
                <MapPin className="h-3.5 w-3.5 text-[#2557D6]" />
                <span>{profile.location}</span>
                <span className="text-[#A1A1AA]">/</span>
                <span>{profile.role_title}</span>
              </div>

              <h1 className="text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] font-black tracking-[-0.04em] text-[#0D0D0F]">
                SYSTEMS BUILT FOR PRODUCTION.
              </h1>

              <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-[#52525B] md:text-lg">
                {profile.bio}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                {apkDownloadUrl ? (
                  <a
                    href={apkDownloadUrl}
                    download
                    className="inline-flex items-center gap-2.5 rounded-[8px] bg-[#2557D6] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1E47B0] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] active:translate-y-[-1px]"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Android App (.apk)</span>
                    {apkAsset?.version_label && (
                      <span className="rounded bg-white/15 px-1.5 py-0.5 font-mono-tech text-xs">
                        {apkAsset.version_label}
                      </span>
                    )}
                  </a>
                ) : (
                  <a
                    href="#mobile"
                    className="inline-flex items-center gap-2.5 rounded-[8px] bg-[#0D0D0F] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#27272A]"
                  >
                    <Smartphone className="h-4 w-4 text-[#2557D6]" />
                    <span>Android App Release Pending</span>
                  </a>
                )}

                {resumeDownloadUrl ? (
                  <a
                    href={resumeDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[8px] border-[1.5px] border-[#0D0D0F] bg-white px-5 py-3.5 text-sm font-semibold text-[#0D0D0F] transition-colors duration-200 hover:bg-[#F4F4F5] active:translate-y-[-1px]"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Resume PDF</span>
                    {resumeAsset?.file_size_bytes && (
                      <span className="font-mono-tech text-xs text-[#52525B]">
                        ({formatBytes(resumeAsset.file_size_bytes)})
                      </span>
                    )}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setChatOpen(true)}
                    className="inline-flex items-center gap-2 rounded-[8px] border-[1.5px] border-[#D4D4D8] bg-white px-5 py-3.5 text-sm font-semibold text-[#0D0D0F] transition-colors duration-200 hover:bg-[#F4F4F5]"
                  >
                    <MessageSquare className="h-4 w-4 text-[#2557D6]" />
                    <span>Query AI Assistant</span>
                  </button>
                )}
              </div>
            </div>

            <div id="mobile" className="lg:col-span-5">
              <div className="rounded-[8px] border border-[#E4E4E7] bg-[#0D0D0F] p-8 text-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <span className="font-mono-tech text-xs tracking-wider text-white/70 uppercase">
                    NATIVE CLIENT // ANDROID
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-white">
                    <span className="h-2 w-2 rounded-full bg-[#2557D6]" />
                    {apkAsset ? "LIVE BUILD" : "STANDBY"}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-bold tracking-tight">
                  Direct Pocket Access. Zero Marketing Bloat.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Install the standalone Android package to browse shipped projects, inspect source
                  repositories, download the latest resume, and chat with the portfolio AI directly
                  from your device.
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 font-mono-tech text-xs">
                  <div>
                    <dt className="text-white/50 uppercase">BUILD ARTIFACT</dt>
                    <dd className="mt-1 font-medium text-white">
                      {apkAsset?.original_filename || "portfolio-release.apk"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/50 uppercase">PACKAGE SIZE</dt>
                    <dd className="mt-1 font-medium text-white">
                      {apkAsset ? formatBytes(apkAsset.file_size_bytes) : "Awaiting Upload"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/50 uppercase">SHIPPED PROJECTS</dt>
                    <dd className="mt-1 font-medium text-white">{projects.length} Indexed</dd>
                  </div>
                  <div>
                    <dt className="text-white/50 uppercase">AI CONCIERGE</dt>
                    <dd className="mt-1 font-medium text-white">Gemini Grounded</dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {apkDownloadUrl && (
                    <a
                      href={apkDownloadUrl}
                      download
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#2557D6] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E47B0]"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download .APK</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setChatOpen(true)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-[8px] border border-white/25 bg-transparent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Open AI Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="border-t border-[#E4E4E7] py-20 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="flex flex-col justify-between gap-4 border-b border-[#E4E4E7] pb-8 md:flex-row md:items-end">
              <div>
                <p className="font-mono-tech text-xs font-medium tracking-widest text-[#2557D6] uppercase">
                  01 // INDEX
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0D0D0F] md:text-4xl">
                  Selected Engineering Work
                </h2>
              </div>
              <p className="font-mono-tech text-xs text-[#52525B]">
                Synced live from mobile CMS & GitHub repositories
              </p>
            </div>

            {projects.length === 0 ? (
              <div className="mt-16 flex flex-col items-center justify-center rounded-[8px] border border-[#E4E4E7] bg-[#F7F7F8] px-6 py-20 text-center">
                <FolderGit2 className="h-10 w-10 text-[#0D0D0F]" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-bold text-[#0D0D0F]">No Projects Published Yet</h3>
                <p className="mt-2 max-w-md text-sm text-[#52525B]">
                  Upload your first project screenshot and GitHub repository link from the mobile
                  app to populate this index automatically.
                </p>
              </div>
            ) : (
              <div className="mt-16 space-y-24 md:space-y-32">
                {projects.map((project, index) => {
                  const isReversed = index % 2 === 1;
                  const screenshotSrc = resolveAssetUrl(project.screenshot_url);

                  return (
                    <article
                      key={project.id}
                      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
                    >
                      <div
                        className={`lg:col-span-7 ${
                          isReversed ? "lg:order-2" : "lg:order-1"
                        }`}
                      >
                        <div className="overflow-hidden rounded-[8px] border border-[#E4E4E7] bg-[#F7F7F8] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                          <div className="flex items-center justify-between border-b border-[#E4E4E7] bg-white px-4 py-2.5">
                            <span className="font-mono-tech text-xs text-[#52525B]">
                              0{index + 1} // {project.title}
                            </span>
                            {project.featured && (
                              <span className="rounded bg-[#2557D6]/10 px-2 py-0.5 font-mono-tech text-[11px] font-medium text-[#2557D6]">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <img
                            src={screenshotSrc}
                            alt={`${project.title} interface preview`}
                            className="aspect-[16/10] w-full object-cover object-top"
                          />
                        </div>
                      </div>

                      <div
                        className={`lg:col-span-5 ${
                          isReversed ? "lg:order-1" : "lg:order-2"
                        }`}
                      >
                        <span className="font-mono-tech text-xs font-medium text-[#2557D6]">
                          PROJECT 0{index + 1}
                        </span>
                        <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#0D0D0F] md:text-3xl">
                          {project.title}
                        </h3>
                        {project.tagline && (
                          <p className="mt-2 text-sm font-medium text-[#0D0D0F]">
                            {project.tagline}
                          </p>
                        )}
                        <p className="mt-4 text-base leading-relaxed text-[#52525B]">
                          {project.description}
                        </p>

                        {project.highlights && project.highlights.length > 0 && (
                          <ul className="mt-5 space-y-2 border-t border-[#E4E4E7] pt-4">
                            {project.highlights.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-sm text-[#0D0D0F]"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2557D6]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {project.tech_stack && project.tech_stack.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-2">
                            {project.tech_stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-[8px] border border-[#E4E4E7] bg-[#F7F7F8] px-2.5 py-1 font-mono-tech text-xs text-[#0D0D0F]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-[8px] bg-[#0D0D0F] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#27272A]"
                          >
                            <Github className="h-4 w-4" />
                            <span>Source Code</span>
                          </a>

                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-[8px] border-[1.5px] border-[#D4D4D8] bg-white px-4 py-2.5 text-sm font-semibold text-[#0D0D0F] transition-colors hover:bg-[#F4F4F5]"
                            >
                              <span>Live Deployment</span>
                              <ArrowUpRight className="h-4 w-4 text-[#2557D6]" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section id="about" className="border-t border-[#E4E4E7] bg-[#F7F7F8] py-20 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="font-mono-tech text-xs font-medium tracking-widest text-[#2557D6] uppercase">
                  02 // DIRECTION
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0D0D0F] md:text-4xl">
                  Architecture, Stack & Future Roadmap
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#52525B]">
                  Need deeper context on implementation decisions, availability, or past systems?
                  Launch the grounded AI assistant or download the latest resume PDF.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setChatOpen(true)}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-[#2557D6] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E47B0]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Ask About My Goals</span>
                  </button>

                  {resumeDownloadUrl && (
                    <a
                      href={resumeDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-[8px] border-[1.5px] border-[#0D0D0F] bg-white px-5 py-3 text-sm font-semibold text-[#0D0D0F] transition-colors hover:bg-[#E4E4E7]/50"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Download Resume</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-6 lg:col-span-7">
                <div className="rounded-[8px] border border-[#E4E4E7] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2.5 text-sm font-bold text-[#0D0D0F]">
                    <Target className="h-4 w-4 text-[#2557D6]" />
                    <span>Future Engineering Goals</span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-[#52525B]">
                    {profile.future_goals}
                  </p>
                </div>

                <div className="rounded-[8px] border border-[#E4E4E7] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2.5 text-sm font-bold text-[#0D0D0F]">
                    <Layers className="h-4 w-4 text-[#2557D6]" />
                    <span>Core Technical Stack</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-[8px] border border-[#E4E4E7] bg-[#F7F7F8] px-3 py-1.5 font-mono-tech text-xs font-medium text-[#0D0D0F]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E4E4E7] bg-white py-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[#52525B]">
            <Code2 className="h-4 w-4 text-[#0D0D0F]" />
            <span>
              {profile.full_name} — {profile.role_title}
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-[#52525B]">
            {profile.github_username && (
              <a
                href={`https://github.com/${profile.github_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#0D0D0F]"
              >
                GitHub
              </a>
            )}
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#0D0D0F]"
              >
                LinkedIn
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors hover:text-[#0D0D0F]"
              >
                Email
              </a>
            )}
          </div>
        </div>
      </footer>

      <ChatDrawer
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        engineerName={profile.full_name}
      />
    </div>
  );
}
