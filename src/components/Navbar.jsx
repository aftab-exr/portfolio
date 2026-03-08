import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, User, Briefcase, Code, Mail, Share2, Palette } from 'lucide-react';
import { ThemeContext } from '../ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { id: 'dark', name: 'Dark', color: '#18181b' },
    { id: 'light', name: 'Light', color: '#f8fafc' },
    { id: 'blue', name: 'Blue', color: '#1e3a8a' },
    { id: 'red', name: 'Red', color: '#7f1d1d' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto glass rounded-full px-4 py-3 flex justify-between items-center blur-effect">
        <NavLink
          to="/"
          className="text-xl font-bold tracking-wider text-gradient flex items-center gap-2"
        >
          X<span>Y</span>Z
        </NavLink>

        {/* Navigation Links */}
        <div className="flex gap-2 md:gap-4 items-center flex-wrap justify-center flex-1 mx-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium ${isActive ? 'glass text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
            }
          >
            <HomeIcon size={16} />
            <span className="hidden lg:inline text-sm">Home</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium ${isActive ? 'glass text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
            }
          >
            <User size={16} />
            <span className="hidden lg:inline text-sm">About</span>
          </NavLink>

          <NavLink
            to="/frontend" // Serving as projects/frontend page for now
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium ${isActive ? 'glass text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
            }
          >
            <Briefcase size={16} />
            <span className="hidden lg:inline text-sm">Project</span>
          </NavLink>

          <NavLink
            to="/data-analyst" // Serving as a skill/role page
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium ${isActive ? 'glass text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
            }
          >
            <Code size={16} />
            <span className="hidden lg:inline text-sm">Skill</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium ${isActive ? 'glass text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
            }
          >
            <Mail size={16} />
            <span className="hidden lg:inline text-sm">Contact</span>
          </NavLink>

          <NavLink
            to="/profiles"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium ${isActive ? 'glass text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
            }
          >
            <Share2 size={16} />
            <span className="hidden lg:inline text-sm">Social Media</span>
          </NavLink>
        </div>

        {/* Theme Toggle Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="p-2 rounded-full glass hover:bg-white/10 transition-colors flex items-center justify-center text-[var(--text-primary)]"
            aria-label="Toggle Theme"
          >
            <Palette size={20} />
          </button>

          {isThemeMenuOpen && (
            <div className="absolute right-0 mt-3 w-40 glass rounded-xl overflow-hidden shadow-2xl py-2 flex flex-col gap-1 z-50">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    toggleTheme(t.id);
                    setIsThemeMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors text-left w-full
                    ${theme === t.id ? 'bg-[var(--text-primary)] text-[var(--bg-color)] font-medium' : 'text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]'}`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
