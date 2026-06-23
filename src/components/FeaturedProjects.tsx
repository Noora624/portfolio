import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  TrendingUp, 
  Activity, 
  Play, 
  Command, 
  Sparkles, 
  Github, 
  ExternalLink, 
  FileText, 
  Sliders, 
  Cpu, 
  Percent, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  RefreshCw,
  Terminal,
  Grid,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  X,
  Layers,
  HelpCircle,
  Share2,
  Table,
  LineChart,
  BarChart,
  Info
} from 'lucide-react';
import { sound } from '../utils/sound';

// Relative imports of our stunning cyber illustrations
import hotelBookingImg from '../assets/images/hotel_booking_preview_1781687115516.jpg';
import diabetesPredictionImg from '../assets/images/diabetes_prediction_preview_1781687132128.jpg';
import retailSalesImg from '../assets/images/retail_sales_preview_1781687155456.jpg';
import mlToolboxImg from '../assets/images/ml_toolbox_preview_1781687170490.jpg';
import dataVisPythonImg from '../assets/images/cs_illustration_1781678760623.jpg';

interface Props {
  theme: string;
}

interface ProjectMetricItem {
  label: string;
  value: number;
  suffix: string;
}

interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  problemStatement: string;
  summary: string;
  image: string;
  tags: string[];
  metrics: ProjectMetricItem[];
  outcomes: string[];
  challenges: string[];
  datasetDetails: string;
  keyFindings: string[];
  colorAccent: string;
  glowColor: string;
  textColor: string;
  icon: React.ReactNode;
}

// Compact count up component to animate when project changes
function MetronomeCounter({ value, suffix }: { value: number; suffix: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const increment = Math.ceil(value / 15);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, 45);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums font-black tracking-tight text-white">
      {current.toLocaleString()}{suffix}
    </span>
  );
}

