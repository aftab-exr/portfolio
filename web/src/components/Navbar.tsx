"use client";

import { MessageSquare, Smartphone, Terminal } from "lucide-react";

interface NavbarProps {
  name: string;
  apkUrl: string | null;
  onOpenChat: () => void;
}

export function Navbar({ name, apkUrl, onOpenChat }: NavbarProps) {
  return (
    <header className="sticky top-0 z-[100] border-b border-[#E4E4E7] bg-white/95 backdrop-blur-xs">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <a
          href="#"
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-[#0D0D0F] uppercase"
        >
          <Terminal className="h-4 w-4 text-[#2557D6]" strokeWidth={2.25} />
          <span>{name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#52525B] md:flex">
          <a href="#work" className="transition-colors duration-200 hover:text-[#0D0D0F]">
            Selected Work
          </a>
          <a href="#about" className="transition-colors duration-200 hover:text-[#0D0D0F]">
            About & Goals
          </a>
          <a href="#mobile" className="transition-colors duration-200 hover:text-[#0D0D0F]">
            Android App
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenChat}
            className="inline-flex items-center gap-2 rounded-[8px] border-[1.5px] border-[#D4D4D8] bg-white px-3.5 py-2 text-sm font-medium text-[#0D0D0F] transition-colors duration-200 hover:bg-[#F4F4F5] active:translate-y-[-1px]"
          >
            <MessageSquare className="h-4 w-4 text-[#2557D6]" />
            <span>Ask AI</span>
          </button>

          {apkUrl && (
            <a
              href={apkUrl}
              download
              className="hidden items-center gap-2 rounded-[8px] bg-[#2557D6] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1E47B0] active:translate-y-[-1px] sm:inline-flex"
            >
              <Smartphone className="h-4 w-4" />
              <span>Get APK</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
