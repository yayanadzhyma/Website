/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Code, Sparkles, Smartphone, Download, ShieldCheck, Mail, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FloatingCirclesBackground from './FloatingCirclesBackground';
import { useLanguage } from '../LanguageContext';
import MyVideo from '/Vorstellungvideo.mp4';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { language, t } = useLanguage();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.610, 0.355, 1.000],
      },
    },
  };

  const blobVariants1 = {
    animate: {
      x: [0, 15, -10, 0],
      y: [0, -15, 10, 0],
      scale: [1, 1.08, 0.95, 1],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const blobVariants2 = {
    animate: {
      x: [0, -20, 15, 0],
      y: [0, 15, -15, 0],
      scale: [1, 1.05, 1.1, 1],
      transition: {
        duration: 14,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-cream">
      {/* Interactive premium dynamic background of floating and pulsing circles matching Swiss/IMS layout */}
      <FloatingCirclesBackground />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Text Content block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left"
        >


          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="tracking-tight text-brand-dark leading-tight select-none">
              <span className="text-xs font-mono block text-brand-wine/70 font-bold uppercase tracking-widest mb-2 font-display">
                Informatikmittelschule • bwd Bern • gibb
              </span>
              <span className="block text-5xl sm:text-7xl font-serif font-bold italic text-brand-wine leading-none">
                Yana Dzhyma
              </span>
              <span className="block text-xl sm:text-3xl font-sans text-brand-sage font-medium tracking-tight mt-2">
                {language === 'de' ? 'IMS-Lernende & Software-Entwicklerin' : 'IMS Student & Software Developer'}
              </span>
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-brand-dark/80 font-normal leading-relaxed font-sans">
              {t.hero.desc}
            </p>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-brand-beige/30 border border-brand-pink/20 text-center lg:text-left hover:scale-[1.02] hover:border-brand-pink/40 transition-all duration-300">
              <span className="block font-display font-medium text-2xl text-brand-wine">10+</span>
              <span className="block text-xs font-mono text-brand-dark/70 uppercase tracking-wider">{language === 'de' ? 'Informatikprojekte' : 'IT Projects'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-brand-beige/30 border border-brand-pink/20 text-center lg:text-left hover:scale-[1.02] hover:border-brand-pink/40 transition-all duration-300">
              <span className="block font-display font-medium text-2xl text-brand-wine">{language === 'de' ? '3. Jahr' : '3rd Year'}</span>
              <span className="block text-xs font-mono text-brand-dark/70 uppercase tracking-wider">{language === 'de' ? 'Ausbildungsphase' : 'Training Stage'}</span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-brand-beige/30 border border-brand-pink/20 text-center lg:text-left hover:scale-[1.02] hover:border-brand-pink/40 transition-all duration-300">
              <span className="block font-display font-medium text-2xl text-brand-wine">{language === 'de' ? '5+ Jahre' : '5+ Years'}</span>
              <span className="block text-xs font-mono text-brand-dark/70 uppercase tracking-wider">{language === 'de' ? 'Erfahrung in Informatik' : 'IT Experience'}</span>
            </div>
          </motion.div>

          {/* Buttons Layout */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-brand-wine hover:bg-brand-wine-light text-brand-cream font-display font-medium shadow-lg hover:shadow-brand-wine/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              {t.hero.btnProjects}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-full border border-brand-wine/25 bg-brand-cream hover:bg-brand-pink/20 text-brand-wine font-display font-medium transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
            >
              <Play className="w-4 h-4 fill-brand-wine" />
              {language === 'de' ? 'Vorstellungsvideo' : 'Intro Video'}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full border border-brand-wine/25 bg-brand-pink/40 hover:bg-brand-pink/60 text-brand-wine font-display font-medium transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-brand-wine" />
              {t.hero.btnContact}
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative / Custom Graphic block (Yana's Portrait Photo with Premium Frame) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.610, 0.355, 1.000] }}
          className="lg:col-span-5 relative flex flex-col items-center justify-center p-4"
        >
          {/* Decorative backdrop blobs */}
          <div className="absolute -inset-4 bg-brand-pink/20 rounded-full blur-3xl opacity-40 -z-10" />
          <div className="absolute top-1/2 -right-8 w-44 h-44 bg-brand-sage/10 rounded-full blur-3xl opacity-30 -z-10" />

          {/* Elegant Circular Photo Container */}
          <div className="relative">
            <div 
              id="hero-portrait-circle"
              className="relative group w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full overflow-hidden bg-brand-beige/10 border-4 border-brand-pink/35 shadow-2xl transition-all duration-500 hover:border-brand-wine/40 hover:shadow-brand-wine/15 cursor-pointer" 
              onClick={() => setIsVideoOpen(true)}
            >
              <img 
                src="/Photo Portfolio.png" 
                alt="Yana Dzhyma"
                className="w-full h-full object-cover object-top scale-100 group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Pulsating play badge overlapping bottom right */}
            <button
              id="hero-play-button-pulsate"
              onClick={() => setIsVideoOpen(true)}
              className="absolute -bottom-2 -right-4 bg-brand-wine hover:bg-brand-wine-light text-brand-cream py-3 px-5 rounded-full shadow-2xl border border-brand-pink/30 flex items-center gap-2.5 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 z-20 group"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-pink"></span>
              </span>
              <Play className="w-3.5 h-3.5 fill-current text-brand-cream group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold tracking-wide font-display whitespace-nowrap">{t.hero.btnVideo}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Video Overlay Modul with Premium Glassmorphism and Motion */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/65 backdrop-blur-lg"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl bg-brand-cream rounded-3xl border border-brand-pink/20 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-pink/15 bg-brand-beige/20">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-brand-wine fill-brand-wine" />
                  <span className="font-display font-bold text-brand-wine text-sm sm:text-base">{t.hero.modalTitle}</span>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-pink/30 text-brand-wine transition-colors cursor-pointer"
                  aria-label={language === 'de' ? 'Modal schliessen' : 'Close modal'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Container */}
              <div className="aspect-video bg-black relative">
                {/* Checks if the video actually exists, otherwise shows a gorgeous layout with a description */}
                <video
                  src="/Vorstellungsvideo.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // fall back gracefully if file is not loaded yet and explain
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const placeholder = parent.querySelector('.video-placeholder');
                      if (placeholder) placeholder.classList.remove('hidden');
                    }
                  }}
                />

                {/* Highly Polished Placeholder if video isn't uploaded yet */}
                <div className="video-placeholder hidden absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-8 text-center text-brand-cream space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-wine/25 border border-brand-pink/30 flex items-center justify-center text-brand-pink mb-2">
                    <Play className="w-8 h-8 fill-brand-pink" />
                  </div>
                  <h4 className="font-serif italic font-bold text-xl sm:text-2xl text-brand-pink">
                    {t.hero.videoReady}
                  </h4>
                  <p className="max-w-md text-xs sm:text-sm text-brand-cream/80 font-sans leading-relaxed">
                    {t.hero.videoReadyDesc}
                  </p>
                  <p className="max-w-md text-[11px] text-brand-pink/60 font-mono">
                    {t.hero.videoPlaceholder}
                  </p>
                </div>
              </div>

              {/* Script proposal and instructions shown below the player */}
              <div className="p-6 bg-brand-cream border-t border-brand-pink/15 space-y-3 max-h-[180px] overflow-y-auto">
                <span className="block text-[10px] font-mono text-brand-wine uppercase font-bold tracking-wider">{t.hero.scriptLabel}</span>
                <p className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed font-sans italic p-3 bg-brand-beige/25 rounded-2xl border border-brand-pink/10">
                  {t.hero.scriptText}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
