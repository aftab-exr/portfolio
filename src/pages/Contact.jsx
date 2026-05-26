import React from 'react';
import { Mail, Github, Linkedin, MessageSquare } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Contact = () => {
  return (
    <div className="pt-32 pb-16 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <section className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Whether you have a question, a project proposal, or just want to say hi, feel free to drop
          me a message.
        </p>
      </section>

      <GlassCard className="animate-fade-in-up animation-delay-300 max-w-2xl mx-auto">
        <div className="flex flex-col gap-6">
          <a
            href="mailto:hamza@example.com"
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <Mail className="text-gray-300 group-hover:text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-200">Email Me</h3>
              <p className="text-gray-400">hamza@example.com</p>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <Linkedin className="text-gray-300 group-hover:text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-200">Connect on LinkedIn</h3>
              <p className="text-gray-400">Let's expand our professional network</p>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <MessageSquare className="text-gray-300 group-hover:text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-200">Send a DM</h3>
              <p className="text-gray-400">Reach out on Twitter/X</p>
            </div>
          </a>
        </div>
      </GlassCard>
    </div>
  );
};

export default Contact;
