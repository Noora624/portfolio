import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Award, 
  Cpu, 
  TrendingUp, 
  Compass, 
  Activity, 
  ChevronRight, 
  GraduationCap, 
  Brain, 
  Database, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  Users, 
  Flame, 
  Terminal,
  LineChart,
  Target,
  ArrowUpRight
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ExperienceJourneyProps {
  theme?: 'dark' | 'light';
}

interface EvolutionNode {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  badge: string;
  summary: string;
  icon: React.ReactNode;
  accent: string;
  glow: string;
  skills: string[];
  outcomes: string[];
  careerPhase: string;
  growthMetrics: { label: string; value: string }[];
}

export default function ExperienceJourney({ theme = 'dark' }: ExperienceJourneyProps) {
  const isDark = theme === 'dark';
  const [activeNode, setActiveNode] = useState<string>('internship');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteractiveLineDrawn, setIsInteractiveLineDrawn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Recruiter interactive checklist state
  const [recruiterInteractions, setRecruiterInteractions] = useState({
    exposure: true,
    experience: false,
    practical: false,
    mindset: false,
    analytics: false,
  });

  // Track scroll position to draw timeline and trigger reveals
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75;
      if (isVisible) {
        setIsInteractiveLineDrawn(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleNodeClick = (id: string) => {
    sound.playClick();
    setActiveNode(id);
  };

  const playHover = () => {
    sound.playHover();
  };

  // Timeline Evolution data integrating the progression: Student -> Data Science Learner -> Data Analyst Intern -> Future Analyst
  const journeyNodes: EvolutionNode[] = [
    {
      id: 'student',
      role: 'B.Tech CSE Student',
      company: 'K.R. Mangalam University',
      duration: '2023 - Present',
      location: 'Delhi NCR, India',
      badge: 'ACADEMIC IGNITION',
      summary: 'Establishing a premium mathematical and computational foundation in Computer Science and Engineering with an specialized focus on Data Science constructs, OOP paradigms, and system design pipelines.',
      icon: <GraduationCap className="text-[#00E5FF]" size={20} />,
      accent: 'from-[#00E5FF] to-[#00B0FF]',
      glow: 'rgba(0, 229, 255, 0.2)',
      skills: ['Python', 'Data Structures', 'Procedural Logic', 'Statistical Foundations', 'Core Algebra'],
      outcomes: [
        'Formulated custom data structural arrays and matrix manipulation algorithms answering complex relational queries.',
        'Secured consistent academic standing, specializing in algorithmic efficiency and programmatic computing blocks.'
      ],
      careerPhase: 'Academic Core',
      growthMetrics: [
        { label: 'Technical Score', value: '94%' },
        { label: 'Algorithm Coverage', value: '100%' }
      ]
    },
    {
      id: 'learner',
      role: 'Data Science Scholar',
      company: 'Autodidact & Laboratory Research',
      duration: '2024 - 2025',
      location: 'Research Workspace',
      badge: 'CORE COMPLIANCE',
      summary: 'Scaled into deep statistical programming, engineering robust tabular transformations, performing null matrix counts, and launching exploratory analytics plots via Python packages.',
      icon: <Cpu className="text-[#8B5CF6]" size={20} />,
      accent: 'from-[#8B5CF6] to-[#6366F1]',
      glow: 'rgba(139, 92, 246, 0.2)',
      skills: ['Pandas', 'NumPy', 'Scikit-Learn', 'Exploratory Data Analysis', 'Machine Learning Foundations'],
      outcomes: [
        'Mastered dense tabular slicing, correlation matrix plots, coefficient mapping, and predictive estimators.',
        'Wrote custom model hyperparameter optimization loops achieving consistent generalization profiles on validation sets.'
      ],
      careerPhase: 'Model Prototyping',
      growthMetrics: [
        { label: 'Datasets Profiled', value: '30+' },
        { label: 'Predictive Models Built', value: '15+' }
      ]
    },
    {
      id: 'internship',
      role: 'Data Analyst Intern',
      company: 'Tricon Equipment India',
      duration: 'June 2025 – July 2025',
      location: 'Haryana, India',
      badge: 'PROFESSIONAL MILESTONE',
      summary: 'Drove critical operational data engineering and strategic analysis. Integrated legacy commercial tracking spreadsheets into modern database schemas, crafted high-contrast reporting dashboards, and ran rigorous statistical assessments to optimize commercial equipment analytics.',
      icon: <Briefcase className="text-[#EC4899]" size={20} />,
      accent: 'from-[#EC4899] to-[#F43F5E]',
      glow: 'rgba(236, 72, 153, 0.2)',
      skills: ['SQL Grouping', 'Tableau Dashboards', 'Power BI', 'Data Cleaning', 'Business Intelligence', 'Cross-team Reports'],
      outcomes: [
        'Organized legacy operational tables containing complex commercial telemetry across real-world heavy industrial products.',
        'Developed automated reports and statistical scorecards, enabling executives to scan operational efficiencies in seconds.',
        'Collaborated with engineering support teams to diagnose variance in manufacturing batch outputs.'
      ],
      careerPhase: 'Industry Experience',
      growthMetrics: [
        { label: 'Reporting Accuracy', value: '98.5%' },
        { label: 'Integration Efficiency', value: '+30%' }
      ]
    },
    {
      id: 'future',
      role: 'Future Data Analyst',
      company: 'Enterprise Scale Analytics',
      duration: 'Upcoming 2026',
      location: 'Global Market Ingress',
      badge: 'GROWTH CATALYST',
      summary: 'Preparing to deploy high-availability ML pipelines, stream transactional data feeds, scale cloud architectures, and coordinate directly with executive stakeholders to map commercial priorities.',
      icon: <Award className="text-[#10B981]" size={20} />,
      accent: 'from-[#10B981] to-[#059669]',
      glow: 'rgba(16, 185, 129, 0.2)',
      skills: ['Real-time Streaming', 'Big Data Ecosystems', 'Predictive Forecasting', 'Strategic Consulting', 'MLOps'],
      outcomes: [
        'Actively framing real-world telemetry solutions to drive direct revenue and cost prevention programs.',
        'Committed to continuous technical scaling, adaptive analytical models, and cross-discipline collaboration.'
      ],
      careerPhase: 'Professional Standard',
      growthMetrics: [
        { label: 'Operational Readiness', value: '100%' },
        { label: 'Collaboration Factor', value: 'High' }
      ]
    }
  ];

  // Professional Highlights Cards reflecting applied capabilities
  const professionalHighlights = [
    {
      title: "Data Analysis",
      stat: "Cleanse & Model",
      desc: "Architecting rigorous structural workflows to map variables, purge extreme data outliers, and normalize multi-source formats cleanly.",
      color: "from-blue-500/10 to-cyan-500/5 hover:border-cyan-500/30",
      icon: <Database size={16} className="text-cyan-400" />
    },
    {
      title: "Problem Solving",
      stat: "Algorithmic Logic",
      desc: "Filtering raw operations to isolate systematic failures, designing logical checks, and converting unstructured feeds into structured trends.",
      color: "from-purple-500/10 to-indigo-500/5 hover:border-purple-500/30",
      icon: <Brain size={16} className="text-purple-400" />
    },
    {
      title: "Business Insights",
      stat: "Decision Matrices",
      desc: "Translating correlation tables and descriptive aggregates into high-value commercial recommendations for corporate leadership.",
      color: "from-pink-500/10 to-rose-500/5 hover:border-rose-500/30",
      icon: <TrendingUp size={16} className="text-pink-400" />
    },
    {
      title: "Data Visualization",
      stat: "Holographic UX",
      desc: "Synthesizing information into clean bivariate plots, Tableau boards, or custom React interfaces representing multi-tier data sets.",
      color: "from-amber-500/10 to-orange-500/5 hover:border-orange-500/30",
      icon: <LineChart size={16} className="text-amber-400" />
    },
    {
      title: "Analytical Thinking",
      stat: "Statistical Rigor",
      desc: "Employing mathematical hypotheses, correlation coefficients, and matrix coefficients to prevent bias in forecasting tasks.",
      color: "from-emerald-500/10 to-teal-500/5 hover:border-emerald-500/30",
      icon: <Target size={16} className="text-emerald-400" />
    },
    {
      title: "Professional Teamwork",
      stat: "Cohesive Delivery",
      desc: "Bridging the gap between engineering, product, and leadership pipelines through clear communication, agile sprints, and visual tools.",
      color: "from-fuchsia-500/10 to-purple-500/5 hover:border-fuchsia-500/30",
      icon: <Users size={16} className="text-fuchsia-400" />
    }
  ];

  const activeNodeData = journeyNodes.find(node => node.id === activeNode) || journeyNodes[2];

  return (
    <section 
      id="experience-journey-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="mt-20 lg:mt-32 w-full space-y-12 relative z-20 scroll-mt-24 overflow-hidden"
    >
      {/* Dynamic Glow Spotlight (Tesla-inspired background effect reacting to mouse) */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-300 opacity-[0.06] blur-[100px] mix-blend-screen"
        style={{
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
          background: `radial-gradient(circle, ${activeNodeData.id === 'student' ? '#00E5FF' : activeNodeData.id === 'learner' ? '#8B5CF6' : activeNodeData.id === 'internship' ? '#EC4899' : '#10B981'} 0%, transparent 70%)`
        }}
      />

      {/* Decorative Section Header Line */}
      <div className="flex items-center gap-4 justify-center">
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-purple-500/20' : 'via-purple-500/40'} to-transparent`} />
        <div className={`flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
          isDark 
            ? 'text-pink-400/60 bg-pink-500/5 border-pink-500/10' 
            : 'text-pink-700 bg-pink-100/50 border-pink-200/60'
        }`}>
          <Terminal size={10} className="animate-pulse" />
          SYSTEM_EXPERIENCE_PIPELINE
        </div>
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-cyan-500/20' : 'via-cyan-500/40'} to-transparent`} />
      </div>

      {/* Title & Subtitle */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-none text-white">
          Experience <span className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">Journey</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
          Building analytical thinking through real-world industry exposure and hands-on problem solving.
        </p>
      </div>

      {/* MAIN LAYOUT GLASS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE NAVIGATION TIMELINE & CAREER PATHWAY (4 COLS) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className={`p-6 rounded-3xl border backdrop-blur-md relative overflow-hidden ${
            isDark 
              ? 'bg-slate-950/40 border-white/5 shadow-2xl' 
              : 'bg-white/80 border-slate-200'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />

            {/* Neural Network Node Connectors Backdrop */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block font-bold">CAREER AUTOMATION PATHWAY</span>
                <span className="text-[8px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded uppercase">ACTIVE STATE</span>
              </div>

              {/* STAGE TILT VISUAL ELEMENT FOR CAREER EVOLUTION PROGRESSION */}
              <div className="relative pl-6 mt-6 space-y-4">
                
                {/* Dynamically drawing connecting line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-[1.5px] bg-slate-800">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: isInteractiveLineDrawn ? '100%' : '0%' }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="w-full bg-gradient-to-b from-[#00E5FF] via-[#8B5CF6] to-[#EC4899]"
                  />
                </div>

                {/* Evolution Steps */}
                {journeyNodes.map((node, index) => {
                  const isActive = activeNode === node.id;
                  
                  return (
                    <div 
                      key={node.id}
                      onClick={() => handleNodeClick(node.id)}
                      onMouseEnter={playHover}
                      className="group relative flex items-start gap-4 cursor-pointer"
                    >
                      {/* Active Ring & Pulse */}
                      <div className="relative z-10 flex-shrink-0 mt-1">
                        <motion.div 
                          animate={{
                            scale: isActive ? [1, 1.3, 1] : 1,
                            backgroundColor: isActive ? "#FFF" : "linear-gradient(45deg, #FFF, #000)"
                          }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            isActive 
                              ? 'bg-white border-transparent text-slate-950 shadow-[0_0_15px_rgba(236,72,153,0.6)]' 
                              : 'bg-slate-950 border-slate-700 text-slate-450 hover:border-slate-450'
                          }`}
                        >
                          <span className="text-[9px] font-mono leading-none font-black">{index + 1}</span>
                        </motion.div>
                        
                        {isActive && (
                          <span className={`absolute -inset-1 rounded-full border border-pink-500/35 animate-ping pointer-events-none`} />
                        )}
                      </div>

                      {/* Summary text */}
                      <div className="space-y-0.5 flex-1 select-none pr-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-mono uppercase tracking-widest font-extrabold ${
                            isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'
                          }`}>
                            {node.company}
                          </span>
                          <span className="text-[8px] font-mono text-slate-600">{node.duration.split(' – ').pop() || node.duration}</span>
                        </div>
                        <h4 className={`text-xs font-black uppercase tracking-tight transition-all ${
                          isActive 
                            ? 'text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text' 
                            : 'text-slate-400 group-hover:text-slate-250'
                        }`}>
                          {node.role}
                        </h4>
                        
                        {/* Interactive Growth Node Progress Dot */}
                        {isActive && (
                          <motion.div 
                            layoutId="node-arrow"
                            className="flex items-center gap-1.5 mt-1 text-[8px] font-mono text-[#00E5FF] font-bold"
                          >
                            <Activity size={8} className="animate-pulse" />
                            <span>NODE_CONNECTED: {node.careerPhase.toUpperCase()}</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* Animated Growth Path Indicator */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[9px] font-mono text-slate-500 block uppercase">GROWTH TIMELINE PROGRESS</span>
                <div className="h-2 rounded-full bg-slate-900 border border-white/5 p-0.5 max-w-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: activeNode === 'student' ? '25%' : activeNode === 'learner' ? '50%' : activeNode === 'internship' ? '75%' : '100%' 
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] shadow-[0_0_8px_rgba(236,72,153,0.4)]"
                  />
                </div>
                <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase">
                  <span>START</span>
                  <span>LEARNING</span>
                  <span className="text-pink-400 font-bold">INTERN</span>
                  <span>TARGET</span>
                </div>
              </div>

            </div>
          </div>

          {/* RECRUITER COCKPIT DIAGNOSTIC WIDGET */}
          <div className={`p-6 rounded-3xl border backdrop-blur-md relative overflow-hidden ${
            isDark 
              ? 'bg-slate-950/40 border-white/5 shadow-lg' 
              : 'bg-white/80 border-slate-200'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-[#EC4899]" />
                <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] font-black uppercase">RECRUITER EVALUATION DESK</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                Click parameters below to dynamically benchmark this candidate&apos;s capabilities based on real project and industry logs.
              </p>

              {/* Interactive sliders checklist */}
              <div className="space-y-2.5">
                {[
                  { key: 'exposure', label: 'Professional Exposure', detail: 'Tricon corporate team routines' },
                  { key: 'experience', label: 'Industry Familiarity', detail: 'Tabular database structures & KPIs' },
                  { key: 'practical', label: 'Hands-on Learning', detail: 'Pandas outlier cleaning & Tableau' },
                  { key: 'mindset', label: 'Growth/Adaptive Mindset', detail: 'Active B.Tech specialized scaling' },
                  { key: 'analytics', label: 'Analytical Capability', detail: 'Standard covariance calculations' }
                ].map((item) => {
                  const isChecked = recruiterInteractions[item.key as keyof typeof recruiterInteractions];
                  return (
                    <div 
                      key={item.key}
                      onClick={() => {
                        sound.playClick();
                        setRecruiterInteractions(prev => ({
                          ...prev,
                          [item.key]: !prev[item.key as keyof typeof recruiterInteractions]
                        }));
                      }}
                      onMouseEnter={playHover}
                      className={`p-2 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between ${
                        isChecked 
                          ? 'bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-purple-500/30' 
                          : 'bg-slate-900/10 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 rounded border p-0.5 flex items-center justify-center transition-all ${
                          isChecked 
                            ? 'bg-pink-500 border-pink-500 text-white' 
                            : 'border-slate-700 bg-[#020511]'
                        }`}>
                          <CheckCircle2 size={10} className={isChecked ? 'opacity-100' : 'opacity-0'} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[10px] font-bold ${isChecked ? 'text-white' : 'text-slate-400'}`}>
                            {item.label}
                          </span>
                          <span className="text-[8px] text-[#A8A29E] font-mono">{item.detail}</span>
                        </div>
                      </div>

                      {/* Benchmark Score indicator */}
                      <span className={`text-[9px] font-mono font-bold ${isChecked ? 'text-pink-400' : 'text-slate-600'}`}>
                        {isChecked ? 'OPTIMAL' : 'LOCKED'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic feedback calculation summary */}
              <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5 text-[9px] font-mono text-slate-400 flex items-center justify-between">
                <span>BENCHMARK SCORE:</span>
                <span className="text-[#00E5FF] font-black">
                  {Object.values(recruiterInteractions).filter(Boolean).length * 20}% SCALE SECURED
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DETAIL DEEP DIVE (8 COLS) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNodeData.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`p-8 rounded-3xl border backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[580px] ${
                isDark 
                  ? 'bg-slate-950/40 border-white/5 shadow-2xl shadow-pink-500/5' 
                  : 'bg-white/80 border-slate-200 shadow-xl'
              }`}
            >
              {/* Backglow decor based on active node */}
              <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none rounded-full blur-[80px]"
                style={{
                  background: `linear-gradient(135deg, ${activeNodeData.id === 'student' ? '#00E5FF' : activeNodeData.id === 'learner' ? '#8B5CF6' : activeNodeData.id === 'internship' ? '#EC4899' : '#10B981'}, transparent)`
                }}
              />

              {/* Top summary row */}
              <div className="space-y-6">
                
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className={`text-[9px] font-mono px-3 py-1 rounded-full uppercase border font-bold bg-white/5 ${
                    activeNodeData.id === 'student' ? 'text-[#00E5FF] border-[#00E5FF]/20' : 
                    activeNodeData.id === 'learner' ? 'text-[#8B5CF6] border-[#8B5CF6]/20' : 
                    activeNodeData.id === 'internship' ? 'text-[#EC4899] border-[#EC4899]/20' : 
                    'text-[#10B981] border-[#10B981]/20'
                  }`}>
                    {activeNodeData.badge}
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px] uppercase">
                    <Calendar size={11} className="text-pink-500" />
                    <span>{activeNodeData.duration}</span>
                  </div>
                </div>

                {/* Primary Role Info */}
                <div className="space-y-2">
                  <span className="text-xs uppercase text-slate-500 tracking-wider block font-bold font-mono">ROLE SCANNER</span>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-2xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
                      {activeNodeData.role}
                    </h3>
                    <span className="text-sm font-semibold text-slate-400">@ {activeNodeData.company}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1">
                    <MapPin size={12} className="text-[#00E5FF]" />
                    <span>{activeNodeData.location}</span>
                  </div>
                </div>

                <div className="h-[1px] bg-white/5 w-full" />

                {/* Professional Summary Story */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#8B5CF6] uppercase block font-bold">PROFESSIONAL SUMMARY</span>
                  <p className="text-sm text-slate-350 leading-relaxed font-sans">
                    {activeNodeData.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Skills Applied list */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block font-bold">SKILLS APPLIED</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeNodeData.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          onMouseEnter={playHover}
                          className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-md border border-white/5 bg-[#020511] text-slate-300 hover:border-pink-500/25 hover:text-white hover:shadow-[0_0_8px_rgba(236,72,153,0.15)] cursor-default transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learning Outcomes / Corporate Exposure details */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#EC4899] uppercase block font-bold">LEARNING OUTCOMES & IMPACT</span>
                    <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
                      {activeNodeData.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-[11px] leading-relaxed">
                          <CheckCircle2 size={13} className="text-[#10B981] flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Bottom statistics and progression state */}
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1 bg-white/[0.01] p-3 rounded-2xl border border-white/5">
                  <span className="text-[8px] text-slate-500 uppercase block font-mono">CAREER PHASE STATE</span>
                  <span className="text-xs font-bold text-white uppercase tracking-tight font-mono">{activeNodeData.careerPhase}</span>
                </div>

                {activeNodeData.growthMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1 bg-white/[0.01] p-3 rounded-2xl border border-white/5">
                    <span className="text-[8px] text-slate-500 uppercase block font-mono">{metric.label}</span>
                    <span className="text-sm font-extrabold text-[#00E5FF] tracking-tight font-mono">{metric.value}</span>
                  </div>
                ))}

                <div className="space-y-1 bg-gradient-to-r from-pink-500/10 to-rose-500/10 p-3 rounded-2xl border border-pink-500/20 flex flex-col justify-center">
                  <span className="text-[8px] text-pink-400 uppercase block font-mono font-bold tracking-wider">SYSTEM INTEGRITY</span>
                  <span className="text-xs font-black text-white tracking-tight font-mono uppercase">OPTIMAL</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* PROFESSIONAL HIGHLIGHTS DECK (Elegantly structured grid) */}
      <div className="space-y-6 pt-6">
        <div className="space-y-1">
          <span className="text-[10px] text-pink-400 font-bold tracking-widest block uppercase">APPLIED EXPERTISE MATRIX</span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Professional Capabilities</h3>
          <p className="text-xs text-slate-400">
            A comprehensive overview of competencies leveraged during academic projects and commercial industry assignments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {professionalHighlights.map((hl) => (
            <div 
              key={hl.title}
              onMouseEnter={playHover}
              onClick={() => sound.playClick()}
              className={`p-5 rounded-2xl border border-white/5 bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group ${hl.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-slate-900/60 rounded-xl border border-white/5">
                  {hl.icon}
                </div>
                <span className="text-[8px] font-mono text-slate-500 font-extrabold uppercase group-hover:text-pink-400 transition-colors">
                  {hl.stat}
                </span>
              </div>
              <h4 className="text-sm font-extrabold uppercase text-white tracking-tight mb-1 flex items-center justify-between">
                <span>{hl.title}</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-slate-400" />
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                {hl.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
