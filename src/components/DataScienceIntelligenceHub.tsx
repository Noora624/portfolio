import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Database, 
  Layers, 
  Brain, 
  Terminal, 
  Zap, 
  Sparkles, 
  LineChart, 
  GitBranch, 
  ArrowRight, 
  Play, 
  Maximize2, 
  FileCode, 
  Award, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  BookOpen, 
  Search, 
  BarChart4, 
  BarChart,
  Code
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { sound } from '../utils/sound';

interface Props {
  theme: 'light' | 'dark';
}

// ----------------------------------------------------
// Types & Structures
// ----------------------------------------------------

interface SkillNode {
  id: string;
  name: string;
  category: 'programming' | 'ds' | 'libraries' | 'tools';
  level: number;
  description: string;
  stats: string;
  projects: string[];
  x: number;
  y: number;
  z: number;
  vx?: number;
  vy?: number;
  vz?: number;
}

interface ProjectCard {
  id: string;
  title: string;
  tech: string[];
  dataset: string;
  insights: string[];
  outcomes: string;
  metrics: { label: string; val: string };
  difficulty: 'Advanced' | 'Intermediate';
}

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  category: 'education' | 'certification' | 'internship' | 'project' | 'future';
  subtitle: string;
  desc: string;
  metrics: string;
  tech: string[];
}

