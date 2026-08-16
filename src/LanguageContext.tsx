/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProjectAbstract, Skill, TimelineEvent } from './types';
import pilatesImage from '/pilates.jpg';
import bowlImage from '/bowl.jpg';
import parisImage from '/paris.jpg';
import wandernImage from '/wandern.jpg';
import seeImage from '/see.jpg';

export type Language = 'de' | 'en';

export interface TranslationDictionary {
  navbar: {
    hero: string;
    resume: string;
    skills: string;
    projects: string;
    about: string;
    feedback: string;
    contact: string;
  };
  accessGate: {
    title: string;
    badge: string;
    desc: string;
    labelName: string;
    placeholderName: string;
    labelCode: string;
    placeholderCode: string;
    btnUnlock: string;
    btnLoading: string;
    errorName: string;
    errorCode: string;
    errorDb: string;
    footerSecure: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    desc: string;
    btnProjects: string;
    btnContact: string;
    btnVideo: string;
    videoSubtitle: string;
    modalTitle: string;
    scriptLabel: string;
    scriptText: string;
  };
  resume: {
    title: string;
    desc: string;
    filterAll: string;
    filterEducation: string;
    filterExperience: string;
    certText: string;
    timeline: TimelineEvent[];
  };
  skills: {
    title: string;
    desc: string;
    filterAll: string;
    filterWeb: string;
    filterProgramming: string;
    filterTools: string;
    basic: string;
    pro: string;
    detailTitle: string;
    provenBy: string;
    closeDetail: string;
    philosophyTitle: string;
    philosophyP1: string;
    philosophyP2: string;
    skillsList: Skill[];
    highlights: { [skillName: string]: string[] };
    highlightsFallback: string[];
  };
  projects: {
    title: string;
    desc: string;
    filterAll: string;
    filterSchool: string;
    filterPrivate: string;
    catalog: string;
    detailsTitle: string;
    fieldRole: string;
    fieldTech: string;
    fieldProblem: string;
    fieldSolution: string;
    fieldOutcome: string;
    projectsList: ProjectAbstract[];
  };
  about: {
    title: string;
    desc: string;
    bioQuote: string;
    bioP1: string;
    bioP2: string;
    hobbies: Array<{
      title: string;
      description: string;
      tag: string;
      image: string;
    }>;
  };
  teacherEvaluation: {
    badge: string;
    title: string;
    desc: string;
    semester: string;
    btnBwd: string;
    btnGibb: string;
    gradeAvg: string;
    absenceExcuse: string;
    absenceUnexcuse: string;
    absenceUnit: string;
    statusLabel: string;
    gibbCumulativeAvg: string;
    gibbWarning: string;
    cardDesc: string;
    cardGrade: string;
    cardNoDesc: string;
    german: string;
    french: string;
    english: string;
    maths: string;
    csGibb: string;
    finances: string;
    businessLaw: string;
    historyPol: string;
    techEnv: string;
    sport: string;
    interdis: string;
    subjectsCategory1: string;
    subjectsCategory2: string;
    subjectsCategory3: string;
    statusValue1: string;
    statusValue2: string;
    schoolBwd: string;
    schoolGibb: string;
    studentLabel: string;
    classLabel: string;
    classVal: string;
    avgTitle: string;
    avgSub: string;
    avgDescBwd: string;
    avgDescGibb: string;
    absencesTitle: string;
    excusedLabel: string;
    unexcusedLabel: string;
    lessonsLabel: string;
    absencesDesc: string;
    promoTitle: string;
    promoSub: string;
    promoDesc: string;
    bwdTableSubject: string;
    bwdTableGrade: string;
    bwdTableAvg: string;
    gibbTableId: string;
    gibbTableSubject: string;
    gibbTableGrade: string;
    gibbTableProp: string;
    gibbUekLabel: string;
    gibbNonUekLabel: string;
    gibbTableGpa: string;
    gibbTableGpaDesc: string;
    gibbTableGpaLabel: string;
    noteTitle: string;
    noteDesc3: string;
    noteDescOther: string;
    gibbPass: string;
    subjects: {
      deutsch: string;
      franz: string;
      engl: string;
      math: string;
      inf: string;
      finanz: string;
      recht: string;
      geschichte: string;
      technik: string;
      sport: string;
      idaf: string;
    };
  };
  contact: {
    title: string;
    phoneLabel: string;
    emailLabel: string;
    directEmail: string;
    writeEmailTitle: string;
    writeEmailDesc: string;
    btnDefaultApp: string;
    btnDefaultAppDesc: string;
    btnGmail: string;
    btnGmailDesc: string;
    btnOutlook: string;
    btnOutlookDesc: string;
    badge: string;
    desc: string;
    directTitle: string;
    phoneSub: string;
    emailSub: string;
    partnerTitle: string;
    partnerDesc: string;
    mailAppLabel: string;
    mailAppSub: string;
    gmailLabel: string;
    gmailSub: string;
    outlookLabel: string;
    outlookSub: string;
    responseMsg: string;
  };
  imprint: {
    titleLegal: string;
    labelResp: string;
    titleInst: string;
    bwdDesc: string;
    gibbDesc: string;
    titleDisclaimer: string;
    disclaimerText: string;
  };
}

