/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { 
  Play, Video, ArrowRight, AppWindow, 
  Layout, Server, GitBranch, Cpu, Lock, Layers 
} from 'lucide-react';
import { ProjectAbstract } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

import urlShortenerImg from '/argocd.png';
import codeSnpImg from '/codesnp.png';
import game2048Img from '/2048.png';
import matchaEventImg from '/mockup matchaevent.png';
import portfolioImg from '/website.png';
import pastadbImg from '/pastadb.png';

import webEvolutionVideo from '/webauftrit.mp4';
import dreesifyVideo from '/dressify.mp4';
import eventlyVideo from '/evently.mp4';
import mauiVideo from '/speisekarte.mp4'

export default function Projects() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'school' | 'private'>('all');
  const [selectedProject, setSelectedProject] = useState<string>('website');

  // Video player state for video-based project showcases
  const [isDreesifyPlaying, setIsDreesifyPlaying] = useState<boolean>(false);
  const dreesifyVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isWebEvolutionPlaying, setIsWebEvolutionPlaying] = useState<boolean>(false);
  const webEvolutionVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isEventlyPlaying, setIsEventlyPlaying] = useState<boolean>(false);
  const eventlyVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isMauiPlaying, setIsMauiPlaying] = useState<boolean>(false);
  const mauiVideoRef = useRef<HTMLVideoElement | null>(null);

  const toggleDreesifyVideo = () => {
    if (dreesifyVideoRef.current) {
      if (isDreesifyPlaying) {
        dreesifyVideoRef.current.pause();
      } else {
        dreesifyVideoRef.current.play().catch(err => console.log("Video playback blocked:", err));
      }
      setIsDreesifyPlaying(!isDreesifyPlaying);
    }
  };

  const toggleWebEvolutionVideo = () => {
    if (webEvolutionVideoRef.current) {
      if (isWebEvolutionPlaying) {
        webEvolutionVideoRef.current.pause();
      } else {
        webEvolutionVideoRef.current.play().catch(err => console.log("Video playback blocked:", err));
      }
      setIsWebEvolutionPlaying(!isWebEvolutionPlaying);
    }
  };

  const toggleEventlyVideo = () => {
    if (eventlyVideoRef.current) {
      if (isEventlyPlaying) {
        eventlyVideoRef.current.pause();
      } else {
        eventlyVideoRef.current.play().catch(err => console.log("Video playback blocked:", err));
      }
      setIsEventlyPlaying(!isEventlyPlaying);
    }
  };

  const toggleMauiVideo = () => {
    if (mauiVideoRef.current) {
      if (isMauiPlaying) {
        mauiVideoRef.current.pause();
      } else {
        mauiVideoRef.current.play().catch(err => console.log("Video playback blocked:", err));
      }
      setIsMauiPlaying(!isMauiPlaying);
    }
  };

  // Master Project Abstracts
  const projectsData: ProjectAbstract[] = t.projects.projectsList.map((proj) => {
    let mediaType: 'photo' | 'video' | 'interactive' = 'photo';
    if (['dreesify', 'speisekarte', 'webauftrit', 'evently'].includes(proj.id)) {
      mediaType = 'video';
    }
    return {
      ...proj,
      mediaType,
    } as ProjectAbstract;
  });

  const filteredProjects = projectsData.filter((proj) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'school') return proj.category === 'School';
    return proj.category === 'Private';
  });

  // Sync selected project when tab changes
  useEffect(() => {
    const isStillAvailable = filteredProjects.some((p) => p.id === selectedProject);
    if (!isStillAvailable && filteredProjects.length > 0) {
      setSelectedProject(filteredProjects[0].id);
    }
  }, [activeTab]);

  const activeProjDetails = projectsData.find((p) => p.id === selectedProject) || projectsData[0];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream border-t border-brand-pink/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-brand-wine tracking-tight">
            {t.projects.title}
          </h2>
          <div className="h-0.5 w-16 bg-brand-sage mx-auto rounded-full" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-dark/80 font-sans">
            {t.projects.desc}
          </p>
        </div>

        {/* Tab Filter buttons */}
        <div className="flex justify-center gap-3 mb-10 border-b border-brand-pink/30 pb-4 flex-wrap relative" id="project-tabs">
          {(['all', 'school', 'private'] as const).map((tab) => {
            const isActive = activeTab === tab;
            const label = tab === 'all'
              ? t.projects.filterAll
              : tab === 'school'
                ? t.projects.filterSchool
                : t.projects.filterPrivate;
                
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide cursor-pointer transition-colors ${
                  isActive ? 'text-brand-wine' : 'text-brand-wine/60 hover:text-brand-wine'
                }`}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="activeProjTabLine"
                    className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-brand-wine z-10"
                    transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Project Catalog */}
          <div className="lg:col-span-4 space-y-3">
            <span className="block text-xs font-mono font-bold uppercase tracking-widest text-brand-wine/60 mb-2">
              {t.projects.catalog}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.22 }}
                className="space-y-3"
              >
                {filteredProjects.map((proj) => {
                  const isActive = selectedProject === proj.id;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProject(proj.id)}
                      id={`btn-select-project-${proj.id}`}
                      className={`relative w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between z-10 cursor-pointer overflow-hidden ${
                        isActive
                          ? 'text-brand-cream border-brand-pink-dark shadow-md'
                          : 'bg-brand-beige/20 border-brand-pink/20 hover:bg-brand-beige/45 text-brand-wine'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeProjSidebarBg"
                          className="absolute inset-0 bg-brand-wine -z-10"
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        />
                      )}
                      <div>
                        <span className={`inline-block text-[9px] font-mono font-semibold uppercase px-2 py-0.5 rounded-sm mb-1.5 ${
                          isActive ? 'bg-brand-cream/25 text-brand-cream' : 'bg-brand-pink-dark/25 text-brand-wine'
                        }`}>
                          {proj.category === 'School' ? t.projects.filterSchool : t.projects.filterPrivate}
                        </span>
                        <h3 className="font-display font-bold text-sm sm:text-base">{proj.title}</h3>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-brand-sage-light' : 'text-brand-wine/40'}`} />
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project Details Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.22 }}
                className="p-6 sm:p-8 rounded-3xl bg-brand-beige/20 border border-brand-pink/25 shadow-xs space-y-8"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-brand-pink/30 pb-6">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded bg-brand-wine text-brand-cream text-[10px] font-mono uppercase font-bold">
                        {activeProjDetails.category === 'School' ? t.projects.filterSchool : t.projects.filterPrivate}
                      </span>
                      <span className="text-xs font-mono text-brand-dark/60">
                        {t.projects.fieldRole}: {activeProjDetails.role}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-wine mt-2">
                      {activeProjDetails.title}
                    </h3>
                  </div>
                  
                  <span className="p-3 rounded-2xl bg-brand-wine/5 border border-brand-pink/20 text-brand-wine">
                    {activeProjDetails.mediaType === 'interactive' && <AppWindow className="w-6 h-6" />}
                    {activeProjDetails.mediaType === 'photo' && <Layout className="w-6 h-6" />}
                    {activeProjDetails.mediaType === 'video' && <Video className="w-6 h-6" />}
                  </span>
                </div>

                {/* Scientific Abstract Structure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="project-abstract">
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-brand-sage font-bold tracking-wider">01 // {t.projects.fieldProblem}</span>
                      <p className="text-xs sm:text-sm text-brand-dark/90 mt-1 leading-relaxed font-normal">
                        {activeProjDetails.problem}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-brand-sage font-bold tracking-wider">02 // {t.projects.fieldSolution}</span>
                      <p className="text-xs sm:text-sm text-brand-dark/90 mt-1 leading-relaxed font-normal">
                        {activeProjDetails.solution}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-brand-sage font-bold tracking-wider">03 // {t.projects.fieldOutcome}</span>
                      <p className="text-xs sm:text-sm text-brand-dark/90 mt-1 leading-relaxed font-normal">
                        {activeProjDetails.outcome}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-brand-sage font-bold tracking-wider">{t.projects.fieldTech}</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {activeProjDetails.technologies.map((tItem, idx) => (
                          <span key={idx} className="text-[10px] font-mono bg-brand-pink/30 text-brand-wine px-2 py-0.5 rounded">
                            {tItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clean Project Media & Technical Documentation Section */}
                <div className="border-t border-brand-pink/30 pt-8" id="project-showcase">

                {/* 1. Dreesify Video */}
                  {activeProjDetails.id === 'dreesify' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">Dreesify App Video</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">Digitale Kleiderschrankverwaltung &amp; Wetter-Outfit-Empfehlungen (Mobile Format)</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-pink/10 border border-brand-pink/20 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          REACT NATIVE & EXPO
                        </span>
                      </div>

                      {/* Phone / Mobile Video Layout */}
                      <div className="flex justify-center items-center p-4 sm:p-6 bg-black/5 rounded-2xl border border-brand-pink/20">
                        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[8/16] rounded-[2.5rem] overflow-hidden border-[6px] border-brand-wine/30 bg-black shadow-2xl">
                          <video
                            ref={dreesifyVideoRef}
                            src={dreesifyVideo}
                            loop
                            playsInline
                            controls
                            onClick={toggleDreesifyVideo}
                            onPlay={() => setIsDreesifyPlaying(true)}
                            onPause={() => setIsDreesifyPlaying(false)}
                          />
                          {!isDreesifyPlaying && (
                            <button
                              type="button"
                              onClick={toggleDreesifyVideo}
                              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-wine/85 text-brand-cream border-2 border-brand-pink/30 flex items-center justify-center shadow-2xl backdrop-blur-sm hover:scale-110 transition-all cursor-pointer z-10"
                              aria-label="Play video"
                            >
                              <Play className="w-8 h-8 fill-brand-cream ml-1" />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="text-[9px] font-mono text-center text-brand-wine/60">
                        https://gitlab.com/Kitt26/projektwoche_dressify
                      </div>
                    </div>
                  )}
                  {/* 1. URL-Shortener (Modul 210) */}
                  {activeProjDetails.id === 'url_shortener' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm sm:text-base text-brand-wine">URL-Shortener (Modul 210) Screenshot</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">DevOps-Cockpit (ArgoCD &amp; GitLab CI Continuous Delivery Pipeline)</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/25 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          GITLAB CI & ARGOCD
                        </span>
                      </div>

                      <div className="rounded-2xl overflow-hidden border border-brand-pink/20 shadow-sm bg-black/5">
                        <img 
                          src={urlShortenerImg} 
                          alt="URL-Shortener GitOps Dashboard Screenshot" 
                          className="w-full h-auto object-cover block"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {/* 2. CodeSNP Code-Sharing Platform (Modul 426) */}
                  {activeProjDetails.id === 'codesnp' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm sm:text-base text-brand-wine">CodeSNP Platform (Modul 426) Screenshot</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">Live Interface &amp; Dashboard (MERN Stack)</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/25 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          MERN STACK & JEST
                        </span>
                      </div>

                      <div className="rounded-2xl overflow-hidden border border-brand-pink/20 shadow-sm bg-black/5">
                        <img 
                          src={codeSnpImg} 
                          alt="CodeSNP Live Interface &amp; Dashboard Screenshot" 
                          className="w-full h-auto object-cover block"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {/* 3. Personal Website Portfolio */}
                  {activeProjDetails.id === 'website' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">IMS-Website Screenshot</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">Visuelles Abbild meines ersten Webprojekts</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-brand-wine/10 border border-brand-pink/20 text-[9px] font-mono text-brand-wine uppercase tracking-wider font-bold">
                          HTML5 & CSS3
                        </span>
                      </div>

                      <div className="rounded-2xl overflow-hidden border border-brand-pink/20 shadow-sm bg-black/5">
                        <img 
                          src={portfolioImg} 
                          alt="Eigenes Website-Portfolio Screenshot" 
                          className="w-full h-auto object-cover block"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-[9px] font-mono text-center text-brand-wine/60">
                        http://imsbern.ch/ims2024/dzhyma/
                      </div>
                    </div>
                  )}

                  {/* 4. C# Game 2048 */}
                  {activeProjDetails.id === 'game_2048' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">C# Windows Forms Projekt</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">einfaches 2048 Spiel</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/25 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          C# & WINDOWS FORMS
                        </span>
                      </div>

                      <div className="rounded-2xl overflow-hidden border border-brand-pink/20 shadow-sm bg-black/5">
                        <img 
                          src={game2048Img} 
                          alt="C#-Spiel 2048 Screenshot" 
                          className="w-full h-auto object-cover block"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {/* 5. SQLite Database (Modul 164) */}
                  {activeProjDetails.id === 'sqlite_db' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-brand-pink/20 gap-4">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">Relationales SQL-Datenbankschema</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">Relationale Datenbanken</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/20 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                            SQLITE3 & ERD
                        </span>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-md bg-black">
                        <img 
                          src={pastadbImg} 
                          alt="Pasta Restaurant ERD Datenbankschema Diagramm" 
                          className="w-full h-auto object-cover block"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {/* 6. NoSQL MongoDB (Modul 165) */}
                  {activeProjDetails.id === 'event_management_mongodb' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-5 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">NoSQL MongoDB Dokumentenstruktur (Modul 165)</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">BSON-Dokumentdatenmodell &amp; Replica Sets</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/20 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          MONGODB & NOSQL
                        </span>
                      </div>

                      <div className="space-y-4 text-xs sm:text-sm text-brand-dark/90 leading-relaxed">
                        <p>
                          In diesem Schulprojekt wurden hochperformante NoSQL-Datenbankstrukturen mit MongoDB konzipiert. Anstelle starrer Tabellen nutzt die Event-Verwaltung dynamische BSON-Dokumente für flexible Veranstalter-, Standort- und Ticketdaten.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="p-3 bg-brand-wine/5 rounded-xl border border-brand-pink/20 space-y-1">
                            <span className="text-xs font-bold text-brand-wine font-mono block">Flexible BSON-Dokumente</span>
                            <p className="text-[11px] text-brand-wine/80 leading-relaxed">Schemafreie Dokumentenstruktur zur Speicherung variierender Event-Attribute ohne Migrationsaufwand.</p>
                          </div>
                          <div className="p-3 bg-brand-wine/5 rounded-xl border border-brand-pink/20 space-y-1">
                            <span className="text-xs font-bold text-brand-wine font-mono block">Ausfallsichere Replica Sets</span>
                            <p className="text-[11px] text-brand-wine/80 leading-relaxed">3-Knoten-Replika-Set mit automatischer Failover-Logik zur Sicherstellung absoluter Ausfallsicherheit.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 7. URL-Shortener (Modul 210) */}
                  {activeProjDetails.id === 'url_shortener' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm sm:text-base text-brand-wine">URL-Shortener (Modul 210) Screenshot</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">DevOps-Cockpit (ArgoCD &amp; GitLab CI Continuous Delivery Pipeline)</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/25 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          GITLAB CI & ARGOCD
                        </span>
                      </div>

                      <div className="rounded-2xl overflow-hidden border border-brand-pink/20 shadow-sm bg-black/5">
                        <img 
                          src={urlShortenerImg} 
                          alt="URL-Shortener GitOps Dashboard Screenshot" 
                          className="w-full h-auto object-cover block"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {/* 8. .NET MAUI Restaurant Menu (Laptop Format Video) */}
                  {activeProjDetails.id === 'restaurant_menu_maui' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">.NET MAUI App Video</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">.NET MAUI MVVM Desktop &amp; Tablet GUI Applikation</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/25 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          C# & .NET MAUI
                        </span>
                      </div>

                      {/* Laptop Mockup Frame */}
                      <div className="flex justify-center items-center p-3 sm:p-6 bg-black/5 rounded-2xl border border-brand-pink/20">
                        <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl">
                          <div className="relative bg-[#1a1a1a] rounded-t-2xl p-2.5 pt-3 border-x border-t border-gray-700/80 shadow-2xl">
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-gray-600 flex items-center justify-center">
                              <div className="w-0.5 h-0.5 rounded-full bg-blue-500/80"></div>
                            </div>
                            <div className="relative aspect-[16/8] rounded-lg overflow-hidden bg-black shadow-inner">
                              <video
                                ref={mauiVideoRef}
                                src={mauiVideo}
                                loop
                                playsInline
                                controls
                                onClick={toggleMauiVideo}
                              />
                            </div>
                          </div>
                          <div className="relative bg-gradient-to-b from-[#2e2e2e] via-[#222222] to-[#181818] h-3.5 sm:h-4 rounded-b-xl border-x border-b border-gray-800 shadow-md flex justify-center items-center">
                            <div className="w-12 sm:w-16 h-1 bg-gray-600/60 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 9. Matcha After Dark (Modul 294) */}
                  {activeProjDetails.id === 'matcha_event' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">Matcha After Dark (Modul 294)</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">React &amp; PocketBase Event Plattform</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/20 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          REACT & POCKETBASE
                        </span>
                      </div>

                      <div className="rounded-2xl overflow-hidden border border-brand-pink/20 shadow-sm bg-black/5">
                         <img 
                          src={matchaEventImg} 
                          alt="Matcha Event-Planer User Interface Design" 
                          className="w-full h-auto object-cover block"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                        <div className="text-[9px] font-mono text-center text-brand-wine/60">
                        https://github.com/yayanadzhyma/Matcha-After-Dark
                      </div>
                    </div>
                  )}

                  {/* 10. Heat-Calculator (Modul 320) */}
                  {activeProjDetails.id === 'heat_calculator' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-4 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">Thermodynamischer Java Rechner (Modul 320)</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">Java SE, JUnit 5 &amp; Clean Code OOP</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/20 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          JAVA
                        </span>
                      </div>
                      <p className="text-xs text-brand-wine/80 leading-relaxed">
                        Entwicklung einer objektorientierten Java SE Applikation zur präzisen thermodynamischen Simulation von Wärmeenergieübertragungen (Q = m * c * ΔT). Die Geschäftslogik ist durch lückenlose Komponententests mit JUnit 5 abgesichert.
                      </p>
                    </div>
                  )}

                  {/* 11. Webauftritt Portfolio (Modul 293) */}
                  {activeProjDetails.id === 'web_evolution' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">Webauftritt Portfolio Video (Modul 293)</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">
                            Dreiteiliges Schulprojekt // Website für Rezept-Blog, Website für ein Restaurant & Health Center
                          </p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-pink/10 border border-brand-pink/20 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          HTML5, CSS3 & JS
                        </span>
                      </div>

                    {/* Laptop Mockup Frame */}
                      <div className="flex justify-center items-center p-3 sm:p-6 bg-black/5 rounded-2xl border border-brand-pink/20">
                        <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl">
                          <div className="relative bg-[#1a1a1a] rounded-t-2xl p-2.5 pt-3 border-x border-t border-gray-700/80 shadow-2xl">
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-gray-600 flex items-center justify-center">
                              <div className="w-0.5 h-0.5 rounded-full bg-blue-500/80"></div>
                            </div>
                            <div className="relative aspect-[16/7.7] rounded-lg overflow-hidden bg-black shadow-inner">
                              <video
                                ref={mauiVideoRef}
                                src={webEvolutionVideo}
                                loop
                                playsInline
                                controls
                                onClick={toggleMauiVideo}
                              />
                            </div>
                          </div>
                          <div className="relative bg-gradient-to-b from-[#2e2e2e] via-[#222222] to-[#181818] h-3.5 sm:h-4 rounded-b-xl border-x border-b border-gray-800 shadow-md flex justify-center items-center">
                            <div className="w-12 sm:w-16 h-1 bg-gray-600/60 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 12. DevOps & Kubernetes Setup (Modul 347) */}
                  {activeProjDetails.id === 'kubernetes_website' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-4 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">DevOps &amp; Kubernetes Setup (Modul 347)</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">Docker, Podman, Kubernetes, RabbitMQ &amp; Redis</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-wine/10 border border-brand-pink/20 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          K8S & DOCKER
                        </span>
                      </div>
                      <p className="text-xs text-brand-wine/80 leading-relaxed">
                        Entwicklung und Bereitstellung einer verteilten Microservice-Architektur mit Docker-Netzwerken, Docker Compose, Podman-Instanzen und einem Kubernetes-Cluster. Konzeption von Pod-Replicas, Redis-Master/Slave Datenbanken und asynchroner Kommunikation via RabbitMQ Message Broker.
                      </p>
                    </div>
                  )}

                 {/* 13. Evently (Modul 335) Video */}
                  {activeProjDetails.id === 'evently' && (
                    <div className="p-6 rounded-2xl bg-brand-beige/40 border border-brand-pink/30 space-y-6 text-brand-wine">
                      <div className="flex justify-between items-center pb-4 border-b border-brand-pink/20">
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-wine">Evently Mobile App Video (Modul 335)</h4>
                          <p className="text-[10px] text-brand-wine/70 font-mono">React Native &amp; Firebase iOS App (Mobile Format)</p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-brand-pink/10 border border-brand-pink/20 text-brand-wine font-mono text-[9px] uppercase tracking-widest rounded-full font-bold">
                          REACT NATIVE & FIREBASE
                        </span>
                      </div>

                      {/* Phone / Mobile Video Layout */}
                      <div className="flex justify-center items-center p-4 sm:p-6 bg-black/5 rounded-2xl border border-brand-pink/20">
                        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[8/16] rounded-[2.5rem] overflow-hidden border-[6px] border-brand-wine/30 bg-black shadow-2xl">
                          <video
                            ref={eventlyVideoRef}
                            src={eventlyVideo}
                            loop
                            playsInline
                            controls
                             onPlay={() => setIsDreesifyPlaying(true)}
                            onPause={() => setIsDreesifyPlaying(false)}
                          />
                          {!isDreesifyPlaying && (
                            <button
                              type="button"
                              onClick={toggleDreesifyVideo}
                              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-wine/85 text-brand-cream border-2 border-brand-pink/30 flex items-center justify-center shadow-2xl backdrop-blur-sm hover:scale-110 transition-all cursor-pointer z-10"
                              aria-label="Play video"
                            >
                              <Play className="w-8 h-8 fill-brand-cream ml-1" />
                            </button>
                          )}
                        </div>
                      </div>
                        <div className="text-[9px] font-mono text-center text-brand-wine/60">
                        https://github.com/yayanadzhyma/Evently
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
