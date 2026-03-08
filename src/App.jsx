import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Profiles from './pages/Profiles';
import Frontend from './pages/Frontend';
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
              <Route path="/frontend" element={<Frontend />} />
              <Route path="/data-analyst" element={<DataAnalyst />} />
              <Route path="/ai-engineer" element={<AIEngineer />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
