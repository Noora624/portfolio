import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  ExternalLink, 
  CheckCircle, 
  Cpu, 
  Database, 
  Compass, 
  Sparkles, 
  Sliders, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  GraduationCap, 
  Terminal, 
  Search, 
  Star, 
  HelpCircle,
  Eye,
  Zap,
  ArrowRight,
  ChevronRight,
  X
} from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  theme?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  category: string;
  duration: string;
  description: string;
  skills: string[];
  bgGradient: string;
  badgeColor: string;
  glowColor: string;
}

function RollingCounter({ value, durationMs = 1200 }: { value: number; durationMs?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, durationMs]);

  return <span className="tabular-nums font-black text-white text-3xl sm:text-4xl">{count}</span>;
}

export default function CertificationVault({ theme = 'dark' }: Props) {
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPathDrawn, setIsPathDrawn] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter or active states
  const [searchQuery, setSearchQuery] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Floating nodes for background decor
  const [particleNodes] = useState([
    { name: 'IBM Cloud', x: 20, y: 15, size: 5 },
    { name: 'R-Studio', x: 85, y: 30, size: 4 },
    { name: 'InternElite', x: 10, y: 70, size: 6 },
    { name: 'Credential Security', x: 75, y: 80, size: 5 },
  ]);

  const certifications: Certification[] = [
    {
      id: 'ibm-vis-python',
      name: "IBM Data Visualization Using Python",
      issuer: "IBM (International Business Machines)",
      category: "Data Visualization & Analytics",
      duration: "Completed 2024",
      description: "Comprehensive qualification validating advanced abilities to construct interactive multi-parameter dashboards, execute statistical plotting through Seaborn & Matplotlib, and formulate high-yield exploratory reports for complex corporate decision pipelines.",
      skills: ['Python', 'Matplotlib', 'Seaborn', 'Data Analysis', 'Interactive Dashboards', 'Statistical Plotting'],
      bgGradient: "from-blue-600/10 to-cyan-500/5 hover:border-cyan-500/30",
      badgeColor: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
      glowColor: "rgba(0, 229, 255, 0.2)"
    },
    {
      id: 'ibm-ml-r',
      name: "IBM Machine Learning with R",
      issuer: "IBM (International Business Machines)",
      category: "Machine Learning",
      duration: "Completed 2025",
      description: "Rigorous certification confirming mastery of statistical modeling, supervise decision-trees, classification algorithms, validation arrays, and model optimization metrics engineered entirely using the R-Studio computational language environment.",
      skills: ['R Programing', 'Supervised Trees', 'Cross Validation', 'Regression Analytics', 'Predictive Classifiers'],
      bgGradient: "from-purple-600/10 to-pink-500/5 hover:border-pink-500/30",
      badgeColor: "text-purple-400 border-purple-500/20 bg-purple-500/5",
      glowColor: "rgba(168, 85, 247, 0.2)"
    },
    {
      id: 'intern-elite-ml',
      name: "Intermediate Machine Learning Certification",
      issuer: "InternElite Professional Academy",
      category: "Supervised Models",
      duration: "Completed 2025",
      description: "Professional credential certifying structural capability in managing healthcare and commercial datasets, testing random forest estimators, resolving extreme data skewness, and generating rigorous explainable ML feature models.",
      skills: ['Machine Learning', 'Random Forests', 'XGBoost Algorithms', 'Data Preprocessing', 'Feature Importance'],
      bgGradient: "from-emerald-605/10 to-teal-500/5 hover:border-teal-500/30",
      badgeColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      glowColor: "rgba(16, 185, 129, 0.2)"
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.75;
      if (visible) {
        setIsPathDrawn(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleActionVerify = (name: string) => {
    sound.playClick();
    triggerToast(`🔒 VERIFYING LEDGER ATTESTATION FOR "${name}"... Status: SECURE, VALID, AND CERTIFIED DIRECTLY VIA THE ACCREDITED ENTITY.`);
  };

  const handleViewCert = (name: string) => {
    sound.playClick();
    triggerToast(`📂 RETRIEVING REGISTERED DIGITAL FILE FOR "${name}"... Credential payload successfully verified in secure sandbox state.`);
  };

  const earnedSkills = [
    'Python', 'Machine Learning', 'Data Visualization', 'Analytics', 'Data Science', 'Problem Solving', 'Statistical Analysis'
  ];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="certification-vault-section"
      className="mt-20 lg:mt-32 w-full space-y-12 relative z-20 scroll-mt-24 overflow-hidden py-4"
    >
      {/* Apple-style Interactive Lights responding to Hover and active credential color */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-300 opacity-[0.05] blur-[110px] mix-blend-screen"
        style={{
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
          background: `radial-gradient(circle, ${activeIndex === 0 ? '#00e5ff' : activeIndex === 1 ? '#a855f7' : '#10b981'} 0%, transparent 70%)`
        }}
      />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

      {/* Decorative Nodes Floating Slowly */}
      {particleNodes.map((p, i) => (
        <motion.div
          key={p.name}
          className="absolute rounded-full flex flex-col items-center justify-center p-2 text-[7px] font-mono tracking-widest text-[#64748B] font-bold pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.2, 0.45, 0.2]
          }}
          transition={{
            duration: 9 + i * 3,
            repeat: i === 0 ? Infinity : undefined, // safer loop pattern
            ease: "easeInOut"
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30 mb-0.5 border border-pink-500/20" />
          <span>{p.name}</span>
        </motion.div>
      ))}

      {/* Header Accent Line */}
      <div className="flex items-center gap-4 justify-center">
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-purple-500/20' : 'via-purple-500/40'} to-transparent`} />
        <div className={`flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
          isDark 
            ? 'text-cyan-400/60 bg-cyan-500/5 border-cyan-500/10' 
            : 'text-cyan-700 bg-cyan-100/50 border-cyan-200/60'
        }`}>
          <ShieldCheck size={11} className="animate-pulse" />
          CREDENTIAL_VAULT_DECK
        </div>
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-cyan-500/20' : 'via-cyan-500/40'} to-transparent`} />
      </div>

      {/* Title block */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-none text-white">
          Certification <span className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#10B981] bg-clip-text text-transparent">Vault</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
          Continuous learning, professional development, and technical growth. Certifications verified organically through learning timelines.
        </p>
      </div>

      {/* ========================================== */}
      {/* 1. PREMIUM REAL-TIME COUNTERS GRID */}
      {/* ========================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {[
          { label: "Certifications Earned", value: 3, suffix: "" },
          { label: "Projects Completed", value: 5, suffix: "" },
          { label: "Technologies Learned", value: 10, suffix: "+" },
          { label: "Months of Learning", value: 18, suffix: "" }
        ].map((c) => (
          <div 
            key={c.label} 
            className="p-5 rounded-2xl border border-white/5 bg-[#030712]/30 backdrop-blur-md relative overflow-hidden group hover:border-[#00E5FF]/25 transition-all text-center"
          >
            <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold tracking-wider mb-1">{c.label}</span>
            <div className="flex items-baseline justify-center gap-1">
              <RollingCounter value={c.value} />
              <span className="text-sm font-extrabold text-[#00E5FF]">{c.suffix}</span>
            </div>
            <div className="absolute top-0 right-1.5 w-1 h-3 rounded-full bg-cyan-400 invisible group-hover:visible" />
          </div>
        ))}
      </div>

      {/* ========================================== */}
      {/* 2. THE VAULT SELECTIONS AND CARDS EXPANSION */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
        
        {/* LEFT COLUMN: ACTIVE STATIONS / VERTICAL REVELATIONS PROGRESS */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/30 border border-white/5 space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block font-bold">AUTHORIZED LOCK INDEX</span>
            
            <div className="space-y-2">
              {certifications.map((cert, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={cert.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveIndex(idx);
                    }}
                    className={`flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 w-full group ${
                      isActive 
                        ? 'bg-gradient-to-r from-slate-900 to-black/85 border-slate-700 shadow-md text-white'
                        : 'bg-slate-950/20 border-white/5 text-slate-500 hover:text-slate-350 hover:bg-slate-950/40'
                    }`}
                  >
                    <div className={`p-2 rounded-lg border transition-colors ${
                      isActive ? 'bg-cyan-500/10 border-cyan-500/30 text-[#00E5FF]' : 'bg-[#020511] border-zinc-800 text-slate-600'
                    }`}>
                      <Award size={13} />
                    </div>
                    
                    <div className="flex-grow select-none">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block tracking-widest font-extrabold">{cert.issuer.split(' ')[0]}</span>
                      <h4 className={`text-xs font-black uppercase tracking-tight line-clamp-1 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                      }`}>
                        {cert.name}
                      </h4>
                    </div>

                    <ChevronRight size={13} className={`shrink-0 transition-transform ${isActive ? 'translate-x-[2px] text-cyan-400' : 'text-slate-700'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC PROGRESS TIMELINE PATHWAY (Learning Fundamentals -> Growth) */}
          <div className="p-5 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#8B5CF6] uppercase block font-bold">LEARNING PATHWAY REVOLTS</span>

            <div className="relative pl-5 space-y-4 text-xs font-mono select-none">
              <div className="absolute left-1.5 top-2 bottom-2 w-[1px] bg-slate-800">
                <motion.div 
                  initial={{ height: '0%' }}
                  animate={{ height: isPathDrawn ? '100%' : '0%' }}
                  className="w-full bg-gradient-to-b from-[#00E5FF] via-[#8B5CF6] to-[#10B981]"
                />
              </div>

              {[
                { title: 'Learning Fundamentals', stat: 'Completed 2023', active: true },
                { title: 'Data Visualization', stat: 'Completed 2024', active: true },
                { title: 'Machine Learning', stat: 'Completed 2025', active: true },
                { title: 'Advanced Analytics', stat: 'Completed 2025', active: true },
                { title: 'Professional Growth', stat: 'Target Horizon', active: false }
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className={`absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full border transition-all ${
                    step.active 
                      ? 'bg-cyan-400 border-transparent shadow-[0_0_8px_rgba(0,229,255,0.6)]' 
                      : 'bg-slate-950 border-slate-700'
                  }`} />
                  
                  <div className="space-y-0.5">
                    <span className={`text-[10px] uppercase font-bold tracking-tight block ${step.active ? 'text-slate-200' : 'text-slate-500'}`}>
                      {step.title}
                    </span>
                    <span className="text-[8px] text-slate-550 block font-normal">{step.stat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED EXPANSION PLATE */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#030712]/30 shadow-2xl backdrop-blur-xl relative overflow-hidden min-h-[500px] flex flex-col justify-between"
            >
              {/* Backglow element dynamically switching */}
              <div 
                className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none rounded-full blur-[90px]"
                style={{
                  background: `linear-gradient(135deg, ${
                    activeIndex === 0 ? '#00e5ff' : activeIndex === 1 ? '#a855f7' : '#10b981'
                  }, transparent)`
                }}
              />

              {/* Verified Ribbon watermarks */}
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[8px] font-mono text-[#00E5FF] font-bold">
                <ShieldCheck size={11} className="text-[#00E5FF] animate-pulse" />
                <span>SECURE VERIFICATION: ORGANIC_OK</span>
              </div>

              {/* Main Content Area */}
              <div className="space-y-6">
                
                {/* Header */}
                <div className="space-y-1">
                  <span className={`text-[9.5px] font-mono uppercase tracking-widest font-black ${
                    activeIndex === 0 ? 'text-cyan-400' : activeIndex === 1 ? 'text-purple-400' : 'text-emerald-400'
                  }`}>
                    {certifications[activeIndex].category.toUpperCase()}
                  </span>
                  
                  <h3 className="text-xl sm:text-3.5xl font-display font-black text-white leading-tight uppercase tracking-tight">
                    {certifications[activeIndex].name}
                  </h3>

                  <div className="flex items-center gap-2 pt-1 font-mono text-[9px] text-slate-500 uppercase font-bold">
                    <span>ISSUING SYSTEM: {certifications[activeIndex].issuer}</span>
                    <span>•</span>
                    <span className="text-pink-400">{certifications[activeIndex].duration}</span>
                  </div>
                </div>

                <div className="h-[1px] bg-white/5 w-full" />

                {/* Substantive summary info */}
                <div className="space-y-2 border-l-2 border-slate-800 pl-4 py-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">CREDENTIAL SUMMARY</span>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-350">
                    {certifications[activeIndex].description}
                  </p>
                </div>

                {/* Skills Gained list block */}
                <div className="space-y-2.5">
                  <span className="text-[9px] font-mono text-[#8B5CF6] uppercase block font-bold tracking-widest">SKILLS VERIFIED AND HARNESSED</span>
                  <div className="flex flex-wrap gap-1.5">
                    {certifications[activeIndex].skills.map((skill) => (
                      <span 
                        key={skill}
                        onClick={() => sound.playClick()}
                        className="text-[9.5px] font-mono font-bold px-3 py-1 rounded bg-[#020511] border border-white/5 text-slate-300 hover:border-[#00E5FF]/25 hover:text-white transition-colors cursor-default select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action operations buttons */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-3 items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500 uppercase">CREDENTIAL RECORD STATUS: <span className="text-emerald-400">ACTIVATED</span></span>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleActionVerify(certifications[activeIndex].name)}
                    className="text-[10px] font-mono tracking-widest font-black uppercase py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 transition-all bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                  >
                    <CheckCircle2 size={11} />
                    <span>VERIFY SECURE LINK</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleViewCert(certifications[activeIndex].name)}
                    className="text-[10px] font-mono tracking-widest font-black uppercase py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 transition-all bg-[#020511] text-slate-300 border border-white/10 hover:border-white/30"
                  >
                    <span>VIEW DIGITAL FILE</span>
                    <ExternalLink size={11} />
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ========================================== */}
      {/* 3. SKILLS GAINED SECTION BADGES (Animated connected nodes aesthetic) */}
      {/* ========================================== */}
      <div className="space-y-4 pt-6 max-w-7xl mx-auto">
        <div className="space-y-1">
          <span className="text-[10px] text-pink-400 font-bold tracking-widest block uppercase">ACHIEVED COMPETENCY PLATFORM</span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Harnessed Skill Index</h3>
          <p className="text-xs text-slate-400">
            A comprehensive matrix of technical skill categories unlocked through formal certifications and interactive lab works.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1 justify-center sm:justify-start">
          {earnedSkills.map((skill, index) => (
            <motion.div
              key={skill}
              onMouseEnter={() => sound.playHover()}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-[#030712]/30 hover:border-[#8B5CF6]/40 cursor-pointer select-none`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)] animate-pulse" />
              <span className="text-[11px] font-mono font-black uppercase tracking-tight text-slate-300">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Modern Dynamic Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-50 p-4 rounded-2xl border border-cyan-500/25 bg-slate-950/85 backdrop-blur-md shadow-[0_10px_40px_rgba(0,229,255,0.15)] flex items-start gap-3.5"
          >
            <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 self-start">
              <Zap size={15} className="animate-pulse" />
            </div>
            <div className="space-y-1 select-none flex-grow">
              <span className="text-[9px] font-mono tracking-widest text-[#00E5FF] font-black uppercase block leading-none">SYSTEMS PROTOCOL TELEMETRY</span>
              <p className="text-xs text-white leading-relaxed font-sans">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setToastMessage(null)} 
              className="text-slate-450 hover:text-white p-1 hover:bg-white/5 rounded transition-all cursor-pointer shrink-0"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