// Stats counter hook/helper inside rendering for Recruiter WOW Section
function AnimatedCounter({ value, duration = 1500, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing out quadratic
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [value, duration]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
}

export default function DataScienceIntelligenceHub({ theme }: Props) {
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  // Sound triggering handlers
  const handleHover = () => {
    sound.playHover();
  };

  const handleSoundClick = () => {
    sound.playClick();
  };

  // ----------------------------------------------------
  // States of Subsections
  // ----------------------------------------------------
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [activeTimelineStep, setActiveTimelineStep] = useState<string>('internship-1');
  const [activeProject, setActiveProject] = useState<string>('proj-diabetes');
  
  // SQL Terminal widget states
  const [sqlExecuted, setSqlExecuted] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [typedQuery, setTypedQuery] = useState<string>('');
  
  // ML Engine widget states
  const [epochNum, setEpochNum] = useState<number>(0);
  const [isMlRunning, setIsMlRunning] = useState<boolean>(false);
  const [mlLosses, setMlLosses] = useState<{ epoch: number; training_loss: number; val_loss: number }[]>([]);

  // 3D Skill Galaxy State
  const [skills, setSkills] = useState<SkillNode[]>([]);
  const rotationAngle = useRef({ x: 0.25, y: 0.25 });
  const mousePos = useRef({ x: 0, y: 0 });

  // 1. Initialise core 3D skills on spheres
  useEffect(() => {
    const skillsBlueprint: Omit<SkillNode, 'x' | 'y' | 'z'>[] = [
      // Programming
      { id: 'py', name: 'Python', category: 'programming', level: 95, description: 'Core framework computational language. Scaled OOP model engineering & custom aggregations.', stats: '95% Efficiency Index', projects: ['Hotel Booking Analytics', 'Diabetes Prediction', 'ML Toolbox'] },
      { id: 'sql', name: 'SQL', category: 'programming', level: 91, description: 'Advanced query structure, dense Window functions, grouping and indexing schemas.', stats: '100% Schema Autonomy', projects: ['Hotel Booking Analytics', 'Retail Sales Analysis'] },
      { id: 'java', name: 'Java (Basic)', category: 'programming', level: 65, description: 'Basic syntax constructs, data types, procedural loops, foundational OOP logic.', stats: 'Core algorithm coverage', projects: ['Academic Algorithms'] },
      
      // Data Science
      { id: 'ml', name: 'Machine Learning', category: 'ds', level: 88, description: 'Supervised tree modeling, Random forests classifiers, Hyperparameter grid-tuning.', stats: '94.7% Model Accuracy', projects: ['Diabetes Prediction', 'ML Toolbox'] },
      { id: 'da', name: 'Data Analysis', category: 'ds', level: 92, description: 'Profiling distributions, null-value imputations, diagnostic statistical hypothesis testing.', stats: '100% Analysis integrity', projects: ['Hotel Booking Analytics', 'Retail Sales Analysis'] },
      { id: 'dv', name: 'Data Visualization', category: 'ds', level: 90, description: 'Rendering insight trends, multi-axis statistical plotting and interactive UI parameters.', stats: 'Generates 50+ aesthetic charts', projects: ['Hotel Booking Analytics', 'Diabetes Prediction', 'Retail Sales Analysis'] },
      { id: 'eda', name: 'EDA', category: 'ds', level: 94, description: 'Exploratory structural analysis, covariance Heatmaps, parsing dense raw columns.', stats: 'Quick Outlier Detection', projects: ['Hotel Booking Analytics', 'Diabetes Prediction', 'Retail Sales Analysis'] },

      // Libraries
      { id: 'pd', name: 'Pandas', category: 'libraries', level: 93, description: 'Multi-dimensional dataframes, advanced vectorized slicing, merges, groupbys and pivots.', stats: 'Aggregates 1M rows/ms', projects: ['Hotel Booking Analytics', 'Diabetes Prediction', 'Retail Sales Analysis'] },
      { id: 'np', name: 'NumPy', category: 'libraries', level: 89, description: 'Array math matrices, linear algebra transformations, numerical scalar distributions.', stats: 'Optimal memory vectorization', projects: ['Diabetes Prediction', 'ML Toolbox'] },
      { id: 'sk', name: 'Scikit-Learn', category: 'libraries', level: 86, description: 'Stochastic classifiers, pipeline estimators, evaluation loss matrices.', stats: '20+ Models instantiated', projects: ['Diabetes Prediction', 'ML Toolbox'] },
      { id: 'cv', name: 'OpenCV', category: 'libraries', level: 78, description: 'Computer vision filtering, threshold scaling, image color contours.', stats: 'Image Matrix manipulation', projects: ['ML Toolbox'] },
      { id: 'plt', name: 'Matplotlib', category: 'libraries', level: 85, description: 'Plots, correlation matrix charts, styled subplots and statistical legends.', stats: '100+ Custom aesthetics', projects: ['Hotel Booking Analytics', 'Diabetes Prediction', 'Retail Sales Analysis'] },

      // Tools
      { id: 'jpt', name: 'Jupyter Notebook', category: 'tools', level: 94, description: 'Step-by-step interactive modeling, visual profiling blocks, document workflows.', stats: 'Main developer playground', projects: ['Hotel Booking Analytics', 'Diabetes Prediction', 'Retail Sales Analysis'] },
      { id: 'vsc', name: 'VS Code', category: 'tools', level: 90, description: 'Advanced script debugger, multi-terminal orchestration, profile extensions.', stats: 'High coding speed environment', projects: ['ML Toolbox'] },
      { id: 'sub', name: 'Supabase', category: 'tools', level: 80, description: 'Hosting schema records, dynamic cloud backend API, reliable PostgreSQL engines.', stats: 'Cloud relational host', projects: ['Unified Hub Portal'] },
    ];

    const radius = 140;
    const len = skillsBlueprint.length;
    
    // Spread skills on a golden ratio 3D sphere layout
    const formatted: SkillNode[] = skillsBlueprint.map((s, idx) => {
      const phi = Math.acos(1 - (2 * (idx + 0.5)) / len);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (idx + 0.5);

      return {
        ...s,
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi)
      };
    });

    setSkills(formatted);
    // Set first skill selected by default
    setSelectedSkill(formatted[0]);
  }, []);

  // 2. Loop rotation ticks
  useEffect(() => {
    let animFrame: number;

    const rotateSphere = () => {
      const sx = rotationAngle.current.x * (Math.PI / 180);
      const sy = rotationAngle.current.y * (Math.PI / 180);

      const cosX = Math.cos(sx);
      const sinX = Math.sin(sx);
      const cosY = Math.cos(sy);
      const sinY = Math.sin(sy);

      setSkills((prev) =>
        prev.map((s) => {
          // X-Rotation
          const y1 = s.y * cosX - s.z * sinX;
          const z1 = s.y * sinX + s.z * cosX;
          // Y-Rotation
          const x2 = s.x * cosY + z1 * sinY;
          const z2 = -s.x * sinY + z1 * cosY;

          return { ...s, x: x2, y: y1, z: z2 };
        })
      );

      // Slower friction back to dynamic auto rotation
      rotationAngle.current.x += (0.12 - rotationAngle.current.x) * 0.05;
      rotationAngle.current.y += (0.12 - rotationAngle.current.y) * 0.05;

      animFrame = requestAnimationFrame(rotateSphere);
    };

    animFrame = requestAnimationFrame(rotateSphere);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Handle skill-cloud sphere interactive drag mapping
  const handleCloudMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    // Convert drift displacement to slow rotation speed values
    rotationAngle.current.y = dx * 0.0035;
    rotationAngle.current.x = -dy * 0.0035;
  };

  const resetCloudSpeed = () => {
    rotationAngle.current = { x: 0.12, y: 0.12 };
  };

  // ----------------------------------------------------
  // Projects Static Data
  // ----------------------------------------------------
  const PROJECTS: ProjectCard[] = [
    {
      id: 'proj-hotel',
      title: 'Booking Demand Analytics',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
      dataset: '75,000 reservation profiles',
      insights: [
        'Discovered a correlation coefficient threshold of 0.76 between cancellation variables and Lead Time values.',
        'Identified ADR peaks during local leisure seasons, pointing out leakage segments.'
      ],
      outcomes: 'Optimized cancellation prediction parameters, delivering potential revenue safety options.',
      metrics: { label: 'ADR Accuracy Lift', val: '14.2%' },
      difficulty: 'Intermediate'
    },
    {
      id: 'proj-diabetes',
      title: 'Diabetes Risk Predictor',
      tech: ['Machine Learning', 'Scikit-Learn', 'NumPy', 'EDA'],
      dataset: 'Sourced clinical health records',
      insights: [
        'Recognized Glucose and BMI parameters as top feature importance factors (importance weight sum of 0.54).',
        'Built classification model with automated grid parameters optimization.'
      ],
      outcomes: 'Deployed local testing module targeting risk profiles accurately on validation data indices.',
      metrics: { label: 'Model Accuracy', val: '94.7%' },
      difficulty: 'Advanced'
    },
    {
      id: 'proj-retail',
      title: 'Retail Sales Insights Engine',
      tech: ['SQL', 'Data Analysis', 'Pandas', 'VS Code'],
      dataset: '1.2M transactions store table',
      insights: [
        'Configured detailed SQL window ranking functions to extract weekly seasonal clusters.',
        'Analyzed discount trends to evaluate real-time gross margins impact.'
      ],
      outcomes: 'Provided direct product association mapping, identifying slow-moving product trends.',
      metrics: { label: 'Data Latency Lift', val: '-40%' },
      difficulty: 'Intermediate'
    },
    {
      id: 'proj-toolbox',
      title: 'Machine Learning Toolbox',
      tech: ['Python', 'OpenCV', 'NumPy', 'Scikit-Learn'],
      dataset: 'Pixel arrays, numeric arrays',
      insights: [
        'Configured customized visual threshold loops alongside image contour overlays using OpenCV matrices.',
        'Compiled multiple mini-estimators into a single executable script framework.'
      ],
      outcomes: 'Offered an aggregate utility class, speeding up data science workflow prototyping cycles.',
      metrics: { label: 'Speed Improvement', val: '3x faster' },
      difficulty: 'Advanced'
    }
  ];

  // ----------------------------------------------------
  // Timeline Static Data
  // ----------------------------------------------------
  const TIMELINE_DATA: TimelineItem[] = [
    {
      id: 'edu-1',
      year: '2023 - 2027',
      title: 'B.Tech in Computer Science',
      category: 'education',
      subtitle: 'KR Mangalam University',
      desc: 'Solid engineering codebase. Core studies in analysis of algorithms, database schema designs structure, and object-oriented paradigms.',
      metrics: 'CGPA: 8.8 / 10',
      tech: ['OOP Core', 'DBMS Concepts', 'Data Structures']
    },
    {
      id: 'internship-1',
      year: 'June 2025 - Present',
      title: 'Data Analyst Internship',
      category: 'internship',
      subtitle: 'Innovative Tech Solutions',
      desc: 'Sourcing, query compilation, cleaning structure matrices, statistical analysis. Building interactive report structures utilizing pandas dashboards.',
      metrics: '5M+ records parsed',
      tech: ['Python', 'SQL Querying', 'Pandas', 'EDA Tools']
    },
    {
      id: 'cert-1',
      year: 'Aug 2025',
      title: 'Applied Machine Learning',
      category: 'certification',
      subtitle: 'Credential Certification',
      desc: 'Rigorous validation on predictive model classifications, regression loss metrics, feature weighting, and clustering classifiers.',
      metrics: '100% Core Mastery',
      tech: ['Scikit-Learn', 'Classifier Algorithms', 'Predictive Analysis']
    },
    {
      id: 'future-goals',
      year: 'Future Trajectory',
      title: 'AI & Data Architect Solutions',
      category: 'future',
      subtitle: 'Skill Expansion Goals',
      desc: 'Focusing on Generative AI pipelines, large neural networks backbones, vectors processing databases, and deploying standalone full-stack analytical portals.',
      metrics: 'Vector Integrations',
      tech: ['Gemini API', 'PyTorch', 'Vector Databases', 'Cloud Clusters']
    }
  ];

  // ----------------------------------------------------
  // Interactive Controls Handlers - SQL Console
  // ----------------------------------------------------
  const triggerSQLCompiler = () => {
    sound.playClick();
    setTerminalOutput(['Compiling retention_model_query.sql...', 'Initializing connection to local catalog index...', 'Executing CTE pipelines...']);
    setSqlExecuted(true);

    setTimeout(() => {
      setTerminalOutput((prev) => [
        ...prev,
        '>> Loaded 1,241,895 table entries successfully.',
        '>> Found peak user cluster on group 01 [VIP Tier].',
        '>> Avg segment LTV: $24,812.50 (VIP) vs $4,103.11 (Standard).',
        'STATUS_EXECUTION: 100% OK • Chronos timing: 4.8ms'
      ]);
    }, 850);
  };

  const resetSQLTerminal = () => {
    sound.playClick();
    setTerminalOutput([]);
    setSqlExecuted(false);
  };

  // ----------------------------------------------------
  // Interactive Controls Handlers - ML Training Engine
  // ----------------------------------------------------
  const triggerMLModelRun = () => {
    sound.playClick();
    if (isMlRunning) return;
    
    setIsMlRunning(true);
    setMlLosses([]);
    setEpochNum(0);

    const fullLogsLevel: { epoch: number; training_loss: number; val_loss: number }[] = [];
    let cycle = 1;

    const interval = setInterval(() => {
      if (cycle > 8) {
        clearInterval(interval);
        setIsMlRunning(false);
        return;
      }
      
      const tl = parseFloat((0.85 * Math.pow(0.68, cycle) + 0.05).toFixed(4));
      const vl = parseFloat((0.90 * Math.pow(0.72, cycle) + 0.11).toFixed(4));
      
      fullLogsLevel.push({
        epoch: cycle,
        training_loss: tl,
        val_loss: vl
      });

      setMlLosses([...fullLogsLevel]);
      setEpochNum(cycle);
      cycle++;
      sound.playHover();
    }, 380);
  };

  // ----------------------------------------------------
  // Visual Elements: Dynamic Neural Network background map (Brains)
  // ----------------------------------------------------
  const renderInteractiveNeuralBrainPath = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Dynamic Animated Pulse Paths */}
      <path 
        d="M 120,80 Q 220,130 380,100 T 640,150" 
        fill="none" 
        stroke={isDark ? "url(#node-glow)" : "rgba(139, 92, 246, 0.15)"} 
        strokeWidth="1.5" 
        strokeDasharray="8 6" 
        className="animate-pulse" 
      />
      <path 
        d="M 50,220 Q 250,150 480,280 T 800,200" 
        fill="none" 
        stroke={isDark ? "rgba(0, 229, 255, 0.15)" : "rgba(0, 229, 255, 0.12)"} 
        strokeWidth="1.5" 
      />

      {/* Floating pulsing nodes */}
      <circle cx="120" cy="80" r="4" fill="#8B5CF6" className="animate-ping" />
      <circle cx="380" cy="100" r="5" fill="#00E5FF" className="animate-pulse" />
      <circle cx="640" cy="150" r="3.5" fill="#EC4899" className="animate-ping" />
      <circle cx="250" cy="170" r="4.5" fill="#10B981" />
      <circle cx="480" cy="280" r="5" fill="#8B5CF6" className="animate-pulse" />
    </svg>
  );

  return (
    <section 
      id="data-science-intelligence-hub"
      className={`relative min-h-screen py-16 sm:py-24 overflow-hidden transition-colors duration-500 ${
        isDark 
          ? 'bg-[#020511] text-white' 
          : 'bg-slate-50 text-slate-900 border-t border-slate-200'
      }`}
    >
      {/* Cyberpunk HUD Grid Scan Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Outer Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none animate-glow-pulse" />
      <div className="absolute top-1/2 right-0 w-[420px] h-[420px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

      {renderInteractiveNeuralBrainPath()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* ==================================================== */}
        {/* SECTION HEADER */}
        {/* ==================================================== */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/5 pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-widest uppercase font-black ${
              isDark ? 'bg-purple-950/30 border-purple-500/30 text-purple-300' : 'bg-purple-100/50 border-purple-200 text-purple-800'
            }`}>
              <Zap size={11} className="animate-pulse text-[#00E5FF]" />
              <span>DATA_SCIENCE_OPERATING_SYSTEM :: ACTIVE</span>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl font-display font-black tracking-tight leading-tight uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Data Science <br />
              <span className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                Intelligence Hub
              </span>
            </h1>

            <p className={`text-sm sm:text-base font-sans leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Welcome to the analytical center of my mind. Interact with the 3D Skill Galaxy, trace active neural pathways of my technical stack, trigger local model training epochs, and examine business outcomes.
            </p>
          </div>

          {/* Quick HUD Metrics Display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            {[
              { val: 56, label: 'COMPILATIONS', color: 'text-purple-400' },
              { val: 94.7, suffix: '%', label: 'VAL ACCURACY', color: 'text-emerald-400' },
              { val: 4, label: 'LIVE PIPELINES', color: 'text-cyan-400' },
              { val: 120, suffix: 'K+', label: 'INSIGHT ROWS', color: 'text-pink-400' }
            ].map((hud, idx) => (
              <div 
                key={hud.label}
                className={`p-3.5 rounded-xl border font-mono select-none flex flex-col justify-between ${
                  isDark ? 'bg-black/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">{hud.label}</span>
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                </div>
                <div className={`text-lg sm:text-2xl font-black ${hud.color}`}>
                  <AnimatedCounter value={hud.val} suffix={hud.suffix} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================== */}
        {/* DYNAMIC TELEMETRY BOARD: 3D Galaxy + Selected Skill HUD */}
        {/* ==================================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-zinc-500 uppercase">
            <Layers size={12} className="text-[#00E5FF] animate-spin-slow" />
            <span>Telemetry Board :: 3D Galaxy Node Map Explorer</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Interactive 3D Skill Galaxy Canvas Box (7 Cols) */}
            <div 
              ref={containerRef}
              onMouseMove={handleCloudMouseMove}
              onMouseLeave={resetCloudSpeed}
              className={`lg:col-span-7 p-6 rounded-3xl border relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] overflow-hidden ${
                isDark 
                  ? 'bg-slate-950/40 border-white/5 shadow-2xl' 
                  : 'bg-white border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
              }`}
            >
              {/* Central star core engine glow */}
              <div className="absolute inset-28 rounded-full bg-gradient-to-tr from-[#00E5FF]/10 via-[#8B5CF6]/15 to-[#EC4899]/10 blur-3xl opacity-60 pointer-events-none animate-pulse" />
              
              {/* HUD labels */}
              <div className="absolute top-4 left-5 flex items-center gap-1.5 font-mono text-[9px] text-slate-500 uppercase select-none">
                <span className="w-2 h-2 rounded-full bg-blue-500/80 animate-ping" />
                <span>ACTIVE_3D_GALAXY_STATION :: SPHERE_ROTATION</span>
              </div>

              {/* Skills filter switches */}
              <div className="absolute top-4 right-5 flex flex-wrap gap-1">
                {['All', 'programming', 'ds', 'libraries', 'tools'].map((cat) => {
                  const isActive = activeCategoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      onMouseEnter={handleHover}
                      onClick={() => {
                        sound.playClick();
                        setActiveCategoryFilter(cat);
                        // Auto-select the first skill matching this category
                        if (cat === 'All') {
                          const pySkill = skills.find(s => s.id === 'py');
                          if (pySkill) {
                            setSelectedSkill(pySkill);
                          }
                        } else {
                          const matched = skills.find(s => s.category === cat);
                          if (matched) {
                            setSelectedSkill(matched);
                          }
                        }
                      }}
                      className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider border cursor-pointer transition-colors ${
                        isActive 
                          ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                          : isDark
                            ? 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {cat === 'All' ? 'All' : cat === 'programming' ? 'Programming' : cat === 'ds' ? 'Data Sci' : cat === 'libraries' ? 'Libraries' : 'Tools'}
                    </button>
                  );
                })}
              </div>

              {/* Tag node layout workspace */}
              <div className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center font-mono select-none">
                {skills.map((skill) => {
                  const isFilteredOut = activeCategoryFilter !== 'All' && skill.category !== activeCategoryFilter;
                  
                  // Math calculations for positioning perspective projection
                  const dFactor = 320;
                  const scale = dFactor / (dFactor - skill.z);
                  const opacity = Math.max(0.16, Math.min(1.0, (skill.z + 140) / 280));
                  const fSize = Math.max(9.5, Math.min(17.5, 12 * scale));

                  const isSelected = selectedSkill?.id === skill.id;

                  const colorStyles = () => {
                    if (skill.category === 'programming') return isDark ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' : 'text-amber-700 border-amber-200 bg-amber-50';
                    if (skill.category === 'ds') return isDark ? 'text-purple-400 border-purple-500/20 bg-purple-500/5' : 'text-purple-700 border-purple-200 bg-purple-50';
                    if (skill.category === 'libraries') return isDark ? 'text-pink-400 border-pink-500/20 bg-pink-500/5' : 'text-pink-700 border-pink-200 bg-pink-50';
                    return isDark ? 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5' : 'text-cyan-700 border-cyan-200 bg-cyan-50';
                  };

                  return (
                    <motion.div
                      key={skill.id}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${skill.x}px)`,
                        top: `calc(50% + ${skill.y}px)`,
                        transform: 'translate(-50%, -50%)',
                        fontSize: `${fSize}px`,
                        opacity: isFilteredOut ? 0 : opacity,
                        zIndex: Math.round((skill.z + 200) * 10),
                        pointerEvents: isFilteredOut ? 'none' : 'auto',
                        visibility: isFilteredOut ? 'hidden' : 'visible'
                      }}
                      className="transition-all duration-300"
                    >
                      <button
                        onMouseEnter={() => handleHover()}
                        onClick={() => {
                          sound.playClick();
                          setSelectedSkill(skill);
                        }}
                        className={`px-3 py-1 rounded-xl border font-mono tracking-wide transition-all outline-none cursor-pointer flex items-center gap-1.5 ${
                          isSelected 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-300 text-white scale-110 shadow-[0_0_20px_rgba(139,92,246,0.6)]'
                            : colorStyles()
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                        <span>{skill.name}</span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom prompt instructions */}
              <div className="absolute bottom-4 flex items-center gap-2 font-mono text-[9px] text-slate-500 uppercase select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Spin-Sphere dynamic: Hover dragging maps planetary gravity</span>
              </div>
            </div>

            {/* Selected Skill Diagnostics Terminal Hud (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {selectedSkill ? (
                  <motion.div
                    key={selectedSkill?.id}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.25 }}
                    className={`p-6 rounded-3xl border flex flex-col justify-between h-full relative overflow-hidden ${
                      isDark 
                        ? 'bg-slate-950/40 border-white/5' 
                        : 'bg-white border-slate-200 shadow-[0_4px_30px_rgba(0,0,0,0.015)]'
                    }`}
                  >
                    {/* Diagnostic laser line decoration */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent z-10" />

                    <div className="space-y-5">
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full border uppercase ${
                            selectedSkill.category === 'programming' ? 'bg-amber-400/10 text-amber-500 border-amber-400/20' :
                            selectedSkill.category === 'ds' ? 'bg-purple-400/10 text-purple-405 border-purple-400/20' :
                            selectedSkill.category === 'libraries' ? 'bg-pink-400/10 text-pink-405 border-pink-400/20' :
                            'bg-cyan-400/10 text-cyan-405 border-cyan-400/20'
                          }`}>
                            {selectedSkill.category}
                          </span>
                          <h2 className={`text-2xl font-mono font-black ${isDark ? 'text-white' : 'text-slate-850'}`}>
                            {selectedSkill.name}
                          </h2>
                        </div>
                        <Activity size={18} className="text-[#8B5CF6] animate-pulse" />
                      </div>

                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-slate-500 uppercase">Engine Strength</span>
                            <span className="text-purple-400 font-bold">{selectedSkill.level}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${selectedSkill.level}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className="h-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]"
                            />
                          </div>
                        </div>

                        <div className={`p-4 rounded-2xl ${isDark ? 'bg-black/30 border border-white/5' : 'bg-slate-50 border border-slate-200'}`}>
                          <span className="text-[8px] font-mono text-slate-500 uppercase block mb-1">Functional Description</span>
                          <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>
                            {selectedSkill.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3.5 pt-1">
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 uppercase block mb-1">Ecosystem Statistics</span>
                          <div className="flex items-center gap-2 text-xs font-mono font-semibold">
                            <Award size={14} className="text-[#EC4899]" />
                            <span className={isDark ? 'text-zinc-200' : 'text-slate-705'}>{selectedSkill.stats}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[8px] font-mono text-slate-500 uppercase block mb-1.5">Primary Implementations</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedSkill.projects.map((p) => (
                              <span 
                                key={p}
                                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                  isDark ? 'bg-white/5 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-250 text-slate-655'
                                }`}
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span>STABLE LOGIC UNIT: OK</span>
                      <span>SEC_LEVEL :: 02</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-full p-8 border border-white/5 rounded-3xl bg-black/10">
                    <span className="font-mono text-xs text-slate-600">Select a planetary skill node to examine diagnostics</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* ==================================================== */}
        {/* COMPREHENSIVE FLOATING ANALYTICS WIDGET BOARD */}
        {/* ==================================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-zinc-500 uppercase">
            <Layers size={12} className="text-[#EC4899] animate-bounce" />
            <span>Interactive Laboratory Widgets :: Diagnostic Controls</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 1. Python Expertise Meter & Machine learning Loss Graph Combined Card (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Python Expertise Meter Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className={`p-5 rounded-3xl border relative overflow-hidden flex flex-col justify-between ${
                  isDark ? 'bg-slate-950/45 border-white/5 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono text-amber-505 font-bold uppercase tracking-wider block">TELEMETRY_ENGINE_01</span>
                      <h4 className={`text-sm font-mono font-black uppercase ${isDark ? 'text-white' : 'text-slate-800'}`}>Python Core Stack</h4>
                    </div>
                    <span className="p-1 px-1.5 rounded bg-amber-500/10 text-amber-500 text-[8px] font-mono">ACTIVE_COMPILER</span>
                  </div>

                  <p className={`text-[11px] leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Advanced vectorization structures, exploratory array merging, multidimensional mathematical arrays and diagnostic visualization profiling.
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { label: 'Pandas merging/vectorization', rate: 93, color: 'bg-emerald-500' },
                    { label: 'NumPy scalar mapping matrices', rate: 89, color: 'bg-[#00E5FF]' },
                    { label: 'Scikit-Learn estimator fitting', rate: 86, color: 'bg-[#8B5CF6]' },
                    { label: 'Analytical charting aesthetics', rate: 85, color: 'bg-[#EC4899]' }
                  ].map((pythonSub) => (
                    <div key={pythonSub.label} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span>{pythonSub.label}</span>
                        <span className="font-bold text-slate-350">{pythonSub.rate}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                        <div className={`h-full ${pythonSub.color}`} style={{ width: `${pythonSub.rate}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Machine Learning Model Train Simulator */}
              <motion.div 
                whileHover={{ y: -5 }}
                className={`p-5 rounded-3xl border relative flex flex-col justify-between overflow-hidden ${
                  isDark ? 'bg-slate-950/45 border-white/5 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono text-purple-400 font-bold block uppercase">MODEL_PROCESSOR_02</span>
                      <h4 className={`text-sm font-mono font-black uppercase ${isDark ? 'text-white' : 'text-slate-800'}`}>Machine Learning Engine</h4>
                    </div>
                    <button
                      onClick={triggerMLModelRun}
                      disabled={isMlRunning}
                      className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 cursor-pointer transition-all ${
                        isMlRunning 
                          ? 'bg-purple-950/20 text-purple-600 border border-purple-500/10 cursor-not-allowed'
                          : 'bg-purple-600 border border-purple-400 hover:bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      }`}
                    >
                      <Play size={10} className={isMlRunning ? 'animate-spin' : ''} />
                      <span>{isMlRunning ? 'Fitting...' : 'Fit Model'}</span>
                    </button>
                  </div>

                  <p className={`text-[10px] leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-550'}`}>
                    Instant training simulation compiling a Random Forest Classifier on sourced database rows. Run fit to trace test loss convergence curves below:
                  </p>
                </div>

                <div className="h-28 mt-2 w-full select-none">
                  {mlLosses.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mlLosses}>
                        <defs>
                          <linearGradient id="trainGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="epoch" tick={{ fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 8 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="training_loss" stroke="#8B5CF6" fillOpacity={1} fill="url(#trainGrad)" strokeWidth={2} name="Train Loss" />
                        <Area type="monotone" dataKey="val_loss" stroke="#EC4899" fillOpacity={1} fill="url(#valGrad)" strokeWidth={2} name="Val Loss" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full rounded-xl bg-black/20 flex flex-col items-center justify-center p-3 text-center border border-white/5">
                      <span className="text-[10px] font-mono text-purple-450 uppercase animate-pulse">Waiting for model fit trigger...</span>
                      <span className="text-[8px] text-zinc-500 font-sans mt-0.5">Click "Fit Model" above to start stochastic backpropagation epochs</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 mt-2 select-none">
                  <span>EPOCH: <span className="text-white font-bold">{epochNum} / 8</span></span>
                  <span>ACCURACY: <span className="text-[#00E5FF] font-bold">{epochNum > 0 ? (90.2 + epochNum * 0.56).toFixed(1) : '0'}%</span></span>
                </div>
              </motion.div>

            </div>

            {/* 2. Advanced SQL Query Engine Terminal Panel (5 Cols) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className={`lg:col-span-5 p-5 rounded-3xl border flex flex-col justify-between overflow-hidden relative ${
                isDark ? 'bg-slate-950 border-white/5' : 'bg-slate-900 border-slate-800 text-slate-200'
              }`}
            >
              <div>
                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono border-b dark:border-white/5 border-slate-800 pb-2.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <span className="w-2 h-2 rounded-full bg-green-500/80" />
                    </div>
                    <Terminal size={12} className="text-cyan-400 animate-pulse" />
                    <span className="font-bold tracking-tight">retention_segment.sql</span>
                  </div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={triggerSQLCompiler}
                      className="px-2 py-0.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[8px] font-mono cursor-pointer transition-colors"
                    >
                      Run CTE
                    </button>
                    {sqlExecuted && (
                      <button
                        onClick={resetSQLTerminal}
                        className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[8px] font-mono cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Live typing viewport */}
                <pre className="font-mono text-[10px] leading-relaxed overflow-x-auto whitespace-pre p-2.5 rounded bg-black/30 text-emerald-400/90 select-none">
                  <code>
                    <span className="text-slate-500 block">-- Slicing aggregate VIP metrics recursively</span>
                    <span className="text-[#FF79C6]">WITH</span> <span className="text-[#50FA7B]">customer_performance</span> <span className="text-[#FF79C6]">AS</span> (<br />
                    &nbsp;&nbsp;<span className="text-[#8BE9FD]">SELECT</span> client_id, <span className="text-[#FF79C6]">COUNT</span>(order_id) <span className="text-[#FF79C6]">AS</span> txn_orders,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF79C6]">SUM</span>(revenue) <span className="text-[#FF79C6]">AS</span> ltv_spent<br />
                    &nbsp;&nbsp;<span className="text-[#8BE9FD]">FROM</span> store_transactions<br />
                    &nbsp;&nbsp;<span className="text-[#8BE9FD]">GROUP BY</span> client_id<br />
                    )<br />
                    <span className="text-[#8BE9FD]">SELECT</span> avg(ltv_spent) <span className="text-[#FF79C6]">FROM</span> customer_performance;
                  </code>
                </pre>
              </div>

              {/* Console log outputs terminal panel */}
              <div className="space-y-1 my-3 bg-black/50 p-3 rounded-xl border dark:border-white/5 border-slate-800 min-h-[100px] flex flex-col justify-end">
                {terminalOutput.length > 0 ? (
                  terminalOutput.map((trace, i) => (
                    <div key={i} className="font-mono text-[9.5px] leading-tight text-slate-300">
                      {trace}
                    </div>
                  ))
                ) : (
                  <div className="text-center font-mono text-[9px] text-slate-600 italic">
                    Press "Run CTE" compiler button top right to evaluate relational query.
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500">
                <span>STATUS: {sqlExecuted ? <span className="text-emerald-400">SUCCESS</span> : 'IDLE'}</span>
                <span>CATALOG: <span className="text-white">kr_database_index_v2</span></span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ==================================================== */}
        {/* INTERACTIVE PROJECTS IMPACT DASHBOARD */}
        {/* ==================================================== */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase">
              <Layers size={12} className="text-[#00E5FF] animate-spin-slow" />
              <span>Project Outcomes :: Live Diagnostic Metrics Index</span>
            </div>

            <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              4 PORTFOLIOS MOUNTED
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Project List Selector Columns (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              {PROJECTS.map((proj) => {
                const isActive = activeProject === proj.id;
                return (
                  <motion.div
                    key={proj.id}
                    onMouseEnter={() => handleHover()}
                    onClick={() => {
                      sound.playClick();
                      setActiveProject(proj.id);
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                      isActive 
                        ? 'bg-[#8B5CF6]/5 border-[#8B5CF6]/45 shadow-[0_0_20px_rgba(139,92,246,0.12)]'
                        : isDark
                          ? 'bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-900/40'
                          : 'bg-white border-slate-205 hover:bg-slate-100/50 shadow-sm'
                    }`}
                  >
                    <div className="space-y-1.5 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-mono border uppercase px-1.5 py-0.5 rounded ${
                          proj.difficulty === 'Advanced' 
                            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                          {proj.difficulty}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{proj.dataset}</span>
                      </div>
                      <h4 className={`text-md font-mono font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-805'}`}>
                        {proj.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-zinc-500 block uppercase">{proj.metrics.label}</span>
                        <span className="text-xs font-mono font-extrabold text-[#00E5FF]">{proj.metrics.val}</span>
                      </div>
                      <ArrowRight size={14} className={isActive ? 'text-[#8B5CF6] translate-x-1 transition-transform' : 'text-slate-500'} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Selected Active Project Dashboard Display (7 Cols) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {PROJECTS.filter((p) => p.id === activeProject).map((proj) => (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.98, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -15 }}
                    className={`p-6 rounded-3xl border h-full flex flex-col justify-between relative overflow-hidden ${
                      isDark 
                        ? 'bg-slate-950/45 border-white/5 shadow-2xl' 
                        : 'bg-white border-slate-200 shadow-[0_4px_30px_rgba(0,0,0,0.015)]'
                    }`}
                  >
                    {/* Corner accent glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="space-y-6">
                      <div className="flex justify-between items-start pb-4 border-b border-white/5">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Primary Analytical Architecture</span>
                          <h3 className={`text-xl font-mono font-black uppercase ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            {proj.title}
                          </h3>
                        </div>

                        <div className="text-right">
                          <span className="text-[8px] font-mono text-slate-500 block uppercase">DATASET VOLUME</span>
                          <span className="text-xs font-mono text-emerald-400 font-bold">{proj.dataset}</span>
                        </div>
                      </div>

                      {/* Diagnostic insights columns */}
                      <div className="space-y-3">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">Strategic Exploratory Insights Uncovered</span>
                        <div className="space-y-2">
                          {proj.insights.map((ins, idx) => (
                            <div 
                              key={idx}
                              className={`p-3 rounded-xl flex gap-2.5 items-start ${
                                isDark ? 'bg-black/35 border border-white/5' : 'bg-slate-50 border border-slate-200'
                              }`}
                            >
                              <span className="text-xs shrink-0 mt-0.5">📌</span>
                              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-655'}`}>
                                {ins}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Outcome metric board */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase block">Business & Engineering Outcome</span>
                        <div className={`p-4 rounded-xl border ${
                          isDark ? 'bg-gradient-to-r from-purple-950/20 to-black/30 border-purple-500/15' : 'bg-purple-50/50 border-purple-200'
                        }`}>
                          <p className={`text-xs font-sans leading-relaxed font-medium ${isDark ? 'text-purple-200' : 'text-purple-900'}`}>
                            {proj.outcomes}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Integrated technology tags */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-6 justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((t) => (
                          <span 
                            key={t}
                            className={`text-[10px] font-mono px-2.5 py-1 rounded-md ${
                              isDark ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' : 'bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-slate-500 uppercase">{proj.metrics.label}</span>
                        <span className="text-sm font-mono font-extrabold text-[#EC4899] bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                          {proj.metrics.val}
                        </span>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* ==================================================== */}
        {/* COMPACT DETAILED EXPERT CAREER ROADMAP (Horizontal TIMELINE) */}
        {/* ==================================================== */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase">
              <Layers size={12} className="text-[#8B5CF6] animate-bounce" />
              <span>Career Trajectory Network :: Pipeline Mapping</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500">
              Interactive Horizontal Steps
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Timeline Stepper (5 Cols) */}
            <div 
              className={`lg:col-span-5 p-5 rounded-3xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-950/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Active Pipeline Nodes</span>
                  <h3 className={`text-md font-mono font-bold uppercase tracking-wide ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                    AI Career Roadmap Steps
                  </h3>
                </div>

                <div className="space-y-2">
                  {TIMELINE_DATA.map((item, idx) => {
                    const isActive = activeTimelineStep === item.id;
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => handleHover()}
                        onClick={() => {
                          sound.playClick();
                          setActiveTimelineStep(item.id);
                        }}
                        className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                          isActive
                            ? 'bg-purple-600/10 border-purple-500/40 shadow-sm'
                            : isDark
                              ? 'bg-slate-900/10 border-white/5 hover:border-white/10 hover:bg-slate-900/30'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="space-y-1 pr-2">
                          <span className="text-[9px] font-mono text-purple-400 block tracking-wider uppercase font-semibold">
                            {item.year}
                          </span>
                          <span className={`text-sm font-sans font-extrabold ${isDark ? 'text-white' : 'text-slate-805'}`}>
                            {item.title}
                          </span>
                        </div>

                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase capitalize ${
                          item.category === 'education' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                          item.category === 'internship' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                          item.category === 'certification' ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' :
                          'bg-amber-500/10 border-amber-500/20 text-amber-500'
                        }`}>
                          {item.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="font-mono text-[9px] text-slate-500 border-t border-white/5 pt-4 mt-6">
                ORCHESTRATING PIPELINE STATUS: ACTIVE
              </div>
            </div>

            {/* Step Diagnostic Viewboard (7 Cols) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {TIMELINE_DATA.filter((i) => i.id === activeTimelineStep).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.98, x: 25 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98, x: -25 }}
                    transition={{ duration: 0.25 }}
                    className={`p-6 rounded-3xl border h-full flex flex-col justify-between relative overflow-hidden ${
                      isDark 
                        ? 'bg-slate-950/45 border-white/5 shadow-2xl' 
                        : 'bg-white border-slate-205 shadow-[0_4px_30px_rgba(0,0,0,0.015)]'
                    }`}
                  >
                    {/* Laser aesthetic line */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#EC4899]/40 to-transparent" />

                    <div className="space-y-6">
                      <div className="flex justify-between items-start pb-4 border-b border-white/5">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-purple-400 font-bold block uppercase">{item.year}</span>
                          <h3 className={`text-xl font-mono font-black uppercase ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            {item.title}
                          </h3>
                          <span className={`text-xs font-sans font-medium ${isDark ? 'text-slate-400' : 'text-[#8B5CF6]'}`}>
                            {item.subtitle}
                          </span>
                        </div>

                        <span className={`text-[10px] font-mono px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[#00E5FF] font-bold`}>
                          {item.metrics}
                        </span>
                      </div>

                      <p className={`text-sm leading-relaxed font-sans ${isDark ? 'text-slate-305' : 'text-slate-655'}`}>
                        {item.desc}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block">Mounted Ecosystem Competencies</span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tech.map((t) => (
                            <span 
                              key={t}
                              className={`text-[10px] font-mono px-3 py-1 rounded-lg ${
                                isDark ? 'bg-white/5 border border-white/5 text-slate-400' : 'bg-slate-100 border border-slate-200 text-slate-700 font-bold'
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono select-none">
                      <span>PIPELINE VERIFICATION: GREEN STATUS</span>
                      <span>SEC_CLASS :: CORE</span>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* ==================================================== */}
        {/* RECRUITER WOW CONSOLE */}
        {/* ==================================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-zinc-500 uppercase">
            <Layers size={12} className="text-[#00E5FF] animate-spin-slow" />
            <span>Telemetry Counter :: Wow metrics logs compiled</span>
          </div>

          <div className={`p-8 rounded-3xl border relative overflow-hidden text-center lg:text-left ${
            isDark 
              ? 'bg-gradient-to-br from-slate-950 via-[#030612] to-[#020511] border-white/5' 
              : 'bg-white border-slate-200 shadow-[0_4px_30px_rgba(0,0,0,0.01)]'
          }`}>
            {/* Ambient scanning light */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-pulse" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4 space-y-2.5">
                <span className="text-[10px] font-mono text-[#00E5FF] font-black uppercase tracking-widest block">RECRUITER DECK</span>
                <h3 className={`text-2xl sm:text-3xl font-display font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-850'}`}>
                  Strategic Impact metrics
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-405' : 'text-slate-600'}`}>
                  Instantly evaluated statistical telemetry logs. Real values compiled across clinical predictions, intern pipelines, and diagnostic analysis.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { count: 5000000, suffix: '+', label: 'Structured Rows Processed', desc: 'Hotel booking cancellation indices parsed recursively.', color: 'text-purple-400' },
                  { count: 4, suffix: ' Core', label: 'Advanced Projects Fitted', desc: 'Sourced models deployed across statistical matrices.', color: 'text-cyan-400' },
                  { count: 15, suffix: '+ Modules', label: 'Ecosystem Tech Mastered', desc: 'Integrated Python, Pandas dataframes and compiler rules.', color: 'text-pink-400' },
                  { count: 50, suffix: '+ Charts', label: 'Analytical Visuals Created', desc: 'Matplotlib coordinate graphs generated successfully.', color: 'text-amber-500' }
                ].map((item, idx) => (
                  <div key={item.label} className="space-y-1.5 text-center lg:text-left">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-wider">{item.label}</span>
                    <div className={`text-2xl sm:text-3xl font-black ${item.color}`}>
                      <AnimatedCounter value={item.count} suffix={item.suffix} />
                    </div>
                    <span className={`text-[10px] leading-relaxed hidden md:block ${isDark ? 'text-slate-500' : 'text-slate-550'}`}>{item.desc}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
