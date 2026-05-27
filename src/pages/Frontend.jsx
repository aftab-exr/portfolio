import React from 'react';
import GlassCard from '../components/GlassCard';
import { Layout, Smartphone, Code2, Zap } from 'lucide-react';

const Frontend = () => {
  return (
    <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <section className="text-center mb-20 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white flex items-center justify-center gap-4">
          <Layout size={48} className="text-gray-300" /> Frontend Development
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          I build fast, responsive, and accessible web applications. Focusing on intuitive user
          interfaces and a seamless user experience, I bring wireframes to life.
        </p>
      </section>

      <section className="mb-24 animate-fade-in-up animation-delay-300">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">Technical Arsenal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <Code2 className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">Modern Frameworks</h3>
            <p className="text-sm text-gray-400">
              Extensive experience building SPAs with React.js, utilizing Hooks, Context, and state
              management.
            </p>
          </GlassCard>

          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <Layout className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">Styling & UI</h3>
            <p className="text-sm text-gray-400">
              Crafting pixel-perfect designs using Tailwind CSS, CSS Modules, Styled Components, and
              Framer Motion.
            </p>
          </GlassCard>

          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <Smartphone className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">Responsive Design</h3>
            <p className="text-sm text-gray-400">
              Ensuring fluid layouts that work flawlessly across desktop, tablet, and mobile devices
              natively.
            </p>
          </GlassCard>

          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <Zap className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">Performance Optimization</h3>
            <p className="text-sm text-gray-400">
              Implementing lazy loading, code splitting, and asset optimization for instantaneous
              load times.
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="animate-fade-in-up animation-delay-600">
        <h2 className="text-3xl font-bold mb-8 text-white border-b border-white/10 pb-4">
          Selected Web Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <GlassCard className="flex flex-col overflow-hidden">
            <a
              href="https://task-cmd.vercel.app/"
              target="_blank"
              rel="nooperner noreferrer"
              className="h-56 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group"
            >
              <img
                src="/Screenshots/Project-F1.png"
                alt="Task CMD Engineering Workspace"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-lg">View Live Demo →</span>
              </div>
            </a>
            <h3 className="text-2xl font-bold text-gray-200 mb-2">Task CMD</h3>
            <p className="text-sm text-gray-400 mb-2">
              Engineering Workspace - AI-Powered Task Management
            </p>
            <p className="text-gray-400 mb-6 flex-grow">
              An intelligent IT task management workspace built around a three-lane Kanban board
              for Pending, In Progress, and Done. Features AI-assisted task creation, smart priority
              suggestions, and automated workflow recommendations. Built with React, Tailwind CSS,
              and modern drag-and-drop functionality.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                React
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Kanban Board
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Drag & Drop
              </span>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Frontend;
