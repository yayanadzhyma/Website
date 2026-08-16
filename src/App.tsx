/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import TeacherEvaluation from './components/TeacherEvaluation';
import AccessGate from './components/AccessGate';
import Imprint from './components/Imprint';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [portfolioUnlocked, setPortfolioUnlocked] = useState(() => {
    return localStorage.getItem('portfolio_unlocked_yana') === 'true';
  });

  const isManualScrollRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleManualSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    isManualScrollRef.current = true;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1200); // Allow sufficient time for smooth-scroll to complete
  };

  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Robust scroll event listener to dynamically track and update active nav items on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const sections = ['hero', 'resume', 'skills', 'projects', 'about', 'feedback', 'contact'];
      let currentSection = 'hero';
      const targetY = window.innerHeight * 0.25; // 25% from top of screen representing primary focus zone

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY && rect.bottom >= targetY) {
            currentSection = id;
            break;
          }
        }
      }

      // If scrolled close to the bottom of the page, force 'contact' section as active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        currentSection = 'contact';
      }

      if (currentSection !== activeSectionRef.current) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initially
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-cream selection:bg-brand-pink selection:text-brand-wine" id="app-root">
      {/* Primary header navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={handleManualSectionChange}
      />

      {/* Main Single-screen viewport sections */}
      <main className="relative" id="main-content">
        <Hero />
        
        <Resume />
        
        <Skills />
        
        <Projects />
        
        {portfolioUnlocked ? (
          <About />
        ) : (
          <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream/35 border-t border-brand-pink/20">
            <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-brand-wine tracking-tight">
                Persönliches &amp; Freizeit
              </h2>
              <div className="h-0.5 w-16 bg-brand-sage mx-auto rounded-full" />
            </div>
            <AccessGate 
              sectionName="Persönliches" 
              onUnlock={() => setPortfolioUnlocked(true)} 
            />
          </section>
        )}

        {portfolioUnlocked ? (
          <TeacherEvaluation />
        ) : (
          <section id="feedback" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream border-t border-brand-pink/20">
            <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-brand-wine tracking-tight">
                Schulische Leistungen &amp; Zeugnisnoten
              </h2>
              <div className="h-0.5 w-16 bg-brand-sage mx-auto rounded-full" />
            </div>
            <AccessGate 
              sectionName="Schulische Leistungen &amp; Zeugnisse" 
              onUnlock={() => setPortfolioUnlocked(true)} 
            />
          </section>
        )}

        {/* Contact section instead of Vault */}
        {portfolioUnlocked ? (
          <Contact />
        ) : (
          <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream border-t border-brand-pink/20">
            <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-brand-wine tracking-tight">
                Kontakt aufnehmen
              </h2>
              <div className="h-0.5 w-16 bg-brand-sage mx-auto rounded-full" />
            </div>
            <AccessGate 
              sectionName="Direktkontakt &amp; Anfrageformular" 
              onUnlock={() => setPortfolioUnlocked(true)} 
            />
          </section>
        )}
      </main>

      {/* Footer Legal Imprint */}
      <Imprint />
    </div>
  );
}

