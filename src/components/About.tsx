/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Camera, Music, CupSoda, Heart, Sparkles, MapPin, Smile, Compass, Waves, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function About() {
  const { language, t } = useLanguage();

  const hobbyIcons = [
    <Sparkles className="w-5 h-5 text-brand-wine" />,
    <Compass className="w-5 h-5 text-brand-wine" />,
    <Waves className="w-5 h-5 text-brand-wine" />,
    <Smile className="w-5 h-5 text-brand-wine" />,
    <Globe className="w-5 h-5 text-brand-wine" />,
  ];

  const hobbies = t.about.hobbies.map((hobby, index) => ({
    ...hobby,
    icon: hobbyIcons[index] || <Smile className="w-5 h-5 text-brand-wine" />
  }));

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream/35 border-t border-brand-pink/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-brand-wine tracking-tight">
            {t.about.title}
          </h2>
          <div className="h-0.5 w-16 bg-brand-sage mx-auto rounded-full" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-dark/80 font-sans">
            {t.about.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Detailed Biography Text block */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif italic font-semibold text-2xl text-brand-wine leading-tight">
              {t.about.bioQuote}
            </h3>
            
            <p className="text-sm sm:text-base text-brand-dark/85 leading-relaxed font-normal font-sans">
              {t.about.bioP1}
            </p>
            
            <p className="text-sm sm:text-base text-brand-dark/85 leading-relaxed font-normal font-sans">
              {t.about.bioP2}
            </p>

            {/* Custom 16:9 Portrait Image Block with Premium Frame */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-brand-pink/25 bg-brand-cream/40 shadow-sm relative group">
              <img
                src="/portrait.jpg"
                alt="Yana Dzhyma"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_60%] transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-wine/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Graphical/Cards List representing polaroids with photos next to text */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Visual hobby list items */}
            {hobbies.map((hobby, index) => (
              <div
                key={index}
                className={`p-4 sm:p-5 rounded-2xl border border-brand-pink/25 bg-brand-cream hover:border-brand-wine/25 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-stretch ${
                  index % 2 === 0 ? 'bg-brand-beige/10' : ''
                }`}
                id={`hobby-${index}`}
              >
                {/* Hobby Photo next to text */}
                <div className="w-full sm:w-1/3 min-h-[120px] sm:min-h-0 rounded-xl overflow-hidden border border-brand-pink/15 relative shrink-0">
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <span className="p-1.5 rounded-lg bg-brand-pink/25 text-brand-wine shrink-0">
                        {hobby.icon}
                      </span>
                      <h4 className="font-display font-semibold text-sm sm:text-base text-brand-wine leading-tight">
                        {hobby.title}
                      </h4>
                    </div>
                    
                    <p className="text-xs text-brand-dark/80 leading-relaxed font-normal font-sans">
                      {hobby.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-brand-pink/10 flex items-center justify-between text-[10px] font-mono text-brand-wine/60">
                    <span>{hobby.tag}</span>
                    <Smile className="w-3.5 h-3.5 opacity-40 shrink-0" />
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}
