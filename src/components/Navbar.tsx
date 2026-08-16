/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ShieldAlert, FileText, Award, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: 'hero', label: t.navbar.hero },
    { id: 'resume', label: t.navbar.resume },
    { id: 'skills', label: t.navbar.skills },
    { id: 'projects', label: t.navbar.projects },
    { id: 'about', label: t.navbar.about },
    { id: 'feedback', label: t.navbar.feedback },
    { id: 'contact', label: t.navbar.contact },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const LanguageSwitcher = () => (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-[11px] font-mono font-bold tracking-wider text-brand-wine border border-brand-pink-dark/25 rounded-full px-3 py-1.5 bg-brand-pink/10 hover:bg-brand-pink/35 shadow-xs transition-all duration-300 cursor-pointer overflow-hidden uppercase"
      title={language === 'de' ? 'Switch to English' : 'Auf Deutsch umstellen'}
    >
      <Languages className="w-3.5 h-3.5 mr-0.5 text-brand-wine/80" />
      <span className={language === 'de' ? 'text-brand-wine font-extrabold' : 'text-brand-wine/50 font-medium'}>DE</span>
      <span className="text-brand-wine/20">|</span>
      <span className={language === 'en' ? 'text-brand-wine font-extrabold' : 'text-brand-wine/50 font-medium'}>EN</span>
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-pink/30 shadow-xs" id="nav-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Title */}
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => handleNavClick('hero')}>
            <span className="font-serif italic font-semibold text-2xl tracking-widest text-brand-wine lowercase transition-all duration-300 group-hover:text-brand-wine-light">
              yana <span className="text-brand-sage font-light not-italic">dzhyma</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full font-display text-sm font-medium transition-colors duration-300 cursor-pointer`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-brand-wine rounded-full shadow-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-brand-cream' : 'text-brand-wine/80 hover:text-brand-wine'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
            
            <div className="pl-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-brand-wine hover:bg-brand-pink/30 transition-colors cursor-pointer"
              id="btn-mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-brand-cream border-b border-brand-pink/30 px-2 pt-2 pb-4 space-y-1 shadow-inner overflow-hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-display text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-brand-wine text-brand-cream'
                    : 'text-brand-wine/85 hover:bg-brand-pink/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
