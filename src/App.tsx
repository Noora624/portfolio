import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  Briefcase, 
  Award, 
  Cpu, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Download, 
  Mail, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Terminal,
  Activity,
  Volume2,
  VolumeX,
  ArrowUp,
  Sun,
  Moon,
  Github,
  Linkedin
} from 'lucide-react';

import avatarImg from './assets/images/avatar.png';
import { SKILL_NODES, STATISTICS } from './data';
import ParticleBackground from './components/ParticleBackground';
import AnimatedCounter from './components/AnimatedCounter';
import RoleScroller from './components/RoleScroller';
import Icon from './components/Icon';
import AboutSection from './components/AboutSection';
import DataScienceWorkbench from './components/DataScienceWorkbench';
import DataScienceIntelligenceHub from './components/DataScienceIntelligenceHub';
import FullStackDevelopmentSection from './components/FullStackDevelopmentSection';
import FeaturedProjects from './components/FeaturedProjects';
import ExperienceJourney from './components/ExperienceJourney';
import CertificationVault from './components/CertificationVault';
import TypewriterText from './components/TypewriterText';

// Modals
import ResumeModal from './components/ResumeModal';
import ContactModal from './components/ContactModal';
import ProjectsModal from './components/ProjectsModal';

// Audio System
import { sound } from './utils/sound';

