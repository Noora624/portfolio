import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Cpu, 
  Layers, 
  Terminal, 
  Sparkles, 
  Calendar, 
  Compass, 
  BookOpen, 
  Briefcase,
  Database,
  Code,
  Brain
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { sound } from '../utils/sound';
import RecentCodeCard from './RecentCodeCard';
import csIllustration from '../assets/images/cs_illustration_1781678760623.jpg';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  accentColor: string; // cyan, purple, or pink hex code / tailwind class
  badgeText?: string;
}

interface AboutSectionProps {
  theme?: 'dark' | 'light';
}

export default function AboutSection({ theme = 'dark' }: AboutSectionProps) {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  const timelineData: TimelineEvent[] = [
    {
      year: '2021',
      title: 'High School Matriculation (Class 10)',
      description: 'Completed Class 10 with distinction from Jawahar Public Senior Secondary School, Edava, Trivandrum, Kerala.',
      icon: BookOpen,
      accentColor: 'from-[#EC4899] to-[#F43F5E]',
      badgeText: 'SCHOOLING_COORDINATE'
    },
    {
      year: '2023',
      title: 'Higher Secondary Education (Class 12)',
      description: 'Completed Class 12 with a focus on science, mathematics, and analytical concepts from Jawahar Public Senior Secondary School, Edava, Trivandrum, Kerala.',
      icon: GraduationCap,
      accentColor: 'from-[#8B5CF6] to-[#6366F1]',
      badgeText: 'ACADEMIC_THRESHOLD'
    },
    {
      year: '2023 - 2027',
      title: 'B.Tech in Computer Science Engineering (Data Science)',
      description: 'Pursuing specialization in Data Science at K.R. Mangalam University. Building solid competency in statistics, machine learning algorithms, database administration, data extraction, and model orchestration.',
      icon: Cpu,
      accentColor: 'from-[#00E5FF] to-[#00B0FF]',
      badgeText: 'SPECIALIZATION_DECK'
    }
  ];

  const currentFocusSkills = [
    { name: 'Advanced Machine Learning', desc: 'Predictive models & tuning', level: 90, color: 'text-[#00E5FF]' },
    { name: 'Generative AI', desc: 'NLP, transformers & prompt design', level: 85, color: 'text-[#8B5CF6]' },
    { name: 'Data Engineering', desc: 'ETL Pipelines & database designs', level: 78, color: 'text-[#EC4899]' },
    { name: 'Full Stack Development', desc: 'React, Vite, Node interfaces', level: 82, color: 'text-[#00E5FF]' },
    { name: 'AI Applications', desc: 'Autonomous agents & deployment', level: 80, color: 'text-[#8B5CF6]' }
  ];

  const radarData = [
    { subject: 'Python', score: 90, fullMark: 100 },
    { subject: 'Machine Learning', score: 85, fullMark: 100 },
    { subject: 'SQL', score: 80, fullMark: 100 },
    { subject: 'Data Analysis', score: 95, fullMark: 100 }
  ];

  const handleHover = () => {
    sound.playHover();
  };

  const handleClick = (action?: () => void) => {
    sound.playClick();
    if (action) action();
  };

  const isDark = theme === 'dark';

  return (
    <section 
      id="about-section" 
      className="mt-20 lg:mt-32 w-full space-y-12 relative z-20 scroll-mt-24"
    >
      {/* Decorative Top Separator */}
      <div className="flex items-center gap-4 justify-center">
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-[#00E5FF]/20' : 'via-[#00E5FF]/40'} to-transparent`} />
        <div className={`flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
          isDark 
            ? 'text-[#00E5FF]/60 bg-[#00E5FF]/5 border-[#00E5FF]/10' 
            : 'text-[#008ba3] bg-cyan-100/50 border-cyan-200/60'
        }`}>
          <Terminal size={10} className="animate-pulse" />
          SECTION_ABOUT_ME
        </div>
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-[#EC4899]/20' : 'via-[#EC4899]/40'} to-transparent`} />
      </div>

      {/* Main Grid: Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left COLUMN: Main contents (Wider for primary focus) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          {/* Glassmorphic About Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-3xl backdrop-blur-md relative overflow-hidden group hover:border-[#00E5FF]/30 transition-all duration-300 ${
              isDark 
                ? 'bg-slate-900/20 border border-white/10 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.5)]' 
                : 'bg-white/70 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
            }`}
          >
            {/* Corner Decorative Tech Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
              <div className="absolute top-[-8px] right-[-8px] w-4 h-4 bg-[#00E5FF] rotate-45 transform" />
              <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#EC4899] animate-ping" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#00E5FF]" />
                <span className={`text-[10px] uppercase font-mono tracking-widest font-bold ${isDark ? 'text-[#8B5CF6]' : 'text-violet-600'}`}>
                  Overview Profile
                </span>
              </div>
              
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                About <span className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">Me</span>
              </h2>
              
              <div className={`space-y-4 text-sm sm:text-base leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>
                <p>
                  I am <strong className={`${isDark ? 'text-white font-semibold' : 'text-slate-900 font-extrabold'}`}>Noora</strong>, a B.Tech Computer Science Engineering (Data Science) student at <span className={`font-medium font-mono ${isDark ? 'text-[#00E5FF]' : 'text-cyan-700'}`}>K.R. Mangalam University (2023-2027)</span>.
                </p>
                <p>
                  I am deeply passionate about <span className={isDark ? 'text-[#00E5FF]' : 'text-[#0089a3] font-semibold'}>Data Science</span>, <span className={isDark ? 'text-[#8B5CF6]' : 'text-violet-600 font-semibold'}>Machine Learning</span>, <span className={isDark ? 'text-[#EC4899]' : 'text-pink-600 font-semibold'}>Data Analytics</span>, <span className={isDark ? 'text-white font-medium' : 'text-slate-900 font-semibold'}>Artificial Intelligence</span>, and <span className="text-emerald-500 font-mono font-semibold">Python Development</span>. 
                  I enjoy building highly tailored, data-driven solutions, analyzing massive datasets, and developing intricate machine learning applications designed to solve complex, real-world challenges.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Skill Radar Chart Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`p-8 rounded-3xl backdrop-blur-md relative overflow-hidden group hover:border-[#00E5FF]/30 transition-all duration-300 ${
              isDark 
                ? 'bg-[#070b1e]/40 border border-white/10 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.5)]' 
                : 'bg-white/70 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
            }`}
          >
            {/* Subtle glow sphere behind chart */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00E5FF]/8 transition-all duration-500`} />
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Compass size={16} className={isDark ? 'text-[#00E5FF]' : 'text-cyan-600'} />
                  <h3 className={`text-sm font-mono tracking-widest uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Skill Proficiency
                  </h3>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${isDark ? 'bg-white/5 border-white/5 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-450'}`}>
                  METRICS_RADAR_SCAN
                </span>
              </div>

              {/* Responsive Radar-chart Container */}
              <div className="w-full flex justify-center items-center py-2 relative overflow-visible h-[240px]">
                {/* Custom glowing stylesheet injections specifically for recharts grid paths */}
                <style dangerouslySetInnerHTML={{__html: `
                  .recharts-polar-grid-concentric-path {
                    stroke: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.07)'} !important;
                    transition: stroke 0.3s ease;
                  }
                  .group:hover .recharts-polar-grid-concentric-path {
                    stroke: ${isDark ? 'rgba(0, 229, 255, 0.12)' : 'rgba(0, 229, 255, 0.22)'} !important;
                  }
                  .recharts-polar-grid-angle-line {
                    stroke: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)'} !important;
                  }
                  .group:hover .recharts-polar-grid-angle-line {
                    stroke: ${isDark ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 229, 255, 0.15)'} !important;
                  }
                `}} />

                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke={isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)'} />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10, fontFamily: 'monospace', fontWeight: 600 }} 
                    />
                    <PolarRadiusAxis 
                      angle={45} 
                      domain={[0, 100]} 
                      tick={{ fill: isDark ? '#475569' : '#64748b', fontSize: 8 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Radar
                      name="Proficiency"
                      dataKey="score"
                      stroke="#00E5FF"
                      fill="#00E5FF"
                      fillOpacity={isDark ? 0.15 : 0.25}
                      strokeWidth={2}
                      activeDot={{ r: 5, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 1.2 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend & Breakdown stats */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { name: 'Python', score: '90%', desc: 'OOP, engineering & modeling', border: 'hover:border-[#00E5FF]/20', dot: 'bg-[#00E5FF]' },
                  { name: 'Machine Learning', score: '85%', desc: 'Neural nets, models & tuning', border: 'hover:border-[#8B5CF6]/20', dot: 'bg-[#8B5CF6]' },
                  { name: 'SQL', score: '80%', desc: 'Relational design & index queries', border: 'hover:border-[#EC4899]/20', dot: 'bg-[#EC4899]' },
                  { name: 'Data Analysis', score: '95%', desc: 'ETL pipelines, stats & tables', border: 'hover:border-emerald-400/20', dot: 'bg-emerald-400' }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    onMouseEnter={handleHover}
                    className={`p-3 rounded-xl border transition-all duration-350 ${
                      isDark 
                        ? 'bg-slate-950/40 border-white/5 ' + item.border
                        : 'bg-slate-50 border-slate-200/65 ' + item.border
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                        <span className={`text-[11px] font-bold font-sans ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.name}</span>
                      </div>
                      <span className={`text-[10px] font-semibold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.score}</span>
                    </div>
                    <p className={`text-[9px] font-sans leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`p-8 rounded-3xl backdrop-blur-md relative overflow-hidden group ${
              isDark 
                ? 'bg-slate-900/20 border border-white/10' 
                : 'bg-white/70 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
            }`}
          >
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className={isDark ? 'text-[#EC4899]' : 'text-pink-500'} />
                    <h3 className={`text-sm md:text-base font-display tracking-widest uppercase font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Academic Journey
                    </h3>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
                    From school education to Data Science specialization, continuously building knowledge and technical expertise.
                  </p>
                </div>
                <div className={`flex items-center gap-1.5 text-[9px] font-mono uppercase shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-455'}`}>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  ACADEMIC_LEDGER_NODE
                </div>
              </div>

              {/* Timeline Container */}
              <div className="relative pl-6 sm:pl-8 space-y-8 mt-4">
                
                {/* Center Vertical glowing line */}
                <div className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#00E5FF]/45 via-[#8B5CF6]/45 to-[#EC4899]/45" />

                {timelineData.map((evt, idx) => {
                  const isHovered = hoveredYear === evt.year;
                  const IconComp = evt.icon;

                  return (
                    <div 
                      key={evt.year}
                      onMouseEnter={() => {
                        setHoveredYear(evt.year);
                        handleHover();
                      }}
                      onMouseLeave={() => setHoveredYear(null)}
                      className="relative transition-transform duration-300"
                    >
                      {/* Timeline Glowing Node Bubble */}
                      <span 
                        className={`absolute left-[-26px] sm:left-[-30px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${
                          isHovered 
                            ? (isDark 
                                ? 'scale-115 border-white bg-slate-950 text-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                                : 'scale-115 border-slate-400 bg-white text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)]')
                            : (isDark 
                                ? 'border-white/15 bg-slate-950 text-slate-400 hover:border-slate-300' 
                                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400')
                        }`}
                      >
                        <IconComp size={isHovered ? 14 : 12} className={isHovered ? 'animate-pulse' : ''} />
                      </span>

                      {/* Content Card */}
                      <div 
                        className={`p-5 rounded-2xl border transition-all duration-350 relative group/card cursor-pointer hover:-translate-y-0.5 ${
                          isDark 
                            ? `bg-slate-950/40 ${isHovered ? 'border-white/20 shadow-[0_4px_25px_-5px_rgba(255,255,255,0.06)] scale-[1.01]' : 'border-white/5'}`
                            : `bg-slate-50/80 ${isHovered ? 'border-slate-300 shadow-[0_4px_15px_rgba(0,0,0,0.02)] scale-[1.01]' : 'border-slate-200/60'}`
                        }`}
                      >
                        {/* Shimmer backdrop effect on active timeline hover */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${evt.accentColor} opacity-0 transition-opacity duration-500 rounded-2xl pointer-events-none ${isHovered ? 'opacity-2.5' : ''}`} />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-mono font-black px-2 py-0.5 rounded bg-gradient-to-r ${evt.accentColor} text-transparent bg-clip-text`}>
                              {evt.year}
                            </span>
                            <span className={`text-xs uppercase font-mono tracking-widest font-bold ${isDark ? 'text-[#00E5FF]' : 'text-cyan-700'}`}>
                              {evt.badgeText}
                            </span>
                          </div>
                        </div>

                        <h4 className={`text-md font-semibold mb-1.5 tracking-tight group-hover/card:text-gradient font-sans ${isDark ? 'text-white' : 'text-slate-800'}`}>
                          {evt.title}
                        </h4>
                        
                        <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
                          {evt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Current Focus Container */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-3xl backdrop-blur-md relative overflow-hidden group hover:border-[#8B5CF6]/30 transition-all duration-300 ${
              isDark 
                ? 'bg-[#070b1e]/40 border border-white/10' 
                : 'bg-white/70 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
            }`}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <BookOpen size={16} className={isDark ? 'text-[#8B5CF6]' : 'text-violet-600'} />
                  <h3 className={`text-sm font-mono tracking-widest uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Currently Learning
                  </h3>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${isDark ? 'bg-white/5 border-white/5 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                  SYSTEM_UPGRADE_v2
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFocusSkills.map((ski, idx) => (
                  <div 
                    key={idx} 
                    onMouseEnter={handleHover}
                    className={`p-4 rounded-xl border transition-all group/item ${
                      isDark 
                        ? 'bg-slate-950/60 border-white/5 hover:border-slate-800 hover:bg-white/[0.02]' 
                        : 'bg-slate-50 border-slate-200/60 hover:border-slate-350 hover:bg-slate-100/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className={`text-xs font-semibold tracking-wide ${
                        isDark 
                          ? ski.color 
                          : ski.color === 'text-[#00E5FF]' ? 'text-cyan-700' : ski.color === 'text-[#8B5CF6]' ? 'text-violet-600' : 'text-pink-600'
                      }`}>
                        {ski.name}
                      </span>
                      <span className={`text-[9px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-440'}`}>
                        {statusSymbol(idx)}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-normal font-sans ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>
                      {ski.desc}
                    </p>
                    
                    {/* Glowing High Tech Bar */}
                    <div className={`mt-3 w-full h-1 rounded-full overflow-hidden relative ${isDark ? 'bg-slate-950' : 'bg-slate-200'}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${ski.level}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 * idx }}
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r ${
                          idx % 3 === 0 ? 'from-[#00E5FF] to-blue-500' :
                          idx % 3 === 1 ? 'from-[#8B5CF6] to-indigo-500' : 'from-[#EC4899] to-pink-500'
                        }`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Syntax Highlighted Auto-Scrolling Recent Code Terminal Card */}
          <RecentCodeCard theme={theme} />

          {/* Premium Full-Width Professional Internship seeking Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            onMouseEnter={handleHover}
            onClick={() => handleClick()}
            className={`p-8 rounded-3xl relative overflow-hidden group transition-all duration-300 cursor-pointer ${
              isDark 
                ? 'bg-gradient-to-tr from-slate-950 via-[#0a0f28]/60 to-slate-950/50 border-2 border-[#00E5FF]/20 shadow-[0_15px_35px_-5px_rgba(0,229,255,0.04)] hover:border-[#00E5FF]/45' 
                : 'bg-gradient-to-tr from-white via-cyan-50/20 to-white border-2 border-cyan-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-[#00E5FF]/50'
            }`}
          >
            {/* Blinking scanning grid decoration */}
            <div className="absolute inset-0 dotted-grid opacity-10 pointer-events-none" />
            
            {/* Soft background pulse glows */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-3xl group-hover:bg-[#00E5FF]/20 transition-all duration-500" />
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#EC4899]/10 rounded-full blur-3xl group-hover:bg-[#EC4899]/20 transition-all duration-500" />

            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#00E5FF] font-bold text-lg leading-none">🚀</span>
                  <span className={`text-[10px] font-mono tracking-widest uppercase font-black ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Active Status Beacon
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
                  </span>
                </div>
                
                <h3 className={`text-xl sm:text-2xl font-black tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Open to Internships
                </h3>
                
                <div className="space-y-1">
                  <span className={`text-xs sm:text-sm block font-sans ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
                    Seeking strategic opportunities to deploy advanced models, construct automated pipelines, analyze complex datasets, and develop intelligent solutions.
                  </span>
                </div>
              </div>

              {/* Opportunities list container with tags */}
              <div className="flex flex-wrap gap-2 lg:max-w-md justify-start lg:justify-end">
                {['Data Science', 'Machine Learning', 'Data Analytics', 'Python Development', 'Software Development'].map((tag, i) => (
                  <span 
                    key={i}
                    className={`text-[10px] sm:text-xs font-mono px-3.5 py-2 rounded-full transition-all border ${
                      isDark 
                        ? 'bg-slate-900 border-white/10 text-slate-300 hover:border-cyan-300/30 hover:text-[#00E5FF]' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300 hover:text-[#0089a3] shadow-sm'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Computer Science & Data Science Journey - Visual Supporting Grid */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24 lg:max-h-[92vh] lg:overflow-y-auto pr-1.5 pb-8 styles_custom_scroll">
          
          {/* Section subtitle above visual elements block */}
          <div className="space-y-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[10px] font-mono tracking-widest uppercase font-bold">
              <Cpu size={12} className="animate-pulse text-[#00E5FF]" />
              <span className={isDark ? 'text-[#00E5FF]' : 'text-[#0089a3]'}>CS_CORE & WORKFLOW_GRID</span>
            </div>
            <h3 className={`text-md sm:text-base font-mono tracking-wide font-black uppercase ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Technical Identity Matrix
            </h3>
          </div>

          {/* 1. Computer Science Illustration Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            onMouseEnter={handleHover}
            className={`p-4 rounded-2xl backdrop-blur-md relative overflow-hidden border transition-all duration-300 shadow-md ${
              isDark
                ? 'bg-slate-950/40 border-white/5 hover:border-[#00E5FF]/30'
                : 'bg-white/75 border-slate-200 hover:border-[#00E5FF]/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
            } group/ill`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs">💻</span>
              <span className={`text-[10px] font-mono tracking-wider uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
                Computer Science Core
              </span>
            </div>
            
            <div className="relative rounded-xl overflow-hidden border border-white/5 bg-slate-900/40 h-40 flex items-center justify-center">
              <img
                src={csIllustration}
                alt="Computer Science and Data Science Journey Illustration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/ill:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* 2. Python Ecosystem Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            onMouseEnter={handleHover}
            className={`p-5 rounded-2xl backdrop-blur-md border relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] ${
              isDark
                ? 'bg-slate-950/40 border-white/5 hover:border-amber-400/30'
                : 'bg-white/75 border-slate-200 hover:border-amber-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Code size={14} className="text-amber-400 animate-pulse" />
                <h4 className={`text-xs font-mono tracking-wider font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-605'}`}>
                  Python Ecosystem
                </h4>
              </div>
              <span className="text-[9px] font-black font-mono text-amber-500 bg-amber-505/10 px-1.5 py-0.5 rounded">
                CORE_LANG
              </span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Python', role: 'Advanced scripting, OOP syntax & logic structures', level: '90%' },
                { name: 'Pandas', role: 'Exploratory structural analysis, framing & filters', level: '88%' },
                { name: 'NumPy', role: 'Multidimensional array computations & math functions', level: '85%' },
                { name: 'Matplotlib', role: 'Statistical charts, interactive plots & dashboards', level: '82%' },
                { name: 'Scikit-Learn', role: 'Predictive classifiers, neural nodes & k-means', level: '80%' }
              ].map((library) => (
                <div key={library.name} className="flex flex-col gap-0.5 group/lib p-1.5 rounded-lg hover:bg-amber-500/5 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className={`text-[11px] font-bold font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {library.name}
                    </span>
                    <span className="text-[9px] font-mono font-medium text-amber-500">{library.level}</span>
                  </div>
                  <span className={`text-[10px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>
                    {library.role}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3. SQL & Database Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={handleHover}
            className={`p-5 rounded-2xl backdrop-blur-md border relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] ${
              isDark
                ? 'bg-slate-950/40 border-white/5 hover:border-cyan-400/30'
                : 'bg-white/75 border-slate-200 hover:border-cyan-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Database size={14} className="text-cyan-400 animate-pulse" />
                <h4 className={`text-xs font-mono tracking-wider font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-605'}`}>
                  SQL & Relational DBs
                </h4>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 uppercase">
                Query Code
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Sample SQL Query Terminal */}
              <div className={`p-3 rounded-lg border font-mono text-[10px] leading-normal relative overflow-hidden select-none ${
                isDark ? 'bg-slate-950 border-white/5' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                {/* Code decorations */}
                <div className="absolute top-1.5 right-2 flex gap-1 items-center">
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                  <span className="w-1 h-1 rounded-full bg-yellow-400" />
                  <span className="w-1 h-1 rounded-full bg-green-400" />
                </div>

                <div className="space-y-0.5 mt-1">
                  <div>
                    <span className="text-[#FF79C6]">SELECT</span> <span className="text-[#8BE9FD]">segment</span>, 
                    <span className="text-[#FF79C6]"> AVG</span>(<span className="text-[#8BE9FD]">ltv</span>) <span className="text-[#FF79C6]">AS</span> <span className="text-[#50FA7B]">avg_value</span>
                  </div>
                  <div>
                    <span className="text-[#FF79C6]">FROM</span> <span className="text-white">customer_data</span>
                  </div>
                  <div>
                    <span className="text-[#FF79C6]">GROUP BY</span> <span className="text-[#8BE9FD]">segment</span>
                  </div>
                  <div>
                    <span className="text-[#FF79C6]">ORDER BY</span> <span className="text-[#50FA7B]">avg_value</span> <span className="text-[#FF79C6]">DESC</span>;
                  </div>
                </div>
              </div>
              
              <p className={`text-[11px] leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Capable of designing efficient relational schemas, executing nested aggregate queries, structuring subqueries, and tuning index keys to scale database throughput.
              </p>
            </div>
          </motion.div>

          {/* 4. Data Science Workflow Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onMouseEnter={handleHover}
            className={`p-5 rounded-2xl backdrop-blur-md border relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] ${
              isDark
                ? 'bg-slate-950/40 border-white/5 hover:border-[#EC4899]/30'
                : 'bg-white/75 border-slate-200 hover:border-[#EC4899]/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs">🔄</span>
                <h4 className={`text-xs font-mono tracking-wider font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-605'}`}>
                  Data Science Workflow
                </h4>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-[#EC4899] font-semibold border border-pink-500/20">
                ETL_TO_INSIGHTS
              </span>
            </div>

            {/* Pipeline Layout */}
            <div className="space-y-4">
              {[
                { step: '01', title: 'Collect Data', desc: 'Secure reliable source streams, query databases, ingest CSV/APIs.' },
                { step: '02', title: 'Clean Data', desc: 'Resolve missing fields, prune outliers, format anomalies.' },
                { step: '03', title: 'Analyze', desc: 'Perform statistical EDA, uncover correlation vectors.' },
                { step: '04', title: 'Build Models', desc: 'Perform k-means training, optimize machine learning classifiers.' },
                { step: '05', title: 'Generate Insights', desc: 'Extract strategic answers and build interactive metrics.' }
              ].map((flow, index, arr) => (
                <div key={flow.step} className="relative pl-7 group/flow">
                  {/* Connection bullet */}
                  <div className={`absolute left-[5px] top-1 w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-950 border-[#EC4899]/60 group-hover/flow:border-[#EC4899] group-hover/flow:scale-110 shadow-[0_0_8px_rgba(236,72,153,0.3)]' 
                      : 'bg-white border-pink-500 group-hover/flow:border-[#EC4899] group-hover/flow:scale-110'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EC4899] scale-0 group-hover/flow:scale-100 transition-transform duration-205" />
                  </div>

                  {/* Joining line */}
                  {index < arr.length - 1 && (
                    <div className={`absolute left-[10px] top-4 bottom-[-16px] w-[2px] transition-colors duration-300 ${
                      isDark ? 'bg-gradient-to-b from-[#EC4899]/30 to-[#EC4899]/10' : 'bg-pink-100'
                    }`} />
                  )}

                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-pink-500 font-bold">{flow.step}</span>
                      <span className={`text-[12px] font-bold tracking-tight transition-colors group-hover/flow:text-[#EC4899] ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {flow.title}
                      </span>
                    </div>
                    <span className={`text-[10px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>
                      {flow.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5. Areas of Interest Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={handleHover}
            className={`p-5 rounded-2xl backdrop-blur-md border relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] ${
              isDark
                ? 'bg-slate-950/40 border-white/5 hover:border-[#8B5CF6]/30'
                : 'bg-white/75 border-slate-200 hover:border-[#8B5CF6]/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
            }`}
          >
            <div className="flex justify-between items-center mb-3.5">
              <div className="flex items-center gap-2">
                <Brain size={14} className="text-[#8B5CF6] animate-pulse" />
                <h4 className={`text-xs font-mono tracking-wider font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-605'}`}>
                  Areas of Interest
                </h4>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 text-[#8B5CF6] uppercase">
                FIELDS
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Machine Learning', accent: 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/15' },
                { name: 'Data Analytics', accent: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/15' },
                { name: 'Generative AI', accent: 'bg-pink-500/10 text-pink-300 border-pink-500/20 hover:bg-pink-500/15' },
                { name: 'Data Engineering', accent: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/15' },
                { name: 'Full Stack Development', accent: 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/15' }
              ].map((field) => (
                <span
                  key={field.name}
                  onMouseEnter={handleHover}
                  className={`text-[10px] font-mono px-3 py-1.5 rounded-lg border transition-all cursor-default ${
                    isDark 
                      ? field.accent 
                      : 'bg-slate-50 border-slate-250 text-slate-700 hover:border-slate-350 hover:bg-slate-100'
                  }`}
                >
                  {field.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Sticky caption box */}
          <div className={`p-4 rounded-xl border text-center ${isDark ? 'bg-slate-900/20 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
            <p className={`text-xs font-sans leading-relaxed tracking-wide font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              "Passionate about transforming data into meaningful insights through analytics, machine learning, and intelligent solutions."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// Helper for high tech styling icons/subscripts
function statusSymbol(id: number) {
  const symbols = ['[ML_ENGINE_v4]', '[TRANSFORMER_IX]', '[PIPELINE_INIT]', '[UI_REACT_v18]', '[AGENTYS_V1]'];
  return symbols[id % symbols.length];
}