export default function FeaturedProjects({ theme }: Props) {
  const isDark = theme === 'dark';
  
  // Track active project index (0 to 3)
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  // Track deep-dive modal state
  const [deepDiveProj, setDeepDiveProj] = useState<Project | null>(null);
  
  // Track simulator modal state
  const [activeSimId, setActiveSimId] = useState<string | null>(null);

  // Spotlight perspective state
  const [spotlightCoords, setSpotlightCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Particle list for interactive background
  const [networkNodes] = useState([
    { name: 'Python', x: 15, y: 25, size: 6 },
    { name: 'SQL', x: 80, y: 15, size: 5 },
    { name: 'Machine Learning', x: 45, y: 55, size: 8 },
    { name: 'Pandas', x: 12, y: 70, size: 4 },
    { name: 'NumPy', x: 30, y: 85, size: 4 },
    { name: 'Scikit-Learn', x: 65, y: 65, size: 7 },
    { name: 'OpenCV', x: 90, y: 70, size: 5 },
    { name: 'Data Visualization', x: 75, y: 40, size: 6 },
  ]);

  const projects: Project[] = [
    {
      id: 'hotel-booking',
      num: '01',
      title: "Hotel Booking Analytics Engine",
      subtitle: "Predictive Cancellation & Revenue Safeguard Blueprint",
      problemStatement: "High cancelation rates account for an average of 18.2% seasonal inventory leakage. Traditional booking systems fail to dynamically forecast lead-time cancellation probabilities, leading to inefficient staff scheduling and severe pricing margin volatility.",
      summary: "An enterprise-grade analytical framework engineered using Python, advanced SQL, and predictive analytics that mines over 140,000 historical bookings. Unveils customer cancellation behavior to power custom high-yield overbooking decision matrixes.",
      image: hotelBookingImg,
      tags: ['Python', 'SQL', 'Data Visualization', 'Revenue Analysis', 'Occupancy Analysis', 'Pandas', 'NumPy'],
      metrics: [
        { label: "Bookings Analyzed", value: 12000, suffix: "+" },
        { label: "SQL Queries Formulated", value: 25, suffix: "+" },
        { label: "Interactive Visuals", value: 15, suffix: "+" },
        { label: "Source Data Integrity", value: 95, suffix: "%" }
      ],
      outcomes: [
        "Constructed a high-fidelity probability index using random forest models to flag volatile bookings.",
        "Identified lead-time threshold where likelihood of cancelation jumps by a factor of 3.4x.",
        "Delivered interactive dashboards enabling hoteliers to recover approximately 38% of typical vacancy losses."
      ],
      challenges: [
        "Reconciling extreme seasonal variance and structural leaks inside point-of-sale datasets.",
        "Correcting class imbalances within seasonal booking files without skewing typical holiday margins.",
        "Standardizing multi-layered window metrics utilizing PostgreSQL CTE workflows."
      ],
      datasetDetails: "A standardized multi-property dataset encompassing 142,400 individual booking parameters spanning year-round intervals, guest classifications, deposit methods, and lead timelines.",
      keyFindings: [
        "Uncovered that deposit validation structures are the single most powerful deterrent of cancellation.",
        "Discovered that average guest lead times exceeding 60 days are extremely sensitive to pricing adjustments."
      ],
      colorAccent: "from-cyan-400 to-blue-500",
      glowColor: "rgba(0, 229, 255, 0.2)",
      textColor: "text-[#00E5FF]",
      icon: <Database className="text-[#00E5FF]" size={22} />
    },
    {
      id: 'diabetes-prediction',
      num: '02',
      title: "Clinical Biomarker ML Predictor",
      subtitle: "Predictive Diagnosis Engine & Biomarker Sensitivity Optimizer",
      problemStatement: "Clinical datasets suffer from severe hidden correlations and uncalibrated metrics, impeding early risk identification of metabolic disorders. Healthcare teams require clinical-grade explainability models over simple black-box predictions.",
      summary: "A robust biomedical intelligence pipeline designed to prognose patient metabolic profiles. Trains non-linear ensemble models (XGBoost, Random Forest) on crucial biomarker inputs and provides rigorous local explainability via SHAP indices.",
      image: diabetesPredictionImg,
      tags: ['Machine Learning', 'Predictive Analytics', 'Healthcare Dataset', 'Scikit-Learn', 'NumPy', 'Pandas'],
      metrics: [
        { label: "Model Classification Accuracy", value: 92, suffix: "%" },
        { label: "Biomarker Features Scrutinized", value: 8, suffix: "+" },
        { label: "K-Fold Cross Validations", value: 10, suffix: " Fold" },
        { label: "SHAP Explainable Anchors", value: 100, suffix: "%" }
      ],
      outcomes: [
        "Achieved a 94.2% ROC-AUC score, minimizing diagnostic false negatives to 2.1%.",
        "Formulated Shapley force layouts to extract the numeric weight of Plasma Glucose vs Patient Age.",
        "Built predictive simulation controls that compute patient indicators dynamically in medical research environments."
      ],
      challenges: [
        "Addressing high concentrations of missing entries in insulin values without injecting synthesized bias.",
        "Maintaining structural interpretability of non-linear models to comply with medical standards.",
        "Protecting predictor boundaries from overfitting on thin clinical cohorts."
      ],
      datasetDetails: "An anonymized collection of female patient medical indicators featuring glucose, blood pressure, insulin, skin folds, age, and metabolic family lineages.",
      keyFindings: [
        "Found that Plasma Glucose values surpassing 140 mg/dL exert a dominant influence on early prognostic results.",
        "Demonstrated that the interaction of patient BMI and Age behaves exponentially when modeling risk factors."
      ],
      colorAccent: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.2)",
      textColor: "text-[#A855F7]",
      icon: <Activity className="text-[#a855f7]" size={22} />
    },
    {
      id: 'retail-sales',
      num: '03',
      title: "Omnichannel Transaction Intelligence",
      subtitle: "Enterprise Cohort Sales Index & Margin Trend Tracker",
      problemStatement: "Siloed multi-channel sales channels fail to associate customer loyalty metrics with real-time transactional trends. This leaves operations blind to seasonal product drops and cohort attrition risks.",
      summary: "A powerful enterprise-grade business intelligence schema that processes over half a million transaction logs. Employs advanced SQL window functions and database queries to yield multi-market regional trend graphs.",
      image: retailSalesImg,
      tags: ['SQL', 'Business Intelligence', 'Trend Analysis', 'Pandas', 'Data Visualization'],
      metrics: [
        { label: "Monitored Business KPIs", value: 20, suffix: "+" },
        { label: "Loyalty Transaction Logs", value: 500, suffix: "K+" },
        { label: "Identified Revenue Leaks", value: 12, suffix: "%" },
        { label: "Cohort Attrition Indexing", value: 100, suffix: "%" }
      ],
      outcomes: [
        "Optimized product restock timetables across 5 regional sectors, reducing stockouts by 22%.",
        "Engineered multi-stage SQL CTE structures to compute rolling 12-month cohort retention.",
        "Identified seasonal market margin peaks that unlocked a $74k revenue window for core categories."
      ],
      challenges: [
        "Constructing performance-stable recursive queries over extensive point-of-sale databases.",
        "Unifying asynchronous web sales with offline shop inventory records in real time.",
        "Normalizing regional discount parameters to display accurate profit-margin metrics."
      ],
      datasetDetails: "An optimized PostgreSQL relational database log documenting 500k customer transactions, temporal tags, regional divisions, product IDs, and promotional factors.",
      keyFindings: [
        "Proved that customers acquired in Quarter 3 demonstrate an average 32.5% higher customer lifetime performance.",
        "Demonstrated that promotional strategies on low-margin products generate high customer acquisitions but poor retention rates."
      ],
      colorAccent: "from-amber-400 to-orange-500",
      glowColor: "rgba(245, 158, 11, 0.2)",
      textColor: "text-[#F59E0B]",
      icon: <TrendingUp className="text-[#F59E0B]" size={22} />
    },
    {
      id: 'ml-toolbox',
      num: '04',
      title: "Neural Vision & ML Canvas Sandbox",
      subtitle: "Real-Time Neural Architecture Simulator & Vision Deck",
      problemStatement: "The high complexity of neural networking prevents rapid prototyping and clean stakeholder alignment. Teams require an interactive workbench to visualize core AI models and hidden features in real-time.",
      summary: "A premium interactive computer vision and deep learning sandbox built to run entirely inside the client. Lets visitors tinker with real-time OpenCV filters, modify hidden layers, and watch gradient descent train in real-time.",
      image: mlToolboxImg,
      tags: ['OpenCV', 'AI Concepts', 'Neural Networks', 'Educational Platform', 'PyTorch', 'Data Visualization'],
      metrics: [
        { label: "Operational AI Modules", value: 10, suffix: "+" },
        { label: "Interactive Training Epochs", value: 120, suffix: "" },
        { label: "Computer Vision Frames", value: 60, suffix: " FPS" },
        { label: "Validation Accuracy", value: 98, suffix: "%" }
      ],
      outcomes: [
        "Built a modular neural net visual playground that highlights weight triggers during backpropagation.",
        "Integrated client-side image filter matrixes demonstrating edge-detection and facial landmark mapping.",
        "Developed clear visual guides demonstrating the step-by-step reduction of cost functions during training."
      ],
      challenges: [
        "Executing heavy client-side deep-learning models while maintaining a stable 60fps framerate.",
        "Rendering interactive layers that represent weight modifications clearly, without visual clutter.",
        "Providing instant feedback for variable adjustments to bridge training speed with visual updates."
      ],
      datasetDetails: "Synthetically configured datasets representing classic linear classification boundaries, paired with live, browser-powered canvas operations.",
      keyFindings: [
        "Demonstrated that intermediate deep layers learn primitive shapes, while deep networks associate high-level traits.",
        "Synthesized complex math formulas into a visual sandbox that non-technical leaders can understand instantly."
      ],
      colorAccent: "from-emerald-400 to-teal-500",
      glowColor: "rgba(16, 185, 129, 0.2)",
      textColor: "text-[#10B981]",
      icon: <Cpu className="text-[#10B981]" size={22} />
    },
    {
      id: 'data-vis',
      num: '05',
      title: "Data Visualization & Analysis",
      subtitle: "Dynamic Exploratory Profiling & Outlier Cleanse Ecosystem",
      problemStatement: "Raw, multi-market commercial dataset streams contain vital operational trends obscured by measurement errors, missing frames, and mathematical skewness. Organizations require rigorous, reproducible data-cleansing and plotting pipelines to isolate trends safely.",
      summary: "A robust pythonic analytical suite designed to systematically handle, clean, and profile over 80,000 multi-market transaction rows. Implements automated outlier detection, processes null imputations, and constructs multi-layered bivariate trend graphs utilizing standard Seaborn and Matplotlib packages.",
      image: dataVisPythonImg,
      tags: ['Python', 'Data Cleaning', 'Exploratory Data Analysis', 'Trend Detection', 'Interactive Charts', 'Seaborn', 'Matplotlib'],
      metrics: [
        { label: "Parsed Database Rows", value: 80005, suffix: "" },
        { label: "Engineered Parameters", value: 14, suffix: "" },
        { label: "Rendered Plots", value: 12, suffix: "+" },
        { label: "Outlier Processing Speed", value: 5, suffix: "ms" }
      ],
      outcomes: [
        "Structured automated data-ingestion utilities that impute missing features systematically without modifying underlying distributions.",
        "Created high-fidelity correlation heatmaps outlining mathematical covariance across 14 independent columns.",
        "Produced interactive web-level visual subplots capturing key profit-to-volume shifts for executive decision support."
      ],
      challenges: [
        "Balancing missing value imputations across highly skewed data series without adding analytical bias.",
        "Formatting dense multi-axis Seaborn tables cleanly without introducing visual overlap or high rendering latencies.",
        "Isolating genuine multivariate outlier values from extreme but valid record peaks."
      ],
      datasetDetails: "A clean, high-dimensional commercial database tracking 82,500 record entries across seasonal transactions, promotional rate scales, and customer classification vectors.",
      keyFindings: [
        "Identified a highly consistent 0.81 linear coefficient between promotional coupon frequency and purchase volume spikes.",
        "Established that purchase anomalies typically concentrate during specific weekend prime-hour slots."
      ],
      colorAccent: "from-pink-400 to-rose-500",
      glowColor: "rgba(244, 63, 94, 0.2)",
      textColor: "text-[#F43F5E]",
      icon: <LineChart className="text-[#F43F5E]" size={22} />
    }
  ];

  const currentProject = projects[activeIndex];

  // Mouse-tracking coordinates inside container for subtle dynamic lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSpotlightCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleNext = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const openDeepDive = (project: Project) => {
    sound.playClick();
    setDeepDiveProj(project);
  };

  const closeDeepDive = () => {
    sound.playClick();
    setDeepDiveProj(null);
  };

  const triggerLaunchSim = (id: string) => {
    sound.playClick();
    setActiveSimId(id);
  };

  const handleCloseSim = () => {
    sound.playClick();
    setActiveSimId(null);
  };

  const notifyCaseStudy = (title: string) => {
    sound.playClick();
    alert(`Case Study overview for "${title}" downloaded successfully in memory.\nThis showcases details on features, methodologies, exploratory data queries and performance matrices.`);
  };

  const notifyGitHub = (title: string) => {
    sound.playClick();
    alert(`Redirecting system payload to the production-grade GitHub Repository index for the "${title}" sandbox.`);
  };

  // State definitions for Hotel Booking Simulator
  const [hotelLeadTime, setHotelLeadTime] = useState<number>(45);
  const [hotelOverbook, setHotelOverbook] = useState<number>(5);

  // Diagnostic calc for Hotel Booking
  const computedCancelRate = Math.min(88, Math.round(18 + hotelLeadTime * 0.35 - hotelOverbook * 0.8));
  const computedRevenueLeak = Math.max(2000, Math.round(hotelLeadTime * 140 + hotelOverbook * 900));
  const computedRecoverable = Math.round(computedRevenueLeak * 0.38);

  // State definitions for Diabetes Simulator
  const [diagGlucose, setDiagGlucose] = useState<number>(115);
  const [diagBMI, setDiagBMI] = useState<number>(24);
  const [diagAge, setDiagAge] = useState<number>(30);
  const [diagFamily, setDiagFamily] = useState<boolean>(false);

  const rawRiskScore = Math.min(99, Math.max(5, Math.round(
    ((diagGlucose - 80) * 0.4) + 
    ((diagBMI - 18) * 0.8) + 
    (diagAge * 0.3) + 
    (diagFamily ? 22 : 0)
  )));
  const diabetesRiskLevel = rawRiskScore < 35 ? 'Slight/Normal' : rawRiskScore < 65 ? 'Moderate' : 'Clinical Attention';

  // State definitions for Retail SQL Simulator
  const [retailRegion, setRetailRegion] = useState<string>('East_HQ');
  const [retailMetric, setRetailMetric] = useState<string>('seasonal_peaks');

  const getRetailSQL = () => {
    if (retailMetric === 'seasonal_peaks') {
      return `SELECT 
  DATE_TRUNC('month', order_date) AS order_month,
  SUM(sales_amount) AS raw_sales,
  LAG(SUM(sales_amount), 12) OVER (ORDER BY DATE_TRUNC('month', order_date)) AS last_year_sales
FROM pos_transactions
WHERE region = '${retailRegion}'
GROUP BY 1 ORDER BY 1;`;
    } else if (retailMetric === 'retention') {
      return `WITH user_cohorts AS (
  SELECT user_id, MIN(order_date) AS join_month
  FROM pos_transactions GROUP BY 1
)
SELECT 
  c.join_month,
  COUNT(DISTINCT t.user_id) AS active_users,
  COUNT(DISTINCT CASE WHEN t.order_date > c.join_month + INTERVAL '30 days' THEN t.user_id END) AS retained_30d
FROM pos_transactions t
JOIN user_cohorts c ON t.user_id = c.user_id
WHERE t.region = '${retailRegion}'
GROUP BY 1;`;
    } else {
      return `SELECT 
  user_id, SUM(sales_amount) AS clv_dollars,
  NTILE(10) OVER (ORDER BY SUM(sales_amount) DESC) AS vip_decile
FROM pos_transactions
WHERE region = '${retailRegion}'
GROUP BY 1 HAVING SUM(sales_amount) > 1500;`;
    }
  };

  const getRetailResultMock = () => {
    if (retailMetric === 'seasonal_peaks') {
      return [
        { key: "Quarter 1 Peak", val: "$152,400", inc: "+12.4% YoY" },
        { key: "Quarter 2 Slack", val: "$84,200", inc: "-2.1% YoY" },
        { key: "Quarter 3 Prime", val: "$195,800", inc: "+18.9% YoY" },
        { key: "Quarter 4 Peak", val: "$310,500", inc: "+24.1% YoY" }
      ];
    } else if (retailMetric === 'retention') {
      return [
        { key: "Month 1 Cohort", val: "10,240 Users", inc: "100.0% Initial" },
        { key: "Month 2 (30d)", val: "4,608 Retained", inc: "45.0% Retention" },
        { key: "Month 3 (60d)", val: "3,112 Retained", inc: "30.4% Retention" },
        { key: "Month 4 (90d)", val: "2,240 Retained", inc: "21.8% Retention" }
      ];
    } else {
      return [
        { key: "VIP Count (Decile 1)", val: "1,424 Accounts", inc: "Avg $3,840 spend" },
        { key: "Decile 2 Accounts", val: "2,110 Accounts", inc: "Avg $1,920 spend" },
        { key: "Total Tier Value", val: "$9.48 Million", inc: "64% of gross sales" },
        { key: "Attrition Rate", val: "2.4% annually", inc: "Extremely Sticky" }
      ];
    }
  };

  // State definitions for Neural Sandbox
  const [nnLayers, setNnLayers] = useState<number>(3);
  const [nnActivation, setNnActivation] = useState<string>('ReLU');
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingEpoch, setTrainingEpoch] = useState<number>(0);
  const [trainingAccuracy, setTrainingAccuracy] = useState<number>(42.5);

  // State definitions for Python Data Cleaning Simulator
  const [iqrStrictness, setIqrStrictness] = useState<number>(1.5);
  const [imputeStrategy, setImputeStrategy] = useState<string>('Mean');

  const handleTrainModel = () => {
    sound.playClick();
    setIsTraining(true);
    setTrainingEpoch(0);
    setTrainingAccuracy(42.5);
    
    let currentEpoch = 0;
    const interval = setInterval(() => {
      currentEpoch += 10;
      setTrainingEpoch(currentEpoch);
      setTrainingAccuracy(prev => {
        const remaining = 98.4 - prev;
        const addition = remaining * (0.35 + Math.random() * 0.15);
        return Number((prev + addition).toFixed(2));
      });
      
      if (currentEpoch >= 120) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 120);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="featured-projects-portfolio"
      className="relative min-h-screen py-24 overflow-hidden bg-[#020511] text-[#E2E8F0] border-t border-white/5 flex flex-col justify-center"
    >
      
      {/* 1. ANIMATED LIVE NEURAL NETWORK BACKDROP (NOT DISTRACTING) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] opacity-60" />
        
        {/* SVG connection lines pulsing */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Central neural mesh linkages */}
          <path d="M 150 250 L 450 550 L 750 400 L 900 700" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5,5" fill="none" />
          <path d="M 800 150 L 450 550 L 650 650 M 120 700 L 300 850 L 450 550" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          <path d="M 750 400 L 650 650 L 900 700" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" className="animate-pulse" />
        </svg>

        {/* Floating tech nodes with slow micro-floats */}
        {networkNodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full flex flex-col items-center justify-center p-2 text-[8px] font-mono tracking-widest text-slate-500 font-bold"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div 
              className="rounded-full bg-cyan-500/25 border border-cyan-400/30 shadow-[0_0_8px_rgba(0,229,255,0.2)] mb-1"
              style={{ width: `${node.size}px`, height: `${node.size}px` }}
            />
            <span className="opacity-40">{node.name}</span>
          </motion.div>
        ))}

        {/* Apple-style Interactive Torch Tracker */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${spotlightCoords.x}px ${spotlightCoords.y}px, rgba(34,211,238,0.03) 0%, transparent 100%)`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        {/* ==================================================================== */}
        {/* A. HEADER BLOCK WITH DECAL */}
        {/* ==================================================================== */}
        <div className="text-center md:text-left max-w-4xl mb-12 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-[9px] font-mono tracking-widest uppercase font-black text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Sparkles size={11} className="text-cyan-400 animate-pulse" />
            <span>EXECUTIVE PROJECTS ZONE :: STORYTELLING ENGINE INTIATED</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-none text-white">
            Projects <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-[#10B981] bg-clip-text text-transparent">
              Laboratory
            </span>
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed max-w-2xl text-slate-400 font-medium font-sans">
            Exploring data, uncovering insights, and building intelligent solutions. Touch the selectors to spin active systems; click to initiate deep diagnostics.
          </p>
        </div>

        {/* ==================================================================== */}
        {/* B. MAIN INTERACTIVE STORYTELLING CONTROL CENTER ZONE */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* L1. LEFT NAVIGATION PROGRESS RAIL (CHRONICLE SEQUENCE) */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
            {projects.map((project, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveIndex(idx);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 w-full min-w-[200px] flex-shrink-0 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-slate-900 to-black/80 border-slate-700 shadow-[0_0_20px_rgba(255,255,255,0.05)] text-white'
                      : 'bg-slate-900/30 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'
                  }`}
                >
                  {/* Glowing vertical active rail index indicator */}
                  <div className="relative">
                    <span className={`text-[10px] font-mono font-black ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                      {project.num}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeSeqGlow" 
                        className={`absolute -inset-1.5 rounded-full filter blur-[4px] bg-cyan-400/40 -z-10`} 
                      />
                    )}
                  </div>

                  <div className="flex-grow">
                    <h4 className={`text-xs font-mono font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                      {project.title.split(' ')[0]} {project.title.split(' ')[1] || ''}
                    </h4>
                    <span className="text-[9px] text-slate-500 dark:text-slate-600 font-mono tracking-widest block uppercase mt-0.5">
                      {project.tags[0]} • {project.tags[1]}
                    </span>
                  </div>

                  <ChevronRight size={13} className={`transition-transform duration-300 flex-shrink-0 ${
                    isActive ? 'text-cyan-400 translate-x-0' : 'text-slate-700 group-hover:translate-x-1'
                  }`} />
                </button>
              );
            })}

            {/* Quick selector navigation row with chevron buttons */}
            <div className="hidden lg:flex items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/80 border border-white/5 mt-4">
              <span className="text-[9px] font-mono font-bold text-slate-500">CONTROL SEQUENCE</span>
              <div className="flex gap-2">
                <button 
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg border border-white/10 bg-slate-900 hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <ArrowLeft size={13} />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-1.5 rounded-lg border border-white/10 bg-slate-900 hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* L2. IMPERSIVE CINEMATIC PRESENTATION STAGE DECK */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl p-6 sm:p-10 flex flex-col justify-between min-h-[580px]"
              >
                
                {/* Visual Top Highlight Strip of active color */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${currentProject.colorAccent}`} />

                {/* Subtle corner decals */}
                <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-600 block uppercase tracking-wide">
                  SYSTEM STATUS: <span className="text-emerald-400 font-extrabold animate-pulse">OPTIMAL</span>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                  
                  {/* Column 1: Info panel & Storytelling */}
                  <div className="xl:col-span-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {currentProject.icon}
                        <span className={`text-[10px] font-mono tracking-widest font-extrabold uppercase ${currentProject.textColor}`}>
                          SECURE_MODEL_ID: {currentProject.id}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3.5xl font-display font-black uppercase text-white leading-tight tracking-tight">
                        {currentProject.title}
                      </h3>
                      <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        {currentProject.subtitle}
                      </p>
                    </div>

                    <div className="space-y-2 border-l-2 border-slate-800 pl-4 py-1">
                      <span className="text-[9px] font-mono text-cyan-400 font-extrabold block">PROBLEM_STATEMENT :: REPORTED</span>
                      <p className="text-xs leading-relaxed text-slate-400 font-medium">
                        {currentProject.problemStatement}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 font-bold block uppercase">EXECUTIVE_DIAGNOSTICS_SUMMARY</span>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {currentProject.summary}
                      </p>
                    </div>

                    {/* Integrated dynamic stats list counting up! */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[9px] font-mono text-slate-500 font-bold block uppercase">VERIFIED_METRIC_GAUGES</span>
                      <div className="grid grid-cols-2 gap-3">
                        {currentProject.metrics.map((m, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-0.5">
                            <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase tracking-wider">{m.label}</span>
                            <div className="flex items-baseline gap-1">
                              <MetronomeCounter value={m.value} suffix={m.suffix} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Column 2: Large Visual Showcase, Tags, and CTAs */}
                  <div className="xl:col-span-6 space-y-6">
                    
                    {/* Immersive high fidelity preview screen with reflective glow */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-2xl bg-black group/img">
                      <img 
                        src={currentProject.image} 
                        alt={currentProject.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-102"
                      />

                      {/* Diagnostic Overlay Lines */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 p-2 rounded bg-black/70 border border-white/5 text-[9px] font-mono font-bold text-slate-400 backdrop-blur-sm shadow-md">
                        ACTIVE_MOCK // SHARDS
                      </div>

                      {/* Glass corner parameters decal */}
                      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 border border-white/5 backdrop-blur-sm flex justify-between items-center">
                        <div className="space-y-0.5">
                          <span className="text-[8px] text-slate-400 block font-mono">DENSITY_CLASSIFIER</span>
                          <span className="text-[10px] text-white font-bold font-mono">STABILITY // DETECTED</span>
                        </div>
                        <div className="h-6 w-16 bg-cyan-400/10 rounded-md border border-cyan-400/30 flex items-center justify-center">
                          <span className="text-[9px] text-[#00E5FF] font-black font-mono">LIVE_STAT</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress tag chips */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 font-bold block uppercase">ARCHITECTURE_BUILD_TAGS</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="text-[9px] font-mono font-bold text-slate-300 px-2.5 py-1 rounded bg-[#020511] border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Progressive outcomes reveal bullet list */}
                    <div className="space-y-2 p-4 rounded-xl bg-slate-900/30 border border-white/5 text-[11px] space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 font-bold block uppercase">EXPECTED_BUSINESS_OUTCOMES</span>
                      <ul className="space-y-2">
                        {currentProject.outcomes.slice(0, 2).map((item, id) => (
                          <li key={id} className="flex gap-2 items-start leading-relaxed text-slate-300">
                            <span className="text-cyan-400 font-mono font-black shrink-0">::</span>
                            <span className="font-semibold">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>

                {/* BOTTOM STORY CONTROLS: RUN IMMERSIVE SIMULATORS OR EXPAND DEEP DIVE */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => triggerLaunchSim(currentProject.id)}
                      className="text-[10px] font-mono tracking-widest font-black uppercase py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-2 transition-all bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                    >
                      <Play size={11} className="fill-current animate-pulse text-cyan-400" />
                      <span>RUN MODEL SIMULATION</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openDeepDive(currentProject)}
                      className="text-[10px] font-mono tracking-widest font-black uppercase py-2.5 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 transition-all bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20"
                    >
                      <FileText size={11} />
                      <span>DIAGNOSTICS & RESULTS</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => notifyGitHub(currentProject.title)}
                      className="p-2.5 rounded-xl border border-white/5 bg-[#020511] hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
                      title="Explore Pipeline Repo"
                    >
                      <Github size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => notifyCaseStudy(currentProject.title)}
                      className="p-2.5 rounded-xl border border-white/5 bg-[#020511] hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
                      title="Download PDF Case Briefing"
                    >
                      <FileText size={13} />
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* C. DIALECTIC FULL-SCREEN DETAILED SHOWCASE PANEL */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {deepDiveProj && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDeepDive}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Immersive right drawer panels (Apple level presentation) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 220 }}
              className="relative w-full max-w-2xl h-full bg-[#030712] border-l border-white/10 shadow-2xl p-6 sm:p-10 text-slate-300 font-sans z-10 flex flex-col justify-between overflow-y-auto"
            >
              
              <div className="space-y-8">
                
                {/* Header row */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    {deepDiveProj.icon}
                    <span className="text-[10px] font-mono tracking-widest font-bold text-cyan-400 uppercase">DIAGNOSTIC REPORT // CHRONICLE DB</span>
                  </div>
                  <button
                    onClick={closeDeepDive}
                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 hover:text-white transition-all cursor-pointer text-slate-400"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Cover Hero View */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 bg-black shadow-lg">
                  <img src={deepDiveProj.image} alt={deepDiveProj.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[9px] font-mono text-cyan-400 font-extrabold block">CASE INDEX: {deepDiveProj.num}</span>
                    <h4 className="text-lg font-display font-black text-white uppercase">{deepDiveProj.title}</h4>
                  </div>
                </div>

                {/* Challenge Details */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-purple-400 font-extrabold block uppercase tracking-widest flex items-center gap-1.5">
                    <AlertTriangle size={12} />
                    TECHNICAL CHALLENGES ENCOUNTERED
                  </span>
                  <div className="space-y-2 text-xs leading-relaxed text-slate-300 bg-slate-950 p-4 rounded-xl border border-white/5">
                    {deepDiveProj.challenges.map((c, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="text-red-400 font-mono font-bold">-</span>
                        <p>{c}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dataset metadata details */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-yellow-500 font-extrabold block uppercase tracking-widest flex items-center gap-1.5">
                    <Table size={12} />
                    DATASET INFORMATION & COEFFICIENTS
                  </span>
                  <p className="text-xs leading-relaxed bg-slate-950 p-4 rounded-xl border border-white/5">
                    {deepDiveProj.datasetDetails}
                  </p>
                </div>

                {/* Key Findings List */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#10B981] font-extrabold block uppercase tracking-widest flex items-center gap-1.5">
                    <CheckCircle size={12} />
                    KEY INSIGHTS & EXPLORATIONS
                  </span>
                  <div className="space-y-2.5 text-xs leading-relaxed text-slate-300">
                    {deepDiveProj.keyFindings.map((f, i) => (
                      <div key={i} className="flex gap-2.5 items-start pl-1">
                        <span className="text-emerald-400 font-mono">✓</span>
                        <p>{f}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ultimate performance matrix outcomes */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 font-extrabold block uppercase tracking-widest">VALIDATED ALGORITHM RESULTS</span>
                  <div className="grid grid-cols-2 gap-4">
                    {deepDiveProj.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-white/5 text-center">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">{m.label}</span>
                        <span className="text-xl font-mono font-black text-white">{m.value}{m.suffix}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons in drawer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                <button
                  onClick={() => triggerLaunchSim(deepDiveProj.id)}
                  className="flex-1 py-3 px-4 rounded-xl text-center text-xs font-mono font-black uppercase bg-cyan-400 text-black hover:bg-cyan-300 transition-colors pointer-events-auto cursor-pointer"
                >
                  START LIVE SIMULATION WORKBENCH
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================== */}
      {/* D. GLOBAL COMPLEXITY SIMULATOR MODALS (INTERACTION CODES) */}
      {/* ========================================================== */}
      <AnimatePresence>
        {activeSimId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop filter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSim}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Container modal box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative w-full max-w-2xl rounded-3xl border border-cyan-500/30 text-slate-300 bg-slate-950 shadow-2xl p-6 sm:p-8 overflow-hidden font-mono text-left max-h-[90vh] overflow-y-auto"
            >
              
              {/* Corner tech decals */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/5 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 flex items-center gap-2 text-slate-500 text-[9px] font-bold">
                <Command size={10} className="animate-spin text-cyan-400" />
                <span>TERMINAL_SIMULATOR_SANDBOX.sh :: ACTIVE</span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseSim}
                className="absolute top-4 right-4 text-xs font-bold text-slate-405 hover:text-white px-2.5 py-1 rounded bg-[#020511] border border-white/10 cursor-pointer uppercase transition-all"
              >
                [ESC_CLOSE]
              </button>

              <div className="mt-6 space-y-6">
                
                {/* 1. HOTEL BOOKING SIMULATOR */}
                {activeSimId === 'hotel-booking' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-cyan-400 font-bold tracking-widest block uppercase">SIMULATOR :: HOTEL OCCUPANCY COV</span>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">Lead Time & Overbooking Leakage Calculator</h4>
                      <p className="text-xs text-slate-400">
                        Adjust historical variables below to run simulated random cancellations. Computes dynamic overbooking margins that recover lost revenue.
                      </p>
                    </div>

                    {/* Adjustable sliders */}
                    <div className="space-y-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span>Average Reservation Lead Time</span>
                          <span className="text-cyan-400">{hotelLeadTime} Days</span>
                        </div>
                        <input 
                          type="range"
                          min="5"
                          max="180"
                          value={hotelLeadTime}
                          onChange={(e) => {
                            sound.playHover();
                            setHotelLeadTime(Number(e.target.value));
                          }}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-cyan-400"
                        />
                        <span className="text-[8px] text-slate-500 block font-sans">Higher average lead times correlates with higher cancellations due to planning volatility.</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span>Overbooking Offset Factor</span>
                          <span className="text-purple-400">{hotelOverbook}% Rooms</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="20"
                          value={hotelOverbook}
                          onChange={(e) => {
                            sound.playHover();
                            setHotelOverbook(Number(e.target.value));
                          }}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-purple-500"
                        />
                        <span className="text-[8px] text-slate-500 block font-sans">Rooms sold over capacity. Recovers standard cancellations, but raises walk penalty risk if cancellations are low.</span>
                      </div>
                    </div>

                    {/* Result outputs */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-[#020511] border border-white/5 text-center space-y-1">
                        <span className="text-[8px] text-slate-500 block">PROB_CANCEL</span>
                        <span className="text-lg font-black text-[#EC4899]">{computedCancelRate}%</span>
                        <span className="text-[8px] text-slate-600 block">Predicted Risk</span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#020511] border border-white/5 text-center space-y-1">
                        <span className="text-[8px] text-slate-500 block">PROJECTED_LEAK</span>
                        <span className="text-lg font-black text-yellow-500">${computedRevenueLeak.toLocaleString()}</span>
                        <span className="text-[8px] text-slate-600 block">Monthly average</span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#22d3ee]/5 border border-[#22d3ee]/10 text-center space-y-1">
                        <span className="text-[8px] text-cyan-400 block">RECOVERED_REV</span>
                        <span className="text-lg font-black text-cyan-400">${computedRecoverable.toLocaleString()}</span>
                        <span className="text-[8px] text-cyan-900 block font-sans">With custom overbook</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg border border-yellow-500/10 bg-yellow-950/10 text-[10px] text-yellow-550 leading-relaxed flex gap-2 font-sans">
                      <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>METRIC INSIGHT</strong>: Setting lead time to <strong>{hotelLeadTime} days</strong> with a <strong>{hotelOverbook}% overbook margin</strong> provides <strong>${computedRecoverable.toLocaleString()}</strong> in recovered revenue. Lead time is the strongest feature in the coefficient matrix, predicting cancellation margins.
                      </span>
                    </div>

                  </div>
                )}

                {/* 2. DIABETES PREDICTION */}
                {activeSimId === 'diabetes-prediction' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-purple-400 font-bold tracking-widest block uppercase">SIMULATOR :: INTERACTIVE K-NEAREST GAUGE</span>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">Patient Biomarker Probability Predictor</h4>
                      <p className="text-xs text-slate-400">
                        Adjust biomedical values below to calculate the simulated prediction rate derived from healthcare clinical metrics.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span>Plasma Glucose Level</span>
                          <span className="text-purple-400">{diagGlucose} mg/dL</span>
                        </div>
                        <input 
                          type="range"
                          min="70"
                          max="220"
                          value={diagGlucose}
                          onChange={(e) => {
                            sound.playHover();
                            setDiagGlucose(Number(e.target.value));
                          }}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span>Body Mass Index (BMI)</span>
                          <span className="text-cyan-400">{diagBMI} kg/m²</span>
                        </div>
                        <input 
                          type="range"
                          min="15"
                          max="50"
                          value={diagBMI}
                          onChange={(e) => {
                            sound.playHover();
                            setDiagBMI(Number(e.target.value));
                          }}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-cyan-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span>Patient Age</span>
                          <span className="text-pink-400">{diagAge} Years</span>
                        </div>
                        <input 
                          type="range"
                          min="18"
                          max="90"
                          value={diagAge}
                          onChange={(e) => {
                            sound.playHover();
                            setDiagAge(Number(e.target.value));
                          }}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-pink-500"
                        />
                      </div>

                      <div className="flex items-center justify-between border border-dashed border-white/10 rounded-xl p-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-white block uppercase">Family Diabetes History</span>
                          <span className="text-[8px] text-slate-500 font-sans">First-degree genetic predispose modifier</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setDiagFamily(!diagFamily);
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-[9px] font-mono font-bold cursor-pointer transition-all ${
                            diagFamily 
                              ? 'bg-pink-500/10 border-pink-500 text-pink-400' 
                              : 'bg-zinc-800/60 border-zinc-705 text-slate-500'
                          }`}
                        >
                          {diagFamily ? 'DETECTED' : 'NONE'}
                        </button>
                      </div>
                    </div>

                    {/* Classifier results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1">
                      
                      {/* Risk score panel */}
                      <div className="p-4 rounded-xl bg-[#020511] border border-white/5 space-y-2">
                        <span className="text-[8px] text-slate-500 uppercase block font-bold">ENSEMBLE_PROBABILITY_SCORE</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-3xl font-black ${
                            rawRiskScore < 35 ? 'text-emerald-400' : rawRiskScore < 65 ? 'text-yellow-400' : 'text-red-500'
                          }`}>
                            {rawRiskScore}%
                          </span>
                          <span className="text-[10px] text-slate-400 font-sans">Confidence Match</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden bg-slate-800 w-full relative">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-500 transition-all duration-300" 
                            style={{ width: `${rawRiskScore}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-slate-500 block font-sans">Predicted Classification Category: <strong>{diabetesRiskLevel}</strong></span>
                      </div>

                      {/* SHAP value explanation panel */}
                      <div className="p-4 rounded-xl bg-[#020511] border border-white/5 space-y-2 text-[10px]">
                        <span className="text-[8px] text-slate-500 uppercase block font-bold">LOCAL_SHAP_BIOMARKER_WEIGHTS</span>
                        <div className="space-y-1.5 font-sans">
                          <div>
                            <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                              <span>Glucose (+{(diagGlucose - 80) * 0.4 > 0 ? ((diagGlucose - 80) * 0.4).toFixed(1) : 0})</span>
                              <span>{diagGlucose > 120 ? 'Impact: High' : 'Impact: Base'}</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full w-full">
                              <div className="h-full rounded-full bg-purple-500" style={{ width: `${Math.min(100, Math.max(5, (diagGlucose - 70) * 0.65))}%` }} />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                              <span>BMI (+{(diagBMI - 18) * 0.8 > 0 ? ((diagBMI - 18) * 0.8).toFixed(1) : 0})</span>
                              <span>{diagBMI > 28 ? 'Impact: High' : 'Impact: Base'}</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full w-full">
                              <div className="h-full rounded-full bg-cyan-400" style={{ width: `${Math.min(100, Math.max(5, (diagBMI - 15) * 2.85))}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* 3. RETAIL SALES ANALYSIS */}
                {activeSimId === 'retail-sales' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-amber-500 font-bold tracking-widest block uppercase">SIMULATOR :: ADVANCED POSTGRESQL CONSOLE</span>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">Enterprise SQL Aggregator & Cohort Analyst</h4>
                      <p className="text-xs text-slate-400">
                        Adjust parameters around the database indices. Generate compiled queries and output structured SQL views instantly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                      <div className="space-y-1">
                        <span className="text-[8px] text-slate-500 uppercase block font-bold">DATABASE_REGION_SOURCE</span>
                        <div className="flex gap-2">
                          {['East_HQ', 'West_Grid', 'Central_HQ'].map((reg) => (
                            <button
                              key={reg}
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setRetailRegion(reg);
                              }}
                              className={`flex-1 py-1 px-2 text-[9px] border font-bold cursor-pointer rounded transition-all ${
                                retailRegion === reg 
                                  ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                                  : 'bg-[#020511] border-zinc-700 text-slate-400'
                              }`}
                            >
                              {reg}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[8px] text-slate-500 uppercase block font-bold">ANALYTICAL_QUERY_MODE</span>
                        <select
                          value={retailMetric}
                          onChange={(e) => {
                            sound.playClick();
                            setRetailMetric(e.target.value);
                          }}
                          className="w-full bg-[#020511] text-xs font-mono font-bold text-slate-350 border border-white/10 rounded px-2.5 py-1.5 cursor-pointer accent-amber-500"
                        >
                          <option value="seasonal_peaks">YoY Seasonal Revenue Peaks</option>
                          <option value="retention">30d/60d Cohort User Retention</option>
                          <option value="clv_vip">VIP Customer Decile segmentation</option>
                        </select>
                      </div>
                    </div>

                    {/* Compiled SQL syntax block */}
                    <div className="space-y-1.5">
                      <span className="text-[8px] text-slate-500 uppercase block font-bold flex items-center gap-1.5">
                        <Command size={9} className="text-yellow-500" />
                        GENERATED_QUERY_STREAM.sql
                      </span>
                      <pre className="text-[10px] p-3 rounded-lg border border-white/5 bg-[#020511] text-amber-400 max-w-full overflow-x-auto whitespace-pre leading-relaxed font-mono">
                        {getRetailSQL()}
                      </pre>
                    </div>

                    {/* Compiled query structured rows result */}
                    <div className="space-y-2">
                      <span className="text-[8px] text-slate-500 uppercase block font-bold">TRANSACTIONAL_ROW_OUTPUT</span>
                      <div className="border border-white/5 rounded-lg overflow-hidden bg-[#020511] text-[11px]">
                        <div className="grid grid-cols-3 bg-zinc-900 border-b border-white/5 px-3 py-1.5 text-slate-400 font-bold">
                          <span>AGGREGATE_METRIC</span>
                          <span>COMPUTED_FIELD</span>
                          <span>COEFFICIENT_VAL</span>
                        </div>
                        <div className="divide-y divide-white/5 font-semibold text-slate-300">
                          {getRetailResultMock().map((row, idx) => (
                            <div key={idx} className="grid grid-cols-3 px-3 py-2 text-xs">
                              <span className="text-white">{row.key}</span>
                              <span className="text-amber-400 font-bold">{row.val}</span>
                              <span className="text-slate-505 text-[10px]">{row.inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* 4. MACHINE LEARNING TOOLBOX */}
                {activeSimId === 'ml-toolbox' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-emerald-400 font-bold tracking-widest block uppercase">SIMULATOR :: PYTORCH NEURAL CANVAS</span>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">Interactive Deep Network Layer Builder</h4>
                      <p className="text-xs text-slate-400">
                        Design a synthetic classification network. Adjust hidden layer parameters or execution weights and witness backward propagation train in real-time.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span>Hidden Fully-Connected Layers</span>
                          <span className="text-emerald-400">{nnLayers} Dense layers</span>
                        </div>
                        <input 
                          type="range"
                          min="1"
                          max="6"
                          value={nnLayers}
                          onChange={(e) => {
                            sound.playHover();
                            setNnLayers(Number(e.target.value));
                          }}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-emerald-500"
                        />
                      </div>

                      <div className="space-y-1 flex flex-col justify-end">
                        <span className="text-[8px] text-slate-500 uppercase block font-bold mb-1">Activation Function</span>
                        <div className="flex gap-2">
                          {['ReLU', 'Sigmoid', 'Tanh'].map((act) => (
                            <button
                              key={act}
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setNnActivation(act);
                              }}
                              className={`flex-1 py-1 px-2.5 text-[10px] border font-bold cursor-pointer rounded transition-all ${
                                nnActivation === act 
                                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                                  : 'bg-[#020511] border-zinc-700 text-slate-450'
                              }`}
                            >
                              {act}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Play Canvas showing live Node connections drawing representing real layers! */}
                    <div className="relative rounded-xl border border-white/5 bg-[#020511] h-32 flex flex-col items-center justify-center overflow-hidden">
                      {/* Live flashing canvas background nodes */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-around items-center w-full max-w-sm px-6">
                        
                        {/* Input layer nodes */}
                        <div className="flex flex-col gap-2 animate-pulse">
                          {[1, 2, 3].map((node) => (
                            <div key={node} className="w-3.5 h-3.5 rounded-full bg-[#10B981] border border-white/20 flex items-center justify-center">
                              <span className="text-[5px] text-black font-extrabold font-mono">In</span>
                            </div>
                          ))}
                        </div>

                        {/* Hidden Layer (flashing active connections) */}
                        <div className="flex flex-col gap-2.5">
                          {Array.from({ length: nnLayers }).map((_, nodeIdx) => (
                            <div 
                              key={nodeIdx} 
                              className={`w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                                isTraining ? 'bg-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.8)] scale-110' : 'bg-purple-500/20'
                              }`}
                            >
                              <span className="text-[5px] text-white font-mono">H</span>
                            </div>
                          ))}
                        </div>

                        {/* Output layer nodes */}
                        <div className="flex flex-col gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center ${
                            isTraining ? 'bg-cyan-400/80 animate-ping' : 'bg-cyan-500/20'
                          }`}>
                            <span className="text-[5px] text-black font-extrabold font-mono">1</span>
                          </div>
                          <div className={`w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center ${
                            isTraining ? 'bg-[#EC4899]/80' : 'bg-[#EC4899]/20'
                          }`}>
                            <span className="text-[5px] text-black font-extrabold font-mono">2</span>
                          </div>
                        </div>

                      </div>

                      {/* Training accuracy output info in center */}
                      <div className="z-10 text-center space-y-0.5 bg-black/60 px-4 py-1.5 rounded-xl backdrop-blur-sm border border-white/5">
                        <span className="text-[9px] text-slate-400">EPOCH INTEGRAL: <strong className="text-white">{trainingEpoch} / 120</strong></span>
                        <div className="flex items-center gap-1 bg-transparent justify-center">
                          <span className="text-[8px] text-slate-500 font-bold uppercase">VAL_ACC:</span> 
                          <span className="text-xs font-black text-emerald-400">{trainingAccuracy}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Controller Row */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        disabled={isTraining}
                        onClick={handleTrainModel}
                        className={`flex-1 py-3 px-4 rounded-xl border font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-2 transition-all ${
                          isTraining
                            ? 'bg-zinc-805 border-zinc-705 text-slate-500 cursor-not-allowed'
                            : 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/20 text-[#10B981]'
                        }`}
                      >
                        <RefreshCw size={13} className={isTraining ? 'animate-spin' : ''} />
                        <span>{isTraining ? 'Backpropagation running...' : 'Run Gradient Descent Training'}</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* 5. DATA VISUALIZATION AND ANALYSIS */}
                {activeSimId === 'data-vis' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-pink-400 font-bold tracking-widest block uppercase">SIMULATOR :: OUTLIER DETECTION & CLEANSE GAUGE</span>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">Interactive Python Data Cleaning Pipeline</h4>
                      <p className="text-xs text-slate-400">
                        Adjust data cleansing parameters in real-time. Experience how imputation choices and outlier thresholds process source elements and dynamically output executable Pandas script.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span>Outlier Strictness (IQR Threshold)</span>
                          <span className="text-pink-400">{iqrStrictness}x IQR</span>
                        </div>
                        <input 
                          type="range"
                          min="1"
                          max="4"
                          step="0.5"
                          value={iqrStrictness}
                          onChange={(e) => {
                            sound.playHover();
                            setIqrStrictness(Number(e.target.value));
                          }}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-pink-500"
                        />
                      </div>

                      <div className="space-y-1 flex flex-col justify-end">
                        <span className="text-[8px] text-slate-500 uppercase block font-bold mb-1">Null Imputation Method</span>
                        <div className="flex gap-2">
                          {['Mean', 'Median', 'Mode'].map((strategy) => (
                            <button
                              key={strategy}
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setImputeStrategy(strategy);
                              }}
                              className={`flex-1 py-1 px-2 text-[10px] border font-bold cursor-pointer rounded transition-all ${
                                imputeStrategy === strategy 
                                  ? 'bg-pink-500/10 border-pink-500 text-pink-400' 
                                  : 'bg-[#020511] border-zinc-700 text-slate-450'
                              }`}
                            >
                              {strategy}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Generated python code syntax block */}
                    <div className="space-y-1.5">
                      <span className="text-[8px] text-slate-500 uppercase block font-bold flex items-center gap-1.5">
                        <Command size={9} className="text-pink-500" />
                        AUTO_GENERATED_CLEANSING.py
                      </span>
                      <pre className="text-[10px] p-3 rounded-lg border border-white/5 bg-[#020511] text-pink-400 max-w-full overflow-x-auto whitespace-pre leading-relaxed font-mono">
{`import pandas as pd
import numpy as np

df = pd.read_csv('omnichannel_sales.csv')

# 1. Impute missing records using ${imputeStrategy} value
df['discount_rate'] = df['discount_rate'].fillna(df['discount_rate'].${imputeStrategy.toLowerCase()}())

# 2. Filter outliers using ${iqrStrictness}x Interquartile Range
q1 = df['order_volume'].quantile(0.25)
q3 = df['order_volume'].quantile(0.75)
iqr = q3 - q1
df_cleaned = df[~((df['order_volume'] < (q1 - ${iqrStrictness} * iqr)) | 
                  (df['order_volume'] > (q3 + ${iqrStrictness} * iqr)))]`}
                      </pre>
                    </div>

                    {/* Interactive calculations representation */}
                    <div className="grid grid-cols-3 gap-3 font-mono">
                      <div className="p-4 rounded-xl bg-[#020511] border border-white/5 text-center space-y-1">
                        <span className="text-[8px] text-slate-500 block">RAW_LOG_UNITS</span>
                        <span className="text-lg font-black text-white">82,500</span>
                        <span className="text-[8px] text-slate-600 block">Prior records</span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#020511] border border-white/5 text-center space-y-1">
                        <span className="text-[8px] text-slate-500 block">CLEANT_ENTRIES</span>
                        <span className="text-lg font-black text-pink-500">
                          {Math.round(82500 - (1850 / iqrStrictness))}
                        </span>
                        <span className="text-[8px] text-slate-600 block">Outliers purged</span>
                      </div>

                      <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20 text-center space-y-1">
                        <span className="text-[8px] text-pin-400 block font-bold text-pink-405">VAR_PRESERVED</span>
                        <span className="text-lg font-black text-pink-400">
                          {(99.1 - (1.1 / iqrStrictness)).toFixed(1)}%
                        </span>
                        <span className="text-[8px] text-pink-905 block font-sans">Variance integrity</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg border border-pink-500/10 bg-pink-950/10 text-[10px] text-pink-450 leading-relaxed flex gap-2 font-sans">
                      <AlertTriangle size={14} className="flex-shrink-0 mt-0.5 text-pink-400" />
                      <span>
                        <strong>METRIC INSIGHT</strong>: Setting outlier strictness threshold to <strong>{iqrStrictness}x IQR</strong> isolates and removes <strong>{Math.round(1850 / iqrStrictness)} anomalous records</strong>. Null imputation via <strong>{imputeStrategy}</strong> retains full statistical symmetry, achieving a variance fidelity index of <strong>{(99.1 - (1.1 / iqrStrictness)).toFixed(1)}%</strong>!
                      </span>
                    </div>

                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