// Stagger animation variants for the Hero section
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // premium custom cubic-bezier for a very slick slide-up feel
    },
  },
};

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Mouse hover glow coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState<string | null>(SKILL_NODES[0].id); // default to first skill
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => sound.isEnabled());

  // Hovering skill node and avatar state for data packet traveling animations
  const [hoveredSkillNode, setHoveredSkillNode] = useState<string | null>(null);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  // Holographic 3D Stage Controller States (Disabled by default to prevent animation lag)
  const [stageTiltX, setStageTiltX] = useState<number>(0);
  const [stageTiltY, setStageTiltY] = useState<number>(0);
  const [stageRotation, setStageRotation] = useState<number>(0);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(false);
  const [orbitSpeed, setOrbitSpeed] = useState<number>(1);

  useEffect(() => {
    if (!isAutoOrbit) return;
    let animFrame: number;
    const tick = () => {
      setStageRotation((prev) => (prev + 0.35 * orbitSpeed) % 360);
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isAutoOrbit, orbitSpeed]);
  
  // Modals state
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  
  // Live system timestamp tracking
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Back to Top visibility state
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const selectedSkillNode = SKILL_NODES.find(s => s.id === activeSkill) || SKILL_NODES[0];

  const animatedRoles = [
    '• B.Tech CSE Data Science Student',
    '• Data Analyst',
    '• Full Stack Developer',
    '• Frontend Developer',
    '• React Developer',
    '• Data Science Enthusiast',
    '• Software Developer',
    '• Python Developer'
  ];

  // Sounds Triggers
  const handleToggleSound = () => {
    const nextState = sound.toggle();
    setIsSoundEnabled(nextState);
  };

  const handleHover = () => {
    sound.playHover();
  };

  const handleClick = (action?: () => void) => {
    sound.playClick();
    if (action) {
      action();
    }
  };

  // Node styles dynamic mapper for color identities in glowing glass containers
  const getNodeStyles = (id: string, isSelected: boolean) => {
    const isDark = theme === 'dark';
    const baseBorder = isDark ? 'border-white/10' : 'border-slate-200';
    const hoverBg = isDark ? 'hover:bg-white/3' : 'hover:bg-slate-100/50';

    switch (id) {
      case 'python':
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(234,179,8,0.45)] border-[#EAB308]/60 bg-[#EAB308]/10' 
            : `${baseBorder} hover:border-[#EAB308]/50 ${hoverBg}`,
          iconColor: 'bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-yellow-300 font-bold drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]' 
                : 'text-amber-850 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      case 'sql':
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(0,229,255,0.45)] border-[#00E5FF]/60 bg-[#00E5FF]/10' 
            : `${baseBorder} hover:border-[#00E5FF]/50 ${hoverBg}`,
          iconColor: isDark ? 'text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.4)]' : 'text-cyan-700 font-bold',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-[#00E5FF] font-bold drop-shadow-[0_0_6px_rgba(0,229,255,0.5)]' 
                : 'text-cyan-850 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      case 'ml':
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(139,92,246,0.45)] border-[#8B5CF6]/60 bg-[#8B5CF6]/10' 
            : `${baseBorder} hover:border-[#8B5CF6]/50 ${hoverBg}`,
          iconColor: isDark ? 'text-[#8B5CF6] drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]' : 'text-violet-650 font-bold',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-purple-300 font-bold drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]' 
                : 'text-violet-850 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      case 'data-analysis':
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(16,185,129,0.45)] border-[#10B981]/60 bg-[#10B981]/10' 
            : `${baseBorder} hover:border-[#10B981]/50 ${hoverBg}`,
          iconColor: isDark ? 'text-[#10B981] drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]' : 'text-emerald-700 font-bold',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-emerald-300 font-bold drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]' 
                : 'text-emerald-850 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      case 'react':
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(6,182,212,0.45)] border-cyan-400/60 bg-cyan-400/10' 
            : `${baseBorder} hover:border-cyan-400/50 ${hoverBg}`,
          iconColor: isDark ? 'text-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]' : 'text-cyan-700 font-bold',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-cyan-200 font-bold drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]' 
                : 'text-cyan-800 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      case 'typescript':
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(59,130,246,0.45)] border-blue-400/60 bg-blue-400/10' 
            : `${baseBorder} hover:border-blue-400/50 ${hoverBg}`,
          iconColor: isDark ? 'text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]' : 'text-blue-700 font-bold',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-blue-300 font-bold drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]' 
                : 'text-blue-800 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      case 'frontend':
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(56,189,248,0.45)] border-sky-400/60 bg-sky-400/10' 
            : `${baseBorder} hover:border-sky-400/50 ${hoverBg}`,
          iconColor: isDark ? 'text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]' : 'text-sky-700 font-bold',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-sky-300 font-bold drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]' 
                : 'text-sky-800 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      case 'backend-learning':
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(52,211,153,0.45)] border-emerald-400/60 bg-emerald-400/10' 
            : `${baseBorder} hover:border-emerald-400/50 ${hoverBg}`,
          iconColor: isDark ? 'text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]' : 'text-emerald-700 font-bold',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-emerald-300 font-bold drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]' 
                : 'text-emerald-800 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      case 'github':
        return {
          glow: isSelected 
            ? (isDark 
                ? 'shadow-[0_0_20px_rgba(255,255,255,0.35)] border-white/60 bg-white/10' 
                : 'shadow-[0_0_15px_rgba(0,0,0,0.15)] border-slate-400 bg-slate-100') 
            : `${baseBorder} hover:border-slate-450 ${hoverBg}`,
          iconColor: isDark ? 'text-white' : 'text-slate-800',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-white font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]' 
                : 'text-slate-800 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      case 'tools':
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(244,114,182,0.45)] border-pink-400/60 bg-pink-400/10' 
            : `${baseBorder} hover:border-pink-400/50 ${hoverBg}`,
          iconColor: isDark ? 'text-pink-400 drop-shadow-[0_0_6px_rgba(244,114,182,0.4)]' : 'text-pink-700 font-bold',
          tagColor: isSelected 
            ? (isDark 
                ? 'text-pink-300 font-bold drop-shadow-[0_0_6px_rgba(244,114,182,0.5)]' 
                : 'text-pink-800 font-extrabold') 
            : (isDark ? 'text-slate-400' : 'text-slate-600')
        };
      default:
        return {
          glow: isSelected 
            ? 'shadow-[0_0_20px_rgba(0,229,255,0.45)] border-[#00E5FF]/60 bg-[#00E5FF]/10' 
            : `${baseBorder} hover:border-white/20 ${hoverBg}`,
          iconColor: isSelected ? (isDark ? 'text-cyan-400' : 'text-cyan-705') : (isDark ? 'text-slate-400' : 'text-slate-500'),
          tagColor: isSelected ? (isDark ? 'text-cyan-300 font-bold' : 'text-cyan-805 font-bold') : (isDark ? 'text-slate-400' : 'text-slate-500')
        };
    }
  };

  const MINI_SKILL_CODES: { [key: string]: { code: string; label: string } } = {
    python: { code: 'import numpy as np\nvector = np.array([1.5, 2.4, 3.8])', label: 'Interpreter v3.12 • Speed: 0.002s' },
    sql: { code: 'SELECT AVG(volume_gb), cohort\nFROM metrics GROUP BY 2;', label: 'Query Cost: 0.012 • PostgreSQL v15' },
    ml: { code: 'from sklearn.ensemble import RandomForestClassifier\nclf.fit(X_train, y_train)', label: 'Accuracy: 98.4% • Gini Split' },
    'data-analysis': { code: 'df.groupby("cohort").agg({"volume": "mean"})', label: 'ETL Pipeline • Memory: 4.2MB' },
    react: { code: 'const [booking, setBooking] = useState<ServiceTier>("premium");\nreturn <PackageCard tier={booking} />;', label: 'React 18 SPA • FoamXpress Architecture' },
    typescript: { code: 'interface DentalRecord {\n  patientId: string;\n  status: "scheduled" | "completed";\n}', label: 'TypeScript Strict Mode • SmileSync Schema' },
    frontend: { code: 'export function UI() {\n  return <div className="grid md:grid-cols-2 gap-4" />;\n}', label: 'Tailwind CSS + Vite • Mobile-First' },
    'backend-learning': { code: 'app.get("/api/v1/health", (req, res) => {\n  res.json({ status: "learning_active" });\n});', label: 'Node.js & Express.js • Learning Roadmap' },
    github: { code: 'git commit -m "feat: implement dual track roadmap UI"\ngit push origin main', label: 'Version: 2.40 • Remote: origin' },
    tools: { code: 'Power BI Dashboard | Tableau Public | Jupyter | VS Code', label: 'Analytics & Dev Environment Tools' }
  };

  const isDark = theme === 'dark';

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen overflow-x-hidden selection:bg-cyan-500/30 transition-colors duration-500 ${
        isDark 
          ? 'bg-[#050816] text-white selection:text-cyan-200' 
          : 'bg-slate-50 text-slate-900 selection:text-cyan-800'
      }`}
      style={{
        '--x': `${mousePos.x}px`,
        '--y': `${mousePos.y}px`
      } as React.CSSProperties}
    >
      {/* Dynamic Cursor Glow Layer */}
      <div className="absolute inset-0 mouse-glow pointer-events-none z-10 transition-opacity duration-300" />

      {/* Futuristic Particle Grid Backdrop */}
      <ParticleBackground />

      {/* Premium slowly shifting Aurora Gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full blur-[130px] animate-aurora ${isDark ? 'bg-[#00E5FF]/8' : 'bg-[#00E5FF]/4'}`} />
        <div className={`absolute bottom-[-10%] right-[-15%] w-[650px] h-[650px] rounded-full blur-[130px] animate-aurora ${isDark ? 'bg-[#8B5CF6]/8' : 'bg-[#8B5CF6]/4'}`} style={{ animationDelay: '-5s' }} />
        <div className={`absolute top-[25%] left-[25%] w-[550px] h-[550px] rounded-full blur-[120px] animate-aurora ${isDark ? 'bg-[#EC4899]/6' : 'bg-[#EC4899]/3'}`} style={{ animationDelay: '-12s' }} />
        <div className={`absolute inset-0 dotted-grid ${isDark ? 'opacity-85' : 'opacity-[0.25]'}`} />
      </div>

      {/* Tech-Theme Sticky Header */}
      <header className={`relative w-full z-30 border-b backdrop-blur-md transition-all duration-300 ${
        isDark 
          ? 'border-white/5 bg-black/40' 
          : 'border-slate-200/80 bg-white/45 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* BRAND: NOORA & Subtitle */}
            <div className="flex items-center gap-3">
              <motion.div 
                id="header-brand-logo"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] flex items-center justify-center p-[1px] shadow-[0_4px_20px_rgba(0,229,255,0.15)]"
              >
                <div className={`w-full h-full rounded-xl flex items-center justify-center ${isDark ? 'bg-[#050816]' : 'bg-white'}`}>
                  <span className="text-xs font-display font-black text-[#00E5FF]">N⚡</span>
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span id="header-brand-text" className={`font-display font-black tracking-wider text-base leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  NOORA
                </span>
                <span className={`text-[10px] font-mono tracking-wide mt-1.5 font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  Data Science & Full-Stack Development
                </span>
              </div>
            </div>

            {/* STATUS INDICATORS: Available for Internships / Open to Opportunities */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-2 px-4 rounded-xl bg-slate-950/25 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className={`text-[11px] font-sans font-semibold tracking-wide ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  Available for Internships
                </span>
              </div>
              <div className="hidden sm:block text-slate-700 font-sans text-xs">|</div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className={`text-[11px] font-sans font-semibold tracking-wide ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                  Open to Data Analytics & Full-Stack Opportunities
                </span>
              </div>
            </div>

            {/* RECRUITER METADATA: Location / Year */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-450' : 'text-slate-600'}`}>
                <span className="text-[#00E5FF]">📍</span>
                <span>Location: <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>India</span></span>
              </div>
              <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-450' : 'text-slate-600'}`}>
                <span className="text-[#8B5CF6]">📅</span>
                <span>Current Year: <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>2026</span></span>
              </div>
            </div>

          </div>

          {/* SECOND ROW: NAVIGATION BUTTONS & SYSTEM CONTROLS FOOTPRINT */}
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-white/5' : 'border-slate-200/60'} flex flex-wrap items-center justify-between gap-3`}>
            
            {/* Quick Navigation Scroll Links */}
            <div className="flex items-center gap-2 overflow-x-auto sb-hide py-1">
              <button
                id="nav-analytics-track-btn"
                onMouseEnter={handleHover}
                onClick={() => {
                  sound.playClick();
                  const analyticsSec = document.getElementById('data-science-workbench') || document.getElementById('data-science-intelligence-hub');
                  if (analyticsSec) analyticsSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-mono font-bold shrink-0 flex items-center gap-1.5 ${
                  isDark 
                    ? 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.15)]' 
                    : 'border-cyan-500/40 text-cyan-800 bg-cyan-50 hover:bg-cyan-100 hover:border-cyan-500'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Analytics Track
              </button>

              <button
                id="nav-dev-track-btn"
                onMouseEnter={handleHover}
                onClick={() => {
                  sound.playClick();
                  const devSec = document.getElementById('full-stack-development-section');
                  if (devSec) devSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-mono font-bold shrink-0 flex items-center gap-1.5 ${
                  isDark 
                    ? 'border-purple-500/40 text-purple-300 bg-purple-950/40 hover:bg-purple-900/50 hover:border-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.15)]' 
                    : 'border-purple-500/40 text-purple-800 bg-purple-50 hover:bg-purple-100 hover:border-purple-500'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Development Track
              </button>

              <button
                id="nav-about-btn"
                onMouseEnter={handleHover}
                onClick={() => {
                  sound.playClick();
                  const aboutSec = document.getElementById('about-section');
                  if (aboutSec) aboutSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-mono font-medium shrink-0 ${
                  isDark 
                    ? 'border-white/10 text-slate-300 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]' 
                    : 'border-slate-350 text-slate-705 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5 hover:text-[#8B5CF6]'
                }`}
              >
                About Me
              </button>

              <button
                 id="nav-skills-btn"
                 onMouseEnter={handleHover}
                 onClick={() => {
                   sound.playClick();
                   const skillsSec = document.getElementById('data-science-intelligence-hub');
                   if (skillsSec) skillsSec.scrollIntoView({ behavior: 'smooth' });
                 }}
                 className={`px-3.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-mono font-medium shrink-0 ${
                   isDark 
                     ? 'border-white/10 text-slate-300 hover:border-[#EC4899]/50 hover:bg-[#EC4899]/10 hover:text-[#EC4899]' 
                     : 'border-slate-350 text-slate-705 hover:border-[#EC4899]/50 hover:bg-[#EC4899]/5 hover:text-[#EC4899]'
                 }`}
              >
                Skills
              </button>

              <button
                 id="nav-experience-btn"
                 onMouseEnter={handleHover}
                 onClick={() => {
                   sound.playClick();
                   const expSec = document.getElementById('experience-journey-section');
                   if (expSec) expSec.scrollIntoView({ behavior: 'smooth' });
                 }}
                 className={`px-3.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-mono font-medium shrink-0 ${
                   isDark 
                     ? 'border-white/10 text-slate-300 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]' 
                     : 'border-slate-350 text-slate-705 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/5 hover:text-[#00E5FF]'
                 }`}
              >
                Experience
              </button>

              <button
                 id="nav-certs-btn"
                 onMouseEnter={handleHover}
                 onClick={() => {
                   sound.playClick();
                   const certSec = document.getElementById('certification-vault-section');
                   if (certSec) certSec.scrollIntoView({ behavior: 'smooth' });
                 }}
                 className={`px-3.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-mono font-medium shrink-0 ${
                   isDark 
                     ? 'border-white/10 text-slate-300 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]' 
                     : 'border-slate-350 text-slate-705 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5 hover:text-[#8B5CF6]'
                 }`}
              >
                Vault
              </button>

              <button
                id="nav-contact-btn"
                onMouseEnter={handleHover}
                onClick={() => handleClick(() => setIsContactOpen(true))}
                className={`px-3.5 py-1.5 rounded-lg text-xs hover:text-white transition-all cursor-pointer font-mono font-medium shrink-0 ${
                  isDark 
                    ? 'glass-panel border-[#00E5FF]/20 text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:border-[#00E5FF]/40' 
                    : 'bg-white/80 border border-slate-250 text-cyan-800 hover:bg-white hover:border-[#00E5FF]/50 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
                }`}
              >
                Contact Me
              </button>
            </div>

            {/* Clean, Premium micro-toggles for Theme & Sound (Instead of fake OS texts) */}
            <div className="flex items-center gap-2 font-mono">
              <button
                id="sound-toggle-btn"
                onClick={handleToggleSound}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] tracking-wider transition-all cursor-pointer ${
                  isSoundEnabled 
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.15)]' 
                    : (isDark 
                        ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20' 
                        : 'bg-slate-200/60 border-slate-300 text-slate-650 hover:text-slate-900')
                }`}
                title="Toggle SFX"
              >
                {isSoundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                <span className="hidden sm:inline">SOUND</span>
              </button>

              <button
                id="theme-toggle-btn"
                onClick={() => {
                  sound.playClick();
                  setTheme(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] tracking-wider transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20' 
                    : 'bg-slate-200/60 border-slate-300 text-slate-700 hover:text-slate-905" hover:border-slate-400'
                }`}
                title="Toggle Theme"
              >
                {isDark ? <Sun size={13} className="text-[#FFB300]" /> : <Moon size={13} className="text-[#4E45E4]" />}
                <span className="hidden sm:inline">THEME</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="relative max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-16 z-20 flex flex-col justify-between">
        
        {/* UPPER MAIN SECTION: 2-COLUMN HERO VISUAL DECK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: IDENTIFIER & INTENSIVES */}
          <motion.div 
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 flex flex-col justify-center"
          >
            {/* Dual Opportunity Banner */}
            <motion.div
              id="internship-banner"
              variants={heroItemVariants}
              onMouseEnter={handleHover}
              onClick={() => handleClick(() => setIsContactOpen(true))}
              className={`inline-flex self-start items-center gap-3 backdrop-blur-xl border px-6 py-2.5 rounded-full text-xs animate-float-slow font-sans cursor-pointer transition-colors ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-white hover:border-[#00E5FF]/30' 
                  : 'bg-white border-slate-205 text-slate-800 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:border-[#0089a3]/40'
              }`}
            >
              <span className="text-[#00E5FF] text-md">🚀</span>
              <span className={`text-xs sm:text-sm font-medium tracking-wide ${isDark ? 'text-slate-205' : 'text-slate-700'}`}>
                Open for <span className={`font-semibold font-mono ${isDark ? 'text-[#00E5FF]' : 'text-cyan-705'}`}>Internships</span> & <span className={`font-semibold font-mono ${isDark ? 'text-[#EC4899]' : 'text-pink-650'}`}>Entry-Level Roles in Data Analytics & Full-Stack Dev</span>
              </span>
            </motion.div>

            {/* Core Identification Block */}
            <motion.div variants={heroItemVariants} className="space-y-1">
              <span className={`text-xs tracking-widest font-mono uppercase font-bold block ${isDark ? 'text-[#00E5FF]' : 'text-[#0089a3]'}`}>
                Portfolio (2023-2027)
              </span>
              <h1 id="hero-heading" className={`text-5xl sm:text-6xl md:text-7.5xl font-extrabold tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Hi, I&apos;m <span className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(0,229,255,0.15)]">Noora</span>
              </h1>
              
              {/* Dynamic Scrolling Profile Subheading */}
              <div className="flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 bg-[#EC4899] rounded-full animate-ping shrink-0" />
                <RoleScroller roles={animatedRoles} />
              </div>
            </motion.div>

            {/* University Badge */}
            <motion.div 
              id="education-badge"
              variants={heroItemVariants}
              onMouseEnter={handleHover}
              onClick={() => sound.playClick()}
              className={`p-5 rounded-2xl border-2 relative overflow-hidden group transition-all duration-300 cursor-pointer ${
                isDark 
                  ? 'border-white/10 bg-slate-950/45 hover:border-[#8B5CF6]/50 shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]' 
                  : 'border-slate-200 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.02)] hover:border-[#8B5CF6]/45 hover:shadow-[0_0_20px_rgba(139,92,246,0.05)]'
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00E5FF]/5 via-[#8B5CF6]/5 to-[#EC4899]/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-tr from-[#00E5FF]/10 to-[#EC4899]/10 border border-[#00E5FF]/20 text-[#00E5FF] rounded-xl shrink-0 group-hover:border-[#EC4899]/40 group-hover:text-[#EC4899] transition-all">
                  <GraduationCap size={22} />
                </div>
                <div className="space-y-1">
                  <h4 className={`text-sm font-display font-extrabold tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>KR Mangalam University</h4>
                  <p className={`text-xs font-sans ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>B.Tech Computer Science Engineering • Data Science & Web Development</p>
                  <div className={`flex gap-4 pt-1.5 text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span className="flex items-center gap-1"><MapPin size={11} className={isDark ? 'text-[#00E5FF]' : 'text-cyan-700'} /> Haryana / Delhi NCR, India</span>
                    <span className="flex items-center gap-1"><Calendar size={11} className={isDark ? 'text-[#EC4899]' : 'text-pink-600'} /> 2023 - 2027</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Professional Summary Statement */}
            <motion.div id="professional-summary" variants={heroItemVariants} className="w-full max-w-lg">
              <TypewriterText 
                text="Motivated B.Tech Computer Science and Engineering (Data Science) student with knowledge of Python, SQL, Machine Learning fundamentals, Data Analysis, and Data Visualization alongside practical web development with React, TypeScript, and Tailwind CSS. Experience in developing projects involving machine learning, data analysis, neural networks, and responsive web applications (FoamXpress, SmileSync). Seeking internship and entry-level opportunities in Data Analytics and Full-Stack Development." 
                theme={theme}
              />
            </motion.div>

            {/* Action CTAs */}
            <motion.div id="hero-actions" variants={heroItemVariants} className="flex flex-wrap gap-4 pt-1">
              <button
                id="view-projects-btn"
                onMouseEnter={handleHover}
                onClick={() => handleClick(() => setIsProjectsOpen(true))}
                className="relative px-8 py-3.5 text-black font-extrabold font-sans rounded-xl hover:shadow-[0_0_35px_rgba(0,229,255,0.55),0_0_35px_rgba(236,72,153,0.35)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer overflow-hidden text-sm uppercase tracking-wider group border border-transparent"
              >
                {/* Neon Cyan -> Purple -> Pink Gradient backdrop */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] transition-transform duration-500 group-hover:scale-105" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>View Projects</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform text-black" />
                </span>
              </button>

              {/* View Skills Hero Button */}
              <button
                id="hero-skills-btn"
                onMouseEnter={handleHover}
                onClick={() => {
                  sound.playClick();
                  const skillsSec = document.getElementById('data-science-intelligence-hub');
                  if (skillsSec) {
                    skillsSec.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`px-8 py-3.5 border-2 rounded-xl transition-all backdrop-blur-md active:scale-95 flex items-center gap-2 cursor-pointer text-sm font-sans font-semibold ${
                  isDark 
                    ? 'border-purple-500/50 bg-[#8B5CF6]/5 hover:bg-[#8B5CF6]/15 hover:border-purple-400 text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]' 
                    : 'border-purple-200 bg-purple-50/50 hover:bg-purple-100/50 text-purple-700 shadow-[0_4px_15px_rgba(139,92,246,0.05)] font-bold'
                }`}
              >
                <Cpu size={15} className="text-purple-500 animate-pulse" />
                <span>View Skills Telemetry</span>
              </button>

              <a
                id="download-resume-btn"
                href="/Noora_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Noora_Resume.pdf"
                onMouseEnter={handleHover}
                onClick={() => sound.playClick()}
                className={`px-8 py-3.5 border-2 rounded-xl transition-all backdrop-blur-md active:scale-95 flex items-center gap-2 cursor-pointer text-sm font-sans font-semibold ${
                  isDark 
                    ? 'border-white/95 bg-white/5 hover:bg-white/15 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.18)]' 
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-[0_4px_15px_rgba(0,0,0,0.02)]'
                }`}
              >
                <Download size={15} className={isDark ? 'text-[#00E5FF]' : 'text-cyan-705'} />
                <span>Download Resume</span>
              </a>

              <button
                id="contact-me-btn"
                onMouseEnter={handleHover}
                onClick={() => handleClick(() => setIsContactOpen(true))}
                className={`p-3.5 border-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                  isDark 
                    ? 'border-white/10 text-slate-300 hover:text-[#EC4899] hover:border-[#ec4899]/60 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]' 
                    : 'border-slate-300 text-slate-650 hover:text-[#EC4899] hover:border-[#ec4899]/60 hover:bg-slate-100/40'
                }`}
                title="Send Message"
              >
                <Mail size={16} />
              </button>

              <a
                href="https://linkedin.com/in/xxxx"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={handleHover}
                onClick={() => sound.playClick()}
                className={`p-3.5 border-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                  isDark 
                    ? 'border-white/10 text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/60 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                    : 'border-slate-300 text-slate-650 hover:text-[#00E5FF] hover:border-[#00e5ff]/60 hover:bg-slate-100/40'
                }`}
                title="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>

              <a
                href="https://github.com/xxxx"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={handleHover}
                onClick={() => sound.playClick()}
                className={`p-3.5 border-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                  isDark 
                    ? 'border-white/10 text-slate-300 hover:text-white hover:border-white/60 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'border-slate-300 text-slate-650 hover:text-black hover:border-black/60 hover:bg-slate-100/40'
                }`}
                title="GitHub Repositories"
              >
                <Github size={16} />
              </a>
            </motion.div>

            {/* Neural Skill Inspector Sub-Deck */}
            <motion.div 
              id="inspector-hub" 
              variants={heroItemVariants} 
              className={`p-5 rounded-2xl border-2 backdrop-blur-xl transition-all duration-500 ${
                isDark 
                  ? 'border-white/5 bg-slate-950/50 shadow-[0_15px_50px_rgba(0,0,0,0.65)] hover:border-[#8B5CF6]/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]' 
                  : 'border-slate-200 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.02)] hover:border-[#8B5CF6]/35 hover:shadow-[0_0_20px_rgba(139,92,246,0.05)]'
              }`}
            >
              <div className={`flex justify-between items-center mb-2 pb-2 border-b ${isDark ? 'border-white/5' : 'border-slate-205'}`}>
                <div className="flex items-center gap-1.5">
                  <Activity size={14} className="text-[#00E5FF] animate-pulse" />
                  <span className={`text-[10px] font-mono font-bold tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>NEURAL COMPILATION MODULE</span>
                </div>
                <span className={`text-[9px] font-mono border px-1.5 py-0.5 rounded animate-pulse ${
                  isDark 
                    ? 'bg-cyan-950/40 text-[#00E5FF] border-[#00E5FF]/20' 
                    : 'bg-cyan-100 text-[#0089a3] border-cyan-200/80 font-bold'
                }`}>
                  SCAN STATUS: ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <Icon name={selectedSkillNode.iconName} className={selectedSkillNode.color} size={15} />
                    {selectedSkillNode.name} Metrics
                  </span>
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-brand ${isDark ? 'text-[#8B5CF6]' : 'text-purple-600'}`}>{selectedSkillNode.category}</span>
                </div>
                <p className={`text-xs leading-relaxed font-sans min-h-[44px] ${isDark ? 'text-slate-300' : 'text-slate-655'}`}>
                  {selectedSkillNode.details}
                </p>
                
                {/* Simulated diagnostic scan loader */}
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-200'}`}>
                  <motion.div 
                    key={selectedSkillNode.id}
                    initial={{ width: '0%' }}
                    animate={{ width: '90%' }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899]"
                  />
                </div>

                {/* Micro Terminal Inline Code Block */}
                {MINI_SKILL_CODES[selectedSkillNode.id] && (
                  <div className={`mt-4 p-3.5 rounded-xl border font-mono text-[10px] space-y-1.5 leading-relaxed relative overflow-hidden ${
                    isDark 
                      ? 'bg-slate-950/70 border-white/5 text-slate-300 shadow-inner' 
                      : 'bg-slate-100/50 border-slate-205 text-slate-700'
                  }`}>
                    <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold border-b dark:border-white/5 pb-1">
                      <span className="flex items-center gap-1.5">
                        <Terminal size={9} className="text-[#00E5FF] animate-pulse" />
                        terminal_execute.py
                      </span>
                      <span>{MINI_SKILL_CODES[selectedSkillNode.id].label}</span>
                    </div>
                    <pre className="text-[#EAB308] dark:text-[#FBBF24] font-semibold max-w-full overflow-x-auto whitespace-pre pt-1">
                      {MINI_SKILL_CODES[selectedSkillNode.id].code}
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: REVOLVING CYBER AVATAR & STARBURST SKILL BLOCKS */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center pt-8 lg:pt-0">
            
            {/* The Avatar Stage Container */}
            <div 
              style={{
                transform: `perspective(1000px) rotateX(${stageTiltX}deg) rotateY(${stageTiltY}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out'
              }}
              className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center select-none"
            >
              
              {/* Spinning Cybernetic SVGs Rings */}
              <div className="absolute inset-0 z-0">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Neon Cyan Inner Pulsing Glow Circle */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="100" 
                    fill="none" 
                    stroke="rgba(0, 229, 255, 0.155)" 
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />

                  {/* Concentric Circle Orbit A */}
                  <motion.circle 
                    cx="200" 
                    cy="200" 
                    r="110" 
                    fill="none" 
                    stroke="rgba(139, 92, 246, 0.3)" 
                    strokeWidth="1"
                    strokeDasharray="10 15 20 5"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                    style={{ transformOrigin: '50% 50%' }}
                  />

                  {/* Concentric Circle Orbit B (Opposite Spinning) */}
                  <motion.circle 
                    cx="200" 
                    cy="200" 
                    r="125" 
                    fill="none" 
                    stroke="rgba(0, 229, 255, 0.25)" 
                    strokeWidth="1.5"
                    strokeDasharray="25 10 5 12"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    style={{ transformOrigin: '50% 50%' }}
                  />

                  {/* Electric static connection paths to selected skill nodes */}
                  {SKILL_NODES.map((node) => {
                    const rad = ((node.angle + stageRotation) * Math.PI) / 180;
                    const isSelected = node.id === activeSkill;
                    
                    const cx = 200;
                    const cy = 200;
                    
                    const ox1 = cx + Math.cos(rad) * 102;
                    const oy1 = cy + Math.sin(rad) * 102;

                    const sx = cx + Math.cos(rad) * 150;
                    const sy = cy + Math.sin(rad) * 150;

                    const dynamicColor = isSelected 
                      ? '#00E5FF' 
                      : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)');

                    const isHovered = hoveredSkillNode === node.id;
                    const showPackets = isSelected || isHovered || isAvatarHovered;

                    return (
                      <g key={node.id}>
                        {/* Connecting wire */}
                        <motion.path
                          d={`M ${ox1} ${oy1} L ${sx} ${sy}`}
                          fill="none"
                          stroke={dynamicColor}
                          strokeWidth={isSelected ? '2' : '0.8'}
                          animate={isSelected ? { strokeDashoffset: [20, 0] } : {}}
                          transition={isSelected ? { repeat: Infinity, duration: 1.2, ease: 'linear' } : {}}
                          strokeDasharray={isSelected ? '6 4' : 'none'}
                        />
                        {/* Subtle 'data packet' animation effect between the skill nodes and the central avatar */}
                        {showPackets && (
                          <g id={`data-packets-${node.id}`}>
                            {/* Packet 1: Travelling from Avatar to Skill Node */}
                            <g>
                              <motion.circle
                                r="4"
                                fill="#00E5FF"
                                opacity="0.3"
                                animate={{
                                  cx: [ox1, sx],
                                  cy: [oy1, sy],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: (isHovered || isAvatarHovered) ? 0.9 : 2.0,
                                  ease: 'linear',
                                  delay: 0,
                                }}
                              />
                              <motion.circle
                                r="1.6"
                                fill={isDark ? '#FFFFFF' : '#00E5FF'}
                                animate={{
                                  cx: [ox1, sx],
                                  cy: [oy1, sy],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: (isHovered || isAvatarHovered) ? 0.9 : 2.0,
                                  ease: 'linear',
                                  delay: 0,
                                }}
                              />
                            </g>

                            {/* Packet 2: Travelling from Skill Node to Avatar */}
                            <g>
                              <motion.circle
                                r="4"
                                fill="#8B5CF6"
                                opacity="0.3"
                                animate={{
                                  cx: [sx, ox1],
                                  cy: [sy, oy1],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: (isHovered || isAvatarHovered) ? 1.1 : 2.4,
                                  ease: 'linear',
                                  delay: 0.4,
                                }}
                              />
                              <motion.circle
                                r="1.6"
                                fill={isDark ? '#FFFFFF' : '#8B5CF6'}
                                animate={{
                                  cx: [sx, ox1],
                                  cy: [sy, oy1],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: (isHovered || isAvatarHovered) ? 1.1 : 2.4,
                                  ease: 'linear',
                                  delay: 0.4,
                                }}
                              />
                            </g>

                            {/* Packet 3 (Hover active high-speed extra particle) */}
                            {(isHovered || isAvatarHovered) && (
                              <g>
                                <motion.circle
                                  r="4.5"
                                  fill="#EC4899"
                                  opacity="0.35"
                                  animate={{
                                    cx: [ox1, sx],
                                    cy: [oy1, sy],
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 0.7,
                                    ease: 'linear',
                                    delay: 0.15,
                                  }}
                                />
                                <motion.circle
                                  r="1.8"
                                  fill={isDark ? '#FFFFFF' : '#EC4899'}
                                  animate={{
                                    cx: [ox1, sx],
                                    cy: [oy1, sy],
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 0.7,
                                    ease: 'linear',
                                    delay: 0.15,
                                  }}
                                />
                              </g>
                            )}
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Dynamic spinning backdrop glow behind the avatar */}
              <div className="absolute inset-10 bg-gradient-to-tr from-[#00E5FF]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 rounded-full animate-spin-reverse opacity-45 blur-3xl pointer-events-none" />

              {/* Triple-layer animated custom portrait ring & glow frame */}
              <div className="absolute inset-[-14px] bg-gradient-to-tr from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] rounded-full opacity-35 blur-3xl pointer-events-none animate-pulse-slow"></div>

              {/* Central Floating Portrait Ring */}
              <motion.div
                id="central-avatar-ring"
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                onMouseEnter={() => setIsAvatarHovered(true)}
                onMouseLeave={() => setIsAvatarHovered(false)}
                className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center p-[6px] transition-shadow duration-500 shadow-[0_0_50px_rgba(0,229,255,0.22),0_0_50px_rgba(236,72,153,0.22)] hover:shadow-[0_0_70px_rgba(0,229,255,0.45),0_0_70px_rgba(236,72,153,0.45)] group/avatar"
              >
                {/* Outer Ring: Neon Cyan */}
                <div className="absolute inset-0 rounded-full border-2 border-[#00E5FF]/70 animate-spin-slow opacity-90" style={{ animationDuration: '24s' }} />
                
                {/* Middle Ring: Vibrant Purple */}
                <div className="absolute inset-[3px] rounded-full border border-dashed border-[#8B5CF6]/85 animate-spin-reverse opacity-85" style={{ animationDuration: '16s' }} />
                
                {/* Inner Ring: Neon Pink */}
                <div className="absolute inset-[6px] rounded-full border-2 border-[#EC4899]/80 animate-spin-slow opacity-95" style={{ animationDuration: '12s' }} />
                
                <div className={`w-full h-full rounded-full overflow-hidden relative border-2 ${isDark ? 'bg-slate-950 border-[#050816]' : 'bg-slate-100 border-slate-200'}`}>
                  <img
                    id="noora-avatar-img"
                    src={avatarImg}
                    alt="Noora Avatar"
                    className="w-full h-full object-cover select-none pointer-events-none scale-102 group-hover/avatar:scale-108 transition-all duration-700 font-sans"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t via-black/10 to-transparent ${isDark ? 'from-black/60' : 'from-black/30'}`} />
                  {/* Digital HUD scanline sweep overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.05)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-15 pointer-events-none" />
                </div>
              </motion.div>

              {/* Surrounding Skill Nodes (Absolute positioned in circle) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
                {SKILL_NODES.map((node) => {
                  const rad = ((node.angle + stageRotation) * Math.PI) / 180;
                  const distMultiplier = 162; 
                  const leftPercentage = 50 + (Math.cos(rad) * distMultiplier) / 4; 
                  const topPercentage = 50 + (Math.sin(rad) * distMultiplier) / 4;
                  const isSelected = node.id === activeSkill;
                  const styles = getNodeStyles(node.id, isSelected);

                  return (
                    <div 
                      key={node.id}
                      style={{ 
                        left: `${leftPercentage}%`, 
                        top: `${topPercentage}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className="absolute pointer-events-auto"
                    >
                      <motion.button
                        id={`skill-node-${node.id}`}
                        onClick={() => {
                          setActiveSkill(node.id);
                          sound.playClick();
                        }}
                        onMouseEnter={() => {
                          handleHover();
                          setHoveredSkillNode(node.id);
                        }}
                        onMouseLeave={() => {
                          setHoveredSkillNode(null);
                        }}
                        whileHover={{ scale: 1.15 }}
                        className={`flex flex-col items-center justify-center cursor-pointer transition-all ${isSelected ? 'scale-110' : 'opacity-85 hover:opacity-100'}`}
                      >
                        {/* Glowing Glassmorphism Housing */}
                        <div 
                          className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${styles.glow} ${
                            isDark ? 'border-white/10' : 'border-slate-200'
                          }`}
                        >
                          <Icon 
                            name={node.iconName} 
                            className={`transition-colors duration-300 ${styles.iconColor}`} 
                            size={16} 
                          />
                        </div>

                        {/* Node Label Text */}
                        <span className={`text-[9px] font-mono mt-1 text-center ${styles.tagColor}`}>
                          {node.name}
                        </span>
                      </motion.button>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Holographic 3D Interactive Control Panel */}
            <div className={`mt-6 p-4 rounded-2xl w-full max-w-sm border backdrop-blur-lg flex flex-col gap-4 font-mono select-none ${
              isDark 
                ? 'bg-slate-950/70 border-white/10 text-slate-300 shadow-2xl' 
                : 'bg-white border-slate-205 text-slate-800 shadow-md'
            }`}>
              <div className="flex justify-between items-center border-b border-dashed dark:border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <Sliders size={13} className="text-[#00E5FF] animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest">3D_HOLO_CONTROL_DECK</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isAutoOrbit ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                  <span className="text-[8px] text-slate-500 font-bold uppercase">{isAutoOrbit ? 'ACTIVE' : 'LOCKED'}</span>
                </div>
              </div>

              {/* Joystick Grid */}
              <div className="grid grid-cols-12 gap-3 items-center">
                
                {/* 3D Trackpad / Orientation Pad (7 cols) */}
                <div className="col-span-7 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[8px] text-slate-500 font-bold">
                    <span>TACTILE_TILT_PAD</span>
                    <span className="text-purple-400">PITCH: {stageTiltX}° / YAW: {stageTiltY}°</span>
                  </div>
                  <div 
                    onMouseMove={(e) => {
                      if (e.buttons === 1 || e.buttons === 0) { // allows free dragging or clicking style
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width;
                        const y = (e.clientY - rect.top) / rect.height;
                        const tiltY = Math.round((x - 0.5) * 45);
                        const tiltX = Math.round((0.5 - y) * 45);
                        setStageTiltX(tiltX);
                        setStageTiltY(tiltY);
                      }
                    }}
                    className={`h-24 rounded-xl border relative cursor-crosshair flex items-center justify-center overflow-hidden transition-colors ${
                      isDark 
                        ? 'bg-black/60 border-white/5 hover:bg-black/80' 
                        : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    {/* Crosshair grid lines */}
                    <div className="absolute inset-x-0 h-[1px] bg-slate-500/10 pointer-events-none" />
                    <div className="absolute inset-y-0 w-[1px] bg-slate-500/10 pointer-events-none" />
                    
                    {/* Concentric targets */}
                    <div className="absolute w-12 h-12 rounded-full border border-slate-500/5 pointer-events-none" />
                    <div className="absolute w-20 h-20 rounded-full border border-slate-500/5 pointer-events-none" />

                    {/* Active joystick bead */}
                    <motion.div 
                      key={`${stageTiltX}-${stageTiltY}`}
                      animate={{
                        x: (stageTiltY / 45) * 35,
                        y: -(stageTiltX / 45) * 35
                      }}
                      transition={{ type: 'spring', damping: 15, stiffness: 120 }}
                      className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#8B5CF6] border border-white/30 shadow-[0_0_12px_rgba(0,229,255,0.7)] flex items-center justify-center"
                    >
                      <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    </motion.div>
                  </div>
                </div>

                {/* Vertical adjustments (5 cols) */}
                <div className="col-span-5 flex flex-col gap-2.5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-slate-500 font-bold block">ORBIT_PITCH_Y</span>
                    <input 
                      type="range" 
                      min="-40" 
                      max="40" 
                      value={stageTiltX}
                      onChange={(e) => {
                        setStageTiltX(Number(e.target.value));
                      }}
                      className="w-full accent-[#00E5FF] bg-slate-250 dark:bg-slate-800 h-1 rounded-lg appearance-none cursor-ew-resize"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-slate-500 font-bold block">ORBIT_YAW_X</span>
                    <input 
                      type="range" 
                      min="-40" 
                      max="40" 
                      value={stageTiltY}
                      onChange={(e) => {
                        setStageTiltY(Number(e.target.value));
                      }}
                      className="w-full accent-[#8B5CF6] bg-slate-250 dark:bg-slate-800 h-1 rounded-lg appearance-none cursor-ew-resize"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-slate-500 font-bold block">ORBIT_SPEED</span>
                    <input 
                      type="range" 
                      min="0.1" 
                      max="3" 
                      step="0.1"
                      value={orbitSpeed}
                      onChange={(e) => {
                        setOrbitSpeed(Number(e.target.value));
                      }}
                      className="w-full accent-[#EC4899] bg-slate-250 dark:bg-slate-800 h-1 rounded-lg appearance-none cursor-ew-resize"
                    />
                  </div>
                </div>

              </div>

              {/* Deck buttons */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsAutoOrbit(!isAutoOrbit);
                  }}
                  className={`py-1.5 px-3 rounded-lg border text-[9px] font-bold uppercase cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
                    isAutoOrbit 
                      ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30 hover:bg-[#00E5FF]/20 mt-0' 
                      : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 hover:bg-slate-200 mt-0'
                  }`}
                >
                  <Activity size={10} className={isAutoOrbit ? 'animate-pulse' : ''} />
                  <span>{isAutoOrbit ? 'LOCK_MOTOR' : 'START_MOTOR'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setStageTiltX(10);
                    setStageTiltY(-12);
                    setStageRotation(0);
                    setIsAutoOrbit(true);
                    setOrbitSpeed(1);
                  }}
                  className="py-1.5 px-3 rounded-lg border border-slate-200/50 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-[9px] font-bold text-slate-500 dark:text-slate-400 hover:text-white hover:bg-slate-150 dark:hover:bg-white/10 uppercase cursor-pointer flex items-center justify-center gap-1.5 mt-0"
                >
                  <Compass size={10} />
                  <span>RESET_DECK</span>
                </button>
              </div>
            </div>

            {/* Instruction Callout for the Skills Grid */}
            <span className="text-[10px] text-slate-500 font-mono tracking-widest mt-4 flex items-center gap-1.5 animate-pulse">
              <Terminal size={11} className="text-[#8B5CF6]" />
              SELECT CORE NODES TO SCAN METRICS
            </span>

          </div>

        </div>

        {/* LOWER MAIN SECTION: HORIZONTAL GLASS-BENTO STATS FOOTER */}
        <div id="stats-panel" className="mt-12 lg:mt-16 w-full">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-2 rounded-3xl backdrop-blur-md ${
            isDark ? 'bg-white/[0.01]' : 'bg-slate-100/50'
          } ${isDark ? 'border border-white/5' : 'border border-slate-200'}`}>
            
            {STATISTICS.map((stat, idx) => (
              <div 
                key={stat.id}
                onMouseEnter={handleHover}
                onClick={() => sound.playClick()}
                className={`p-6 rounded-2xl border flex items-center justify-between group hover:border-[#8B5CF6]/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                  isDark 
                    ? 'bg-gradient-to-br from-slate-950/60 to-slate-950/20 border-white/15 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.5)]' 
                    : 'bg-gradient-to-br from-white/95 to-slate-50/70 border-slate-205 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.02)]'
                }`}
              >
                <div className="space-y-1">
                  <span className={`text-[10px] font-mono uppercase tracking-widest block font-bold transition-colors group-hover:text-[#EC4899] ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {stat.label}
                  </span>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} theme={theme} />
                </div>
                
                <div className={`p-3.5 rounded-xl transition-all shadow-inner border group-hover:text-[#00E5FF] group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]/30 ${
                  isDark ? 'bg-white/5 text-slate-400 border-white/10' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  <Icon name={stat.iconName} size={22} />
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* DATA SCIENCE INTERACTIVE WORKBENCH & DASHBOARD */}
        <DataScienceWorkbench theme={theme} />

        {/* ADVANCED PORTFOLIO SKILLS SECTION */}
        <DataScienceIntelligenceHub theme={theme} />

        {/* DEDICATED FULL STACK DEVELOPMENT & SOFTWARE ENGINEERING SECTION */}
        <FullStackDevelopmentSection theme={theme} />

        {/* PREMIUM FEATURED PROJECTS SECTIONS */}
        <FeaturedProjects theme={theme} />

        {/* PREMIUM EXPERIENCE JOURNEY PATHWAY */}
        <ExperienceJourney theme={theme} />

        {/* PREMIUM CERTIFICATION VAULT SYSTEM */}
        <CertificationVault theme={theme} />

        {/* PREMIUM ABOUT SECTION */}
        <AboutSection theme={theme} />

      </main>

      {/* Floating System Summary Label */}
      <footer className="relative w-full py-6 mt-8 border-t border-white/5 text-center text-[10px] text-slate-600 font-mono z-25">
        <div className="flex flex-col gap-1 items-center">
          <span>DESIGNED FOR NOORA • CSE (DATA SCIENCE) PORTFOLIO HUB</span>
          <span className="opacity-60">© 2026-PRESENT • INTELLECTUAL PORT prototype</span>
        </div>
      </footer>

      {/* RENDER MODULATED MODALS */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ProjectsModal isOpen={isProjectsOpen} onClose={() => setIsProjectsOpen(false)} />

      {/* Back to Top Smooth Scroll Indicator */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={scrollToTop}
            onMouseEnter={handleHover}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-md text-[#00E5FF] hover:text-white hover:border-[#00E5FF]/45 hover:bg-[#00E5FF]/10 shadow-[0_5px_25px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all cursor-pointer group flex items-center justify-center"
            title="Scroll to Top"
            id="back-to-top-btn"
          >
            <ArrowUp size={18} className="transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
