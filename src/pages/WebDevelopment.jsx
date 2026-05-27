import React from 'react';
import GlassCard from '../components/GlassCard';
import { Layout, Database, Code2, Server, Zap } from 'lucide-react';

const WebDevelopment = () => {
  return (
    <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <section className="text-center mb-20 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white flex items-center justify-center gap-4">
          <Layout size={48} className="text-gray-300" /> Web Development
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          I build end-to-end MERN applications with AI-enhanced features. From React user
          interfaces to Express APIs, MongoDB databases, and lightweight AI automation,
          I deliver full-stack solutions that scale.
        </p>
      </section>

      <section className="mb-24 animate-fade-in-up animation-delay-300">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">Full-Stack Arsenal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <Code2 className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">MERN Architecture</h3>
            <p className="text-sm text-gray-400">
              Building scalable React frontends with Node.js and Express backends, backed by
              MongoDB for fast, flexible data storage.
            </p>
          </GlassCard>

          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <Server className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">API & Cloud Integration</h3>
            <p className="text-sm text-gray-400">
              Designing RESTful APIs, integrating third-party services, and deploying apps to
              cloud environments for real-world production readiness.
            </p>
          </GlassCard>

          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <Database className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">Data & Database Design</h3>
            <p className="text-sm text-gray-400">
              Modeling resilient MongoDB schemas, optimizing queries, and structuring data for
              fast app performance across devices.
            </p>
          </GlassCard>

          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <Zap className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">AI-Enabled Workflows</h3>
            <p className="text-sm text-gray-400">
              Adding AI-powered features like smart suggestions, task automation, and contextual
              workflow enhancements to improve user productivity.
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
              Full-Stack MERN Project with AI-assisted task workflows
            </p>
            <p className="text-gray-400 mb-6 flex-grow">
              A complete web application featuring a React frontend, Express API backend, and
              MongoDB data layer. Includes AI-powered task prioritization, smart workflow
              recommendations, and a three-lane Kanban board for streamlined team delivery.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                React
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Node.js
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Express
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                MongoDB
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                AI Integration
              </span>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;
