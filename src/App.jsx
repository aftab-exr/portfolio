import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Profiles from './pages/Profiles';
import WebDevelopment from './pages/WebDevelopment';
import DataAnalyst from './pages/DataAnalyst';
import AIEngineer from './pages/AIEngineer';
import Contact from './pages/Contact';
import { ThemeProvider } from './ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative font-sans transition-colors duration-500">
          {/* Global ambient background glow - Dynamic based on theme variables */}
          <div
            className="fixed inset-0 -z-50 transition-colors duration-500"
            style={{
              background:
                'radial-gradient(ellipse at top, var(--bg-gradient-start), var(--bg-gradient-mid), var(--bg-gradient-end))',
            }}
          />

          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/web-development" element={<WebDevelopment />} />
              <Route path="/data-analyst" element={<DataAnalyst />} />
              <Route path="/ai-engineer" element={<AIEngineer />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* 404 Catch-All Route - MUST be at the bottom */}
              <Route 
                path="*" 
                element={
                  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in-up">
                    <h2 className="text-6xl font-bold text-white mb-4">404</h2>
                    <h3 className="text-2xl font-semibold text-gray-200 mb-4">Page Not Found</h3>
                    <p className="text-gray-400 mb-8 max-w-md">
                      The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
                    </p>
                    <Link 
                      to="/" 
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full transition-all duration-300"
                    >
                      Return Home
                    </Link>
                  </div>
                } 
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;