/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Briefcase, GraduationCap, Users, Heart, ArrowUpRight } from 'lucide-react';
import { TimelineEvent } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function Resume() {
  const [filter, setFilter] = useState<'all' | 'education' | 'experience'>('all');
  const { language, t } = useLanguage();

  const timelineData: TimelineEvent[] = t.resume.timeline;

  const filteredEvents = timelineData.filter(
    (event) => filter === 'all' || event.type === filter
  );

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream border-t border-brand-pink/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-brand-wine tracking-tight">
            {t.resume.title}
          </h2>
          <div className="h-0.5 w-16 bg-brand-sage mx-auto rounded-full" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-dark/80 font-sans">
            {t.resume.desc}
          </p>
        </div>

        {/* Categories togglers */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 relative" id="cv-filters">
          {(['all', 'education', 'experience'] as const).map((type) => {
            const isActive = filter === type;
            const label = type === 'all' 
              ? t.resume.filterAll 
              : type === 'education' 
                ? t.resume.filterEducation 
                : t.resume.filterExperience;
            const Icon = type === 'education' 
              ? GraduationCap 
              : type === 'experience' 
                ? Briefcase 
                : null;
            
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`relative px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer z-10 ${
                  isActive ? 'text-brand-cream' : 'text-brand-wine hover:text-brand-wine-light'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCVFilterBg"
                    className="absolute inset-0 bg-brand-wine rounded-full -z-10 shadow-md"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="flex items-center gap-1.5 relative">
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline Visual Tree */}
        <motion.div 
          layout 
          className="relative border-l border-brand-pink-dark/40 ml-4 md:ml-32 pl-6 md:pl-10 space-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.title + event.year}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="relative group block"
                id={`cv-item-${index}`}
              >
                {/* Dot icon / Type specific placement */}
                <span className="absolute -left-[35px] md:-left-[51px] top-1 flex items-center justify-center w-8 h-8 rounded-full bg-brand-wine text-brand-cream border-2 border-brand-cream shadow-md group-hover:bg-brand-sage transition-colors duration-300">
                  {event.type === 'education' && <GraduationCap className="w-4 h-4" />}
                  {event.type === 'experience' && <Briefcase className="w-4 h-4" />}
                  {event.type === 'volunteer' && <Heart className="w-4 h-4" />}
                </span>

                {/* Outside Left Year Stamp on Desktop */}
                <div className="hidden md:block absolute -left-[180px] top-1.5 w-32 text-right">
                  <span className="font-mono text-xs font-bold text-brand-wine/70 uppercase tracking-widest bg-brand-pink/30 px-2.5 py-1 rounded-md">
                    {event.year.split('–')[0]}
                  </span>
                  <span className="block text-[10px] font-mono text-brand-dark/50 mt-1 uppercase">
                    {event.year.split('–')[1] || 'Heute'}
                  </span>
                </div>

                {/* Main Content card */}
                <div className="p-6 rounded-2xl bg-brand-beige/20 border border-brand-pink/25 hover:border-brand-wine/20 shadow-xs hover:shadow-md transition-all duration-300">
                  {/* Year tag for Mobile Only */}
                  <span className="inline-block md:hidden mb-2 px-2.5 py-0.5 rounded bg-brand-pink/30 text-brand-wine font-mono text-[10px] font-bold uppercase tracking-wider">
                    {event.year}
                  </span>

                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-brand-wine group-hover:text-brand-sage-light transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="font-display font-medium text-sm text-brand-dark/90 mt-0.5">
                        {event.organization}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-brand-dark/60 bg-brand-pink/10 px-2 py-0.5 rounded-sm border border-brand-pink/20">
                      {event.location}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-dark/85 mt-4 leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quality assurance certification footnote for evaluation */}
        <div className="mt-16 text-center p-6 bg-brand-beige/30 rounded-2xl border border-brand-pink/20">
          <p className="font-mono text-xs text-brand-wine/85 leading-relaxed">
            {t.resume.certText}
          </p>
        </div>
      </div>
              {/* Official Document Downloads Section (Placed at the end of the Resume page) */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-brand-beige/25 border border-brand-pink/30 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-brand-wine">
                <FileText className="w-5 h-5 text-brand-sage" />
                <h3 className="font-serif font-bold text-lg sm:text-xl">
                  {t.resume.downloadSectionTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-brand-dark/75 font-sans mt-1">
                {t.resume.downloadSectionDesc}
              </p>
            </div>
            <span className="self-start md:self-auto text-[11px] font-mono text-brand-wine bg-brand-pink/25 px-3 py-1 rounded-full font-semibold border border-brand-pink/30">
              PDF-Format • A4
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Lebenslauf PDF */}
            <a
              href="/lebenslauf.pdf"
              download="lebenslauf.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-brand-cream border border-brand-pink/25 hover:border-brand-wine/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-brand-wine mb-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-wine/10 flex items-center justify-center text-brand-wine group-hover:bg-brand-wine group-hover:text-brand-cream transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <Download className="w-4 h-4 text-brand-sage group-hover:translate-y-0.5 transition-transform" />
                </div>
                <h4 className="font-serif font-bold text-base text-brand-wine group-hover:text-brand-sage transition-colors">
                  {t.resume.cvDownloadBtn}
                </h4>
                <p className="text-xs text-brand-dark/70 font-sans mt-1.5 leading-snug">
                  {t.resume.cvDownloadSub}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-brand-pink/15 flex items-center justify-between text-[11px] font-mono text-brand-wine/80 font-semibold">
                <span>Lebenslauf_Yana_Dzhyma.pdf</span>
                <span className="text-brand-sage uppercase">Download ↓</span>
              </div>
            </a>

            {/* 2. Arbeitsbestätigung Jugend-Job-Börse PDF */}
            <a
              href="/Arbeitsbestaetigung.pdf"
              download="Arbeitsbestaetigung.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-brand-cream border border-brand-pink/25 hover:border-brand-wine/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-brand-wine mb-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-wine/10 flex items-center justify-center text-brand-wine group-hover:bg-brand-wine group-hover:text-brand-cream transition-colors">
                    <Award className="w-4 h-4" />
                  </div>
                  <Download className="w-4 h-4 text-brand-sage group-hover:translate-y-0.5 transition-transform" />
                </div>
                <h4 className="font-serif font-bold text-base text-brand-wine group-hover:text-brand-sage transition-colors">
                  {t.resume.workRefBtn}
                </h4>
                <p className="text-xs text-brand-dark/70 font-sans mt-1.5 leading-snug">
                  {t.resume.workRefSub}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-brand-pink/15 flex items-center justify-between text-[11px] font-mono text-brand-wine/80 font-semibold">
                <span>Arbeitsbestaetigung.pdf</span>
                <span className="text-brand-sage uppercase">Download ↓</span>
              </div>
            </a>
          </div>
        </div>
    </section>
  );
}
