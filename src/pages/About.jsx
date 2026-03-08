import React from 'react';
import GlassCard from '../components/GlassCard';
import { User, GraduationCap, Briefcase, MapPin, Mail, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <section className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-[var(--text-primary)]">
          About <span className="text-gradient">Me</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
          A passionate developer and data analyst dedicated to crafting elegant solutions and
          extracting meaningful insights.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info Card */}
        <div className="lg:col-span-1">
          <GlassCard className="h-full flex flex-col items-center text-center p-8">
            <div className="w-32 h-32 rounded-full mb-6 bg-[var(--glass-bg)] border-4 border-[var(--glass-border)] flex items-center justify-center overflow-hidden shadow-lg relative">
              {/* Placeholder for an actual profile image, using a stylized icon for now */}
              <User size={64} className="text-[var(--text-secondary)] opacity-50 absolute" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
            </div>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Aaftab</h2>
            <h3 className="text-md font-medium text-blue-400 mb-6 uppercase tracking-wider">
              Frontend Dev & Data Analyst
            </h3>

            <div className="w-full space-y-4 text-left">
              <div className="flex items-center gap-3 text-[var(--text-secondary)] pb-4 border-b border-[var(--glass-border)]">
                <MapPin size={18} className="text-purple-400" />
                <span>Based in India</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-secondary)] pb-4 border-b border-[var(--glass-border)]">
                <Mail size={18} className="text-emerald-400" />
                <span>Available for freelance</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <Sparkles size={18} className="text-yellow-400" />
                <span>Open to full-time roles</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Biography & Journey */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <User className="text-blue-400" /> Who I Am
            </h3>
            <div className="space-y-4 text-[var(--text-primary)] opacity-90 leading-relaxed">
              <p>
                Hello! I'm Aaftab, a hybrid professional blending the logical rigor of data analysis
                with the creative possibilities of frontend development. I specialize in
                transforming raw, unstructured data into compelling visual stories and building
                intuitive web interfaces that people love to use.
              </p>
              <p>
                My journey started with a fascination for numbers and patterns, which naturally
                evolved into programming. Today, I leverage libraries like React and Tailwind CSS to
                build the surface of applications, and Python, SQL, and Pandas to engineer their
                data-driven cores.
              </p>
              <p>
                When I'm not coding or analyzing datasets, you'll likely find me exploring the
                latest advancements in Artificial Intelligence or actively participating in
                competitive programming on LeetCode.
              </p>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="p-6 border-l-4 border-l-purple-500">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <GraduationCap className="text-purple-400" /> Education
              </h3>
              <div className="relative pl-6 border-l border-[var(--glass-border)] space-y-6">
                <div className="relative">
                  <span className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-[var(--bg-color)]"></span>
                  <h4 className="font-bold text-[var(--text-primary)]">Bachelor in Computer Application</h4>
                  <p className="text-sm text-purple-400 mb-1">Software Engineering</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Focused on software engineering, data structures, and algorithms.
                  </p>
                </div>
                {/* Add more education nodes here if needed */}
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-l-4 border-l-blue-500">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Briefcase className="text-blue-400" /> Experience
              </h3>
              <div className="relative pl-6 border-l border-[var(--glass-border)] space-y-6">
                <div className="relative">
                  <span className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[var(--bg-color)]"></span>
                  <h4 className="font-bold text-[var(--text-primary)]">Freelance Developer</h4>
                  <p className="text-sm text-blue-400 mb-1">Present</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Building responsive React applications and delivering data analysis reports for
                    clients.
                  </p>
                </div>
                {/* Add more experience nodes here if needed */}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Background decoration elements */}
      <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 left-1/4 w-80 h-80 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse delay-1000 -z-10 pointer-events-none"></div>
    </div>
  );
};

export default About;
