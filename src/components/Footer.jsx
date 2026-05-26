import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 text-center text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p>© {new Date().getFullYear()} Aaftab.exr. Built with React & Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;
