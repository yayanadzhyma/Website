/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, Sparkles, UserCheck, Key, Eye, EyeOff, AlertCircle, RefreshCw } from 'lucide-react';
import { db, serverTimestamp, doc, setDoc, handleFirestoreError, OperationType } from '../lib/firebase';

interface AccessGateProps {
  sectionName: string;
  onUnlock: () => void;
}

export default function AccessGate({ sectionName, onUnlock }: AccessGateProps) {
  const [visitorName, setVisitorName] = useState('');
  const [visitorPassword, setVisitorPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) {
      setErrorMsg('Bitte geben Sie Ihren Namen oder Ihren Firmennamen ein.');
      return;
    }
    if (!visitorPassword.trim()) {
      setErrorMsg('Bitte geben Sie den Freischaltungscode ein.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Generate a valid document ID (alphanumeric & underscore only to pass security rules)
      const sanitizedNameClean = visitorName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
      const docId = `visitor_${sanitizedNameClean}_${Date.now()}`;

      // 2. Write record to Firestore
      const docRef = doc(db, 'visitors', docId);
      await setDoc(docRef, {
        name: visitorName.trim(),
        password: visitorPassword.trim(),
        unlockedAt: serverTimestamp(),
      });

      // 3. Persist local unlock state in session so page refreshes don't lock immediately
      localStorage.setItem('portfolio_unlocked_yana', 'true');
      
      // 4. Trigger App-wide state unlock
      onUnlock();
    } catch (err) {
      console.error(err);
      setErrorMsg('Verbindungsfehler zur Datenbank. Bitte versuchen Sie es erneut.');
      try {
        handleFirestoreError(err, OperationType.WRITE, `visitors`);
      } catch (e) {
        // Log trace is captured
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div className="p-8 rounded-3xl bg-brand-cream border-2 border-dashed border-brand-pink/60 shadow-xl relative overflow-hidden transition-all duration-300">
        
        {/* Decorative corner background seal */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-pink/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-sage/10 rounded-full blur-2xl pointer-events-none" />

        {/* REGULAR VISITORS ENVELOPE / LOCK SCREEN */}
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-brand-pink/30 flex items-center justify-center text-brand-wine animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-wine/10 text-brand-wine rounded-full font-mono text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-brand-pink" /> 
                Gesperrter Bereich: {sectionName}
              </div>
              <h3 className="font-serif font-bold text-2xl text-brand-wine tracking-tight pt-2">
                Zutritts-Freischaltung erforderlich
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed max-w-md font-sans">
              Zum Schutz schützenswerter Noten, Zeugnisse, Kontaktangaben und persönlicher Details von Yana Dzhyma. Bitte tragen Sie sich kurz ein, um sofortigen Zugriff auf alle gesperrten Bereiche zu erhalten.
            </p>
          </div>

          <form onSubmit={handleUnlockSubmit} className="space-y-4 max-w-md mx-auto pt-2" id="form-visitor-unlock-shadow-xs">
            
            {/* Visitor Name Input */}
            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase text-brand-wine/80">
                Ihr Name oder Firmenname
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-wine/60">
                  <UserCheck className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="z. B. Swisscom / Max Muster"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-cream border border-brand-pink/35 text-brand-dark text-sm font-sans focus:outline-hidden focus:border-brand-sage transition-colors placeholder:text-brand-dark/35"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Freischaltungscode Input */}
            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase text-brand-wine/80">
                Freischaltungscode eingeben
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-wine/60">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={visitorPassword}
                  onChange={(e) => setVisitorPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-brand-cream border border-brand-pink/35 text-brand-dark text-sm font-sans focus:outline-hidden focus:border-brand-sage transition-colors placeholder:text-brand-dark/35"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-wine/60 hover:text-brand-wine transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 text-xs font-mono font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-brand-wine hover:bg-brand-brand-wine-light text-brand-cream border border-brand-wine font-mono font-bold uppercase tracking-wider text-xs transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Freischaltung wird registriert...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  Bereich entsperren &amp; Freischalten
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