const translations: Record<Language, TranslationDictionary> = {
  de: {
    navbar: {
      hero: 'Start',
      resume: 'Lebenslauf',
      skills: 'Stärken',
      projects: 'Projekte',
      about: 'Persönliches',
      feedback: 'Noten',
      contact: 'Kontakt',
    },
    accessGate: {
      title: 'Zutritts-Freischaltung erforderlich',
      badge: 'Gesperrter Bereich:',
      desc: 'Zum Schutz schützenswerter Noten, Zeugnisse, Kontaktangaben und persönlicher Details von Yana Dzhyma. Bitte tragen Sie sich kurz ein, um sofortigen Zugriff auf alle gesperrten Bereiche zu erhalten.',
      labelName: 'Ihr Name oder Firmenname',
      placeholderName: 'z. B. Swisscom / Max Muster',
      labelCode: 'Freischaltungscode eingeben',
      placeholderCode: 'z. B. yana2026',
      btnUnlock: 'Bereich entsperren & freischalten',
      btnLoading: 'Freischaltung wird registriert...',
      errorName: 'Bitte geben Sie Ihren Namen oder Ihren Firmennamen ein.',
      errorCode: 'Bitte geben Sie den Freischaltungscode ein.',
      errorDb: 'Verbindungsfehler zur Datenbank. Bitte versuchen Sie es erneut.',
      footerSecure: 'Datendatei gesichert über Firestore',
    },
    hero: {
      badge: 'Engagiert & Detailorientiert',
      title1: 'Brücken bauen',
      title2: 'zwischen kaufmännischer Kompetenz und moderner Softwareentwicklung',
      desc: 'Willkommen in meinem Projektportfolio! Als engagierte IMS-Informatikerin kombiniere ich die kaufmännischen Stärken der bwd Bern, die praxisbezogene Grundausbildung der gibb Bern und der ICT-LearnFactory. Entdecken Sie meine kreativen und technischen Web-Projekte, meinen Lebenslauf und funktionsfähige Applikationen.',
      btnProjects: 'Projekte erkunden',
      btnContact: 'Kontakt',
      btnVideo: 'Video-Vorstellung ansehen (1 Min.)',
      videoSubtitle: 'Vorstellungsvideo • Play',
      modalTitle: 'Vorstellungsvideo — Yana Dzhyma',
     },
    resume: {
      title: 'Lebenslauf',
      desc: 'Erfahren Sie mehr über meine akademische Laufbahn an der bwd Bern, ICT-LearnFactory und gibb Bern, sowie über meine Sprachen & Interessen. Sortieren Sie die Abschnitte für einen individuellen Fokus.',
      filterAll: 'Alle anzeigen',
      filterEducation: 'Ausbildung',
      filterExperience: 'Nebenjobs & Integration',
      certText: 'Vollständigkeits-Zertifikat: Alle Altersstufen, Schulabschnitte und Nebenjobs sind deckungsgenau erfasst.',
      timeline: [
        {
          year: 'Seit Aug 2024',
          title: 'Informatikmittelschule (IMS)',
          organization: 'bwd Bern',
          location: 'Bern, Schweiz',
          description: 'Ausbildung an der Informatikmittelschule bwd Bern: Kaufmännische Berufsmaturität mit IT-Schwerpunkt. Die ideale Kombination aus Wirtschaft und Informatik.',
          type: 'education',
        },
        {
          year: 'Seit Aug 2024',
          title: 'Berufsfachschule Informatik',
          organization: 'gibb Berufsfachschule Bern',
          location: 'Bern, Schweiz',
          description: 'Theoretische und praktische Informatikausbildung in Applikationsentwicklung gemäss dem offiziellen Schweizer Modulplan.',
          type: 'education',
        },
        {
          year: '2025 – 2026',
          title: 'Bereich Praktische Vertiefung',
          organization: 'ICT-LearnFactory',
          location: 'Bern, Schweiz',
          description: 'Praktische Ausbildung zur Vertiefung moderner Programmier- und IT-Konzepte.',
          type: 'education',
        },
        {
          year: 'Apr 2023 – Mai 2026',
          title: 'Nebenjobs',
          organization: 'Jugend-Job-Börse Bern',
          location: 'Bern, Schweiz',
          description: 'Vielseitige, vermittelte Praxisarbeiten: Büroarbeiten, Flyer verteilen, Haushaltshilfe, Gartenpflege, Balkonreinigung sowie gestalterische Beteiligung an der Kampagne «unterwegs, Ja sicher!». Von der Projektleitung ausgezeichnet als sehr zuverlässige, freundliche und engagierte Mitarbeiterin.',
          type: 'experience',
        },
        {
          year: 'Aug 2022 – Juli 2024',
          title: 'Oberstufe',
          organization: 'Hochfeld 1',
          location: 'Bern, Schweiz',
          description: 'Abschluss der obligatorischen Oberstufe in der Stadt Bern mit exzellenter Vorbereitung auf die Aufnahmeprüfung der Informatikmittelschule (IMS).',
          type: 'education',
        },
        {
          year: '2020 – 2023',
          title: 'Informatikkurse',
          organization: 'IT Academy STEP',
          location: 'Tschernihiw, Ukraine',
          description: 'Begleitende, praxisbezogene Informatik- und Designausbildung parallel zur regulären Schulzeit. Umfassender Erwerb digitaler Kompetenzen, darunter Frontend-Webentwicklung (HTML & CSS), Programmierung mit Python, kreative Bildbearbeitung mit Photoshop, Robotik/Robotechnik sowie visuelle Raumgestaltung in den Bereichen Wohnungsdesign und 3D-Modellierung.',
          type: 'education',
        },
        {
          year: 'Mai – Juni 2022',
          title: 'Integrationsklasse',
          organization: 'Mühleberg Schulgemeinde',
          location: 'Mühleberg, Schweiz',
          description: 'Intensiver Spracherwerb (Deutsch) und schnelle akademische sowie kulturelle Integration nach der Einreise aus Tschernihiw, Ukraine.',
          type: 'experience',
        },
        {
          year: '2014 – 2022',
          title: 'Primarschule',
          organization: 'Primarschule #21',
          location: 'Tschernihiw, Ukraine',
          description: 'Primarschulausbildung in der Ukraine vor dem Umzug nach Bern.',
          type: 'education',
        },
      ],
    },
    skills: {
      title: 'Stärken in der Informatik',
      desc: 'Fokus auf Applikationsentwicklung und Webtechnologien. Wählen Sie eine Kategorie, um detaillierte Erklärungen und Anwendungsszenarien zu meiner theoretischen und praktischen Qualifikation zu visualisieren.',
      filterAll: 'Alle Werkzeuge',
      filterWeb: 'Web-Development',
      filterProgramming: 'Programmierung',
      filterTools: 'DevOps & Tools',
      basic: 'Grundlagen',
      pro: 'Profi',
      detailTitle: 'STÄRKE: DETAILANSICHT',
      provenBy: 'Nachweisbar durch:',
      closeDetail: 'Detail Schliessen',
      philosophyTitle: 'Meine Arbeitsphilosophie: Reflexion und die Stärke von KI',
      philosophyP1: 'In der Softwareentwicklung ist mir eines besonders wichtig: Fehler sind für mich keine Rückschläge, sondern die wertvollsten Lernchancen. Ich gehe ganz offen und reflektiert damit um, wenn etwas im Entwicklungsprozess nicht sofort reibungslos klappt. Das selbstständige Analysieren und Lösen solcher Herausforderungen ist genau das, was mich weiterbringt und mir hilft, täglich als Entwicklerin zu wachsen.',
      philosophyP2: 'Dabei nutze ich moderne Technologie ganz gezielt und klug für mich: KI-Tools sehe ich als wertvolle Unterstützung beim Lernen und Entwickeln. Ob für Code-Ideen, strukturierte Suchen nach Fehlermeldungen oder um neue Programmierkonzepte kennenzulernen – ich integriere KI produktiv und durchdacht in meinen Workflow. Das logische Gesamtverständnis und die kritische Kontrolle bleiben dabei natürlich in meiner Hand.',
      skillsList: [
        { name: 'HTML', level: 90, category: 'Web', description: 'Strukturierung moderner Webseiten mit semantischem und barrierefreiem HTML5.' },
        { name: 'CSS', level: 90, category: 'Web', description: 'Styling mit modernen CSS-Methoden wie Grid, Flexbox und Tailwind CSS für responsive Designs.' },
        { name: 'JavaScript', level: 45, category: 'Web', description: 'Konzepte der asynchronen Programmierung, DOM-Manipulation und dynamischen Frontend-Interaktion.' },
        { name: 'TypeScript', level: 48, category: 'Web', description: 'Typsicherheit und statische Typisierung zur fehlerfreien, robusten Skalierung von Webanwendungen.' },
        { name: 'React', level: 61, category: 'Web', description: 'Komponentenbasierte UI-Entwicklung mit modernem State-Management und interaktiven Hooks.' },
        { name: 'Next.js', level: 61, category: 'Web', description: 'Server-Side Rendering, statische Generierung und performante Full-Stack-Routen.' },
        { name: 'Java', level: 40, category: 'Programming', description: 'Objektorientierte Konzepte, Entwurfsmuster und Strukturierung robuster Softwarearchitekturen.' },
        { name: 'Python', level: 78, category: 'Programming', description: 'Automatisierung wiederkehrender Workflows, Datenverarbeitung und algorithmische Prototypen.' },
        { name: 'C++', level: 25, category: 'Programming', description: 'Systemnahe Softwareentwicklung mit hoher Performance und direktem Speichermanagement.' },
        { name: '.NET MAUI', level: 45, category: 'Programming', description: 'Plattformübergreifende Entwicklung nativer Apps für Mobilgeräte- und Desktop-Systeme.' },
        { name: 'Git', level: 73, category: 'DevOps/Tools', description: 'Sichere Versionsverwaltung, strukturiertes Branching und koordiniertes Teamwork.' },
        { name: 'Docker', level: 65, category: 'DevOps/Tools', description: 'Erstellung und Laufzeit-Orchestrierung isolierter Container-Umgebungen für reproduzierbare Deployments.' },
        { name: 'Web APIs', level: 76, category: 'DevOps/Tools', description: 'Implementierung und Integration moderner Internetschnittstellen (REST) und nativer Browser-Funktionen.' },
        { name: 'Vite', level: 44, category: 'DevOps/Tools', description: 'Konfiguration moderner, ultraschneller Build-Tools und lokaler Entwicklungsserver.' },
        { name: 'SQLite', level: 82, category: 'DevOps/Tools', description: 'Kompakte, dateibasierte relationale SQL-Datenbank zur lokalen Datenspeicherung und -nutzung.' },
        { name: 'MongoDB', level: 75, category: 'DevOps/Tools', description: 'Modellierung dokumentenbasierter NoSQL-Datenbanken für flexible, skalierbare Datenstrukturen.' },
        { name: 'Neo4j', level: 55, category: 'DevOps/Tools', description: 'Abbildung und Abfrage hochgradig vernetzter Datenstrukturen mittels Graph-Relationen.' },
        { name: 'Redis', level: 55, category: 'DevOps/Tools', description: 'Schnelles Caching, In-Memory-Datenspeicherung und Optimierung von Reaktionszeiten.' },
        { name: 'Visual Studio Code', level: 75, category: 'DevOps/Tools', description: 'Standard-Entwicklungsumgebung für hocheffizientes Schreiben von Code, Debugging und Git-Integration.' },
        { name: 'Visual Studio', level: 65, category: 'DevOps/Tools', description: 'Umfangreiche Entwicklungsumgebung (IDE) für .NET-, C#- und Desktop-Applikationen.' },
        { name: 'Figma', level: 60, category: 'DevOps/Tools', description: 'Kollaboratives Entwerfen von interaktiven UI/UX-Prototypen, Wireframes und Layouts.' },
        { name: 'Canva', level: 90, category: 'DevOps/Tools', description: 'Gestaltung ansprechender Grafiken, Social-Media-Inhalte und professioneller Präsentationen.' },
        { name: 'Word', level: 92, category: 'DevOps/Tools', description: 'Professionelle Textverarbeitung zur Erstellung von strukturierten Dokumentationen, Berichten und Arbeiten.' },
        { name: 'PowerPoint', level: 90, category: 'DevOps/Tools', description: 'Konzeption und visuelle Aufbereitung abwechslungsreicher und überzeugender Präsentationen.' },
        { name: 'Excel', level: 85, category: 'DevOps/Tools', description: 'Datenanalyse, Tabellenkalkulation, komplexe Formeln und automatisierte Berechnungen.' },
        { name: 'Photoshop', level: 73, category: 'DevOps/Tools', description: 'Umfassende Bildbearbeitung, Retusche und Erstellung hochwertiger Grafik-Assets.' }
      ],
      highlightsFallback: [
        'Praxiserprobte Kenntnisse im schulischen und privaten Kontext',
        'Stete Weiterbildung und Anpassung an moderne Industriestandards',
        'Effiziente Problemlösungskompetenz bei der praktischen Anwendung'
      ],
      highlights: {
        'HTML': [
          'Entwicklung moderner und vollständig responsiver Benutzeroberflächen',
          'Modulares und strukturiertes Arbeiten mit performanten Web-Frameworks',
          'Praktische Umsetzung im Rahmen moderner Web-Projekte'
        ],
        'CSS': [
          'Entwicklung moderner und vollständig responsiver Benutzeroberflächen',
          'Modulares und strukturiertes Arbeiten mit performanten Web-Frameworks',
          'Praktische Umsetzung im Rahmen moderner Web-Projekte'
        ],
        'JavaScript': [
          'Entwicklung moderner und vollständig responsiver Benutzeroberflächen',
          'Modulares und strukturiertes Arbeiten mit performanten Web-Frameworks',
          'Praktische Umsetzung im Rahmen moderner Web-Projekte'
        ],
        'TypeScript': [
          'Entwicklung moderner und vollständig responsiver Benutzeroberflächen',
          'Modulares und strukturiertes Arbeiten mit performanten Web-Frameworks',
          'Praktische Umsetzung im Rahmen moderner Web-Projekte'
        ],
        'React': [
          'Entwicklung moderner und vollständig responsiver Benutzeroberflächen',
          'Modulares und strukturiertes Arbeiten mit performanten Web-Frameworks',
          'Praktische Umsetzung im Rahmen moderner Web-Projekte'
        ],
        'Next.js': [
          'Entwicklung moderner und vollständig responsiver Benutzeroberflächen',
          'Modulares und strukturiertes Arbeiten mit performanten Web-Frameworks',
          'Praktische Umsetzung im Rahmen moderner Web-Projekte'
        ],
        'Java': [
          'Lösung anspruchsvoller Programmieraufgaben im Informatik-Unterricht',
          'Implementierung robuster Logik und algorithmischer Strukturen',
          'Konzepte moderner objektorientierter oder funktionaler Softwareentwicklung'
        ],
        'Python': [
          'Lösung anspruchsvoller Programmieraufgaben im Informatik-Unterricht',
          'Implementierung robuster Logik und algorithmischer Strukturen',
          'Konzepte moderner objektorientierter oder funktionaler Softwareentwicklung'
        ],
        'C++': [
          'Lösung anspruchsvoller Programmieraufgaben im Informatik-Unterricht',
          'Implementierung robuster Logik und algorithmischer Strukturen',
          'Konzepte moderner objektorientierter oder funktionaler Softwareentwicklung'
        ],
        '.NET MAUI': [
          'Lösung anspruchsvoller Programmieraufgaben im Informatik-Unterricht',
          'Implementierung robuster Logik und algorithmischer Strukturen',
          'Konzepte moderner objektorientierter oder funktionaler Softwareentwicklung'
        ],
        'Git': [
          'Strukturierte Versionskontrolle und koordinierter Team-Workflow',
          'Containerisierung und moderne Build-Prozesse für Entwicklungs-Umgebungen',
          'Integration nativer Browser-Funktionen und externer Web-Schnittstellen'
        ],
        'Docker': [
          'Strukturierte Versionskontrolle und koordinierter Team-Workflow',
          'Containerisierung und moderne Build-Prozesse für Entwicklungs-Umgebungen',
          'Integration nativer Browser-Funktionen und externer Web-Schnittstellen'
        ],
        'Web APIs': [
          'Strukturierte Versionskontrolle und koordinierter Team-Workflow',
          'Containerisierung und moderne Build-Prozesse für Entwicklungs-Umgebungen',
          'Integration nativer Browser-Funktionen und externer Web-Schnittstellen'
        ],
        'Vite': [
          'Strukturierte Versionskontrolle und koordinierter Team-Workflow',
          'Containerisierung und moderne Build-Prozesse für Entwicklungs-Umgebungen',
          'Integration nativer Browser-Funktionen und externer Web-Schnittstellen'
        ],
        'SQLite': [
          'Konzeption und Optimierung relationaler oder NoSQL-Datenschemata',
          'Effiziente Abfragetechnik zur performanten Datenselektion',
          'Sichere Integration in lokale Applikationen und Backend-Dienste'
        ],
        'MongoDB': [
          'Konzeption und Optimierung relationaler oder NoSQL-Datenschemata',
          'Effiziente Abfragetechnik zur performanten Datenselektion',
          'Sichere Integration in lokale Applikationen und Backend-Dienste'
        ],
        'Neo4j': [
          'Konzeption und Optimierung relationaler oder NoSQL-Datenschemata',
          'Effiziente Abfragetechnik zur performanten Datenselektion',
          'Sichere Integration in lokale Applikationen und Backend-Dienste'
        ],
        'Redis': [
          'Konzeption und Optimierung relationaler oder NoSQL-Datenschemata',
          'Effiziente Abfragetechnik zur performanten Datenselektion',
          'Sichere Integration in lokale Applikationen und Backend-Dienste'
        ],
        'Visual Studio Code': [
          'Effizientes Arbeiten durch Shortcuts, Erweiterungen und angepasste Setups',
          'Zentrales Debugging und lückenfreie Anbindung an Git-Systeme',
          'Konfiguration individueller Entwicklungs- und Produktivumgebungen'
        ],
        'Visual Studio': [
          'Effizientes Arbeiten durch Shortcuts, Erweiterungen und angepasste Setups',
          'Zentrales Debugging und lückenfreie Anbindung an Git-Systeme',
          'Konfiguration individueller Entwicklungs- und Produktivumgebungen'
        ],
        'Figma': [
          'Konzeption von modernen Mockups, Wireframes und UI-Komponenten',
          'Kreative Bildbearbeitung, Asset-Erstellung und visuelles Prototyping',
          'Beachtung ästhetischer Gestaltungsrichtlinien und Kontrastwerte'
        ],
        'Canva': [
          'Konzeption von modernen Mockups, Wireframes und UI-Komponenten',
          'Kreative Bildbearbeitung, Asset-Erstellung und visuelles Prototyping',
          'Beachtung ästhetischer Gestaltungsrichtlinien und Kontrastwerte'
        ],
        'Photoshop': [
          'Konzeption von modernen Mockups, Wireframes und UI-Komponenten',
          'Kreative Bildbearbeitung, Asset-Erstellung und visuelles Prototyping',
          'Beachtung ästhetischer Gestaltungsrichtlinien und Kontrastwerte'
        ],
        'Word': [
          'Professionelle Formatierung umfangreicher Dokumente, Berichte und Arbeiten',
          'Erstellung klar strukturierter, überzeugender Präsentationen für Projekte',
          'Automatisierte Berechnungen, Pivot-Tabellen und grafische Datenanalyse'
        ],
        'PowerPoint': [
          'Professionelle Formatierung umfangreicher Dokumente, Berichte und Arbeiten',
          'Erstellung klar strukturierter, überzeugender Präsentationen für Projekte',
          'Automatisierte Berechnungen, Pivot-Tabellen und grafische Datenanalyse'
        ],
        'Excel': [
          'Professionelle Formatierung umfangreicher Dokumente, Berichte und Arbeiten',
          'Erstellung klar strukturierter, überzeugender Präsentationen für Projekte',
          'Automatisierte Berechnungen, Pivot-Tabellen und grafische Datenanalyse'
        ]
      }
    },
    projects: {
      title: 'Informatikprojekte',
      desc: 'Arbeiten aus dem Schulunterricht (gibb) und eigenständige kreative Software-Projekte. ',
      filterAll: 'Alle Projekte',
      filterSchool: 'Schulprojekte (gibb)',
      filterPrivate: 'Private Projekte',
      catalog: 'Projektkatalog:',
      detailsTitle: 'WISSENSCHAFTLICHER ABSTRACT',
      fieldRole: 'Rolle im Projekt',
      fieldTech: 'Eingesetzte Technologien',
      fieldProblem: 'Ausgangslage und Problemstellung',
      fieldSolution: 'Konzeption und Lösungsansatz',
      fieldOutcome: 'Erzielte Resultate und Leistungsausweis',
      projectsList: [
        {
          id: 'website',
          title: 'Eigenes Website-Portfolio',
          category: 'Private',
          role: 'Informatik-Lernende / Erstes IMS-Projekt',
          technologies: ['HTML', 'CSS'],
          problem: 'Erstellung der allerersten eigenen Website und das erste grössere Projekt an der IMS überhaupt, um praktische Grundlagen der Webentwicklung zu festigen.',
          solution: 'Entwicklung einer klassischen, statischen Website rein mit HTML-Strukturen und individuellem CSS-Styling, völlig ohne komplexe Single-Page-Frameworks.',
          outcome: 'Ein klares, händisch geschriebenes Musterprojekt, welches zusätzlich als optimales Anschauungs- und Orientierungsbeispiel für Lernende des untersten Lehrjahrs dient.',
        },
        {
          id: 'game_2048',
          title: 'C#-Spiel 2048',
          category: 'Private',
          role: 'Informatik-Lernende / Erstes Spiel',
          technologies: ['C#', '.NET Windows Forms', 'OOP', 'Matrizen und Algorithmen'],
          problem: 'Objektorientierte Neuauflage des bekannten Zahlenrätsels 2048 mit modularer Zustandssteuerung und robuster Logik.',
          solution: 'Entwicklung einer dynamischen Matrix-Verschiebe-Logik in C#, inklusive Verschmelzungsindikatoren, Punkte-Tracking und Score-Zustandsspeicherung im RAM.',
          outcome: 'Flüssiges, vollständiges Retro-Zahlenpuzzle für den Desktop-Client, das die OOP-Lernziele exzellent abdeckt.',
        },
        {
          id: 'dreesify',
          title: 'Dreesify',
          category: 'Private',
          role: 'Frontend-Entwicklerin / Team-Zusammenarbeit',
          technologies: ['React', 'Vite', 'Tailwind CSS', 'Web APIs'],
          problem: 'Ungenutzte Textilien und unkoordinierte Outfits führen zu hohem Kleidungsmüll und ineffizienter Nutzung der eigenen Garderobe.',
          solution: 'Konzeption einer webbasierten Applikation zur digitalen Verwaltung des eigenen Kleiderschranks samt kognitiver Wetter-Outfit-Empfehlungen.',
          outcome: 'Herausragendes Webprojekt mit einer ansprechenden, intuitiven Benutzeroberfläche und cleveren Kombinationsmöglichkeiten für Nutzer.',
        },
        {
          id: 'sqlite_db',
          title: 'Pasta Restaurant SQLite (Modul 164)',
          category: 'School',
          role: 'Datenbank-Entwicklerin / Einzelprojekt',
          technologies: ['SQLite', 'SQL', 'Datenmodellierung (ERD)', 'N:M Beziehungen', 'Joins & Views'],
          problem: 'Entwurf eines strukturierten relationalen Datenbankschemas für eine Pasta-Restaurant-Inhaberin zur zentralen und redundanzfreien Verwaltung aller geschäftskritischen Restaurantdaten.',
          solution: 'Konzeptionierung und Normalisierung eines relationalen ERD-Modells mit 7 Tabellen (darunter 2 Zwischentabellen wie "pasta_zutat" und "bestellung_pasta" zur präzisen Abbildung komplexer N:M-Beziehungen). Definition von Fremdschlüsseln und Datentypen wie INT, TINYINT, VARCHAR, DATE, FLOAT, TIME.',
          outcome: 'Ein referentiell integres und hochperformantes relationale Schema zur präzisen Analyse von Bestell-Zeitpunkten, Lieferoptionen, Zutaten-Allergenen und individuellen Kundendaten.',
        },
        {
          id: 'event_management_mongodb',
          title: 'NoSQL Event-Management mit MongoDB (Modul 165)',
          category: 'School',
          role: 'Datenbank-Spezialistin / Teamprojekt',
          technologies: ['MongoDB', 'NoSQL', 'PHP', 'XAMPP', 'Replica Sets', 'Failover'],
          problem: 'Ein flexibles, performantes Datenmodell für Event-Kataloge mit dynamischen Attributen (z.B. sich stark unterscheidenden Eventdaten wie Ticketpreis oder Sprache) zu entwerfen und ausfallsicher horizontal zu skalieren.',
          solution: 'Entwicklung einer dokumentenorientierten MongoDB-Datenbank mit flexiblen Validierungsregeln, Einlesen von 1000 Seed-Datensätzen pro Kollektion zur Performance-Messung und Aufbau eines ausfallsicheren 3-Knoten-Replica-Sets.',
          outcome: 'Erfolgreiche Demonstration der Indexierung und Aggregation ($lookup, $unwind) zur Event-Standort-Veranstalter-Zusammensetzung sowie rollenbasierter Zugriffskontrolle mit hervorragendem Bestehen.',
        },
        {
          id: 'restaurant_menu_maui',
          title: 'Speisekarte Terra Verde (Modul 322)',
          category: 'School',
          role: 'Mobile-Entwicklerin / Einzelprojekt',
          technologies: ['.NET MAUI', 'C#', 'XAML', 'Cross-Platform', 'MVVM-Architektur'],
          problem: 'Entwurf einer umweltschonenden, barrierearmen digitalen Speisekarte für das vegetarische Restaurant "Terra Verde" in Bern zur Steigerung der Bestellrate und signifikanten Reduktion von Druckkosten.',
          solution: 'Entwicklung einer plattformübergreifenden .NET MAUI Applikation unter konsequenter Einhaltung des MVVM-Musters. Einbindung übersichtlicher Mahlzeiten-Kategorien (Frühstück, Mittagessen, Abendessen), detailreichen Quinoasalat-Menüs mit Allergenfilterung (z.B. glutenfrei) und intuitiver Warenkorb- und Tischservice-Bestellung.',
          outcome: 'Erfolgreicher native-naher App-Build für Android und iOS mit hervorragender ergonomischer Kontrastierung, grossen barrierearmen Schriften (Verdana) und intuitiver Nutzbarkeit für alle Altersklassen.',
        },
        {
          id: 'matcha_event',
          title: 'Matcha After Dark (Modul 294)',
          category: 'School',
          role: 'Frontend-Entwicklerin / ICT-LearnFactory Teamprojekt',
          technologies: ['React', 'Tailwind CSS', 'PocketBase', 'Fetch API', 'Dark Mode'],
          problem: 'Entwurf einer Plattform mit ansprechendem Dark Mode für das fiktive, exklusive Pop-Up-Event «Matcha After Dark» in einer urbanen Location, das elektronische Musik mit hochwertigen Matcha-Cocktails verbindet, um Einlasschaos zu verhindern.',
          solution: 'Umsetzung einer responsiven Single-Page App mit React 18+ und Tailwind CSS. Integration dynamischer CRUD-Operationen zur Gästeverwaltung angebunden an PocketBase via Fetch-API, eines Online-Formulars mit Begleitpersonen-Option (+1) und einer stilvollen Getränkekarte (Usucha, Koicha, Mizudashi).',
          outcome: 'Erfolgreicher Modulabschluss mit einer barrierefreien, voll funktionsfähigen Event-Plattform inklusive geschütztem Admin-Dashboard zur manuellen Gasterfassung und Einlasskontrolle per Checkbox-Status.',
        },
        {
          id: 'heat_calculator',
          title: 'Heat-Calculator (Modul 320)',
          category: 'School',
          role: 'Software-Entwicklerin / gibb Einzelprojekt',
          technologies: ['Java', 'JUnit', 'Swing GUI', 'OOP'],
          problem: 'Entwicklung eines thermodynamischen Berechnungs-Engines zur präzisen Modellierung und Simulation von physikalischer Wärmeenergie und Leitungsfaktoren.',
          solution: 'Implementierung einer objektorientierten Java SE Applikation mit robuster Geschäftslogik, ansprechendem GUI-Dashboard und lückenlosen Komponententests mit JUnit.',
          outcome: 'Fehlerfreie Berechnung komplexer thermischer Übergänge mit vollständiger Testabdeckung und hoher Codequalität nach Clean-Code-Richtlinien.',
        },
        {
          id: 'web_evolution',
          title: 'Webauftritt Portfolio (Modul 293)',
          category: 'School',
          role: 'Web-Frontend-Entwicklerin / gibb Einzelprojekt',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Web-Formulare'],
          problem: 'Konzeptionierung und zielgruppenorientierte Entwicklung eines dreiteiligen, anspruchsvollen Webauftritts zur Vermittlung und Visualisierung von professionellen Layouts, modernem Custom Formularwesen und interaktiven Benutzeroberflächen.',
          solution: 'Drei eigenständige Webauftritte. Teil 1 (Rezepte-Blog) bietet einen ansprechenden Rezept-Schnitt mit interaktiver Feedbackeinsendung. Teil 2 ("Terra Verde" vegetarisches Restaurant) realisiert ein stilvolles Teamlayout, ansprechende Bestseller-Cards und Formularvalidierung. Teil 3 ("Yana\'s Health Center") zeigt ein Wellness-Gesundheitscenter mit Massagen, Yoga (inklusive Dehnungsvideo) und interaktivem Buchungssystem.',
          outcome: 'Hervorragender, vollständig responsiver dreiteiliger Webauftritt unter Modul 293 an der bwd Bern, ausgezeichnet mit der maximalen Bestnote 6.0 – Beleg für exzellente Fähigkeiten im Bereich User Experience, HTML5 Formulare und flexible CSS-Layouts.',
        },
        {
          id: 'kubernetes_website',
          title: 'DevOps & Kubernetes Setup (Modul 347)',
          category: 'School',
          role: 'Infrastruktur-Entwicklerin / gibb Einzelprojekt',
          technologies: ['Docker', 'Docker Compose', 'Kubernetes', 'RabbitMQ', 'Podman', 'YAML'],
          problem: 'Verbindung, Containerisierung und Orchestrierung von verteilten Microservices-Anwendungen mit Docker, Podman und Kubernetes zur Sicherstellung von Stabilität, Ausfallsicherheit (Self-Healing) und redundanten Datenbanken.',
          solution: 'Entwicklung und Bereitstellung einer verteilten ToDo-Applikation über Docker-Netzwerke, Docker Compose, Podman-Instanzen und ein Kubernetes-Cluster. Konzeption von 3 Pod-Replicas, Redis-Master- und Slave-Datenbanken und asynchroner Kommunikation via RabbitMQ Message Broker.',
          outcome: 'Ein voll funktionsfähiges, fehlertolerantes Cluster-Setup mit implementierter Skalierung (Scale Up/Down), automatischem Self-Healing verunglückter Prozesse, Portainer-Integration, Blue-Green Deployments und einwandfreien Rolling Updates.',
        },
        {
          id: 'codesnp',
          title: 'CodeSNP Platform (Modul 426)',
          category: 'School',
          role: 'Full-Stack Entwicklerin / Scrum Master (gibb)',
          technologies: ['React 19', 'TypeScript', 'Express', 'MongoDB', 'Material UI', 'Tailwind CSS', 'Formik/Yup', 'Jest', 'Scrum'],
          problem: 'Konzeption und Entwicklung einer modularen MERN-Plattform zur Code-Snippet-Verwaltung unter Einhaltung organisatorischer Scrum-Vorgaben, barrierefreiem Dark-Vibe Design und strikter Code-Validierung.',
          solution: 'Entwicklung einer React 19 Frontend-Architektur mit geschütztem JWT AuthContext, Formik/Yup Formularvalidierungen, automatisierter Jest & Bruno API-Testsuite sowie agilem Azure DevOps Workflow (3-Wochen-Sprints).',
          outcome: 'Erfolgreicher Modulabschluss mit einer extrem performanten Code-Collection Webapplikation, hoher Testabdeckung, strukturiertem Git-Branching und vollständig erreichter Sprint-Kapazität.',
        },
        {
          id: 'url_shortener',
          title: 'URL-Shortener (Modul 210)',
          category: 'School',
          role: 'DevOps & Cloud Engineer / LB1 Projekt (gibb)',
          technologies: ['NestJS', 'MariaDB', 'Docker', 'Kubernetes', 'Minikube', 'ArgoCD', 'GitLab CI', 'GitOps'],
          problem: 'Entwurf und Realisierung einer sicheren, containerisierten Microservice-Architektur für einen URL-Shortener mit zwei getrennten Services (keeper & shorty) und relationaler MariaDB-Datenbank.',
          solution: 'Aufbau einer automatisierten Multi-Stage GitLab-CI Pipeline (Linting, Tests, OCI-Container-Builds mit Kaniko) und deklarativem GitOps-Deployment via ArgoCD im Minikube-Cluster mit striktem Role-Based Access Control (RBAC).',
          outcome: 'Vollständig funktionierendes, automatisiertes Deployment mit Ingress-Anbindung, Namespace-Isolierung und umfassend dokumentierter LB1-Prüfung nach allen Vorgaben des Moduls 210.',
        },
        {
          id: 'evently',
          title: 'Evently Mobile App (Modul 335)',
          category: 'School',
          role: 'Mobile App Entwicklerin / ICT-LearnFactory Teamprojekt',
          technologies: ['React Native', 'TypeScript', 'iOS', 'Firebase (Firestore/Auth/Storage)', 'AsyncStorage', 'GPS & Sensoren', 'Jest'],
          problem: 'Entwurf einer mobilen Applikation zur einfachen Auffindung nahegelegener Events (Konzerte, Comedy, Festivals) mit transparenter standortbasierter Sortierung, echten Fotobewertungen und zuverlässiger Ticket-Verwaltung.',
          solution: 'Umsetzung einer nativen iOS-App mit React Native und TypeScript. Anbindung von Firebase (Firestore, Auth, Storage) und AsyncStorage sowie Nutzung lokaler Smartphone-Sensoren (GPS-Distanzberechnung, Kamera für QR-Code-Scanning und haptisches Vibrationsfeedback).',
          outcome: 'Vollständig dokumentierte und auf physischen iOS-Geräten verifizierte Mobile App mit abgenommenem Testkonzept (Testfälle T-01 bis T-08), funktionierender GPS-Umkreissuche und Firebase-Backend nach ICT-LearnFactory Standards.',
        }
      ]
    },
    about: {
      title: 'Persönliches und Freizeit',
      desc: 'Hinter dem geschriebenen Code verbirgt sich eine vielseitige Person mit grossem Interesse an visuellem Design, Pilates, Reisen und kreativen Hobbys.',
      bioQuote: '„Mit Begeisterung, Kreativität und Liebe zum Detail“',
      bioP1: 'Ich wohne in Bern und fühle mich hier unglaublich wohl. Seit ich 2022 aus Tschernihiw, Ukraine in die Schweiz gekommen bin, habe ich viel Energie in mein grosses Ziel gesteckt: Deutsch zu lernen und mich voll in meiner neuen Heimat einzufinden. Dass ich heute fliessend Deutsch spreche (Niveau B2.2) und die anspruchsvolle Ausbildung an der IMS besuche, macht mich sehr glücklich und stolz.',
      bioP2: 'Einen wunderbaren Ausgleich zum Programmieren und Lernen finde ich in meiner Freizeit. Ich liebe es, aktiv zu sein: Ob beim Yoga und Pilates, beim Schwimmen oder beim Entdecken der Schweizer Bergwelt beim Wandern. Ausserdem reise ich gerne, um neue Kulturen kennenzulernen, und koche mit viel Leidenschaft feine, internationale Rezepte. Für mich gilt im Alltag genau wie beim Coding: Mit Geduld, Hingabe und der Liebe zu den kleinen Details gelingt Grosses.',
      hobbies: [
        {
          title: 'Fitness, Pilates und Yoga',
          description: 'Aktive Begeisterung für präzise Körperbeherrschung, Dehnung und Kraftaufbau. Pilates und Yoga bieten mir den optimalen Ausgleich zu langen Stunden am Bildschirm und schulen meine mentale Konzentration.',
          tag: '#Fitness #Pilates #Yoga',
          image: pilatesImage
        },
        {
          title: 'Natur und Wandern',
          description: 'Erkunden der malerischen Schweizer Berglandschaften und Wanderwege rund um die Schweiz. Die Bewegung an der frischen Luft stärkt meine Ausdauer und gibt mir neuen Fokus.',
          tag: '#Natur #Wandern #Berge',
          image: wandernImage
        },
        {
          title: 'Schwimmen',
          description: 'Regelmässiges Bahnenziehen und sportliche Betätigung im Wasser. Schwimmen ist für mich die perfekte Methode, um den ganzen Körper fit zu halten und den Kopf freizubekommen.',
          tag: '#Schwimmen #Sport #Ausdauer',
          image: seeImage
        },
        {
          title: 'Kochen',
          description: 'Ausprobieren vielseitiger internationaler Rezepte. Kochen bedeutet für mich das kreative Zusammenführen verschiedenster Zutaten im richtigen Verhältnis – genau wie bei gutem Code.',
          tag: '#Kochen #Kreativitaet #Zutaten',
          image: bowlImage
        },
        {
          title: 'Reisen',
          description: 'Entdecken neuer Länder, Kulturen und Lebenswelten. Reisen erweitert meinen Horizont, stärkt meine Offenheit und inspiriert meine kreative Denkweise.',
          tag: '#Reisen #Kulturen #Entdecken',
          image: parisImage
        }
      ]
    },
    teacherEvaluation: {
      badge: 'Nachgewiesenes Leistungsprüfungsprofil',
      title: 'Schulische Leistungen und Zeugnisnoten',
      desc: 'Die offiziellen, zertifizierten Leistungsdaten aus meiner Ausbildungszeit aufgeteilt nach kaufmännischer/schulischer Ausbildung (bwd Bern) und IT-Fachausbildung (gibb Berufsfachschule Bern).',
      semester: 'Semester',
      btnBwd: 'bwd Bern (Wirtschaft & BM)',
      btnGibb: 'gibb Bern (Informatik EFZ)',
      gradeAvg: 'Notenschnitt:',
      absenceExcuse: 'Entschuldigt:',
      absenceUnexcuse: 'Unentschuldigt:',
      absenceUnit: 'Lektionen',
      statusLabel: 'Promotionsstatus:',
      gibbCumulativeAvg: 'Gewichteter Moduldurchschnitt:',
      gibbWarning: 'Hinweis: Überbetriebliche Kurse (üK) sind mit einem Sternchen (*) markiert.',
      cardDesc: 'Modulbeschreibung',
      cardGrade: 'Modulnote',
      cardNoDesc: 'Keine detaillierte Beschreibung vorhanden',
      german: 'Deutsch',
      french: 'Französisch',
      english: 'Englisch',
      maths: 'Mathematik',
      csGibb: 'Informatik (gibb)',
      finances: 'Finanz- und Rechnungswesen',
      businessLaw: 'Wirtschaft und Recht',
      historyPol: 'Geschichte und Politik',
      techEnv: 'Technik und Umwelt',
      sport: 'Sport',
      interdis: 'Interdisziplinäres Arbeiten',
      subjectsCategory1: 'Grundlagenbereich',
      subjectsCategory2: 'Schwerpunktbereich',
      subjectsCategory3: 'Ergänzungsbereich',
      statusValue1: 'definitiv aufgenommen',
      statusValue2: 'promoviert',
      schoolBwd: 'bwd Bern (Wirtschaft & BM)',
      schoolGibb: 'gibb Bern (Informatik EFZ)',
      studentLabel: 'Lernende',
      classLabel: 'Klasse',
      classVal: 'Informatikmittelschule bwd Bern',
      avgTitle: 'NOTENSCHNITT',
      avgSub: 'Gesamtschnitt im',
      avgDescBwd: 'Berechnet gemäss offizieller Gewichtung der Berufsmaturität (bwd).',
      avgDescGibb: 'Ungewichteter Durchschnitt aller Modulnoten des Semesters (gibb).',
      absencesTitle: 'ABSENZEN',
      excusedLabel: 'Entschuldigt',
      unexcusedLabel: 'Unentschuldigt',
      lessonsLabel: 'Lektionen',
      absencesDesc: 'Lückenloser Nachweis gemäss Zeugnisreglement. Keine unentschuldigten Absenzen.',
      promoTitle: 'PROMOTIONSSTATUS',
      promoSub: 'Semester',
      promoDesc: 'Alle Promotionsbedingungen der bwd und gibb wurden vollumfänglich erfüllt.',
      bwdTableSubject: 'Fach / Lerngebiet (bwd Bern)',
      bwdTableGrade: 'Zeugnisnote',
      bwdTableAvg: 'Fachbereichs-Mittel',
      gibbTableId: 'Modul-ID',
      gibbTableSubject: 'Modulname & Inhaltbeschreibung (gibb Bern)',
      gibbTableGrade: 'Modulnote',
      gibbTableProp: 'Kurstyp',
      gibbUekLabel: 'üK (Praxisbetrieb)',
      gibbNonUekLabel: 'Schulmodul',
      gibbTableGpa: 'Modul-Durchschnitt',
      gibbTableGpaDesc: 'Zusammenfassung aller Fachnoten des Semesters',
      gibbTableGpaLabel: 'GPA-STATUS',
      noteTitle: 'Leistungsnachweis & Notentransparenz',
      noteDesc3: 'Als Informatikmittelschülerin (IMS) lerne ich an zwei eigenständigen Institutionen. Die Noten entsprechen dem aktuellen, offiziellen Stand gemäss bwd- und gibb-Direktion.',
      noteDescOther: 'Die ausgewiesenen Werte basieren auf den offiziellen Zeugnissen des Bildungszentrums für Wirtschaft und Herkunftsschule bwd/gibb Bern.',
      gibbPass: 'Promoviert',
      subjects: {
        deutsch: 'Deutsch',
        franz: 'Französisch',
        engl: 'Englisch',
        math: 'Mathematik',
        inf: 'Informatik (gibb)',
        finanz: 'Finanz- und Rechnungswesen',
        recht: 'Wirtschaft und Recht',
        geschichte: 'Geschichte und Politik',
        technik: 'Technik und Umwelt',
        sport: 'Sport',
        idaf: 'Interdisziplinäres Arbeiten'
      }
    },
    contact: {
      title: 'Kontakt aufnehmen',
      phoneLabel: 'TELEFON',
      emailLabel: 'E-MAIL',
      directEmail: 'Direkt-E-Mail',
      writeEmailTitle: 'E-Mail verfassen',
      writeEmailDesc: 'Wählen Sie Ihren bevorzugten E-Mail-Dienst, um direkt eine Nachricht zu verfassen. Es öffnet sich eine externe Seite oder Ihre Mail-App mit voradressierter Empfängerin und passendem Betreff (ya.yana.dzhima@gmail.com).',
      btnDefaultApp: 'Standard-Mail-App',
      btnDefaultAppDesc: 'Öffnet Ihren lokalen Client (Outlook, Apple Mail etc.)',
      btnGmail: 'Gmail Web',
      btnGmailDesc: 'Für Google Mail im Web-Browser',
      btnOutlook: 'Outlook Web',
      btnOutlookDesc: 'Für Hotmail / Live / Microsoft Web-Mail',
      badge: 'Verbindung',
      directTitle: 'Direktkontakt',
      phoneSub: 'Montag – Samstag, 08:00 – 20:00 Uhr',
      emailSub: 'Schreiben Sie mir jederzeit unkompliziert per Mail',
      mailAppLabel: 'Standard-Mail-App',
      mailAppSub: 'Öffnet Ihren lokalen Client (Outlook, Apple Mail etc.)',
      gmailLabel: 'Gmail Web',
      gmailSub: 'Für Google Mail im Web-Browser',
      outlookLabel: 'Outlook Web',
      outlookSub: 'Für Hotmail / Live / Microsoft Web-Mail',
      responseMsg: 'Ich antworte in der Regel innerhalb von 24 Stunden auf alle Anfragen. Vielen Dank für Ihr Interesse!',
    },
    imprint: {
      titleLegal: 'Rechtliches Impressum',
      labelResp: 'Herausgeberschaft & Verantwortlichkeit:',
      titleInst: 'Zugehörige Institutionen',
      bwdDesc: 'Bildungszentrum für Wirtschaft und Dienstleistung bwd (IMS-Administration)',
      gibbDesc: 'Gewerblich-Industrielle Berufsfachschule Bern (Informatik-Lehrplan)',
      titleDisclaimer: 'Haftungsausschluss & Schutz',
      disclaimerText: 'Sämtliche Inhalte sind im Rahmen der schulischen Ausbildung an der IMS erstellt worden. Haftungsansprüche bezüglich Schäden materieller oder ideeller Art, welche durch die Nutzung der dargebotenen Informationen verursacht wurden, sind ausgeschlossen. Verweise auf externe Websites liegen ausserhalb unseres Verantwortungsbereichs.',
    },
  },
  en: {
    navbar: {
      hero: 'Home',
      resume: 'Resume',
      skills: 'Skills',
      projects: 'Projects',
      about: 'About Me',
      feedback: 'Grades',
      contact: 'Contact',
    },
    accessGate: {
      title: 'Access Authorization Required',
      badge: 'Locked Area:',
      desc: 'To protect personal information, grades, transcript data, and contact details of Yana Dzhyma. Please enter your name and credentials below to unlock instant viewing of all password-protected modules.',
      labelName: 'Your name or name of your ompany',
      placeholderName: 'e.g. Swisscom / Max Muster',
      labelCode: 'Enter Code',
      placeholderCode: 'e.g. yana2026',
      btnUnlock: 'Unlock & Authorize View',
      btnLoading: 'Registering authorization...',
      errorName: 'Please enter your name or company name.',
      errorCode: 'Please enter the authorization code.',
      errorDb: 'Database connectivity error. Please try again.',
      footerSecure: '256-Bit data layer secured via Firestore',
    },
    hero: {
      badge: 'Dedicated & Detail-Oriented',
      title1: 'Building Bridges',
      title2: 'Between business administration and modern software development',
      desc: 'Welcome to my project portfolio! As a passionate IMS student, I combine the commercial expertise of bwd Bern with the practical, technical foundations of gibb Bern and ICT-LearnFactory. Explorer my creative frontends, robust desktop apps, and academic achievements.',
      btnProjects: 'Explore Projects',
      btnContact: 'Contact',
      btnVideo: 'Watch Intro Video (1 min.)',
      videoSubtitle: 'Intro Video • Play',
      modalTitle: 'Intro Video — Yana Dzhyma',
      scriptLabel: 'Video Script in English:',
      scriptText: '“Hello! My name is Yana Dzhyma, I’m 18 years old, and I’m currently attending the secondary school for computer science in Bern. I first discovered my passion for computer science when I was 12, back in Ukraine. Since moving to Switzerland, I’ve settled in quickly, learnt German, and am now deepening my knowledge at bwd and gibb. My focus is on developing modern web and mobile applications. In doing so, I combine functional backend logic with appealing frontend design. In my free time, I enjoy pilates, yoga, swimming, hiking and cooking, which help me to maintain a good work-life balance. I am looking for a one-year internship in software development starting in August 2027. I warmly invite you to take a look at my projects. I’d be happy to arrange a personal meeting with you. Thank you and see you soon!”',
    },
    resume: {
      title: 'Resume',
      desc: 'Find out more about my academic career at bwd Bern, ICT-LearnFactory and gibb Bern, as well as my languages and interests. Sort the sections to focus on what interests you most.',
      filterAll: 'Show All',
      filterEducation: 'Education',
      filterExperience: 'Part-time Jobs & Integration',
      certText: 'Chronology Certificate: All ages, school cycles, and part-time jobs are chronologically and seamlessly logged.',
      timeline: [
        {
          year: 'Since Aug 2024',
          title: 'Informatikmittelschule (IMS)',
          organization: 'bwd Bern',
          location: 'Bern, Switzerland',
          description: 'Academic qualification at Informatikmittelschule bwd Bern. Commercial Vocational Maturita with a focus on IT. The ideal combination of business and computer science.',
          type: 'education',
        },
        {
          year: 'Since Aug 2024',
          title: 'Computer Science School',
          organization: 'gibb Bern Vocational School',
          location: 'Bern, Switzerland',
          description: 'Theoretical and practical IT training in Application Development mapping standard Swiss modules.',
          type: 'education',
        },
        {
          year: '2025 – 2026',
          title: 'Practical Specialization',
          organization: 'ICT-LearnFactory',
          location: 'Bern, Switzerland',
          description: 'Supervised development training to deepen professional programming methodologies and code standards.',
          type: 'education',
        },
        {
          year: 'Apr 2023 – May 2026',
          title: 'Various Assignments (Part-time)',
          organization: 'Jugend-Job-Börse Bern',
          location: 'Bern, Switzerland',
          description: 'Versatile assignments including office support, flyer distribution, garden maintenance, and co-designing the local campaign «unterwegs, Ja sicher!». Officially rewarded for high reliability, focus, and enthusiasm.',
          type: 'experience',
        },
        {
          year: 'Aug 2022 – July 2024',
          title: 'Secondary Education',
          organization: 'Hochfeld 1',
          location: 'Bern, Switzerland',
          description: 'Completion of the compulsory upper secondary school programme in the city of Bern, with excellent preparation for the entrance examination to the Informatikmittelschule (IMS).',
          type: 'education',
        },
        {
          year: '2020 – 2023',
          title: 'Computer Science Courses',
          organization: 'IT Academy STEP',
          location: 'Chernihiv, Ukraine',
          description: 'Practical training alongside regular primary school, specializing in web development basics (HTML/CSS), Python algorithms, image editing (Photoshop), robotics, and 3D modeling/interior design.',
          type: 'education',
        },
        {
          year: 'May – June 2022',
          title: 'Integration Class',
          organization: 'Mühleberg School',
          location: 'Mühleberg, Switzerland',
          description: 'Intense German course and early academic, cultural, and language integration after relocate from Chernihiv, Ukraine.',
          type: 'experience',
        },
        {
          year: '2014 – 2022',
          title: 'Primary School',
          organization: 'Primary School #21',
          location: 'Chernihiv, Ukraine',
          description: 'Early schooling prior to relocating to Bern, Switzerland.',
          type: 'education',
        },
      ],
    },
    skills: {
      title: 'Computer Science Skills',
      desc: 'Focus on application development and modern web stacks. Select a specific filter-tab to inspect detailed explanations, highlights, and practical scenarios of my qualification.',
      filterAll: 'All Tools',
      filterWeb: 'Web Development',
      filterProgramming: 'Programming',
      filterTools: 'DevOps & Tools',
      basic: 'Basics',
      pro: 'Expert',
      detailTitle: 'SKILL: DETAILED ANALYSIS',
      provenBy: 'Proven by:',
      closeDetail: 'Close Details',
      philosophyTitle: 'My Work Philosophy: Reflection and the Power of AI',
      philosophyP1: 'In software development, one thing is particularly important for me: errors are not setbacks, but the most valuable opportunities to learn. I am completely open and reflective when things don\'t work flawlessly right away in the development process. Analyzing and solving such challenges independently is exactly what drives me forward and helps me grow as a developer every day.',
      philosophyP2: 'To this end, I leverage modern technology in a conscious and smart way: I see AI tools as highly valuable sparring partners and learning accelerators. Whether for prototyping, structured search for error messages, or learning new programming concepts – I integrate AI productively and thoughtfully into my workflow. The logical overall understanding and critical control of course remain in my hand.',
      skillsList: [
        { name: 'HTML', level: 90, category: 'Web', description: 'Marking up bulletproof semantic and accessible interfaces using HTML5 standards.' },
        { name: 'CSS', level: 90, category: 'Web', description: 'Advanced UI styling leveraging modern CSS grids, flexboxes, responsive patterns, and Tailwind CSS.' },
        { name: 'JavaScript', level: 45, category: 'Web', description: 'Asynchronous workflows, dynamic DOM operations, browser APIs, and state updates.' },
        { name: 'TypeScript', level: 48, category: 'Web', description: 'Utilizing structural type safety to build maintainable, error-resistant web architectures.' },
        { name: 'React', level: 61, category: 'Web', description: 'Component-driven application layouts utilizing declarative state-management hooks.' },
        { name: 'Next.js', level: 61, category: 'Web', description: 'Server-side rendering, static site generation, and optimized fullstack architectures.' },
        { name: 'Java', level: 40, category: 'Programming', description: 'Object-oriented patterns, standard algorithmic tasks, and general modular structures.' },
        { name: 'Python', level: 78, category: 'Programming', description: 'Automating local scripts, text processing, dataset parsing, and algorithmic proofs.' },
        { name: 'C++', level: 25, category: 'Programming', description: 'Bare-metal software design with strong compilation requirements and memory operations.' },
        { name: '.NET MAUI', level: 45, category: 'Programming', description: 'Cross-platform native software layouts sharing code for iOS, Android, and Windows clients.' },
        { name: 'Git', level: 73, category: 'DevOps/Tools', description: 'Secure source control, repository branching mechanics, and team sync workflows.' },
        { name: 'Docker', level: 65, category: 'DevOps/Tools', description: 'Encapsulating processes into reproducible containers for frictionless developer setup.' },
        { name: 'Web APIs', level: 76, category: 'DevOps/Tools', description: 'Developing and consuming reliable endpoints (REST style) alongside browser integrations.' },
        { name: 'Vite', level: 44, category: 'DevOps/Tools', description: 'Configuring extremely responsive client dev-servers and optimal build routines.' },
        { name: 'SQLite', level: 82, category: 'DevOps/Tools', description: 'Local lightweight file-centric databases utilizing ACID compliant relational querying.' },
        { name: 'MongoDB', level: 75, category: 'DevOps/Tools', description: 'Schema design for flexible JSON-like document models in scalable environments.' },
        { name: 'Neo4j', level: 55, category: 'DevOps/Tools', description: 'Storing and scanning complex graph networks of interconnected entities.' },
        { name: 'Redis', level: 55, category: 'DevOps/Tools', description: 'High performance in-memory caching and response acceleration.' },
        { name: 'Visual Studio Code', level: 75, category: 'DevOps/Tools', description: 'Standard IDE setup customized with extensions, shortcuts, and direct compiler connection.' },
        { name: 'Visual Studio', level: 65, category: 'DevOps/Tools', description: 'Robust integrated dev environment for .NET solutions, C# architectures, and desktop clients.' },
        { name: 'Figma', level: 60, category: 'DevOps/Tools', description: 'Interactive layout prototyping, UI components, wireframes, and collaborative design files.' },
        { name: 'Canva', level: 90, category: 'DevOps/Tools', description: 'Drafting presentation documents, social layouts, infographics, and graphical briefs.' },
        { name: 'Word', level: 92, category: 'DevOps/Tools', description: 'Structuring professional documentation reports, projects, and structured reports.' },
        { name: 'PowerPoint', level: 90, category: 'DevOps/Tools', description: 'Elegantly organizing visual content slides for academic and project reviews.' },
        { name: 'Excel', level: 85, category: 'DevOps/Tools', description: 'Analyzing matrix data, pivot modeling, complex functions, and data graphing.' },
        { name: 'Photoshop', level: 73, category: 'DevOps/Tools', description: 'High-end asset optimization, vector modifications, and image enhancements.' }
      ],
      highlightsFallback: [
        'Practical knowledge demonstrated inside school and private repositories',
        'Continuous self-improvement aligning to modern industry guidelines',
        'Strong debugging and analytical mindset applied to complex assignments'
      ],
      highlights: {
        'HTML': [
          'Developing modern and fully responsive web frontends',
          'Clean modular code architectures leveraging modern structures',
          'Applied in various school and personal web milestones'
        ],
        'CSS': [
          'Developing modern and fully responsive web frontends',
          'Clean modular code architectures leveraging modern structures',
          'Applied in various school and personal web milestones'
        ],
        'JavaScript': [
          'Developing modern and fully responsive web frontends',
          'Clean modular code architectures leveraging modern structures',
          'Applied in various school and personal web milestones'
        ],
        'TypeScript': [
          'Developing modern and fully responsive web frontends',
          'Clean modular code architectures leveraging modern structures',
          'Applied in various school and personal web milestones'
        ],
        'React': [
          'Developing modern and fully responsive web frontends',
          'Clean modular code architectures leveraging modern structures',
          'Applied in various school and personal web milestones'
        ],
        'Next.js': [
          'Developing modern and fully responsive web frontends',
          'Clean modular code architectures leveraging modern structures',
          'Applied in various school and personal web milestones'
        ],
        'Java': [
          'Solving algorithmic assignments in local programming modules',
          'Implementing durable calculations and logical software schemas',
          'In-depth training in object-oriented and functional development paradigms'
        ],
        'Python': [
          'Solving algorithmic assignments in local programming modules',
          'Implementing durable calculations and logical software schemas',
          'In-depth training in object-oriented and functional development paradigms'
        ],
        'C++': [
          'Solving algorithmic assignments in local programming modules',
          'Implementing durable calculations and logical software schemas',
          'In-depth training in object-oriented and functional development paradigms'
        ],
        '.NET MAUI': [
          'Solving algorithmic assignments in local programming modules',
          'Implementing durable calculations and logical software schemas',
          'In-depth training in object-oriented and functional development paradigms'
        ],
        'Git': [
          'Structured source tracking and safe repository branching models',
          'Modern container isolation and automated development stacks',
          'Connecting native browser protocols and external interfaces'
        ],
        'Docker': [
          'Structured source tracking and safe repository branching models',
          'Modern container isolation and automated development stacks',
          'Connecting native browser protocols and external interfaces'
        ],
        'Web APIs': [
          'Structured source tracking and safe repository branching models',
          'Modern container isolation and automated development stacks',
          'Connecting native browser protocols and external interfaces'
        ],
        'Vite': [
          'Structured source tracking and safe repository branching models',
          'Modern container isolation and automated development stacks',
          'Connecting native browser protocols and external interfaces'
        ],
        'SQLite': [
          'Planning and optimizing relational and document-based schematics',
          'Writing optimized query logic for high performance operations',
          'Bulletproof SQL setups for local desktop and modular services'
        ],
        'MongoDB': [
          'Planning and optimizing relational and document-based schematics',
          'Writing optimized query logic for high performance operations',
          'Bulletproof SQL setups for local desktop and modular services'
        ],
        'Neo4j': [
          'Planning and optimizing relational and document-based schematics',
          'Writing optimized query logic for high performance operations',
          'Bulletproof SQL setups for local desktop and modular services'
        ],
        'Redis': [
          'Planning and optimizing relational and document-based schematics',
          'Writing optimized query logic for high performance operations',
          'Bulletproof SQL setups for local desktop and modular services'
        ],
        'Visual Studio Code': [
          'Fast keyboard workflow, powerful extensions, and optimized setup',
          'Integrated diagnostic utilities connecting seamlessly to Git',
          'Configuring bespoke development assets and code parameters'
        ],
        'Visual Studio': [
          'Fast keyboard workflow, powerful extensions, and optimized setup',
          'Integrated diagnostic utilities connecting seamlessly to Git',
          'Configuring bespoke development assets and code parameters'
        ],
        'Figma': [
          'Designing high fidelity wireframes and user interaction details',
          'Creative canvas editing, graphic compilation, and mock prototypes',
          'Strict compliance with visual layout and contrast guides'
        ],
        'Canva': [
          'Designing high fidelity wireframes and user interaction details',
          'Creative canvas editing, graphic compilation, and mock prototypes',
          'Strict compliance with visual layout and contrast guides'
        ],
        'Photoshop': [
          'Designing high fidelity wireframes and user interaction details',
          'Creative canvas editing, graphic compilation, and mock prototypes',
          'Strict compliance with visual layout and contrast guides'
        ],
        'Word': [
          'Professional text configurations for long analysis reports and theses',
          'Constructing highly structured slide decks for technical presentations',
          'Formulas, lookup modeling, pivot tables, and visual matrices'
        ],
        'PowerPoint': [
          'Professional text configurations for long analysis reports and theses',
          'Constructing highly structured slide decks for technical presentations',
          'Formulas, lookup modeling, pivot tables, and visual matrices'
        ],
        'Excel': [
          'Professional text configurations for long analysis reports and theses',
          'Constructing highly structured slide decks for technical presentations',
          'Formulas, lookup modeling, pivot tables, and visual matrices'
        ]
      }
    },
    projects: {
      title: 'IT projects',
      desc: 'Academic works from school courses (gibb) and independent software projects.',
      filterAll: 'All Projects',
      filterSchool: 'School (gibb)',
      filterPrivate: 'Personal Projects',
      catalog: 'Project Catalog:',
      detailsTitle: 'SCIENTIFIC ABSTRACT',
      fieldRole: 'Role',
      fieldTech: 'Technologies',
      fieldProblem: 'Problem Statement',
      fieldSolution: 'Solution',
      fieldOutcome: 'Achieved Results and Evaluation',
      projectsList: [
        {
          id: 'website',
          title: 'Personal Website Portfolio',
          category: 'Private',
          role: 'IT Apprentice / First IMS Project',
          technologies: ['HTML', 'CSS'],
          problem: 'Constructing my very first portfolio page to cement core web development basics during early IMS semesters.',
          solution: 'Handcrafted HTML structures with custom CSS files, avoiding bloating third-party component modules to learn the raw basics.',
          outcome: 'A clean, semantic template showing off basic frontend skills that acts as an orientation setup for lower-grade peers.',
        },
        {
          id: 'game_2048',
          title: 'C# 2048 Game Desktop',
          category: 'Private',
          role: 'IT Apprentice / First game',
          technologies: ['C#', '.NET Windows Forms', 'OOP', 'Matrix Algorithms'],
          problem: 'Object-oriented C# replica of the popular 2048 puzzle featuring efficient state-updates and reliable grid logic.',
          solution: 'Developing sliding matrix shift controllers in C# incorporating value doubling routines, active score calculation, and persistent records.',
          outcome: 'Seamless classic puzzle client satisfying all object-oriented learning objectives with maximum output.',
        },
        {
          id: 'dreesify',
          title: 'Dreesify',
          category: 'Private',
          role: 'Frontend developer / Team Project',
          technologies: ['React', 'Vite', 'Tailwind CSS', 'Web APIs'],
          problem: 'Unorganized closets lead to high clothing waste and difficulties in finding the correct daily combination.',
          solution: 'Conceptualizing a web-based closet management app integrating current weather APIs to recommend bespoke clothing fits.',
          outcome: 'Sleek custom web layout enabling beautiful, intuitive gardrobe management and outfit suggestions.',
        },
        {
          id: 'sqlite_db',
          title: 'Pasta Restaurant SQLite (Module 164)',
          category: 'School',
          role: 'Database Developer / bwd Group Assignment',
          technologies: ['SQLite', 'SQL', 'Data Modeling (ERD)', 'N:M relations', 'Joins & Views'],
          problem: 'Desing clean relational database models for a pasta shop to coordinate orders without redundancy.',
          solution: 'Architecting an ERD model normalized up to 3NF with 7 tables mapping many-to-many connections for ingredients. Enforcing key triggers and strict types.',
          outcome: 'Integrity-checked schema delivering high performance queries analyzing client distributions or menu metrics.',
        },
        {
          id: 'event_management_mongodb',
          title: 'NoSQL Event Engine with MongoDB (Module 165)',
          category: 'School',
          role: 'NoSQL Architect / Module 165 Team Presentation',
          technologies: ['MongoDB', 'NoSQL', 'PHP', 'XAMPP', 'Replica Sets', 'Failover'],
          problem: 'Developing elastic database profiles to accommodate event data with varying schemas while ensuring high scalability.',
          solution: 'Creating a document-oriented MongoDB database layout with document validations, loading 1000 datasets for speed tests, and organizing a 3-node replica set.',
          outcome: 'Demo of aggregation arrays ($lookup) and index tracking with exemplary evaluation grades.',
        },
        {
          id: 'restaurant_menu_maui',
          title: 'Terra Verde Menu (Module 322)',
          category: 'School',
          role: 'Mobile Developer',
          technologies: ['.NET MAUI', 'C#', 'XAML', 'Cross-Platform', 'MVVM Pattern'],
          problem: 'Constructing an eco-friendly digital menu interface for local vegetarian restaurant "Terra Verde" to minimize printed cards.',
          solution: 'Developing cross-platform .NET MAUI views reflecting strict MVVM abstractions. Bundling easy dish filters, allergen details, and table ordering services.',
          outcome: 'Intuitive operational app running natively on Android & iOS featuring large accessible typography (Verdana) and generous visual ergonomics.',
        },
        {
          id: 'matcha_event',
          title: 'Matcha After Dark (Module 294)',
          category: 'School',
          role: 'Frontend Engineer / Module 294 (bwd & ICT-LearnFactory)',
          technologies: ['React', 'Tailwind CSS', 'PocketBase', 'Fetch API', 'Dark Mode'],
          problem: 'Creating an interactive RSVP web page for "Matcha After Dark" pop-ups, connecting electronic beats and drinks to organize the entrance.',
          solution: 'Implementing a responsive SPA using React 18+ and Tailwind CSS. Setting up real-time CRUD calls to PocketBase and neat drink lists.',
          outcome: 'Successful completion of standard modules with fully functional RSVP tools including a password-locked operator dashboard.',
        },
        {
          id: 'heat_calculator',
          title: 'Thermodynamics Calculator (Module 320)',
          category: 'School',
          role: 'Software Developer / OOP Project',
          technologies: ['Java', 'JUnit', 'Swing GUI', 'OOP'],
          problem: 'Developing a thermodynamic simulator to calculate heat energy transfers and heat loss trends.',
          solution: 'Constructing object-oriented Java SE services equipped with Swing-based dashboards and complete JUnit component testing.',
          outcome: 'Bug-free mathematical calculator achieving 100% unit test coverage complying with Clean Code conventions.',
        },
        {
          id: 'web_evolution',
          title: 'Tripartite Web Portfolio (Module 293)',
          category: 'School',
          role: 'Frontend Web Developer / bwd Class Project',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web', 'Validations'],
          problem: 'Designing a modular, user-focused 3-part web series addressing complex blog cards, culinary menus, and wellness portals.',
          solution: 'Crafting three discrete sites: Part 1 for a cooking blog with submissions, Part 2 for vegetarian menus, and Part 3 for a yoga booking layout with integrated instructions.',
          outcome: 'Finished with a flawless 6.0 maximum grade in Module 293 bwd Bern. Validates excellent skills in user experience and CSS page layout.',
        },
        {
          id: 'kubernetes_website',
          title: 'Kubernetes Microservices (Module 347)',
          category: 'School',
          role: 'DevOps & Infrastructure / Module 347 Portfolio',
          technologies: ['Docker', 'Docker Compose', 'Kubernetes', 'RabbitMQ', 'Podman', 'YAML'],
          problem: 'Deploying, containerizing, and orchestrating distributed microservices setups to maintain self-healing web clients and persistent storage.',
          solution: 'Deploying a federated ToDo codebase over Podman containers and a localized Kubernetes cluster. Creating 3 replication controllers and RabbitMQ routing.',
          outcome: 'Fully functional, resilient microservice swarm performing rolling updates, fast self-healing routines, and Portainer integrations.',
        },
        {
          id: 'codesnp',
          title: 'CodeSNP Platform (Module 426)',
          category: 'School',
          role: 'Full-Stack Developer / Scrum Master (gibb)',
          technologies: ['React 19', 'TypeScript', 'Express', 'MongoDB', 'Material UI', 'Tailwind CSS', 'Formik/Yup', 'Jest', 'Scrum'],
          problem: 'Designing and implementing a modular MERN platform for code snippet management in compliance with Scrum guidelines, accessible dark-vibe design, and strict code validation.',
          solution: 'Developing a React 19 frontend architecture with protected JWT AuthContext, Formik/Yup form validation, automated Jest & Bruno API test suite, and agile Azure DevOps workflow (3-week sprints).',
          outcome: 'Successful module completion featuring a highly performant code collection web app, high test coverage, structured Git branching, and fully achieved sprint capacity.',
        },
        {
          id: 'url_shortener',
          title: 'URL-Shortener (Module 210)',
          category: 'School',
          role: 'DevOps & Cloud Engineer / LB1 Project (gibb)',
          technologies: ['NestJS', 'MariaDB', 'Docker', 'Kubernetes', 'Minikube', 'ArgoCD', 'GitLab CI', 'GitOps'],
          problem: 'Designing and building a resilient, containerized microservice architecture for a URL shortener with two dedicated services (keeper & shorty) and relational MariaDB database.',
          solution: 'Setting up an automated multi-stage GitLab CI pipeline (linting, tests, OCI container builds via Kaniko) and declarative GitOps deployment via ArgoCD in Minikube cluster with strict Role-Based Access Control (RBAC).',
          outcome: 'Fully functional, automated deployment with Ingress routing, namespace isolation, and thoroughly documented LB1 examination meeting all Module 210 criteria.',
        },
        {
          id: 'evently',
          title: 'Evently Mobile App (Module 335)',
          category: 'School',
          role: 'Mobile App Developer / ICT-LearnFactory Team Project',
          technologies: ['React Native', 'TypeScript', 'iOS', 'Firebase (Firestore/Auth/Storage)', 'AsyncStorage', 'GPS & Sensors', 'Jest'],
          problem: 'Creating a mobile app for easily finding nearby events (concerts, comedy, festivals) with transparent location-based sorting, genuine photo reviews, and ticket management.',
          solution: 'Developing a native iOS app using React Native and TypeScript. Integrating Firebase (Firestore, Auth, Storage) and AsyncStorage, leveraging device sensors (GPS distance calculation, camera for QR scanning, and haptic vibration feedback).',
          outcome: 'Fully documented and verified mobile app on physical iOS devices featuring a comprehensive testing protocol (test cases T-01 to T-08), functional GPS radius search, and Firebase backend per ICT-LearnFactory standards.',
        }
      ]
     },
    about: {
      title: 'Personal and Leisure',
      desc: 'Behind the lines of code is a versatile individual with a strong sense for visual design, Pilates, adventures, and creative activities.',
      bioQuote: '“With enthusiasm, creativity, and love for detail”',
      bioP1: 'I live in Bern and absolutely love it here. Since relocating in 2022 from Chernihiv (Ukraine) to Switzerland, I have invested substantial energy and dedication to mastering German and fitting in. Speaking German fluently (B2.2 level) and successfully attending the hard IMS curriculum keeps me proud and happy.',
      bioP2: 'I find a beautiful counterbalance in sports and arts. I stay active through yoga, Pilates, swimming, and exploring mountain paths in Swiss Alps. I enjoy exploring other cultures on journeys and have a passion for composing food recipes. I operate with a baseline rule: great achievements are composed of small, delicate aspects created with heart.',
      hobbies: [
        {
          title: 'Fitness, Pilates and Yoga',
          description: 'A genuine passion for precise movement, muscle conditioning, and stretching. Yoga and Pilates grant a relaxing counterweight to long coding monitor blocks.',
          tag: '#Fitness #Pilates #Yoga',
          image: pilatesImage
        },
        {
          title: 'Nature and Hiking',
          description: 'Exploring postcard mountain profiles and hiking routes around Switzerland. Fresh alpine air charges my stamina and grants fresh focus.',
          tag: '#Nature #Hiking #Mountians',
          image: wandernImage
        },
        {
          title: 'Swimming',
          description: 'Regular lane training and pool sessions. Swimming is an outstanding overall workout and helps perfect mental clarity.',
          tag: '#Swimming #Sport #Stamina',
          image: seeImage
        },
        {
          title: 'Cooking',
          description: 'Testing versatile global food recipes. Cooking represents combining quality ingredients in the perfect proportions – just like crafting premium source code.',
          tag: '#Cooking #Artistic #Proportions',
          image: bowlImage
        },
        {
          title: 'Travel',
          description: 'Discovering different countries, regional arts, and traditions. Traveling opens my horizon and sparks my lateral thinking.',
          tag: '#Travel #Cultures #Adventures',
          image: parisImage
        }
      ]
    },
    teacherEvaluation: {
      badge: 'Proven Performance Record',
      title: 'Academic Performance and Grades',
      desc: 'Certified and official academic transcripts split into kaufmännische high school (bwd Bern) and IT core specialization (gibb Bern).',
      semester: 'Semester',
      btnBwd: 'bwd Bern (Business & BM)',
      btnGibb: 'gibb Bern (IT Specialty EFZ)',
      gradeAvg: 'Grade Average:',
      absenceExcuse: 'Excused:',
      absenceUnexcuse: 'Unexcused:',
      absenceUnit: 'Periods',
      statusLabel: 'Promotion Status:',
      gibbCumulativeAvg: 'Weighted Module Average:',
      gibbWarning: 'Note: Inter-company modules (üK) are tagged with an asterisk (*).',
      cardDesc: 'Module Description',
      cardGrade: 'Grade',
      cardNoDesc: 'No details logged for this entry',
      german: 'German',
      french: 'French',
      english: 'English',
      maths: 'Mathematics',
      csGibb: 'IT (gibb)',
      finances: 'Accounting and Finance',
      businessLaw: 'Business and Law',
      historyPol: 'History and Politics',
      techEnv: 'Technology and Environment',
      sport: 'Physical Ed',
      interdis: 'Interdisciplinary Project',
      subjectsCategory1: 'General Subjects',
      subjectsCategory2: 'Commercial Subject Stack',
      subjectsCategory3: 'Electives & Core',
      statusValue1: 'admitted definitely',
      statusValue2: 'promoted',
      schoolBwd: 'bwd Bern (Business & BM)',
      schoolGibb: 'gibb Bern (Informatik EFZ)',
      studentLabel: 'Student',
      classLabel: 'Class',
      classVal: 'Informatikmittelschule bwd Bern',
      avgTitle: 'GRADE AVERAGE',
      avgSub: 'Total GPA in',
      avgDescBwd: 'Calculated according to official vocational baccalaureate weightings.',
      avgDescGibb: 'Unweighted mathematical average of all vocational modules in this term.',
      absencesTitle: 'ABSENCES',
      excusedLabel: 'Excused',
      unexcusedLabel: 'Unexcused',
      lessonsLabel: 'Lessons',
      absencesDesc: 'Conforms strictly to Swiss high school attendance laws. Zero unexcused absences.',
      promoTitle: 'PROMOTION STATUS',
      promoSub: 'Semester',
      promoDesc: 'All academic promotion rules of bwd Bern and gibb Bern are fully met.',
      bwdTableSubject: 'Subject / Area (bwd Bern)',
      bwdTableGrade: 'Report Card Grade',
      bwdTableAvg: 'Subject Cluster Average',
      gibbTableId: 'Module ID',
      gibbTableSubject: 'Module & Core Description (gibb Bern)',
      gibbTableGrade: 'Final Grade',
      gibbTableProp: 'Type',
      gibbUekLabel: 'üK (Practical)',
      gibbNonUekLabel: 'School Module',
      gibbTableGpa: 'Module average grade',
      gibbTableGpaDesc: 'Mathematical summary of all grades in this period',
      gibbTableGpaLabel: 'GPA STATUS',
      noteTitle: 'Performance Transparency & Certification',
      noteDesc3: 'As an active dual-enrollment student (IMS), I qualify in major academic registers simultaneously. All transcript data reflects official registries.',
      noteDescOther: 'All values listed are derived from certified school logs hosted at bwd and gibb Bern.',
      gibbPass: 'Promoted',
      subjects: {
        deutsch: 'German',
        franz: 'French',
        engl: 'English',
        math: 'Mathematics',
        inf: 'IT (gibb)',
        finanz: 'Accounting & Finance',
        recht: 'Business & Law',
        geschichte: 'History & Politics',
        technik: 'Technology & Environment',
        sport: 'Physical Ed',
        idaf: 'Interdisciplinary Project'
      }
    },
    contact: {
      title: 'Contact Details',
      phoneLabel: 'PHONE (DIRECT)',
      emailLabel: 'EMAIL',
      directEmail: 'Direct Inbox',
      writeEmailTitle: 'Write an Email',
      writeEmailDesc: 'Select an option below to initiate communication. An external client or app window will load with pre-filled details to: ya.yana.dzhima@gmail.com.',
      btnDefaultApp: 'Default Mail App',
      btnDefaultAppDesc: 'Triggers desktop apps (Outlook, Apple Mail, etc.)',
      btnGmail: 'Gmail Web Client',
      btnGmailDesc: 'Opens Gmail inside a web browser redirect',
      btnOutlook: 'Outlook Web Client',
      btnOutlookDesc: 'Opens Microsoft Live web mail interface',
      badge: 'Connect',
      directTitle: 'Direct Contact',
      phoneSub: 'Monday – Saturday, 08:00 AM – 06:00 PM',
      emailSub: 'Write an email to me anytime',
      mailAppLabel: 'Default Mail App',
      mailAppSub: 'Triggers desktop apps (Outlook, Apple Mail, etc.)',
      gmailLabel: 'Gmail Web Client',
      gmailSub: 'Opens Gmail inside a web browser redirect',
      outlookLabel: 'Outlook Web Client',
      outlookSub: 'Opens Microsoft Live web mail interface',
      responseMsg: 'I usually reply to all inquiries within 24 hours. Thank you very much for your interest!',
    },
    imprint: {
      titleLegal: 'Legal Imprint',
      labelResp: 'Publisher & Responsibility:',
      titleInst: 'Academic Institutions',
      bwdDesc: 'bwd Bern - Educational Center for Business and Services (IMS Admin)',
      gibbDesc: 'gibb Bern - Vocational Industrial School (IT Curriculum)',
      titleDisclaimer: 'Disclaimer & Digital Right',
      disclaimerText: 'All texts on this page have been carefully compiled in secondary vocational semesters at IMS. No liability is assumed for material or ideal damages resulting from information provided. Direct links are independent.',
    },
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('yana_portfolio_lang');
    return (saved === 'de' || saved === 'en') ? saved as Language : 'de';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('yana_portfolio_lang', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'de' ? 'en' : 'de';
    setLanguage(next);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
