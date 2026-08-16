/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Contact() {
  const { language, t } = useLanguage();
  const subject = encodeURIComponent(language === 'de' ? 'Anfrage bezüglich Praktikum / IMS Portfolio' : 'Inquiry regarding Internship / IMS Portfolio');

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream border-t border-brand-pink/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-pink/30 text-brand-wine rounded-full font-mono text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {t.contact.badge}
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-brand-wine tracking-tight">
            {t.contact.title}
          </h2>
          <div className="h-0.5 w-16 bg-brand-sage mx-auto rounded-full" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-dark/80 font-sans">
            {t.contact.desc}
          </p>
        </div>

        <div className="space-y-6">
          {/* Mail Selection Container */}
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-beige/20 border border-brand-pink/25 shadow-md space-y-6">
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-xl text-brand-wine border-b border-brand-pink/30 pb-3">
                {t.contact.writeEmailTitle}
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed font-sans">
                {t.contact.writeEmailDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5 py-2">
              {/* Default Mail App (mailto) */}
              <a
                href={`mailto:ya.yana.dzhima@gmail.com?subject=${subject}`}
                className="group flex items-center justify-between p-4 rounded-2xl bg-brand-cream border border-brand-pink/35 hover:border-brand-sage hover:shadow-md transition-all duration-300 cursor-pointer text-left"
                id="mail-link-app"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-wine/10 text-brand-wine flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-brand-wine uppercase tracking-wide font-mono">
                      {t.contact.mailAppLabel}
                    </span>
                    <span className="text-[11px] text-brand-dark/70 font-sans block mt-0.5 leading-snug">
                      {t.contact.mailAppSub}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-brand-wine/50 group-hover:text-brand-sage transition-colors shrink-0" />
              </a>

              {/* Gmail Web */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=ya.yana.dzhima@gmail.com&su=${subject}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-brand-cream border border-brand-pink/35 hover:border-brand-sage hover:shadow-md transition-all duration-300 cursor-pointer text-left"
                id="mail-link-gmail"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs uppercase font-mono shrink-0">
                    G
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-red-700 uppercase tracking-wide font-mono">
                      {t.contact.gmailLabel}
                    </span>
                    <span className="text-[11px] text-brand-dark/70 font-sans block mt-0.5 leading-snug">
                      {t.contact.gmailSub}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-brand-wine/50 group-hover:text-brand-sage transition-colors shrink-0" />
              </a>

              {/* Outlook Web */}
              <a
                href={`https://outlook.live.com/owa/?path=/mail/action/compose&to=ya.yana.dzhima@gmail.com&subject=${subject}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-brand-cream border border-brand-pink/35 hover:border-brand-sage hover:shadow-md transition-all duration-300 cursor-pointer text-left"
                id="mail-link-outlook"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs uppercase font-mono shrink-0">
                    O
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-blue-700 uppercase tracking-wide font-mono">
                      {t.contact.outlookLabel}
                    </span>
                    <span className="text-[11px] text-brand-dark/70 font-sans block mt-0.5 leading-snug">
                      {t.contact.outlookSub}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-brand-wine/50 group-hover:text-brand-sage transition-colors shrink-0" />
              </a>
            </div>

            <p className="text-[11px] leading-relaxed text-brand-dark/65 text-center font-sans">
              {t.contact.responseMsg}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

