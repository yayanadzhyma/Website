/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Sparkles, Building2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Imprint() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-dark text-brand-cream py-16 px-4 sm:px-6 lg:px-8 border-t border-brand-wine/50" id="section-imprint">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
        
        {/* Left column: Swiss Legal Imprint (Impressum) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
            <span className="font-display font-medium text-xs tracking-wider uppercase text-brand-pink">
              {t.imprint.titleLegal}
            </span>
          </div>
          
          <div className="space-y-2 font-mono text-xs text-brand-pink/80 leading-relaxed">
            <p className="font-bold text-brand-cream">{t.imprint.labelResp}</p>
            <p>
              Yana Dzhyma
            </p>
            <p>
              E-Mail: <span className="text-brand-beige select-all">ya.yana.dzhima@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Center column: Educational Institutions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
            <span className="font-display font-medium text-xs tracking-wider uppercase text-brand-pink">
              {t.imprint.titleInst}
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs text-brand-pink/80">
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-brand-sage flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-cream">bwd Bern</strong><br />
                {t.imprint.bwdDesc}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-brand-sage flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-cream">gibb Bern</strong><br />
                {t.imprint.gibbDesc}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Disclaimers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
            <span className="font-display font-medium text-xs tracking-wider uppercase text-brand-pink">
              {t.imprint.titleDisclaimer}
            </span>
          </div>

          <p className="text-xs text-brand-pink/70 leading-relaxed font-sans font-light">
            {t.imprint.disclaimerText}
          </p>

          <div className="pt-2 border-t border-brand-cream/10 flex justify-between items-center text-[10px] font-mono opacity-65">
            <span>© 2026 Yana Dzhyma</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

