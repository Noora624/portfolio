import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Brain, 
  Database, 
  Settings, 
  Activity, 
  TrendingUp, 
  Sparkles, 
  GitMerge, 
  CheckCircle2, 
  Cpu, 
  ChevronRight, 
  Play, 
  RotateCcw,
  BarChart2,
  Sliders,
  Terminal,
  Grid
} from 'lucide-react';
import { sound } from '../utils/sound';

interface DataScienceWorkbenchProps {
  theme?: 'dark' | 'light';
}

export default function DataScienceWorkbench({ theme = 'dark' }: DataScienceWorkbenchProps) {
  const [activeTab, setActiveTab] = useState<'ml' | 'pipeline' | 'sql'>('ml');
  const [isTraining, setIsTraining] = useState(false);
  const [epochsRun, setEpochsRun] = useState(1);
  const [accuracy, setAccuracy] = useState(90.2);
  const [loss, setLoss] = useState(0.42);
  const [selectedWorkflowNode, setSelectedWorkflowNode] = useState<string>('ingestion');
  const [sqlExecuted, setSqlExecuted] = useState(false);
  const [sqlQueryType, setSqlQueryType] = useState<'cohort' | 'anomaly'>('cohort');

  const isDark = theme === 'dark';

  const handleHover = () => {
    sound.playHover();
  };

  const handleClick = () => {
    sound.playClick();
  };

  // Mock ML Loss and Accuracy training data
  const epochData = [
    { epoch: 1, val_loss: 0.65, val_acc: 75.2 },
    { epoch: 2, val_loss: 0.52, val_acc: 81.4 },
    { epoch: 3, val_loss: 0.45, val_acc: 86.1 },
    { epoch: 4, val_loss: 0.38, val_acc: 89.8 },
    { epoch: 5, val_loss: 0.32, val_acc: 91.5 },
    { epoch: 6, val_loss: 0.28, val_acc: 93.9 },
    { epoch: 7, val_loss: 0.23, val_acc: 95.8 },
    { epoch: 8, val_loss: 0.18, val_acc: 96.9 },
    { epoch: 9, val_loss: 0.15, val_acc: 97.4 },
    { epoch: 10, val_loss: 0.11, val_acc: 98.4 }
  ];

  const currentTrainingData = epochData.slice(0, epochsRun);

  // Feature Importance Data
  const featureImportanceData = [
    { name: 'user_volume_gb', importance: 0.34, fill: '#00E5FF' },
    { name: 'session_frequency', importance: 0.26, fill: '#8B5CF6' },
    { name: 'registration_tenure', importance: 0.18, fill: '#EC4899' },
    { name: 'avg_failure_rate', importance: 0.14, fill: '#10B981' },
    { name: 'payment_tier_index', importance: 0.08, fill: '#F59E0B' }
  ];

  // SQL Query Mock Results
  const cohortResults = [
    { cohort_month: '2026-05', total_users: 1420, onboard_gb: '45,820', retention_pct: '92.4%' },
    { cohort_month: '2026-04', total_users: 1280, onboard_gb: '39,150', retention_pct: '88.1%' },
    { cohort_month: '2026-03', total_users: 1150, onboard_gb: '34,900', retention_pct: '85.5%' },
    { cohort_month: '2026-02', total_users: 980, onboard_gb: '27,110', retention_pct: '81.2%' }
  ];

  const anomalyResults = [
    { user_id: 'USR_9824', anomaly_score: '0.984', txn_volume: '$14,210', flag_type: 'RAPID_BURST_MB' },
    { user_id: 'USR_1042', anomaly_score: '0.942', txn_volume: '$9,800', flag_type: 'IP_MISMATCH_GEO' },
    { user_id: 'USR_3391', anomaly_score: '0.915', txn_volume: '$11,400', flag_type: 'RECURRING_CONCURRENCY' },
    { user_id: 'USR_7719', anomaly_score: '0.887', txn_volume: '$8,550', flag_type: 'DENSE_IO_FAIL' }
  ];

  // Simulating training epochs count up
  const runModelTraining = () => {
    sound.playClick();
    if (isTraining) return;
    setIsTraining(true);
    setEpochsRun(1);
    setAccuracy(75.2);
    setLoss(0.65);

    let currentEpoch = 1;
    const interval = setInterval(() => {
      currentEpoch++;
      setEpochsRun(currentEpoch);
      setAccuracy(epochData[currentEpoch - 1].val_acc);
      setLoss(epochData[currentEpoch - 1].val_loss);

      if (currentEpoch === 10) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 400);
  };

  const resetTraining = () => {
    sound.playClick();
    setEpochsRun(1);
    setAccuracy(75.2);
    setLoss(0.65);
    setIsTraining(false);
  };

  const runSqlQuery = () => {
    sound.playClick();
    setSqlExecuted(false);
    setTimeout(() => {
      setSqlExecuted(true);
    }, 500);
  };

  return (
    <section id="ds-workbench-section" className="mt-20 lg:mt-32 w-full space-y-8 relative z-20">
      {/* Decorative Title */}
      <div className="flex items-center gap-4 justify-center">
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-[#8B5CF6]/20' : 'via-[#8B5CF6]/40'} to-transparent`} />
        <div className={`flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
          isDark 
            ? 'text-[#8B5CF6] bg-[#8B5CF6]/5 border-[#8B5CF6]/10' 
            : 'text-[#6d28d9] bg-violet-100/50 border-violet-200/60'
        }`}>
          <Brain size={10} className="animate-pulse" />
          DS_ENGINEERING_WORKBENCH
        </div>
        <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'via-[#EC4899]/20' : 'via-[#EC4899]/40'} to-transparent`} />
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Interactive <span className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">Model Workbench</span>
        </h2>
        <p className={`text-xs sm:text-sm font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Simulate a real-time analytics hub. Experiment with hyperparameter training loops, explore scikit-learn preprocessing graphs, and run complex window aggregates in local database environments.
        </p>
      </div>

      {/* Main Terminal Shell Grid */}
      <div className={`rounded-3xl border overflow-hidden backdrop-blur-md ${
        isDark 
          ? 'bg-[#04061a]/40 border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]' 
          : 'bg-white border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.02)]'
      }`}>
        
        {/* Module Tab Toggles Header */}
        <div className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isDark ? 'border-white/5 bg-slate-900/30' : 'border-slate-205 bg-slate-100/40'
        }`}>
          <div className="flex bg-slate-200/50 dark:bg-slate-950/60 p-0.5 rounded-xl border border-slate-300/25 dark:border-white/5 self-start">
            {[
              { id: 'ml', icon: Cpu, label: 'ML Model Fitting' },
              { id: 'pipeline', icon: GitMerge, label: 'Feature Pipeline' },
              { id: 'sql', icon: Database, label: 'Analytical SQL' }
            ].map(tab => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id as 'ml' | 'pipeline' | 'sql');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8B5CF6]/15 via-[#8B5CF6]/20 to-[#EC4899]/15 text-[#8B5CF6] border dark:border-[#8B5CF6]/20 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-300/10 dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <TabIcon size={12} className={isActive ? 'animate-pulse' : ''} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className={`flex items-center gap-3 text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              SANDBOX_ONLINE
            </span>
            <span className="hidden md:inline text-slate-500">v1.2.6_DEPLOYED</span>
          </div>
        </div>

        {/* Dynamic Tab Body Display */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: MACHINE LEARNING MODEL COMPILE MODULE */}
            {activeTab === 'ml' && (
              <motion.div
                key="ml-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left Panel: Hyperparameter dials & KPI cards */}
                <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sliders size={14} className="text-[#8B5CF6]" />
                      <span className={`text-xs font-mono font-black uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>HYPERPARAMETERS</span>
                    </div>

                    {/* Hyperparameter spec cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                        <span className="text-[10px] font-mono text-slate-500 block">Classifier</span>
                        <strong className={`text-xs font-sans block ${isDark ? 'text-white' : 'text-slate-800'}`}>Random Forest</strong>
                      </div>
                      <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                        <span className="text-[10px] font-mono text-slate-500 block">Estimators</span>
                        <strong className={`text-xs font-sans block ${isDark ? 'text-white' : 'text-slate-800'}`}>100 Trees</strong>
                      </div>
                      <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                        <span className="text-[10px] font-mono text-slate-500 block">Max Depth</span>
                        <strong className={`text-xs font-sans block ${isDark ? 'text-white' : 'text-slate-800'}`}>8 Layers</strong>
                      </div>
                      <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                        <span className="text-[10px] font-mono text-slate-500 block">Split Criterion</span>
                        <strong className={`text-xs font-sans block ${isDark ? 'text-white' : 'text-slate-800'}`}>Gini impurity</strong>
                      </div>
                    </div>
                  </div>

                  {/* Analytics KPI cards */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-450 uppercase">MODEL_PERFORMANCE</span>
                      <span className="text-purple-400">EPOCH: {epochsRun}/10</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* KPI A: Accuracy */}
                      <div className={`p-4 rounded-xl border transition-all ${
                        isDark ? 'bg-slate-950/80 border-white/5 shadow-[0_4px_20px_-3px_rgba(0,0,0,0.5)]' : 'bg-slate-100/50 border-slate-200'
                      }`}>
                        <span className={`text-[10px] font-mono block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Accuracy Acc</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className={`text-2xl font-black font-mono tracking-tight text-[#00E5FF]`}>
                            {accuracy.toFixed(1)}%
                          </span>
                          {epochsRun === 10 && <span className="text-[9px] font-bold text-green-400 font-mono">OPTIMAL</span>}
                        </div>
                      </div>

                      {/* KPI B: Cross Loss */}
                      <div className={`p-4 rounded-xl border transition-all ${
                        isDark ? 'bg-slate-950/80 border-white/5 shadow-[0_4px_20px_-3px_rgba(0,0,0,0.5)]' : 'bg-slate-100/50 border-slate-200'
                      }`}>
                        <span className={`text-[10px] font-mono block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Entropy Loss</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className={`text-2xl font-black font-mono tracking-tight text-[#EC4899]`}>
                            {loss.toFixed(3)}
                          </span>
                          <span className={`text-[9px] font-semibold font-mono ${epochsRun > 5 ? 'text-emerald-400' : 'text-amber-500'}`}>
                            {loss < 0.2 ? 'STABLE' : 'CONVERG'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Execution Controls */}
                  <div className="flex gap-3">
                    <button
                      onClick={runModelTraining}
                      disabled={isTraining}
                      className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        isTraining
                          ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-slate-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#8B5CF6] via-[#8B5CF6] to-[#EC4899] text-white hover:shadow-[0_4px_20px_rgba(139,92,246,0.35)] active:scale-97'
                      }`}
                    >
                      <Play size={12} className={isTraining ? 'animate-spin' : ''} />
                      {isTraining ? 'Training loop...' : 'Run Fitting'}
                    </button>

                    <button
                      onClick={resetTraining}
                      disabled={isTraining}
                      className={`p-3 border rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                        isDark 
                          ? 'border-white/10 dark:bg-white/5 text-slate-300 hover:bg-white/10' 
                          : 'border-slate-250 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                      title="Reset Training"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Panel: Recharts visualizations representing validation loss / accuracies */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Visual Widget A: Area chart mapping learning gradient curves */}
                  <div className={`p-5 rounded-2xl border flex flex-col justify-between h-[310px] relative ${
                    isDark ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {/* Header info */}
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs font-mono font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <Activity size={12} className="text-[#EC4899] animate-pulse" />
                        Loss Validation Gradient (Loss Curve)
                      </span>
                      <span className="text-[9px] font-mono bg-slate-200/50 dark:bg-slate-900 border dark:border-white/5 text-slate-500 px-1.5 py-0.5 rounded">
                        RECHARTS_AREA
                      </span>
                    </div>

                    <div className="w-full flex-1 min-h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={currentTrainingData}
                          margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#EC4899" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)'} />
                          <XAxis 
                            dataKey="epoch" 
                            type="number"
                            domain={[1, 10]}
                            tick={{ fill: isDark ? '#475569' : '#64748b', fontSize: 10, fontFamily: 'monospace' }} 
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            domain={[0, 0.7]}
                            tick={{ fill: isDark ? '#475569' : '#64748b', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              background: isDark ? '#050720' : '#ffffff', 
                              borderColor: '#EC4899',
                              fontSize: 11,
                              borderRadius: 8,
                              color: isDark ? '#fff' : '#000'
                            }} 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="val_loss" 
                            stroke="#EC4899" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorLoss)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Visual Widget B: Bar chart showing feature importance scores */}
                  <div className={`p-5 rounded-2xl border flex flex-col justify-between h-[310px] relative ${
                    isDark ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs font-mono font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <BarChart2 size={12} className="text-[#00E5FF]" />
                        Model Feature Importance Matrix
                      </span>
                      <span className="text-[9px] font-mono bg-slate-200/50 dark:bg-slate-900 border dark:border-white/5 text-slate-500 px-1.5 py-0.5 rounded">
                        FEATURE_WEIGHTS
                      </span>
                    </div>

                    <div className="w-full flex-1 min-h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={featureImportanceData}
                          margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)'} />
                          <XAxis 
                            type="number"
                            domain={[0, 0.4]}
                            tick={{ fill: isDark ? '#475569' : '#64748b', fontSize: 9, fontFamily: 'monospace' }} 
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis 
                            dataKey="name" 
                            type="category"
                            tick={{ fill: isDark ? '#94a3b8' : '#334155', fontSize: 8, fontStyle: 'italic' }}
                            axisLine={false}
                            tickLine={false}
                            width={100}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              background: isDark ? '#050720' : '#ffffff', 
                              borderColor: '#00E5FF',
                              fontSize: 10,
                              borderRadius: 8,
                              color: isDark ? '#fff' : '#000'
                            }} 
                          />
                          <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                            {featureImportanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: PIPELINE DESIGN WORKFLOW DIAGRAM */}
            {activeTab === 'pipeline' && (
              <motion.div
                key="pipeline-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Horizontal high-tech stepper flowchart */}
                <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 px-2 py-4">
                  
                  {/* Connecting glowing vector lines */}
                  <div className="hidden md:block absolute left-12 right-12 top-11 h-[2px] bg-slate-350 dark:bg-white/10 z-0">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899]" 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                  </div>

                  {/* Flowchart Node Buttons */}
                  {[
                    { id: 'ingestion', label: '1. INGESTION', system: 'Pandas CSV/JSON', icon: Database, color: 'border-[#00E5FF] dark:text-[#00E5FF]' },
                    { id: 'validation', label: '2. CLEANSE', system: 'Null standardise', icon: CheckCircle2, color: 'border-emerald-400 dark:text-emerald-400' },
                    { id: 'extraction', label: '3. FEATURES', system: 'Log Transform', icon: BarChart2, color: 'border-[#8B5CF6] dark:text-[#8B5CF6]' },
                    { id: 'scaling', label: '4. SCALE & FIT', system: 'Scikit StandardScaler', icon: Settings, color: 'border-[#EC4899] dark:text-[#EC4899]' }
                  ].map((node) => {
                    const NodeIcon = node.icon;
                    const isSelected = selectedWorkflowNode === node.id;

                    return (
                      <button
                        key={node.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedWorkflowNode(node.id);
                        }}
                        className={`relative z-10 w-full md:w-44 p-4 rounded-xl border-2 backdrop-blur-md flex items-center md:flex-col gap-3 md:gap-2 cursor-pointer text-left md:text-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-slate-950/60 shadow-[0_0_20px_rgba(139,92,246,0.3)] ' + node.color
                            : (isDark 
                                ? 'bg-[#050720]/80 border-white/5 text-slate-400 hover:border-slate-700' 
                                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-650 shadow-sm')
                        }`}
                      >
                        <div className={`p-2.5 rounded-lg border flex items-center justify-center ${
                          isSelected 
                            ? 'bg-white/5 text-purple-400 border-purple-500/20' 
                            : 'bg-white/5 text-slate-500 border-transparent'
                        }`}>
                          <NodeIcon size={16} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-black tracking-wider block">{node.label}</span>
                          <span className={`text-[9px] font-sans block opacity-75 ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>{node.system}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Workflow execution block code card + model statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Glassmorphism pre-processed stats card */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Grid size={14} className="text-pink-400" />
                      <span className={`text-xs font-mono font-black uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>DATASET & METRIC STATS</span>
                    </div>

                    <div className={`p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-slate-950/30 border-white/5' : 'bg-slate-100/50 border-slate-200'
                    }`}>
                      <div className="flex justify-between border-b pb-2 dark:border-white/5 text-xs font-mono">
                        <span className="text-slate-500">Row Count</span>
                        <strong className={isDark ? 'text-white' : 'text-slate-800'}>254,800 rows</strong>
                      </div>
                      <div className="flex justify-between border-b pb-2 dark:border-white/5 text-xs font-mono">
                        <span className="text-slate-500">Columns</span>
                        <strong className={isDark ? 'text-white' : 'text-slate-800'}>42 Dimensions</strong>
                      </div>
                      <div className="flex justify-between border-b pb-2 dark:border-white/5 text-xs font-mono">
                        <span className="text-slate-500">Missing Elements</span>
                        <strong className="text-green-400">0% (Cleaned)</strong>
                      </div>
                      <div className="flex justify-between border-b pb-2 dark:border-white/5 text-xs font-mono">
                        <span className="text-slate-500">Scaling Strategy</span>
                        <strong className={isDark ? 'text-white' : 'text-slate-800'}>StandardScaler( )</strong>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500">Null replacements</span>
                        <strong className="text-[#00E5FF]">ffill aggregate</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mini terminal output of data extraction */}
                  <div className="lg:col-span-8">
                    <div className={`p-5 rounded-2xl border gap-4 flex flex-col justify-between overflow-hidden relative ${
                      isDark ? 'bg-slate-950/50 border-white/5 font-mono' : 'bg-slate-50 border-slate-205 font-mono'
                    }`}>
                      {/* Interactive window bar */}
                      <div className="flex items-center justify-between border-b dark:border-white/5 pb-2.5 text-[10px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Terminal size={11} className="text-emerald-400" />
                          <span>pipeline_pipeline_extract.py</span>
                        </div>
                        <span>STATUS: EXECUTED</span>
                      </div>

                      {/* Displaying target nodes code examples */}
                      <div className="text-[11px] sm:text-xs leading-relaxed overflow-x-auto select-all text-slate-400 max-h-[170px]">
                        {selectedWorkflowNode === 'ingestion' && (
                          <pre className="text-cyan-450 dark:text-cyan-300">
{`# 1. Pipeline Ingestion Node
import pandas as pd

def ingest_data(filepath):
    print("🚀 Ingesting raw dimensions from CSV storage...")
    df = pd.read_csv(filepath)
    print(f"✅ Ingested successfully. Dataset Frame: {df.shape[0]} rows, {df.shape[1]} cols")
    return df

df_raw = ingest_data("./raw_metrics_store.csv")`}
                          </pre>
                        )}
                        {selectedWorkflowNode === 'validation' && (
                          <pre className="text-emerald-600 dark:text-emerald-400">
{`# 2. Data Validation & Imputations
def validate_and_clean(df):
    null_counts = df.isnull().sum().sum()
    print(f"🔍 Scan complete. Found {null_counts} missing elements.")
    if null_counts > 0:
        df.fillna(method="ffill", inplace=True)
        print("🛠️ Null-fill aggregations completed with forward imputation methodology")
    return df

df_cleaned = validate_and_clean(df_raw)`}
                          </pre>
                        )}
                        {selectedWorkflowNode === 'extraction' && (
                          <pre className="text-violet-650 dark:text-violet-400">
{`# 3. Dynamic Feature Injections
import numpy as np

def extract_features(df):
    print("⚡ Extracting logarithmic cross-metrics...")
    # Calculate log-transformed volume interaction coefficient
    df["kpi_index"] = df["metrics"] * np.log(df["volume"] + 1)
    df["frequency_rate"] = df["logins"] / (df["tenure_months"] + 1)
    return df

df_featured = extract_features(df_cleaned)`}
                          </pre>
                        )}
                        {selectedWorkflowNode === 'scaling' && (
                          <pre className="text-pink-600 dark:text-pink-400">
{`# 4. Standard Scaler & Model Alignment
from sklearn.preprocessing import StandardScaler

def scale_and_partition(df):
    print("📈 Commencing training alignment via standard deviation scaling...")
    X = df.drop(columns=["target_label", "id"])
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    print("🏆 Ready for estimator fitting inside Random Forest classifier")
    return X_scaled

X_final = scale_and_partition(df_featured)`}
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 3: ANALYTICAL SQL SANBOX */}
            {activeTab === 'sql' && (
              <motion.div
                key="sql-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left panel: SQL query select cards */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-4">
                    <span className={`text-xs font-mono font-black uppercase tracking-wider block ${isDark ? 'text-slate-350' : 'text-slate-700'}`}>SELECT ANALYTICAL QUERY</span>
                    
                    <div className="space-y-3">
                      {[
                        { id: 'cohort', headline: 'Cohort Retention Query', summary: 'Tracks monthly registered counts & processed volume cohorts using window partition functions.', statement: 'cohorts.sql' },
                        { id: 'anomaly', headline: 'Pipeline Anomaly Inspector', summary: 'Scans transaction volume aggregates for outliers exceeding 3 standard deviations.', statement: 'anomalies_flag.sql' }
                      ].map((queryOption) => (
                        <button
                          key={queryOption.id}
                          onClick={() => {
                            sound.playClick();
                            setSqlQueryType(queryOption.id as 'cohort' | 'anomaly');
                            setSqlExecuted(false);
                          }}
                          className={`w-full p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                            sqlQueryType === queryOption.id
                              ? 'bg-[#00E5FF]/5 border-[#00E5FF]/40 shadow-md'
                              : (isDark ? 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100')
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <strong className="text-sm font-sans font-bold">{queryOption.headline}</strong>
                            <span className="text-[10px] font-mono text-slate-500 font-semibold">{queryOption.statement}</span>
                          </div>
                          <p className={`text-xs font-sans leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>
                            {queryOption.summary}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SQL Execution Trigger */}
                  <button
                    onClick={runSqlQuery}
                    className="w-full py-3.5 bg-gradient-to-r from-[#00E5FF] to-blue-500 hover:shadow-[0_4px_15px_rgba(0,229,255,0.35)] font-mono text-xs font-black uppercase text-black rounded-xl cursor-pointer active:scale-97 transition-all flex items-center justify-center gap-2"
                  >
                    <Play size={12} className="text-black" />
                    Run Aggregate Analysis
                  </button>
                </div>

                {/* Right panel: SQL Query showcase cards & mock execution results */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Glassmorphic SQL query show-card */}
                  <div className={`p-5 rounded-2xl border ${
                    isDark ? 'bg-slate-950/40 border-white/5 font-mono' : 'bg-slate-50 border-slate-200 font-mono'
                  }`}>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 mb-3 border-b dark:border-white/5 pb-2">
                      <span>CONSOLE QUERY WRITER</span>
                      <span>DIALECT: PostgreSQL 15</span>
                    </div>

                    <div className="text-[11px] leading-relaxed max-h-[160px] overflow-y-auto styles_custom_scroll max-w-full">
                      {sqlQueryType === 'cohort' ? (
                        <pre className="text-cyan-455 dark:text-cyan-400">
{`-- Track cohorts aggregate initial volume metrics
WITH cohorts AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', r_date) AS cohort,
    FIRST_VALUE(load_gb) OVER(
      PARTITION BY user_id ORDER BY creation_date
    ) AS initial_vol
  FROM dwh_analytics.user_metrics
)
SELECT 
  cohort,
  COUNT(DISTINCT user_id) AS cohort_size,
  ROUND(AVG(initial_vol), 2) AS avg_gb
FROM cohorts
GROUP BY 1 ORDER BY 1 DESC;`}
                        </pre>
                      ) : (
                        <pre className="text-cyan-455 dark:text-cyan-400">
{`-- Find outliers outside 3 standard deviations
WITH metrics AS (
  SELECT 
    user_id,
    SUM(vol_usd) AS volume,
    AVG(SUM(vol_usd)) OVER() AS avg_vol,
    STDDEV(SUM(vol_usd)) OVER() AS std_vol
  FROM billing.ledger GROUP BY 1
)
SELECT 
  user_id,
  VOLUME,
  (VOLUME - avg_vol) / std_vol AS anomaly_z
FROM metrics
WHERE VOLUME > avg_vol + 3 * std_vol;`}
                        </pre>
                      )}
                    </div>
                  </div>

                  {/* Mock Query Execution Result Table */}
                  <div className={`p-5 rounded-2xl border space-y-4 ${
                    isDark ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">QUERY_EXECUTION_RESULTS</span>
                      {sqlExecuted ? (
                        <span className="text-[9px] font-mono text-emerald-400 font-black animate-pulse flex items-center gap-1">
                          <CheckCircle2 size={10} />
                          EXEC_SUCCESS (0.015s)
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-amber-500 animate-pulse">Awaiting aggregate execution...</span>
                      )}
                    </div>

                    <div className="overflow-x-auto min-h-[110px] flex items-center justify-center">
                      {sqlExecuted ? (
                        <table className="w-full text-left text-[11px] font-mono">
                          <thead>
                            <tr className={`border-b ${isDark ? 'border-white/5 text-slate-500' : 'border-slate-200 text-slate-500'}`}>
                              {sqlQueryType === 'cohort' ? (
                                <>
                                  <th className="pb-2">Cohort Month</th>
                                  <th className="pb-2">Onboard Count</th>
                                  <th className="pb-2">Total Load (GB)</th>
                                  <th className="pb-2">Retention</th>
                                </>
                              ) : (
                                <>
                                  <th className="pb-2">Outlier User</th>
                                  <th className="pb-2">Z-Score Index</th>
                                  <th className="pb-2">Billing Volume</th>
                                  <th className="pb-2">Flag Reason</th>
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {sqlQueryType === 'cohort' ? (
                              cohortResults.map((row, i) => (
                                <tr key={i} className={`border-b last:border-0 ${isDark ? 'border-white/5' : 'border-slate-200/50'}`}>
                                  <td className="py-2 text-[#00E5FF] font-semibold">{row.cohort_month}</td>
                                  <td className="py-2">{row.total_users}</td>
                                  <td className="py-2">{row.onboard_gb}</td>
                                  <td className="py-2 font-bold text-emerald-400">{row.retention_pct}</td>
                                </tr>
                              ))
                            ) : (
                              anomalyResults.map((row, i) => (
                                <tr key={i} className={`border-b last:border-0 ${isDark ? 'border-white/5' : 'border-slate-200/50'}`}>
                                  <td className="py-2 text-pink-400 font-semibold">{row.user_id}</td>
                                  <td className="py-2 font-black text-rose-500">{row.anomaly_score}</td>
                                  <td className="py-2">{row.txn_volume}</td>
                                  <td className="py-2"><span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-450 border border-rose-500/20 text-[9px]">{row.flag_type}</span></td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-500 py-4 text-center">
                          <Database size={24} className="opacity-40 animate-bounce" />
                          <span className="text-xs font-sans">Click &quot;Run Aggregate Analysis&quot; to execute SQL procedures</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
