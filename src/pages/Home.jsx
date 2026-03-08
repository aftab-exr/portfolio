import React from 'react';
import GlassCard from '../components/GlassCard';
import {
  Terminal,
  Database,
  Palette,
  Layout,
  Server,
  LineChart,
  Brain,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Hero Section */}
      <section className="text-center mb-20 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
          Hi, I'm <span className="text-gradient">Aaftab</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          I bridge the gap between complex data and beautiful, intuitive user experiences.
          <br className="hidden md:block" />
          <span className="font-semibold text-gray-200">Data Analyst</span> &{' '}
          <span className="font-semibold text-gray-200">Frontend Web Developer</span>.
        </p>
      </section>

      {/* Skills Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
        {/* Frontend Skills */}
        <GlassCard className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Layout size={100} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
            <Palette /> Frontend Development
          </h2>
          <p className="text-gray-400 mb-6 relative z-10 text-sm">
            Crafting pixel-perfect, responsive web interfaces with a strong focus on UI/UX and
            performance.
          </p>
          <div className="flex flex-wrap gap-2 relative z-10">
            {['React', 'JavaScript', 'Tailwind', 'HTML/CSS'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 border border-white/10 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Data Analyst Skills */}
        <GlassCard className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <LineChart size={100} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
            <Database /> Data Analysis
          </h2>
          <p className="text-gray-400 mb-6 relative z-10 text-sm">
            Extracting actionable insights from messy data using statistical tools and dynamic
            visualization methodologies.
          </p>
          <div className="flex flex-wrap gap-2 relative z-10">
            {['Python', 'SQL', 'Pandas', 'Tableau', 'Excel'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 border border-white/10 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* AI Engineer Skills */}
        <GlassCard className="relative overflow-hidden group border-white/30">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Brain size={100} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
            <Terminal /> AI Engineer{' '}
            <span className="text-xs font-normal text-gray-500 tracking-wider uppercase ml-1">
              (Self Learning)
            </span>
          </h2>
          <p className="text-gray-400 mb-6 relative z-10 text-sm">
            Currently expanding my expertise into Artificial Intelligence. Exploring Machine
            Learning models, Neural Networks, and LLMs.
          </p>
          <div className="flex flex-wrap gap-2 relative z-10">
            {['Machine Learning', 'Neural Nets', 'LLMs', 'Scikit-learn', 'PyTorch'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 border border-white/10 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Featured Projects Overview */}
      <section className="animate-fade-in-up animation-delay-300 mb-16">
        <h2 className="text-3xl font-bold mb-10 text-white text-center">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Highlight 1 - Link to Frontend */}
          <Link to="/frontend" className="block group">
            <GlassCard className="h-full flex flex-col group-hover:-translate-y-2 transition-transform duration-300 cursor-pointer p-0 overflow-hidden">
              <div className="h-48 bg-white/5 flex items-center justify-center border-b border-white/10">
                <Layout
                  className="text-gray-600 group-hover:text-white transition-colors"
                  size={48}
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-2 flex justify-between items-center">
                    Frontend Showcases{' '}
                    <ArrowRight
                      className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-white"
                      size={20}
                    />
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    View my complete portfolio of web applications, featuring React SPAs, dynamic
                    interfaces, and custom visual designs.
                  </p>
                </div>
              </div>
            </GlassCard>
          </Link>

          {/* Highlight 2 - Link to Data Analyst */}
          <Link to="/data-analyst" className="block group">
            <GlassCard className="h-full flex flex-col group-hover:-translate-y-2 transition-transform duration-300 cursor-pointer p-0 overflow-hidden">
              <div className="h-48 bg-white/5 flex items-center justify-center border-b border-white/10">
                <Database
                  className="text-gray-600 group-hover:text-white transition-colors"
                  size={48}
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-2 flex justify-between items-center">
                    Data Analytics{' '}
                    <ArrowRight
                      className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-white"
                      size={20}
                    />
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Explore my data models, statistical analyses, and interactive Tableau dashboards
                    driving business decisions.
                  </p>
                </div>
              </div>
            </GlassCard>
          </Link>
        </div>
      </section>

      {/* Background decoration elements (Updated for Monochrome) */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-white/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob -z-10 pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-72 h-72 bg-white/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 -z-10 pointer-events-none"></div>
    </div>
  );
};

export default Home;
