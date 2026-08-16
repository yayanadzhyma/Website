/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Code, Layout, Settings, Blocks, CheckCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Skill } from '../types';
import { useLanguage } from '../LanguageContext';

export default function Skills() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Programming' | 'Web' | 'DevOps/Tools'>('All');
  const [activeSkillDetail, setActiveSkillDetail] = useState<Skill | null>(null);

  const skillsData: Skill[] = t.skills.skillsList;

  const getSkillHighlights = (skill: Skill) => {
    return t.skills.highlights[skill.name] || t.skills.highlightsFallback;
  };

  const filteredSkills = skillsData.filter(
    (skill) => selectedCategory === 'All' || skill.category === selectedCategory
  );

  const handleSkillCardClick = (skill: Skill) => {
    setActiveSkillDetail(activeSkillDetail?.name === skill.name ? null : skill);
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream/40 border-t border-brand-pink/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-brand-wine tracking-tight">
            {t.skills.title}
          </h2>
          <div className="h-1 w-20 bg-brand-sage mx-auto rounded-full" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-dark/80">
            {t.skills.desc}
          </p>
        </div>

        {/* Categories filters tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap" id="skills-filters">
          {(['All', 'Web', 'Programming', 'DevOps/Tools'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveSkillDetail(null);
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-display text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-wine text-brand-cream shadow-md'
                  : 'bg-brand-beige/30 text-brand-wine hover:bg-brand-pink/30'
              }`}
            >
              {cat === 'All' ? t.skills.filterAll : cat === 'Web' ? t.skills.filterWeb : cat === 'Programming' ? t.skills.filterProgramming : t.skills.filterTools}
            </button>
          ))}
        </div>

        {/* Master Grid & Detail layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List of Skills cards */}
          <motion.div 
            layout
            className={`grid gap-4 ${
              activeSkillDetail 
                ? 'lg:col-span-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-2' 
                : 'lg:col-span-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            <AnimatePresence>
              {filteredSkills.map((skill, index) => {
                const isSelected = activeSkillDetail?.name === skill.name;
                return (
                  <motion.div
                    layout
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={skill.name}
                    onClick={() => handleSkillCardClick(skill)}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-[background-color,border-color,color,box-shadow] duration-200 ${
                      isSelected
                        ? 'bg-brand-wine text-brand-cream border-brand-wine shadow-xl'
                        : 'bg-brand-beige/25 border-brand-pink/25 hover:border-brand-wine/20 hover:bg-brand-beige/45'
                    }`}
                    id={`skill-card-${index}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`p-2 rounded-xl transition-colors duration-300 ${isSelected ? 'bg-brand-cream/10 text-brand-cream' : 'bg-brand-pink/30 text-brand-wine'}`}>
                          {skill.category === 'Web' && <Layout className="w-4 h-4" />}
                          {skill.category === 'Programming' && <Code className="w-4 h-4" />}
                          {skill.category === 'DevOps/Tools' && <Settings className="w-4 h-4" />}
                        </span>
                        <span className="font-display font-semibold text-sm sm:text-base">{skill.name}</span>
                      </div>
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded transition-colors duration-300 ${isSelected ? 'bg-brand-cream/20 text-brand-cream' : 'bg-brand-wine/10 text-brand-wine'}`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* HTML slider showing progress */}
                    <div className={`w-full h-1.5 rounded-full overflow-hidden mb-1 transition-colors duration-300 ${isSelected ? 'bg-brand-cream/15' : 'bg-brand-pink-dark/25'}`}>
                      <div
                        className="h-full rounded-full bg-brand-sage transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] uppercase font-mono opacity-60">
                      <span>{t.skills.basic}</span>
                      <span>{t.skills.pro}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Details presentation panel */}
          <AnimatePresence>
            {activeSkillDetail && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:col-span-5 bg-brand-wine text-brand-cream p-6 sm:p-8 rounded-3xl border border-brand-wine/30 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px]"
              >
                <div className="absolute top-0 right-0 p-4 font-mono text-[9px] uppercase tracking-wider text-brand-pink/60 animate-pulse">
                  {t.skills.detailTitle}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-brand-cream/10 pb-4">
                    <span className="p-3 rounded-2xl bg-brand-cream/10 text-brand-pink">
                      {activeSkillDetail.category === 'Web' && <Layout className="w-5 h-5" />}
                      {activeSkillDetail.category === 'Programming' && <Code className="w-5 h-5" />}
                      {activeSkillDetail.category === 'DevOps/Tools' && <Settings className="w-5 h-5" />}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-xl leading-tight">{activeSkillDetail.name}</h3>
                      <span className="inline-block text-[10px] font-mono bg-brand-cream/20 text-brand-cream px-2.5 py-0.5 rounded-full uppercase mt-1">
                        {activeSkillDetail.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed text-brand-cream/90 font-light font-sans">
                      {activeSkillDetail.description}
                    </p>

                    <div className="bg-brand-dark/20 p-4 rounded-xl border border-brand-cream/5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-sage">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {t.skills.provenBy}
                      </div>
                      <ul className="text-xs text-brand-cream/80 list-disc list-inside space-y-1.5 font-sans">
                        {getSkillHighlights(activeSkillDetail).map((highlight, idx) => (
                          <li key={idx} className="transition-all duration-200">{highlight}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-cream/10 flex justify-end items-center">
                  <button
                    onClick={() => setActiveSkillDetail(null)}
                    className="text-xs font-mono text-brand-cream hover:text-brand-pink transition-colors uppercase border-b border-brand-pink/40 cursor-pointer"
                  >
                    {t.skills.closeDetail}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reflexion & KI card at the bottom of Skills */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl border border-brand-pink/25 bg-brand-beige/10 hover:border-brand-wine/25 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="p-3 bg-brand-pink/30 text-brand-wine rounded-2xl shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-wine">
                {t.skills.philosophyTitle}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed font-sans">
                {t.skills.philosophyP1}
              </p>
              <p className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed font-sans">
                {t.skills.philosophyP2}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

