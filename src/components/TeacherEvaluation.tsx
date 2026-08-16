/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, BookOpen, Calendar, Clock, TrendingUp, Building2, User, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface SchoolGrade {
  subject: string;
  grades: { [semester: number]: number | string };
  category?: string;
  isCustomModule?: boolean;
}

export default function TeacherEvaluation() {
  const { language, t } = useLanguage();
  // Main schools: 'bwd' or 'gibb'
  const [activeSchool, setActiveSchool] = useState<'bwd' | 'gibb'>('bwd');
  // Selected Semester: 1, 2, 3, or 4
  const [selectedSemester, setSelectedSemester] = useState<number>(4);

  // bwd Grades Data
  const bwdGrades: SchoolGrade[] = [
    // Grundlagenbereich
    { subject: t.teacherEvaluation.subjects.deutsch, grades: { 1: 4.5, 2: 4.5, 3: 4.5, 4: 5.0 }, category: 'Grundlagenbereich' },
    { subject: t.teacherEvaluation.subjects.franz, grades: { 1: 4.5, 2: 4.5, 3: 5.5, 4: 5.0 }, category: 'Grundlagenbereich' },
    { subject: t.teacherEvaluation.subjects.engl, grades: { 1: 5.5, 2: 5.0, 3: 5.0, 4: 5.0 }, category: 'Grundlagenbereich' },
    { subject: t.teacherEvaluation.subjects.math, grades: { 1: 4.5, 2: 5.0, 3: 5.0, 4: 5.5 }, category: 'Grundlagenbereich' },
    { subject: t.teacherEvaluation.subjects.inf, grades: { 1: 4.5, 2: 5.0, 3: 5.0, 4: 5.5 }, category: 'Grundlagenbereich' },
    // Schwerpunktbereich
    { subject: t.teacherEvaluation.subjects.finanz, grades: { 1: 4.5, 2: 4.5, 3: 5.0, 4: 5.5 }, category: 'Schwerpunktbereich' },
    { subject: t.teacherEvaluation.subjects.recht, grades: { 1: 4.5, 2: 4.5, 3: 4.5, 4: 5.0 }, category: 'Schwerpunktbereich' },
    // Ergänzungsbereich
    { subject: t.teacherEvaluation.subjects.geschichte, grades: { 1: 5.0, 2: 5.0, 3: 5.0, 4: 4.5 }, category: 'Ergänzungsbereich' },
    { subject: t.teacherEvaluation.subjects.technik, grades: { 1: '—', 2: '—', 3: 5.0, 4: 5.0 }, category: 'Ergänzungsbereich' },
    // Specific
    { subject: t.teacherEvaluation.subjects.sport, grades: { 1: 5.0, 2: 5.0, 3: 5.0, 4: 5.0 }, category: 'Sport' },
    { subject: t.teacherEvaluation.subjects.idaf, grades: { 1: '—', 2: '—', 3: 5.5, 4: 4.5 }, category: 'Interdisziplinäres Arbeiten' },
  ];

  // bwd area cuts / averages per semester
  const bwdAverages: { [semester: number]: { grundlagen: number; schwerpunkt: number; ergaenzung: number; gesamt: number } } = {
    1: { grundlagen: 4.7, schwerpunkt: 4.5, ergaenzung: 5.0, gesamt: 4.7 },
    2: { grundlagen: 4.8, schwerpunkt: 4.5, ergaenzung: 5.0, gesamt: 4.8 },
    3: { grundlagen: 5.0, schwerpunkt: 4.8, ergaenzung: 5.0, gesamt: 5.0 },
    4: { grundlagen: 5.2, schwerpunkt: 5.3, ergaenzung: 4.8, gesamt: 5.2 },
  };

  // bwd Absences and Promotion text
  const bwdStats: { [semester: number]: { excused: number; unexcused: number; status: string } } = {
    1: { excused: 44, unexcused: 0, status: language === 'de' ? 'definitiv aufgenommen' : 'definitely accepted' },
    2: { excused: 13, unexcused: 0, status: language === 'de' ? 'promoviert' : 'promoted' },
    3: { excused: 8, unexcused: 0, status: language === 'de' ? 'promoviert' : 'promoted' },
    4: { excused: 28, unexcused: 0, status: language === 'de' ? 'promoviert' : 'promoted' },
  };

  // gibb Computer Science Modules & ÜKs
  interface GibbModule {
    id: string;
    name: string;
    semester: number;
    grade: number;
    isUek?: boolean;
    description?: string;
  }

  // Use official names but translate details dynamically if needed or show direct Swiss modules
  const gibbModules: GibbModule[] = [
    // Semester 1
    { id: 'M431', name: language === 'de' ? 'Aufträge im eigenen Berufsumfeld selbständig durchführen' : 'Execute mini-projects independently in work context', semester: 1, grade: 6.0, description: language === 'de' ? 'Eigene Arbeiten planen, überwachen, abschliessen & reflektieren' : 'Plan, monitor, close & reflect own daily tasks' },
    { id: 'üK187', name: language === 'de' ? 'ICT-Arbeitsplatz mit Betriebssystem in Betrieb nehmen' : 'Install and commission ICT workstation with OS', semester: 1, grade: 4.5, isUek: true, description: language === 'de' ? 'Überbetrieblicher Kurs: Arbeitsplatzhardware & OS aufbauen' : 'Inter-company course: assemble hardware and install OS' },
    { id: 'M162', name: language === 'de' ? 'Daten analysieren und modellieren' : 'Analyze and model data structures', semester: 1, grade: 4.5, description: language === 'de' ? 'Umgang mit relationalen ER-Diagrammen & Datenstrukturen' : 'Design of relational entity-relationship diagrams' },
    { id: 'M319', name: language === 'de' ? 'Applikationen entwerfen und implementieren' : 'Design and implement applications', semester: 1, grade: 4.0, description: language === 'de' ? 'Prozedurale Programmiergrundlagen und Kontrollstrukturen' : 'Procedural programming concepts and structures' },
    { id: 'M117', name: language === 'de' ? 'Informatik- und Netzwerkinfrastruktur realisieren' : 'Establish IT and network infrastructures', semester: 1, grade: 4.5, description: language === 'de' ? 'Netzwerkadressierung, Switche, Client-Server-Topologien' : 'Network address plans, switches, client-server models' },

    // Semester 2
    { id: 'M231', name: language === 'de' ? 'Datenschutz und Datensicherheit anwenden' : 'Apply data protection and cybersecurity rules', semester: 2, grade: 5.5, description: language === 'de' ? 'DSG-Konformität, Kryptographie & IT-Sicherheitsmassnahmen' : 'DSG compliance, data encryption and security checks' },
    { id: 'M122', name: language === 'de' ? 'Abläufe mit einer Scriptsprache automatisieren' : 'Automate tasks with scripting languages', semester: 2, grade: 5.5, description: language === 'de' ? 'Powershell / Bash Automation & OS Task Scheduling' : 'Powershell or Shell automation and script scheduler' },
    { id: 'üK106', name: language === 'de' ? 'Datenbanken abfragen, bearbeiten und warten' : 'Query, edit and maintain SQL databases', semester: 2, grade: 5.5, isUek: true, description: language === 'de' ? 'Überbetrieblicher Kurs: Fortgeschrittene SQL-Operatoren' : 'Inter-company course: advanced joins and database DML' },
    { id: 'M114', name: language === 'de' ? 'Codierungs-, Kompressions- und Verschlüsselungsverfahren' : 'Coding, compression & cryptographic methods', semester: 2, grade: 4.0, description: language === 'de' ? 'Binärarithmetik, Hashfunktionen & asymmetrische Verschlüsselung' : 'Binary arithmetics, hashing, asymmetric algorithms' },
    { id: 'M164', name: language === 'de' ? 'Datenbanken erstellen und Daten einfügen' : 'Create databases and insert structured data', semester: 2, grade: 4.0, description: language === 'de' ? 'SQL-DDL/DML, Tabellenerstellung & Fremdschlüssel-Beziehungen' : 'Relational schema creation, foreign key constraints' },

    // Semester 3
    { id: 'M320', name: language === 'de' ? 'Objektorientiert programmieren' : 'Perform Object-Oriented Programming (OOP)', semester: 3, grade: 5.0, description: language === 'de' ? 'OOP-Ansatz, Klassen, Vererbung & Polymorphie in C#' : 'OOP principles, inheritance, and polymorphism in C#' },
    { id: 'M293', name: language === 'de' ? 'Webauftritt erstellen und veröffentlichen' : 'Create and publish premium websites', semester: 3, grade: 6.0, description: language === 'de' ? 'Standardkonformes HTML5, CSS3-Responsive-Layouts & Hosting' : 'HTML5, modern CSS layouts, responsive design & deployment' },
    { id: 'M346', name: language === 'de' ? 'Cloud Lösungen konzipieren und realisieren' : 'Conceptualize and release cloud solutions', semester: 3, grade: 5.5, description: language === 'de' ? 'Ressourcenbereitstellung, Cloud-Konzepte & API-Gateways' : 'Cloud architecture, provisioning and web services' },
    { id: 'M322', name: language === 'de' ? 'Benutzerschnittstellen entwerfen und implementieren' : 'Design and construct user interfaces', semester: 3, grade: 4.5, description: language === 'de' ? 'Figma-Prototyping, Usability-Kriterien & Frontend-UI Programmierung' : 'Figma wireframes, UX guidelines & frontend layouts' },
    { id: 'üK295', name: language === 'de' ? 'Backend für Applikationen realisieren' : 'Realize application backends and controllers', semester: 3, grade: 5.5, isUek: true, description: language === 'de' ? 'Überbetrieblicher Kurs: API-Entwicklung mit Datenbankkopplung' : 'Inter-company course: backend REST APIs and database linking' },

    // Semester 4
    { id: 'M165', name: language === 'de' ? 'NoSQL-Datenbanken einsetzen' : 'Implement NoSQL databases', semester: 4, grade: 5.5, description: language === 'de' ? 'BSON-Dokumentmodell, Indizes, Aggregation & Replica Sets' : 'Document stores, indexing, aggregation & replica sets' },
    { id: 'M347', name: language === 'de' ? 'Dienst mit Container anwenden' : 'Apply service with container', semester: 4, grade: 5.5, description: language === 'de' ? 'Docker, Podman, Container-Images & Microservice Deployment' : 'Docker containers, Podman & microservice deployment' },
    { id: 'M254', name: language === 'de' ? 'Geschäftsprozesse im eigenen Berufsumfeld beschreiben' : 'Describe business processes in work environment', semester: 4, grade: 5.5, description: language === 'de' ? 'Prozessmodellierung (BPMN), Ist-/Soll-Analysen & Abläufe' : 'Business process modeling (BPMN) & workflow analysis' },
    { id: 'M426', name: language === 'de' ? 'Software mit agilen Methoden entwickeln' : 'Develop software using agile methods', semester: 4, grade: 6.0, description: language === 'de' ? 'Scrum, Sprints, User Stories, Product Backlog & Teamarbeit' : 'Agile Scrum workflow, sprints & software delivery' },
    { id: 'üK294', name: language === 'de' ? 'Frontend einer interaktiven Webapplikation realisieren' : 'Realize frontend of interactive web application', semester: 4, grade: 5.5, isUek: true, description: language === 'de' ? 'Überbetrieblicher Kurs: Interactive Single-Page Apps & REST API' : 'Inter-company course: Interactive SPAs & API integration' },
  ];

  // Gibb cumulative results and absences
  const gibbAverages: { [semester: number]: number } = {
    1: 4.7,
    2: 4.9,
    3: 5.3,
    4: 5.6,
  };

  const gibbAbsences: { [semester: number]: { excused: number; unexcused: number } } = {
    1: { excused: 4, unexcused: 0 },
    2: { excused: 8, unexcused: 0 },
    3: { excused: 6, unexcused: 0 },
    4: { excused: 0, unexcused: 0 },
  };

  return (
    <section id="feedback" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream border-t border-brand-pink/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-sage/10 text-brand-sage rounded-full font-mono text-xs font-semibold uppercase">
            <Award className="w-3.5 h-3.5" />
            {t.teacherEvaluation.badge}
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-brand-wine tracking-tight">
            {t.teacherEvaluation.title}
          </h2>
          <div className="h-0.5 w-16 bg-brand-sage mx-auto rounded-full" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-dark/80 font-sans">
            {t.teacherEvaluation.desc}
          </p>
        </div>

        {/* Institution selector capsules */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-brand-pink/15 rounded-2xl border border-brand-pink/25 shadow-xs relative">
            {(['bwd', 'gibb'] as const).map((school) => {
              const isActive = activeSchool === school;
              const Icon = school === 'bwd' ? Building2 : BookOpen;
              const label = school === 'bwd'
                ? t.teacherEvaluation.schoolBwd
                : t.teacherEvaluation.schoolGibb;

              return (
                <button
                  key={school}
                  onClick={() => setActiveSchool(school)}
                  className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all cursor-pointer z-10 ${
                    isActive ? 'text-brand-cream' : 'text-brand-wine/70 hover:text-brand-wine'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSchoolBg"
                      className="absolute inset-0 bg-brand-wine rounded-xl -z-10 shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Certificate Desk Area */}
        <div className="p-6 sm:p-10 rounded-3xl bg-brand-beige/20 border border-brand-pink/25 shadow-xl space-y-8">
          
          {/* Header Info Sheet */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl bg-brand-cream/80 border border-brand-pink/15 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-wine/10 flex items-center justify-center text-brand-wine">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-mono text-brand-wine-light font-bold uppercase">{t.teacherEvaluation.studentLabel}</span>
                <span className="font-serif font-bold text-base text-brand-wine">Yana Dzhyma</span>
              </div>
            </div>

            <div className="w-px h-8 bg-brand-pink/25 hidden sm:block" />

            <div>
              <span className="block text-xs font-mono text-brand-wine-light font-semibold uppercase">{t.teacherEvaluation.classLabel}</span>
              <span className="text-xs sm:text-sm font-sans font-medium text-brand-dark">
                {t.teacherEvaluation.classVal}
              </span>
            </div>

            <div className="w-px h-8 bg-brand-pink/25 hidden sm:block" />

            {/* Semester Tabs Inside Card */}
            <div className="flex gap-1.5 p-1 bg-brand-pink/10 rounded-xl border border-brand-pink/15 w-full sm:w-auto relative">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSemester(s)}
                  className={`relative flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wide transition-all cursor-pointer z-10 ${
                    selectedSemester === s
                      ? 'text-brand-cream'
                      : 'text-brand-wine/75 hover:bg-brand-pink/10'
                  }`}
                >
                  {selectedSemester === s && (
                    <motion.div
                      layoutId="activeSemesterBg"
                      className="absolute inset-0 bg-brand-wine rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {s}. {language === 'de' ? 'Sem' : 'Sem'}
                  {s === 4 && (
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#edd8c5] border border-brand-wine/25 ml-1.5 align-middle shadow-xs" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSchool}-${selectedSemester}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="space-y-8"
            >
              {/* Quick Summary Dashboard Widgets */}
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-brand-cream/60 border border-brand-pink/20 flex flex-col justify-between text-center sm:text-left">
                    <span className="text-[10px] font-mono text-brand-wine font-semibold uppercase tracking-wider block">
                      {t.teacherEvaluation.avgTitle}
                    </span>
                    <div className="my-2 flex items-baseline justify-center sm:justify-start gap-2">
                      <span className="text-4xl font-serif font-bold text-brand-wine">
                        {activeSchool === 'bwd'
                          ? bwdAverages[selectedSemester].gesamt.toFixed(1)
                          : gibbAverages[selectedSemester].toFixed(1)}
                      </span>
                      <span className="text-xs font-mono text-brand-sage font-semibold uppercase">
                        {t.teacherEvaluation.avgSub} {selectedSemester}. {language === 'de' ? 'Sem.' : 'Sem.'}
                      </span>
                    </div>
                    <p className="text-[11px] font-sans text-brand-dark/70">
                      {activeSchool === 'bwd' 
                        ? t.teacherEvaluation.avgDescBwd
                        : t.teacherEvaluation.avgDescGibb}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-brand-cream/60 border border-brand-pink/20 flex flex-col justify-between text-center sm:text-left">
                    <span className="text-[10px] font-mono text-brand-wine font-semibold uppercase tracking-wider block">
                      {t.teacherEvaluation.absencesTitle}
                    </span>
                    <div className="my-2 space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm font-mono text-brand-dark">
                        <span>{t.teacherEvaluation.excusedLabel}:</span>
                        <span className="font-bold text-brand-wine">
                          {activeSchool === 'bwd' ? bwdStats[selectedSemester].excused : gibbAbsences[selectedSemester].excused} {t.teacherEvaluation.lessonsLabel}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm font-mono text-brand-dark border-t border-brand-pink/15 pt-1">
                        <span>{t.teacherEvaluation.unexcusedLabel}:</span>
                        <span className="font-extrabold text-brand-sage flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> 0 {t.teacherEvaluation.lessonsLabel}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] font-sans text-brand-dark/70">
                      {t.teacherEvaluation.absencesDesc}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-brand-wine text-brand-cream flex flex-col justify-between text-center sm:text-left shadow-md">
                    <span className="text-[10px] font-mono text-brand-pink font-semibold uppercase tracking-wider block">
                      {t.teacherEvaluation.promoTitle}
                    </span>
                    <div className="my-3">
                      <span className="block text-xl font-serif font-bold capitalize text-brand-beige">
                        {activeSchool === 'bwd' ? bwdStats[selectedSemester].status : t.teacherEvaluation.gibbPass}
                      </span>
                      <span className="text-[10px] font-mono text-brand-pink uppercase tracking-widest block mt-0.5">
                        {t.teacherEvaluation.promoSub} {selectedSemester} {language === 'de' ? 'erfolgreich absolviert' : 'completed successfully'}
                      </span>
                    </div>
                    <p className="text-[11px] font-sans text-brand-pink/80 leading-snug">
                      {t.teacherEvaluation.promoDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grades Tables - Interactive Rendering */}
              <div className="overflow-x-auto rounded-2xl border border-brand-pink/20 bg-brand-cream/40">
                {activeSchool === 'bwd' ? (
                  // BWD TABLE VIEW
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-brand-pink/10 border-b border-brand-pink/20 text-[10px] font-mono text-brand-wine font-bold uppercase tracking-wider">
                        <th className="p-4">{t.teacherEvaluation.bwdTableSubject}</th>
                        <th className="p-4 text-center">{t.teacherEvaluation.bwdTableGrade} ({selectedSemester}. Sem)</th>
                        <th className="p-4 text-right">{t.teacherEvaluation.bwdTableAvg}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-pink/15 text-brand-dark/95">
                      {/* GRUNDLAGENBEREICH */}
                      <tr className="bg-brand-pink/5 font-semibold text-brand-wine">
                        <td className="p-4 font-mono text-[10px] uppercase tracking-wider">{language === 'de' ? 'Grundlagenbereich' : 'Basic Area'}</td>
                        <td></td>
                        <td className="p-4 text-right font-mono font-bold text-brand-wine">
                          {bwdAverages[selectedSemester].grundlagen.toFixed(1)}
                        </td>
                      </tr>
                      {bwdGrades
                        .filter((g) => g.category === 'Grundlagenbereich')
                        .map((item, idx) => (
                          <tr key={idx} className="hover:bg-brand-pink/5">
                            <td className="p-4 pl-8 font-medium">{item.subject}</td>
                            <td className="p-4 text-center font-mono font-bold text-brand-wine">
                              {typeof item.grades[selectedSemester] === 'number' 
                                ? (item.grades[selectedSemester] as number).toFixed(1) 
                                : item.grades[selectedSemester]}
                            </td>
                            <td className="p-4 text-right text-brand-dark/45 font-mono">—</td>
                          </tr>
                        ))}

                      {/* SCHWERPUNKTBEREICH */}
                      <tr className="bg-brand-pink/5 font-semibold text-brand-wine">
                        <td className="p-4 font-mono text-[10px] uppercase tracking-wider">{language === 'de' ? 'Schwerpunktbereich' : 'Core Focus Area'}</td>
                        <td></td>
                        <td className="p-4 text-right font-mono font-bold text-brand-wine">
                          {bwdAverages[selectedSemester].schwerpunkt.toFixed(1)}
                        </td>
                      </tr>
                      {bwdGrades
                        .filter((g) => g.category === 'Schwerpunktbereich')
                        .map((item, idx) => (
                          <tr key={idx} className="hover:bg-brand-pink/5">
                            <td className="p-4 pl-8 font-medium">{item.subject}</td>
                            <td className="p-4 text-center font-mono font-bold text-brand-wine">
                              {typeof item.grades[selectedSemester] === 'number' 
                                ? (item.grades[selectedSemester] as number).toFixed(1) 
                                : item.grades[selectedSemester]}
                            </td>
                            <td className="p-4 text-right text-brand-dark/45 font-mono">—</td>
                          </tr>
                        ))}

                      {/* ERGÄNZUNGSBEREICH */}
                      <tr className="bg-brand-pink/5 font-semibold text-brand-wine">
                        <td className="p-4 font-mono text-[10px] uppercase tracking-wider">{language === 'de' ? 'Ergänzungsbereich' : 'Complementary Area'}</td>
                        <td></td>
                        <td className="p-4 text-right font-mono font-bold text-brand-wine">
                          {bwdAverages[selectedSemester].ergaenzung.toFixed(1)}
                        </td>
                      </tr>
                      {bwdGrades
                        .filter((g) => g.category === 'Ergänzungsbereich')
                        .map((item, idx) => (
                          <tr key={idx} className="hover:bg-brand-pink/5">
                            <td className="p-4 pl-8 font-medium">{item.subject}</td>
                            <td className="p-4 text-center font-mono font-bold text-brand-wine">
                              {typeof item.grades[selectedSemester] === 'number' 
                                ? (item.grades[selectedSemester] as number).toFixed(1) 
                                : item.grades[selectedSemester]}
                            </td>
                            <td className="p-4 text-right text-brand-dark/45 font-mono">—</td>
                          </tr>
                        ))}

                      {/* BESONDERE FÄCHER */}
                      <tr className="bg-brand-pink/5 font-semibold text-brand-wine">
                        <td className="p-4 font-mono text-[10px] uppercase tracking-wider">{language === 'de' ? 'Übrige Fächer & Arbeiten' : 'Other Subjects & Project Works'}</td>
                        <td></td>
                        <td className="p-4 text-right font-mono font-bold text-brand-dark/45">—</td>
                      </tr>
                      <tr className="hover:bg-brand-pink/5">
                        <td className="p-4 pl-8 font-medium">{t.teacherEvaluation.subjects.sport}</td>
                        <td className="p-4 text-center font-mono font-bold text-brand-wine">5.0</td>
                        <td className="p-4 text-right text-brand-dark/45 font-mono">—</td>
                      </tr>
                      <tr className="hover:bg-brand-pink/5">
                        <td className="p-4 pl-8 font-medium">{t.teacherEvaluation.subjects.idaf}</td>
                        <td className="p-4 text-center font-mono font-bold text-brand-wine">
                          {selectedSemester === 3 ? '5.5' : selectedSemester === 4 ? '4.5' : '—'}
                        </td>
                        <td className="p-4 text-right text-brand-dark/45 font-mono">—</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  // GIBB TABLE VIEW
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-brand-pink/10 border-b border-brand-pink/20 text-[10px] font-mono text-brand-wine font-bold uppercase tracking-wider">
                        <th className="p-4 w-28">{t.teacherEvaluation.gibbTableId}</th>
                        <th className="p-4">{t.teacherEvaluation.gibbTableSubject}</th>
                        <th className="p-4 text-center">{t.teacherEvaluation.gibbTableGrade}</th>
                        <th className="p-4 text-right">{t.teacherEvaluation.gibbTableProp}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-pink/15 text-brand-dark/95">
                      {gibbModules
                        .filter((m) => m.semester === selectedSemester)
                        .map((item, idx) => (
                          <tr key={idx} className="hover:bg-brand-pink/5">
                            <td className="p-4 font-mono font-bold text-brand-wine">{item.id}</td>
                            <td className="p-4">
                              <span className="block font-semibold">{item.name}</span>
                              <span className="block text-[10px] text-brand-wine-light/80 mt-0.5">{item.description}</span>
                            </td>
                            <td className="p-4 text-center">
                              <span className={`inline-block px-3 py-1 rounded-md font-mono font-extrabold text-sm ${
                                item.grade >= 5.5 
                                  ? 'bg-brand-sage/15 text-brand-sage text-base border border-brand-sage/30' 
                                  : 'bg-brand-pink/30 text-brand-wine'
                              }`}>
                                {item.grade.toFixed(1)}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                                item.isUek 
                                  ? 'bg-brand-sage/10 text-brand-sage border border-brand-sage/20'
                                  : 'bg-brand-wine/10 text-brand-wine border border-brand-wine/20'
                              }`}>
                                {item.isUek ? t.teacherEvaluation.gibbUekLabel : t.teacherEvaluation.gibbNonUekLabel}
                              </span>
                            </td>
                          </tr>
                        ))}
                      
                      {/* Cumulative line */}
                      <tr className="bg-brand-pink/5 font-semibold text-brand-wine text-xs sm:text-sm">
                        <td className="p-4 font-mono">{t.teacherEvaluation.gibbTableGpa}</td>
                        <td className="p-4">{t.teacherEvaluation.gibbTableGpaDesc}</td>
                        <td className="p-4 text-center font-mono font-bold text-brand-wine bg-brand-pink/20 text-base">
                          {gibbAverages[selectedSemester].toFixed(1)}
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-[10px] font-mono text-brand-wine uppercase">{t.teacherEvaluation.gibbTableGpaLabel}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>

              {/* Visual Replica & Explanatory disclaimer */}
              <div className="p-5 rounded-2xl bg-brand-cream/80 border border-brand-pink/15 space-y-3">
                <span className="text-[10px] font-mono text-brand-wine font-bold uppercase tracking-wider block">
                  {t.teacherEvaluation.noteTitle}
                </span>
                <p className="text-xs text-brand-wine-light font-sans leading-relaxed">
                  {selectedSemester >= 3 ? t.teacherEvaluation.noteDesc3 : t.teacherEvaluation.noteDescOther}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

