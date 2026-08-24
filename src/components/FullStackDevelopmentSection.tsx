import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Layers,
  Terminal,
  Database,
  Cpu,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  CircleDot,
  Clock,
  Flame,
  Layout,
  Globe,
  Smartphone,
  Server,
  Zap,
  Workflow,
  Laptop,
  Compass,
  FileCode,
  ShieldCheck,
  TrendingUp,
  Boxes,
  Eye,
  GitBranch,
  MonitorCheck
} from 'lucide-react';
import { sound } from '../utils/sound';

import foamXpressImg from '../assets/images/foamxpress_preview_1783791638759.jpg';
import smileSyncImg from '../assets/images/smilesync_preview_1783791654064.jpg';

interface Props {
  theme: 'dark' | 'light';
}

export default function FullStackDevelopmentSection({ theme }: Props) {
  const isDark = theme === 'dark';

  // Sub-tab switcher inside Full Stack section: Overview | Roadmap | Stack | What I Build | Projects & Journey
  const [activeTab, setActiveTab] = useState<'roadmap' | 'frontend-track' | 'what-i-build' | 'developer-stack' | 'projects-showcase' | 'journey' | 'data-x-dev'>('roadmap');

  // Interactive Live FoamXpress Demo Simulator inside Development section
  const [foamVehicle, setFoamVehicle] = useState<'bike' | 'sedan' | 'suv'>('sedan');
  const [foamPackage, setFoamPackage] = useState<'express' | 'deep-clean' | 'ceramic-pro'>('deep-clean');
  const [foamAddons, setFoamAddons] = useState<{ interior: boolean; engineShine: boolean; sanitization: boolean }>({
    interior: true,
    engineShine: false,
    sanitization: true
  });

  // Calculate live dynamic pricing for FoamXpress simulator
  const vehicleBasePrice = foamVehicle === 'bike' ? 299 : foamVehicle === 'sedan' ? 599 : 799;
  const packageMultiplier = foamPackage === 'express' ? 1.0 : foamPackage === 'deep-clean' ? 1.45 : 2.1;
  const addonsTotal = (foamAddons.interior ? 199 : 0) + (foamAddons.engineShine ? 149 : 0) + (foamAddons.sanitization ? 99 : 0);
  const totalComputedPrice = Math.round(vehicleBasePrice * packageMultiplier + addonsTotal);

  const handleHover = () => {
    sound.playHover();
  };

  const handleTabChange = (tabId: typeof activeTab) => {
    sound.playClick();
    setActiveTab(tabId);
  };

  // Full Stack Developer Roadmap Data (Stages 1 to 6)
  const fullStackRoadmapStages = [
    {
      id: 'stage-1',
      stageNum: '01',
      title: 'WEB FOUNDATIONS',
      status: 'CURRENT',
      statusColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
      description: 'Mastering semantic markup, modern CSS box models, asynchronous JavaScript, and mobile-first responsive architecture.',
      skills: ['HTML5 & Semantic Markup', 'CSS3 & Flexbox/Grid', 'Modern JavaScript (ES6+)', 'Responsive Web Design', 'DOM Manipulation'],
      mastery: 92,
      provenIn: 'All Web Projects & Responsive Viewports'
    },
    {
      id: 'stage-2',
      stageNum: '02',
      title: 'FRONTEND DEVELOPMENT',
      status: 'CURRENT',
      statusColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
      description: 'Building single-page component-driven applications with React, TypeScript type safety, Vite tooling, and Tailwind CSS utility styling.',
      skills: ['React 18 & Custom Hooks', 'TypeScript Strict Mode', 'Tailwind CSS Utility Design', 'Vite Build Ecosystem', 'Component Architecture', 'State Management'],
      mastery: 88,
      provenIn: 'FoamXpress & SmileSync Production Prototypes'
    },
    {
      id: 'stage-3',
      stageNum: '03',
      title: 'BACKEND DEVELOPMENT',
      status: 'LEARNING',
      statusColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
      description: 'Actively learning server runtime environments, asynchronous request handling, Express middleware, RESTful API contract design, and JWT auth workflows.',
      skills: ['Node.js Runtime Basics', 'Express.js Framework', 'RESTful API Design', 'Middleware Architecture', 'Authentication & JWT Logic', 'Server-Side Business Logic'],
      mastery: 48,
      provenIn: 'Active Learning Roadmap & API Practice Labs'
    },
    {
      id: 'stage-4',
      stageNum: '04',
      title: 'DATABASE & DATA MODELING',
      status: 'CURRENT & LEARNING',
      statusColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
      description: 'Bridging relational SQL queries (proven in Data Analytics projects) with modern NoSQL document schemas and transactional CRUD endpoints.',
      skills: ['SQL & Schema Design (Demonstrated)', 'PostgreSQL / MySQL Queries', 'MongoDB & Document Modeling (Learning)', 'CRUD Operations', 'Query Optimization & Indexing'],
      mastery: 75,
      provenIn: 'SQL Academic Database & Data Analysis Work'
    },
    {
      id: 'stage-5',
      stageNum: '05',
      title: 'FULL STACK APPLICATIONS',
      status: 'NEXT STEP',
      statusColor: 'text-pink-400 border-pink-400/30 bg-pink-400/10',
      description: 'Connecting type-safe client frontends with containerized backends, cloud databases, CI/CD deployment pipelines, and end-to-end testing.',
      skills: ['Frontend + Backend Integration', 'Git & GitHub Collaboration', 'Vercel / Cloud Run Deployment', 'Environment Variables & Security', 'Client-Server Error Handling'],
      mastery: 40,
      provenIn: 'In Active Development'
    },
    {
      id: 'stage-6',
      stageNum: '06',
      title: 'FULL STACK DEVELOPER',
      status: 'CAREER DESTINATION',
      statusColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      description: 'Building end-to-end, resilient, and data-informed digital products from client interface to database infrastructure.',
      skills: ['Full Software Lifecycle', 'Scalable Clean Architecture', 'Data-Driven Features', 'Production Deployment'],
      mastery: 65,
      provenIn: 'Target Career Outcome'
    }
  ];

  // Frontend Progression Steps
  const frontendProgression = [
    { step: '01', name: 'HTML + CSS', icon: 'FileCode', desc: 'Structure & Styling foundations', status: 'Mastered' },
    { step: '02', name: 'JavaScript (ES6+)', icon: 'Code2', desc: 'Async, Events & DOM Logic', status: 'Proficient' },
    { step: '03', name: 'React.js', icon: 'Layers', desc: 'Components, Hooks & Lifecycle', status: 'Demonstrated' },
    { step: '04', name: 'TypeScript', icon: 'ShieldCheck', desc: 'Interfaces, Types & Generics', status: 'Demonstrated' },
    { step: '05', name: 'Tailwind CSS', icon: 'Sparkles', desc: 'Utility Design & Responsiveness', status: 'Demonstrated' },
    { step: '06', name: 'Reusable Components', icon: 'Boxes', desc: 'Modular Component Systems', status: 'Demonstrated' },
    { step: '07', name: 'Responsive Web Apps', icon: 'MonitorCheck', desc: 'Mobile-First Production UX', status: 'Demonstrated' },
    { step: '08', name: 'Frontend Developer', icon: 'Zap', desc: 'Ready for Junior / Intern Roles', status: 'Target Role' }
  ];

  // "What I Can Build" items
  const whatICanBuild = [
    {
      num: '01',
      title: 'RESPONSIVE WEBSITES',
      summary: 'Modern, high-performance web pages that adapt smoothly across desktop monitors, tablets, and mobile devices with fluid layouts and accessible typography.',
      tech: ['HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Grid', 'Mobile-First Design'],
      highlight: 'Fluid Multi-Breakpoint Viewports'
    },
    {
      num: '02',
      title: 'REACT APPLICATIONS',
      summary: 'Interactive, component-based single-page applications leveraging React 18 functional architecture, custom hooks, and type-safe TypeScript interfaces.',
      tech: ['React', 'TypeScript', 'Vite', 'Custom Hooks', 'State Management'],
      highlight: 'Component-Based Architecture'
    },
    {
      num: '03',
      title: 'BUSINESS WEB APPLICATIONS',
      summary: 'Workflow-oriented digital systems such as appointment schedulers, service booking portals, clinic management dashboards, and operational interfaces.',
      tech: ['Dynamic Workflows', 'Slot Reservation', 'Form Validation', 'Real-Time Computation'],
      highlight: 'FoamXpress & SmileSync Case Studies'
    },
    {
      num: '04',
      title: 'FULL STACK APPLICATIONS',
      summary: 'End-to-end applications connecting reactive UI frontends with server-side logic, API endpoints, and database models as backend capabilities expand.',
      tech: ['Frontend + Backend', 'REST APIs', 'Node.js Basics', 'Database Queries', 'CRUD Lifecycle'],
      highlight: 'Active Development Path'
    },
    {
      num: '05',
      title: 'DATA-DRIVEN WEB APPS',
      summary: 'Specialized applications that combine analytical data processing, dynamic charts, statistical metrics, and responsive interactive web interfaces.',
      tech: ['Data Visualization', 'Interactive Charts', 'Python Data Synergy', 'KPI Dashboards'],
      highlight: 'Unique Data × Development Advantage'
    }
  ];

  // Developer Tech Stack Items with clear truth labels
  const developerStack = {
    frontend: [
      { name: 'HTML5', status: 'CURRENT', level: 'Core', desc: 'Semantic tags, accessibility, structural layout' },
      { name: 'CSS3', status: 'CURRENT', level: 'Core', desc: 'Flexbox, CSS Grid, custom animations, media queries' },
      { name: 'JavaScript (ES6+)', status: 'CURRENT', level: 'Core', desc: 'Arrow functions, destructuring, Promises, async/await, DOM manipulation' },
      { name: 'TypeScript', status: 'CURRENT', level: 'Demonstrated', desc: 'Strong type definitions, interfaces, prop contracts, generics' },
      { name: 'React.js', status: 'CURRENT', level: 'Demonstrated', desc: 'Functional components, hooks (useState, useEffect, useMemo), state flow' },
      { name: 'Vite', status: 'CURRENT', level: 'Demonstrated', desc: 'Next-gen build tool, rapid HMR development, bundling' },
      { name: 'Tailwind CSS', status: 'CURRENT', level: 'Demonstrated', desc: 'Utility-first styling, custom palettes, dark/light responsiveness' }
    ],
    backend: [
      { name: 'Node.js', status: 'LEARNING', level: 'In Progress', desc: 'Asynchronous JavaScript runtime, npm module ecosystem, file I/O' },
      { name: 'Express.js', status: 'LEARNING', level: 'In Progress', desc: 'Routing, middleware chains, JSON request parsing, error handling' },
      { name: 'REST APIs', status: 'LEARNING', level: 'In Progress', desc: 'HTTP methods (GET, POST, PUT, DELETE), status codes, endpoint contracts' },
      { name: 'Authentication & JWT', status: 'NEXT', level: 'Upcoming Milestone', desc: 'Token-based authentication, password hashing, route protection' }
    ],
    database: [
      { name: 'SQL & Relational DBs', status: 'CURRENT', level: 'Demonstrated', desc: 'Relational schema design, multi-table JOINs, aggregations, indexing' },
      { name: 'PostgreSQL / MySQL', status: 'CURRENT', level: 'Demonstrated', desc: 'Relational table modeling and query execution in academic & data projects' },
      { name: 'MongoDB', status: 'LEARNING', level: 'Exploring', desc: 'NoSQL document schemas, BSON collections, CRUD operations with Mongoose' }
    ],
    tools: [
      { name: 'Git & Version Control', status: 'CURRENT', level: 'Demonstrated', desc: 'Branching, merging, commit hygiene, rebasing, remote sync' },
      { name: 'GitHub', status: 'CURRENT', level: 'Demonstrated', desc: 'Repository management, Pull Requests, code reviews, project tracking' },
      { name: 'VS Code', status: 'CURRENT', level: 'Core', desc: 'Debugging extensions, ESLint, TypeScript compiler, terminal workflows' },
      { name: 'npm', status: 'CURRENT', level: 'Core', desc: 'Package management, scripts, dependency resolution' }
    ]
  };

  // Developer Journey Stages
  const developerJourneySteps = [
    {
      num: '01',
      title: 'Computer Science Foundation',
      timeline: '2023 - Present',
      focus: 'Programming Logic & Data Structures',
      desc: 'Formed core computational reasoning, OOP concepts, algorithms, and computational problem solving at K.R. Mangalam University.',
      badge: 'Academic Core',
      color: 'border-cyan-500/40 text-cyan-400'
    },
    {
      num: '02',
      title: 'HTML, CSS & Semantic Web',
      timeline: '2023 - 2024',
      focus: 'Web Standards & Responsive Layouts',
      desc: 'Mastered semantic HTML5 markup, modern CSS styling, Flexbox/Grid systems, and cross-device media queries.',
      badge: 'Foundation',
      color: 'border-blue-500/40 text-blue-400'
    },
    {
      num: '03',
      title: 'JavaScript (ES6+) Foundations',
      timeline: '2024',
      focus: 'DOM & Asynchronous Logic',
      desc: 'Deepened modern JavaScript skills: closures, promises, async/await, fetch APIs, event loops, and modular code design.',
      badge: 'Language Mastery',
      color: 'border-amber-500/40 text-amber-400'
    },
    {
      num: '04',
      title: 'React.js Component Architecture',
      timeline: '2024 - 2025',
      focus: 'Declarative UI & State Management',
      desc: 'Transitioned to declarative frontend engineering using React functional components, custom hooks, and reactive state flows.',
      badge: 'Demonstrated Skill',
      color: 'border-cyan-400/50 text-cyan-300'
    },
    {
      num: '05',
      title: 'TypeScript & Type Safety',
      timeline: '2025',
      focus: 'Strict Types & Generics',
      desc: 'Adopted TypeScript across all web projects for bulletproof interfaces, prop contracts, compile-time safety, and maintainability.',
      badge: 'Demonstrated Skill',
      color: 'border-indigo-500/40 text-indigo-400'
    },
    {
      num: '06',
      title: 'Modern UI & Utility Styling (Tailwind)',
      timeline: '2025 - 2026',
      focus: 'Rapid Prototyping & Design Systems',
      desc: 'Utilized Tailwind CSS to craft refined, high-contrast dark/light user interfaces with micro-interactions and animations.',
      badge: 'Demonstrated Skill',
      color: 'border-pink-500/40 text-pink-400'
    },
    {
      num: '07',
      title: 'Real-World Production Prototypes',
      timeline: '2025 - 2026',
      focus: 'FoamXpress & SmileSync',
      desc: 'Engineered complete interactive applications: an on-demand vehicle wash booking system and a dental practice management dashboard.',
      badge: 'Key Projects',
      color: 'border-emerald-500/50 text-emerald-400'
    },
    {
      num: '08',
      title: 'Backend Fundamentals (Node.js & Express)',
      timeline: 'Active Roadmap (2026)',
      focus: 'Server Runtime & REST Endpoints',
      desc: 'Currently learning server-side programming with Node.js, Express routing, API contracts, and request/response lifecycles.',
      badge: 'Active Learning',
      color: 'border-amber-400/50 text-amber-400'
    },
    {
      num: '09',
      title: 'Databases & API Integration',
      timeline: 'Upcoming Milestone',
      focus: 'SQL & NoSQL Integration',
      desc: 'Bridging relational SQL queries with MongoDB document stores, connecting backend endpoints with client-side applications.',
      badge: 'Next Step',
      color: 'border-purple-500/40 text-purple-400'
    },
    {
      num: '10',
      title: 'Full Stack Developer',
      timeline: 'Career Goal',
      focus: 'End-to-End Software Delivery',
      desc: 'Delivering end-to-end data-informed web applications combining robust backend services with polished frontend experiences.',
      badge: 'Target Horizon',
      color: 'border-cyan-400/60 text-cyan-300'
    }
  ];

  // Currently Building Items
  const currentlyBuilding = [
    { title: 'React & TypeScript applications', desc: 'Building modular, type-safe frontend web apps with clean architecture' },
    { title: 'Responsive web interfaces', desc: 'Creating mobile-first responsive layouts that look sharp on any screen size' },
    { title: 'Reusable UI components', desc: 'Designing component systems with predictable props and isolated styles' },
    { title: 'API integration workflows', desc: 'Connecting client applications with asynchronous REST endpoints and JSON payloads' },
    { title: 'Backend fundamentals', desc: 'Learning Node.js and Express.js to construct structured server-side logic' },
    { title: 'Database-driven applications', desc: 'Applying SQL knowledge and exploring MongoDB document schemas for state persistence' },
    { title: 'Full Stack projects', desc: 'Developing towards comprehensive applications spanning client, server, and database' }
  ];

  // Next Development Milestones
  const nextMilestones = [
    { num: '01', title: 'Advanced React', status: 'In Progress', desc: 'Custom hooks, performance optimization (useCallback, useMemo), complex reducer patterns' },
    { num: '02', title: 'REST API Integration', status: 'In Progress', desc: 'Robust client-side data fetching, caching strategies, optimistic UI updates' },
    { num: '03', title: 'Node.js + Express', status: 'Active Learning', desc: 'Server setup, routing modularity, custom middleware, error handling pipelines' },
    { num: '04', title: 'Database Integration', status: 'Active Learning', desc: 'Connecting PostgreSQL and MongoDB models with backend ORMs / query builders' },
    { num: '05', title: 'Authentication', status: 'Next Step', desc: 'JWT token handling, secure cookies, bcrypt password hashing, protected routes' },
    { num: '06', title: 'Full Stack Application', status: 'Next Step', desc: 'End-to-end deployment of an integrated frontend, backend API, and database application' },
    { num: '07', title: 'Deployment & CI/CD', status: 'Next Step', desc: 'Containerization basics, cloud hosting (Vercel, Cloud Run), environment configurations' }
  ];

  return (
    <section 
      id="full-stack-development-section"
      className={`relative py-16 sm:py-24 border-t ${
        isDark ? 'border-white/5 bg-[#050816]/90' : 'border-slate-200/80 bg-slate-50/90'
      }`}
    >
      {/* Visual Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        {/* ==================================================================== */}
        {/* 1. SECTION HERO & HEADER BANNER */}
        {/* ==================================================================== */}
        <div className="text-center md:text-left max-w-4xl mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-[9px] font-mono tracking-widest uppercase font-black text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <Code2 size={13} className="text-cyan-400 animate-pulse" />
            <span>CAREER TRACK 02 :: FULL STACK DEVELOPER PATH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase leading-none text-white">
            Full Stack <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Development
            </span>
          </h2>

          <div className="p-4 sm:p-5 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md max-w-3xl">
            <p className="text-sm sm:text-base leading-relaxed text-cyan-200 font-sans font-medium">
              &ldquo;I build modern, responsive web applications and am developing toward full stack development.&rdquo;
            </p>
            <p className="text-xs text-slate-400 mt-2 font-sans">
              Combining a solid foundation in React, TypeScript, and modern responsive UI engineering with an active roadmap in Node.js, Express REST APIs, and database architecture.
            </p>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. CAREER TARGETS COMPONENT (SIDE-BY-SIDE DUAL TRACK TARGET ROLES) */}
        {/* ==================================================================== */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Compass size={16} className="text-cyan-400" />
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400">
              DUAL CAREER TARGETS :: RECRUITER QUICK SPECIFICATION
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Target Column 1: DATA ANALYTICS */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-slate-950/80 to-slate-900/40 border-cyan-500/20 shadow-[0_0_25px_rgba(0,229,255,0.05)]' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Database size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">TRACK 01</span>
                    <h4 className="text-base font-display font-bold text-white">DATA ANALYTICS</h4>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-bold">
                  DEMONSTRATED
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Target Roles:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {['• Data Analyst', '• Junior Data Analyst', '• Business Analyst', '• Data Science Intern', '• BI Analyst', '• Data Operations Trainee'].map((role, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                      <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                      <span>{role.replace('• ', '')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {['Python', 'SQL Queries', 'Pandas & NumPy', 'Power BI / Tableau', 'EDA & Outlier Cleanse', 'K-Means ML'].map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Target Column 2: FULL STACK DEVELOPMENT */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-slate-950/80 to-slate-900/40 border-purple-500/20 shadow-[0_0_25px_rgba(139,92,246,0.05)]' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    <Code2 size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">TRACK 02</span>
                    <h4 className="text-base font-display font-bold text-white">FULL STACK DEVELOPMENT</h4>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-bold">
                  ACTIVE PATH
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Target Roles:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {['• Frontend Developer', '• React Developer', '• Junior Full Stack Developer', '• Web Developer', '• Software Developer', '• Full Stack Development Intern'].map((role, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                      <CheckCircle2 size={13} className="text-purple-400 shrink-0" />
                      <span>{role.replace('• ', '')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Component Systems', 'Node.js (Learning)'].map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 3. INTERACTIVE SUB-NAVIGATION TABS */}
        {/* ==================================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/5">
          {[
            { id: 'roadmap', label: 'Full Stack Roadmap', icon: <Workflow size={14} /> },
            { id: 'frontend-track', label: 'Frontend Sub-Track', icon: <Layout size={14} /> },
            { id: 'what-i-build', label: 'What I Can Build', icon: <Boxes size={14} /> },
            { id: 'developer-stack', label: 'Developer Stack', icon: <Cpu size={14} /> },
            { id: 'projects-showcase', label: 'FoamXpress & SmileSync', icon: <Laptop size={14} /> },
            { id: 'journey', label: 'Developer Journey', icon: <TrendingUp size={14} /> },
            { id: 'data-x-dev', label: 'DATA × DEVELOPMENT', icon: <Zap size={14} /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as typeof activeTab)}
                onMouseEnter={handleHover}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: FULL STACK DEVELOPER ROADMAP */}
        {/* ==================================================================== */}
        {activeTab === 'roadmap' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/50 border border-white/10">
              <div>
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Workflow className="text-cyan-400" size={20} />
                  Full Stack Developer Roadmap
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  Structured progression from core web standards to frontend mastery, backend runtime fundamentals, database modeling, and production deployment.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono shrink-0">
                <span className="flex items-center gap-1.5 text-cyan-400"><span className="w-2 h-2 rounded-full bg-cyan-400" /> CURRENT</span>
                <span className="flex items-center gap-1.5 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-400" /> LEARNING</span>
                <span className="flex items-center gap-1.5 text-pink-400"><span className="w-2 h-2 rounded-full bg-pink-400" /> NEXT STEP</span>
              </div>
            </div>

            {/* Visual Connected Vertical / Grid Roadmap Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
              {fullStackRoadmapStages.map((stage, idx) => (
                <div
                  key={stage.id}
                  onMouseEnter={handleHover}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                    isDark 
                      ? 'bg-slate-950/70 border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,229,255,0.1)]' 
                      : 'bg-white border-slate-200 hover:border-cyan-500/40 shadow-sm'
                  }`}
                >
                  {/* Top Header Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-black text-slate-500 group-hover:text-cyan-400 transition-colors">
                        STAGE {stage.stageNum}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${stage.statusColor}`}>
                        {stage.status}
                      </span>
                    </div>

                    <h4 className="text-base font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {stage.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                      {stage.description}
                    </p>
                  </div>

                  {/* Skills Checklist & Evidence */}
                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Key Technologies:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Evidence:</span>
                      <span className="text-cyan-400 font-medium">{stage.provenIn}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Roadmap Flow Summary */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-cyan-300 font-bold">WEB FOUNDATIONS</span>
              <ArrowRight size={13} className="text-cyan-400" />
              <span className="text-cyan-300 font-bold">FRONTEND (React+TS)</span>
              <ArrowRight size={13} className="text-amber-400" />
              <span className="text-amber-300 font-bold">BACKEND (Node+Express)</span>
              <ArrowRight size={13} className="text-purple-400" />
              <span className="text-purple-300 font-bold">DATABASES (SQL+Mongo)</span>
              <ArrowRight size={13} className="text-pink-400" />
              <span className="text-pink-300 font-bold">FULL STACK DEPLOYMENT</span>
              <ArrowRight size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-black">FULL STACK DEVELOPER</span>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: FRONTEND DEVELOPER SUB-TRACK */}
        {/* ==================================================================== */}
        {activeTab === 'frontend-track' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/20 to-black border border-cyan-500/30">
              <div className="max-w-3xl space-y-3">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">
                  SUB-TRACK SPOTLIGHT
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  Frontend Development Sub-Track
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Frontend development is an active, proven pillar of my skill set. I specialize in building responsive, accessible, component-driven user interfaces using React, TypeScript, and modern CSS frameworks with modular component design.
                </p>
              </div>
            </div>

            {/* Visual Step-by-Step Progression Pipeline */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                FRONTEND MASTERY PROGRESSION PIPELINE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {frontendProgression.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={handleHover}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 ${
                      isDark 
                        ? 'bg-slate-950/60 border-white/10 hover:border-cyan-400/50 hover:bg-slate-900/60' 
                        : 'bg-white border-slate-200 hover:border-cyan-400/50 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-400">STEP {item.step}</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-bold">
                          {item.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-display font-bold text-white mb-1">{item.name}</h4>
                      <p className="text-xs text-slate-400 font-sans">{item.desc}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Node #{idx + 1}</span>
                      <ChevronRight size={12} className="text-cyan-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Demonstrated Frontend Competencies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Layers size={16} />
                  <span>Component-Based Architecture</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Structuring isolated, reusable React components with predictable props, modular subcomponents, and clean folder conventions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <ShieldCheck size={16} />
                  <span>Strict Type Safety</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Using TypeScript interfaces, union types, and generics to eliminate runtime errors and maintain predictable state trees.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                  <Smartphone size={16} />
                  <span>Responsive & Mobile-First UX</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Leveraging Tailwind utility breakpoints, touch targets ($\ge$ 44px), and fluid layout patterns that scale from mobile to 4K.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: WHAT I CAN BUILD */}
        {/* ==================================================================== */}
        {activeTab === 'what-i-build' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                APPLIED CAPABILITIES
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                WHAT I CAN BUILD
              </h3>
              <p className="text-xs text-slate-400 font-sans max-w-2xl">
                Practical, real-world software solutions I am prepared to build for teams, clients, and organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whatICanBuild.map((card, idx) => (
                <div
                  key={idx}
                  onMouseEnter={handleHover}
                  className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 group ${
                    isDark 
                      ? 'bg-slate-950/70 border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.08)]' 
                      : 'bg-white border-slate-200 hover:border-cyan-400/40 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-black text-cyan-400">CARD {card.num}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                        {card.highlight}
                      </span>
                    </div>

                    <h4 className="text-base font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                      {card.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                    {card.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/30 text-cyan-300 border border-cyan-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: DEVELOPER STACK */}
        {/* ==================================================================== */}
        {activeTab === 'developer-stack' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                ACCURATE SKILL AUDIT
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                DEVELOPER STACK
              </h3>
              <p className="text-xs text-slate-400 font-sans max-w-2xl">
                Transparent breakdown of my development technologies categorized strictly by demonstrated proficiency, active learning, and upcoming milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category 1: FRONTEND */}
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Layout className="text-cyan-400" size={18} />
                    <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">FRONTEND</h4>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-bold">
                    DEMONSTRATED IN PROJECTS
                  </span>
                </div>

                <div className="space-y-3">
                  {developerStack.frontend.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-white">{item.name}</span>
                          <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">{item.desc}</p>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold shrink-0 ml-2">{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: BACKEND */}
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Server className="text-amber-400" size={18} />
                    <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">BACKEND</h4>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-bold">
                    ACTIVE LEARNING ROADMAP
                  </span>
                </div>

                <div className="space-y-3">
                  {developerStack.backend.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-white">{item.name}</span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded font-bold ${
                            item.status === 'LEARNING' ? 'bg-amber-500/20 text-amber-300' : 'bg-pink-500/20 text-pink-300'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">{item.desc}</p>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 font-semibold shrink-0 ml-2">{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 3: DATABASE */}
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Database className="text-purple-400" size={18} />
                    <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">DATABASE</h4>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-400/10 text-purple-300 border border-purple-400/20 font-bold">
                    SQL & NOSQL
                  </span>
                </div>

                <div className="space-y-3">
                  {developerStack.database.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-white">{item.name}</span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded font-bold ${
                            item.status === 'CURRENT' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">{item.desc}</p>
                      </div>
                      <span className="text-[10px] font-mono text-purple-400 font-semibold shrink-0 ml-2">{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 4: TOOLS */}
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Terminal className="text-emerald-400" size={18} />
                    <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">TOOLS & WORKFLOW</h4>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 font-bold">
                    DAILY WORKFLOW
                  </span>
                </div>

                <div className="space-y-3">
                  {developerStack.tools.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-white">{item.name}</span>
                          <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">{item.desc}</p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold shrink-0 ml-2">{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: FOAMXPRESS & SMILESYNC SHOWCASE SPOTLIGHT */}
        {/* ==================================================================== */}
        {activeTab === 'projects-showcase' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* FEATURED SPOTLIGHT 1: FOAMXPRESS */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/30 space-y-6">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      FRONTEND / REACT
                    </span>
                    <span className="text-xs font-mono text-slate-400">KEY DEVELOPMENT PROJECT</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    FoamXpress — Vehicle Grooming & Booking Platform
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'State Management'].map((tag, i) => (
                    <span key={i} className="text-xs font-mono px-3 py-1 rounded-lg bg-black/60 text-cyan-300 border border-cyan-500/30 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description & Technical Pillars */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20">
                    <p className="text-sm sm:text-base text-cyan-100 font-sans font-medium leading-relaxed">
                      &ldquo;A modern web application demonstrating component-based React development, responsive UI design, interactive user workflows and dynamic application logic.&rdquo;
                    </p>
                  </div>

                  <div className="space-y-2 text-xs font-sans text-slate-300 leading-relaxed">
                    <p>
                      FoamXpress was engineered to address real customer friction in booking automobile care services. It implements:
                    </p>
                    <ul className="space-y-1.5 pl-4 list-disc text-slate-400">
                      <li><strong className="text-white">Reactive Vehicle Selector</strong>: Dynamically toggles base rates across bikes, hatchbacks, sedans, and SUVs.</li>
                      <li><strong className="text-white">Multi-Tier Service Packages</strong>: Express Wash, Deep Interior Clean, and Ceramic Pro with dynamic price computation.</li>
                      <li><strong className="text-white">Interactive Add-On Matrix</strong>: Live checkbox toggles for interior sanitization and engine detailing with instant price updates.</li>
                      <li><strong className="text-white">Structured Booking Modal</strong>: Complete with slot availability verification and form validation.</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                      <span className="text-lg font-black text-cyan-400 block font-mono">100%</span>
                      <span className="text-[10px] text-slate-400 font-mono">Responsive Layout</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                      <span className="text-lg font-black text-cyan-400 block font-mono">&lt; 50ms</span>
                      <span className="text-[10px] text-slate-400 font-mono">Dynamic Calculation</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                      <span className="text-lg font-black text-cyan-400 block font-mono">Type-Safe</span>
                      <span className="text-[10px] text-slate-400 font-mono">Strict Interfaces</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Dynamic Price & Configuration Simulator */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-black/70 border border-cyan-500/30 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                      <Sparkles size={13} /> INTERACTIVE APP SIMULATOR
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">LIVE COMPONENT</span>
                  </div>

                  {/* Vehicle Type Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 font-bold uppercase">Select Vehicle Type:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['bike', 'sedan', 'suv'] as const).map((v) => (
                        <button
                          key={v}
                          onClick={() => { sound.playClick(); setFoamVehicle(v); }}
                          className={`py-1.5 px-2 rounded-lg text-xs font-mono uppercase font-bold transition-all cursor-pointer border ${
                            foamVehicle === v 
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.3)]' 
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Service Tier Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 font-bold uppercase">Service Tier:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'express', label: 'Express' },
                        { id: 'deep-clean', label: 'Deep Clean' },
                        { id: 'ceramic-pro', label: 'Ceramic Pro' }
                      ].map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => { sound.playClick(); setFoamPackage(pkg.id as typeof foamPackage); }}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer border ${
                            foamPackage === pkg.id 
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.3)]' 
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {pkg.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons Checkbox Grid */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 font-bold uppercase">Optional Add-ons:</label>
                    <div className="space-y-1">
                      <label className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-xs font-mono cursor-pointer hover:bg-white/10">
                        <span className="text-slate-300">Interior Detailing (+₹199)</span>
                        <input
                          type="checkbox"
                          checked={foamAddons.interior}
                          onChange={(e) => { sound.playClick(); setFoamAddons({ ...foamAddons, interior: e.target.checked }); }}
                          className="accent-cyan-400 w-4 h-4 cursor-pointer"
                        />
                      </label>
                      <label className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-xs font-mono cursor-pointer hover:bg-white/10">
                        <span className="text-slate-300">Engine Bay Shine (+₹149)</span>
                        <input
                          type="checkbox"
                          checked={foamAddons.engineShine}
                          onChange={(e) => { sound.playClick(); setFoamAddons({ ...foamAddons, engineShine: e.target.checked }); }}
                          className="accent-cyan-400 w-4 h-4 cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Computed Price Badge */}
                  <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Estimated Package Cost</span>
                      <span className="text-xl font-black font-mono text-cyan-300">₹{totalComputedPrice}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-cyan-400 text-black font-bold uppercase">
                      Live State Calculated
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURED SPOTLIGHT 2: SMILESYNC */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/40 border border-purple-500/30 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      FRONTEND / REACT & TYPESCRIPT
                    </span>
                    <span className="text-xs font-mono text-slate-400">CLINICAL MANAGEMENT SYSTEM</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    SmileSync — Smart Dental Practice Management UI
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Component Design'].map((tag, i) => (
                    <span key={i} className="text-xs font-mono px-3 py-1 rounded-lg bg-black/60 text-purple-300 border border-purple-500/30 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
                  <h5 className="font-bold font-mono text-purple-300 text-sm">📅 Interactive Calendar Slots</h5>
                  <p className="text-slate-400">Enables dynamic doctor appointment allocation with conflict prevention and slot status color indicators.</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
                  <h5 className="font-bold font-mono text-purple-300 text-sm">📋 Patient Record Matrices</h5>
                  <p className="text-slate-400">Structured patient history cards capturing treatment plans, diagnostic tags, and dentist notes cleanly.</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
                  <h5 className="font-bold font-mono text-purple-300 text-sm">⚡ Sub-15ms UI Response</h5>
                  <p className="text-slate-400">Optimized component memoization ensuring instantaneous timeline filtering and smooth navigation.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 6: DEVELOPER JOURNEY TIMELINE */}
        {/* ==================================================================== */}
        {activeTab === 'journey' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-cyan-400" size={20} />
                  DEVELOPER JOURNEY
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  A distinct step-by-step chronicle of my progression in computer science and software development.
                </p>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 shrink-0">
                10 CHRONOLOGICAL STAGES
              </span>
            </div>

            <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 space-y-6 pl-6 sm:pl-8">
              {developerJourneySteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#050816] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(0,229,255,0.6)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>

                  <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-950/70 border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/60' 
                      : 'bg-white border-slate-200 hover:border-cyan-500/40 shadow-sm'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-400">STEP {step.num}</span>
                        <h4 className="text-base font-display font-bold text-white">{step.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">{step.timeline}</span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border font-bold ${step.color}`}>
                          {step.badge}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-cyan-300 font-bold mb-1">
                      Focus: {step.focus}
                    </div>

                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 7: DATA × DEVELOPMENT (THE UNIQUE ADVANTAGE) */}
        {/* ==================================================================== */}
        {activeTab === 'data-x-dev' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Core Synergy Banner */}
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-purple-950/30 to-black border border-cyan-500/40 shadow-[0_0_35px_rgba(0,229,255,0.1)] space-y-6">
              
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles size={12} className="text-cyan-400" />
                  UNIQUE VALUE PROPOSITION
                </div>
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white">
                  DATA × DEVELOPMENT
                </h3>
                <p className="text-sm sm:text-base text-cyan-100 font-sans font-medium leading-relaxed">
                  &ldquo;My goal is to combine analytical thinking with software development — using data to understand problems and modern web technologies to build solutions.&rdquo;
                </p>
              </div>

              {/* Visual Mathematical Equation Box */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center p-6 rounded-2xl bg-black/60 border border-white/10">
                
                {/* Pillar 1: DATA (4 cols) */}
                <div className="md:col-span-4 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                      <Database size={14} /> DATA CAPABILITY
                    </span>
                    <span className="text-[9px] font-mono text-cyan-300">ANALYTICS</span>
                  </div>
                  <ul className="text-xs font-mono text-slate-300 space-y-1">
                    <li>• Python (Pandas, NumPy)</li>
                    <li>• Advanced SQL Queries</li>
                    <li>• Exploratory Analysis & EDA</li>
                    <li>• Machine Learning Models</li>
                    <li>• Data Visualization (BI)</li>
                  </ul>
                </div>

                {/* Multiply Operator (1 col) */}
                <div className="md:col-span-1 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-white font-black text-lg shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                    ×
                  </div>
                </div>

                {/* Pillar 2: DEVELOPMENT (4 cols) */}
                <div className="md:col-span-4 p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-400 flex items-center gap-1.5">
                      <Code2 size={14} /> SOFTWARE DEV
                    </span>
                    <span className="text-[9px] font-mono text-purple-300">FULL STACK</span>
                  </div>
                  <ul className="text-xs font-mono text-slate-300 space-y-1">
                    <li>• React 18 & TypeScript</li>
                    <li>• Tailwind CSS & Responsive UI</li>
                    <li>• Component Architecture</li>
                    <li>• Node.js & Express REST APIs</li>
                    <li>• Database Schema Design</li>
                  </ul>
                </div>

                {/* Equals Operator (2 cols) */}
                <div className="md:col-span-2 flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center">
                  <span className="text-emerald-400 font-bold font-mono text-xs uppercase block mb-1">= OUTCOME</span>
                  <span className="text-xs font-display font-black text-white leading-tight">
                    DATA-DRIVEN APPLICATIONS
                  </span>
                </div>

              </div>

            </div>

            {/* Why This Synergy Matters to Engineering & Analytics Teams */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
                <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
                  <Eye className="text-cyan-400" size={16} />
                  Data-Informed Interfaces
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Unlike developers who only skin interfaces, I understand the underlying distributions, aggregates, and data contracts that feed UI charts and tables.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
                <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
                  <Terminal className="text-purple-400" size={16} />
                  Analytical Problem Solving
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  My background in algorithmic data science enables structured debugging, statistical sanity checks, and algorithmic efficiency in web codebases.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
                <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
                  <Workflow className="text-pink-400" size={16} />
                  End-to-End Product Vision
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  From extracting insights out of raw SQL records to presenting them in a responsive client dashboard, I bridge the gap between analytics and engineering.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* 4. "CURRENTLY BUILDING" & "NEXT DEVELOPMENT MILESTONES" FOOTER PANELS */}
        {/* ==================================================================== */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Panel 1: CURRENTLY BUILDING (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="text-amber-400 animate-pulse" size={16} />
                <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  CURRENTLY BUILDING
                </h4>
              </div>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Active engineering activities proving that Full Stack Development is a live, ongoing career direction:
              </p>

              <div className="space-y-2">
                {currentlyBuilding.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-sans text-slate-300">
                    <ArrowRight size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-medium">{item.title}</strong>
                      <span className="text-[11px] text-slate-400 block font-normal">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Status: Active Sprints</span>
              <span className="text-cyan-400 font-bold">2026 ROADMAP</span>
            </div>
          </div>

          {/* Panel 2: NEXT DEVELOPMENT MILESTONES (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="text-cyan-400" size={16} />
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    NEXT DEVELOPMENT MILESTONES
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">07 STAGES</span>
              </div>
              <p className="text-xs text-slate-400 font-sans mb-4">
                A transparent, realistic technical sequence charting my upcoming learning goals for recruiters and engineering managers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {nextMilestones.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold text-cyan-400">{m.num}</span>
                        <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded font-bold ${
                          m.status === 'In Progress' 
                            ? 'bg-cyan-500/20 text-cyan-300' 
                            : m.status === 'Active Learning' 
                            ? 'bg-amber-500/20 text-amber-300' 
                            : 'bg-pink-500/20 text-pink-300'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                      <h5 className="text-xs font-mono font-bold text-white mb-0.5">{m.title}</h5>
                      <p className="text-[10px] text-slate-400 font-sans">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Goal: End-to-End Proficiency</span>
              <span className="text-emerald-400 font-bold">READY FOR JUNIOR & INTERN ROLES</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
