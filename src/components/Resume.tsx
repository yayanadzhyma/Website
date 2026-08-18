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
    </section>
  );
}
