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
  ArrowUpRight,
  Code2,
  Layers,
  Globe,
  MonitorSmartphone,
  Workflow
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
  const [activeTrack, setActiveTrack] = useState<'data-analytics' | 'full-stack'>('data-analytics');
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

  const handleTrackChange = (track: 'data-analytics' | 'full-stack') => {
    sound.playClick();
    setActiveTrack(track);
    if (track === 'data-analytics') {
      setActiveNode('internship');
    } else {
      setActiveNode('web-projects');
    }
  };

  const playHover = () => {
    sound.playHover();
  };

  // Dual Career Roadmap Nodes
  const dataAnalyticsNodes: EvolutionNode[] = [
    {
      id: 'student-data',
      role: 'B.Tech CSE Data Science Student',
      company: 'K.R. Mangalam University',
      duration: '2023 - Present',
      location: 'Delhi NCR, India',
      badge: 'ACADEMIC IGNITION',
      summary: 'Establishing mathematical and computational foundation in Computer Science with a specialization in Data Science constructs, statistical modeling, database systems, and OOP paradigms.',
      icon: <GraduationCap className="text-[#00E5FF]" size={20} />,
      accent: 'from-[#00E5FF] to-[#00B0FF]',
      glow: 'rgba(0, 229, 255, 0.2)',
      skills: ['Python', 'SQL & Queries', 'Data Structures', 'Statistical Foundations', 'Matrix Algebra'],
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
      id: 'scholar-data',
      role: 'Data Science & Analytics Scholar',
      company: 'Academic Projects & Laboratory Research',
      duration: '2024 - 2025',
      location: 'Research Workspace',
      badge: 'CORE COMPLIANCE',
      summary: 'Built statistical workflows, engineering tabular transformations, performing null matrix counts, and launching exploratory analytics plots and machine learning classifiers via Python.',
      icon: <Cpu className="text-[#8B5CF6]" size={20} />,
      accent: 'from-[#8B5CF6] to-[#6366F1]',
      glow: 'rgba(139, 92, 246, 0.2)',
      skills: ['Pandas', 'NumPy', 'Scikit-Learn', 'Exploratory Data Analysis', 'Predictive Modeling'],
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
      summary: 'Drove operational data engineering and strategic analysis. Integrated legacy commercial tracking spreadsheets into modern database schemas, crafted high-contrast reporting dashboards, and ran statistical assessments to optimize commercial equipment analytics.',
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
      id: 'future-data',
      role: 'Future Data Analyst / AI Specialist',
      company: 'Enterprise Data & Analytics Roles',
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

  const fullStackNodes: EvolutionNode[] = [
    {
      id: 'student-dev',
      role: 'B.Tech CSE Student (CS Foundations)',
      company: 'K.R. Mangalam University',
      duration: '2023 - Present',
      location: 'Delhi NCR, India',
      badge: 'ACADEMIC IGNITION',
      summary: 'Acquiring robust computer science fundamentals including Data Structures & Algorithms, Object-Oriented Programming, relational databases, web standards (HTML5/CSS3/JavaScript), and modular software engineering principles.',
      icon: <GraduationCap className="text-[#00E5FF]" size={20} />,
      accent: 'from-[#00E5FF] to-[#00B0FF]',
      glow: 'rgba(0, 229, 255, 0.2)',
      skills: ['JavaScript ES6+', 'HTML5 / CSS3', 'Data Structures', 'OOP Paradigms', 'Git & GitHub'],
      outcomes: [
        'Built foundational computational projects with clean algorithmic structure and modular code separation.',
        'Adopted Git version control workflows for repository management and versioned project iterations.'
      ],
      careerPhase: 'CS Foundations',
      growthMetrics: [
        { label: 'CS Fundamentals', value: '95%' },
        { label: 'Algorithm Score', value: '92%' }
      ]
    },
    {
      id: 'web-projects',
      role: 'Front-End / React Project Developer',
      company: 'Academic & Practical Projects',
      duration: '2024 - 2025',
      location: 'Interactive Web Lab',
      badge: 'PRACTICAL MILESTONE',
      summary: 'Architected responsive, component-driven web applications including FoamXpress (Car & Bike Wash platform with dynamic vehicle selection and booking flows) and SmileSync (Smart Dental Clinic management interface).',
      icon: <Code2 className="text-[#00E5FF]" size={20} />,
      accent: 'from-[#00E5FF] to-[#3B82F6]',
      glow: 'rgba(0, 229, 255, 0.2)',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'State Management', 'Component Architecture'],
      outcomes: [
        'Engineered dynamic booking interfaces with multi-tier pricing calculation and real-time form validation.',
        'Implemented modular, reusable React component systems with strict TypeScript type safety and accessible responsive layouts.'
      ],
      careerPhase: 'Applied Web Engineering',
      growthMetrics: [
        { label: 'Projects Shipped', value: '2 Major' },
        { label: 'Type Safety Rate', value: '100%' }
      ]
    },
    {
      id: 'fullstack-learning',
      role: 'Full-Stack Foundations Scholar',
      company: 'Self-Directed & Applied Engineering',
      duration: '2025 - Present',
      location: 'Software Engineering Track',
      badge: 'CONTINUOUS EVOLUTION',
      summary: 'Expanding from frontend mastery into backend service architectures, studying RESTful API design, Node.js and Express servers, database connectivity (PostgreSQL / MongoDB), and scalable application structure.',
      icon: <Layers className="text-[#8B5CF6]" size={20} />,
      accent: 'from-[#8B5CF6] to-[#EC4899]',
      glow: 'rgba(139, 92, 246, 0.2)',
      skills: ['RESTful API Concepts', 'Node.js Basics', 'Express.js Fundamentals', 'Database Integration', 'Full-Stack Workflow'],
      outcomes: [
        'Deepening understanding of asynchronous client-server communication, JSON contracts, and endpoint architectures.',
        'Synthesizing full-stack design patterns to connect intuitive UI frontends with robust database services.'
      ],
      careerPhase: 'Full-Stack Scaling',
      growthMetrics: [
        { label: 'API Architecture', value: 'Active' },
        { label: 'Backend Learning', value: 'In-Progress' }
      ]
    },
    {
      id: 'future-dev',
      role: 'Future Full-Stack / Software Developer',
      company: 'Software Engineering Roles',
      duration: 'Upcoming 2026',
      location: 'Industry Ingress',
      badge: 'GROWTH CATALYST',
      summary: 'Preparing to contribute as an agile Full-Stack or Front-End Software Developer, building high-performance web applications, collaborating in cross-functional product sprints, and delivering clean, maintainable code.',
      icon: <Award className="text-[#10B981]" size={20} />,
      accent: 'from-[#10B981] to-[#059669]',
      glow: 'rgba(16, 185, 129, 0.2)',
      skills: ['Full-Stack Systems', 'Cloud Deployment', 'Agile Collaboration', 'CI/CD Pipelines', 'Clean Architecture'],
      outcomes: [
        'Targeting entry-level developer and software engineering positions to build customer-facing digital products.',
        'Committed to writing scalable, maintainable TypeScript & React code backed by clean server architectures.'
      ],
      careerPhase: 'Professional Standard',
      growthMetrics: [
        { label: 'Production Readiness', value: '100%' },
        { label: 'Collaboration Factor', value: 'High' }
      ]
    }
  ];

  const currentJourneyNodes = activeTrack === 'data-analytics' ? dataAnalyticsNodes : fullStackNodes;
  const activeNodeData = currentJourneyNodes.find(node => node.id === activeNode) || currentJourneyNodes[0];

  // Professional Highlights Cards reflecting both Data and Web capabilities
  const professionalHighlights = [
    {
      title: "Data Analytics & SQL",
      stat: "Cleanse & Model",
      desc: "Architecting structural data workflows to clean data, extract KPIs, execute complex SQL aggregates, and formulate actionable decision insights.",
      color: "from-cyan-500/10 to-blue-500/5 hover:border-cyan-500/30",
      icon: <Database size={16} className="text-cyan-400" />
    },
    {
      title: "Front-End & React",
      stat: "Component Design",
      desc: "Building clean, interactive user interfaces using React, TypeScript, and Tailwind CSS with robust state handling (FoamXpress, SmileSync).",
      color: "from-blue-500/10 to-indigo-500/5 hover:border-blue-500/30",
      icon: <Code2 size={16} className="text-blue-400" />
    },
    {
      title: "Machine Learning",
      stat: "Predictive Models",
      desc: "Developing supervised machine learning models, training classifiers with Scikit-Learn, and optimizing feature engineering pipelines.",
      color: "from-purple-500/10 to-indigo-500/5 hover:border-purple-500/30",
      icon: <Brain size={16} className="text-purple-400" />
    },
    {
      title: "Full-Stack Roadmap",
      stat: "API & Server Foundations",
      desc: "Expanding into full-stack development with RESTful APIs, Node.js/Express basics, database schemas, and seamless UI-to-service integration.",
      color: "from-pink-500/10 to-rose-500/5 hover:border-rose-500/30",
      icon: <Layers size={16} className="text-pink-400" />
    },
    {
      title: "Data Visualization & BI",
      stat: "Tableau & Power BI",
      desc: "Synthesizing complex data into high-contrast executive dashboards, exploratory charts, and interactive metric reports.",
      color: "from-amber-500/10 to-orange-500/5 hover:border-orange-500/30",
      icon: <LineChart size={16} className="text-amber-400" />
    },
    {
      title: "Agile & Teamwork",
      stat: "Cohesive Delivery",
      desc: "Proven commercial exposure at Tricon Equipment India; bridging communication between technical engineering and operational teams.",
      color: "from-emerald-500/10 to-teal-500/5 hover:border-emerald-500/30",
      icon: <Users size={16} className="text-emerald-400" />
    }
  ];

  return (
    <section 
      id="experience-journey-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="mt-20 lg:mt-32 w-full space-y-12 relative z-20 scroll-mt-24 overflow-hidden"
    >
      {/* Dynamic Glow Spotlight reacting to mouse */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-300 opacity-[0.06] blur-[100px] mix-blend-screen"
        style={{
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
          background: `radial-gradient(circle, ${activeTrack === 'data-analytics' ? '#00E5FF' : '#8B5CF6'} 0%, transparent 70%)`
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

      {/* Title & Dual Career Roadmap Switcher */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className={`text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Career <span className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">Roadmap</span>
        </h2>
        <p className={`text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Exploring dual career pathways: applying data analytical rigor and building modern full-stack web applications.
        </p>

        {/* DUAL TRACK SWITCHER BUTTONS */}
        <div className="inline-flex p-1.5 rounded-2xl border backdrop-blur-md gap-2 mt-2 bg-slate-950/40 border-white/10 shadow-lg">
          <button
            id="track-data-analytics-btn"
            onClick={() => handleTrackChange('data-analytics')}
            onMouseEnter={playHover}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTrack === 'data-analytics'
                ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#8B5CF6]/20 border border-[#00E5FF]/50 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <BarChart3 size={14} className={activeTrack === 'data-analytics' ? 'text-[#00E5FF]' : 'text-slate-400'} />
            <span>Data Analytics & Science Track</span>
          </button>

          <button
            id="track-full-stack-btn"
            onClick={() => handleTrackChange('full-stack')}
            onMouseEnter={playHover}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTrack === 'full-stack'
                ? 'bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 border border-[#EC4899]/50 text-[#EC4899] shadow-[0_0_15px_rgba(236,72,153,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Code2 size={14} className={activeTrack === 'full-stack' ? 'text-[#EC4899]' : 'text-slate-400'} />
            <span>Full-Stack Development Track</span>
          </button>
        </div>
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
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full pointer-events-none ${
              activeTrack === 'data-analytics' ? 'bg-cyan-500/10' : 'bg-pink-500/10'
            }`} />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono tracking-widest uppercase block font-bold ${
                  activeTrack === 'data-analytics' ? 'text-[#00E5FF]' : 'text-[#EC4899]'
                }`}>
                  {activeTrack === 'data-analytics' ? 'DATA ANALYTICS STAGES' : 'FULL-STACK DEV STAGES'}
                </span>
                <span className="text-[8px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded uppercase">
                  {activeTrack.toUpperCase()}
                </span>
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
                {currentJourneyNodes.map((node, index) => {
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
                            scale: isActive ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            isActive 
                              ? 'bg-white border-transparent text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.6)]' 
                              : 'bg-slate-950 border-slate-700 text-slate-450 hover:border-slate-450'
                          }`}
                        >
                          <span className="text-[9px] font-mono leading-none font-black">{index + 1}</span>
                        </motion.div>
                        
                        {isActive && (
                          <span className={`absolute -inset-1 rounded-full border border-cyan-500/35 animate-ping pointer-events-none`} />
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
                <span className="text-[9px] font-mono text-slate-500 block uppercase">TRACK PROGRESSION LEVEL</span>
                <div className="h-2 rounded-full bg-slate-900 border border-white/5 p-0.5 max-w-full overflow-hidden relative">
                  <motion.div 
                    key={activeTrack + activeNode}
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: 
                        currentJourneyNodes.findIndex(n => n.id === activeNode) === 0 ? '25%' :
                        currentJourneyNodes.findIndex(n => n.id === activeNode) === 1 ? '50%' :
                        currentJourneyNodes.findIndex(n => n.id === activeNode) === 2 ? '75%' : '100%' 
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] shadow-[0_0_8px_rgba(236,72,153,0.4)]"
                  />
                </div>
                <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase">
                  <span>FOUNDATION</span>
                  <span>SPECIALIZE</span>
                  <span className="text-cyan-400 font-bold">APPLIED</span>
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
                Click parameters below to dynamically benchmark capabilities across Data Analytics and Full-Stack Development.
              </p>

              {/* Interactive sliders checklist */}
              <div className="space-y-2.5">
                {[
                  { key: 'exposure', label: 'Commercial Data Exposure', detail: 'Tricon corporate data schemas & BI' },
                  { key: 'experience', label: 'Web Application Craft', detail: 'FoamXpress & SmileSync React SPAs' },
                  { key: 'practical', label: 'Data & Modeling Hands-on', detail: 'Pandas, SQL queries & ML classifiers' },
                  { key: 'mindset', label: 'Adaptive Dual Focus', detail: 'Data insights + modern web UI' },
                  { key: 'analytics', label: 'TypeScript & Component Systems', detail: 'Typed state & responsive designs' }
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
                          ? 'bg-gradient-to-r from-cyan-500/5 to-pink-500/5 border-cyan-500/30' 
                          : 'bg-slate-900/10 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 rounded border p-0.5 flex items-center justify-center transition-all ${
                          isChecked 
                            ? 'bg-[#00E5FF] border-[#00E5FF] text-black font-bold' 
                            : 'border-slate-700 bg-[#020511]'
                        }`}>
                          <CheckCircle2 size={10} className={isChecked ? 'opacity-100' : 'opacity-0'} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[10px] font-bold ${isChecked ? (isDark ? 'text-white' : 'text-slate-900') : 'text-slate-400'}`}>
                            {item.label}
                          </span>
                          <span className="text-[8px] text-slate-400 font-mono">{item.detail}</span>
                        </div>
                      </div>

                      {/* Benchmark Score indicator */}
                      <span className={`text-[9px] font-mono font-bold ${isChecked ? 'text-[#00E5FF]' : 'text-slate-600'}`}>
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
                  background: `linear-gradient(135deg, ${activeTrack === 'data-analytics' ? '#00E5FF' : '#EC4899'}, transparent)`
                }}
              />

              {/* Top summary row */}
              <div className="space-y-6">
                
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className={`text-[9px] font-mono px-3 py-1 rounded-full uppercase border font-bold bg-white/5 ${
                    activeTrack === 'data-analytics' ? 'text-[#00E5FF] border-[#00E5FF]/20' : 'text-[#EC4899] border-[#EC4899]/20'
                  }`}>
                    {activeNodeData.badge}
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px] uppercase">
                    <Calendar size={11} className={activeTrack === 'data-analytics' ? 'text-cyan-400' : 'text-pink-500'} />
                    <span>{activeNodeData.duration}</span>
                  </div>
                </div>

                {/* Primary Role Info */}
                <div className="space-y-2">
                  <span className="text-xs uppercase text-slate-500 tracking-wider block font-bold font-mono">STAGE SCANNER</span>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
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
                  <span className="text-[10px] font-mono tracking-widest text-[#8B5CF6] uppercase block font-bold">PROFESSIONAL STAGE OVERVIEW</span>
                  <p className={`text-sm leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>
                    {activeNodeData.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Skills Applied list */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block font-bold">SKILLS & TECHNOLOGIES</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeNodeData.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          onMouseEnter={playHover}
                          className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-md border border-white/5 bg-[#020511] text-slate-300 hover:border-cyan-400/30 hover:text-white hover:shadow-[0_0_8px_rgba(0,229,255,0.15)] cursor-default transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learning Outcomes / Applied Exposure details */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#EC4899] uppercase block font-bold">APPLIED IMPACT & OUTCOMES</span>
                    <ul className={`space-y-2.5 text-xs font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
                  <span className="text-[8px] text-slate-500 uppercase block font-mono">CAREER PHASE</span>
                  <span className={`text-xs font-bold uppercase tracking-tight font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeNodeData.careerPhase}</span>
                </div>

                {activeNodeData.growthMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1 bg-white/[0.01] p-3 rounded-2xl border border-white/5">
                    <span className="text-[8px] text-slate-500 uppercase block font-mono">{metric.label}</span>
                    <span className="text-sm font-extrabold text-[#00E5FF] tracking-tight font-mono">{metric.value}</span>
                  </div>
                ))}

                <div className="space-y-1 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 p-3 rounded-2xl border border-cyan-500/20 flex flex-col justify-center">
                  <span className="text-[8px] text-cyan-400 uppercase block font-mono font-bold tracking-wider">TRACK STATUS</span>
                  <span className={`text-xs font-black tracking-tight font-mono uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>ACTIVE ROADMAP</span>
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
          <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Professional Capabilities</h3>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            A comprehensive overview of competencies leveraged across Data Analytics, Machine Learning, and Full-Stack Web Development projects.
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
              <h4 className={`text-sm font-extrabold uppercase tracking-tight mb-1 flex items-center justify-between ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>{hl.title}</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-slate-400" />
              </h4>
              <p className={`text-[11px] line-clamp-3 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {hl.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
