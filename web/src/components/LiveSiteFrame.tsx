"use client";

import React from "react";

interface LiveSiteFrameProps {
  title?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export default function LiveSiteFrame({
  title = "AAFTAB // LIVE DEPLOYMENT",
  liveUrl = "https://lumora-ten-psi.vercel.app",
  githubUrl = "https://github.com/aftab-exr",
}: LiveSiteFrameProps) {
  return (
    <section className="w-full max-w-5xl mx-auto my-12 border border-neutral-800 bg-neutral-950 text-neutral-100 rounded-lg overflow-hidden shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-neutral-800 bg-neutral-900/80">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs tracking-wider uppercase text-neutral-300">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-100 rounded transition"
          >
            GitHub (@aftab-exr)
          </a>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium bg-white text-black hover:bg-neutral-200 rounded transition"
          >
            Open Full Site ↗
          </a>
        </div>
      </div>

      <div className="relative w-full h-[620px] bg-white">
        <iframe
          src={liveUrl}
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </section>
  );
}
