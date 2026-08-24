import { SkillNode, StatItem, AcademicProject } from './types';

export const SKILL_NODES: SkillNode[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'language',
    iconName: 'Code',
    xOffset: -120, // left side top
    yOffset: -160,
    angle: 150,
    details: 'Intermediate to advanced Python. Core expertise in programming logic, automation scripts, NumPy, Pandas, data structures, and algorithmic foundations.',
    color: 'text-amber-400',
    glowColor: 'rgba(234, 179, 8, 0.4)'
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'database',
    iconName: 'Database',
    xOffset: -150, // left side upper-mid
    yOffset: -60,
    angle: 175,
    details: 'Relational database querying, multi-table joins, aggregate queries, CTEs, schema modeling, and MySQL/PostgreSQL management.',
    color: 'text-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.4)'
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'ml',
    iconName: 'Brain',
    xOffset: -150, // left side lower-mid
    yOffset: 40,
    angle: -170,
    details: 'Supervised and unsupervised models, scikit-learn, clustering analysis, linear regression, classification, and neural network foundations.',
    color: 'text-purple-400',
    glowColor: 'rgba(192, 132, 252, 0.4)'
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'tool',
    iconName: 'BarChart2',
    xOffset: -120, // left side bottom
    yOffset: 140,
    angle: -140,
    details: 'Extracting insights from datasets, statistical analysis, data cleaning, exploratory data analysis (EDA), and executive KPI reporting.',
    color: 'text-green-400',
    glowColor: 'rgba(74, 222, 128, 0.4)'
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'language',
    iconName: 'Laptop',
    xOffset: -60, // left side deep bottom
    yOffset: 220,
    angle: -110,
    details: 'Modern React SPA development, functional components, custom hooks, component lifecycle, reactive state management, and UI architecture (demonstrated in FoamXpress & SmileSync).',
    color: 'text-cyan-300',
    glowColor: 'rgba(6, 182, 212, 0.4)'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'language',
    iconName: 'Code',
    xOffset: 120, // right side top
    yOffset: -160,
    angle: 30,
    details: 'Type-safe frontend development, interfaces, strict generics, prop type validation, and robust maintainable codebases.',
    color: 'text-blue-400',
    glowColor: 'rgba(96, 165, 250, 0.4)'
  },
  {
    id: 'frontend',
    name: 'Front-End Dev',
    category: 'tool',
    iconName: 'Layers',
    xOffset: 150, // right side upper-mid
    yOffset: -60,
    angle: 5,
    details: 'Responsive mobile-first web engineering using Tailwind CSS, modern JavaScript (ES6+), Vite build tools, and Framer Motion interactive animations.',
    color: 'text-sky-400',
    glowColor: 'rgba(56, 189, 248, 0.4)'
  },
  {
    id: 'backend-learning',
    name: 'Node / Backend',
    category: 'tool',
    iconName: 'Terminal',
    xOffset: 150, // right side lower-mid
    yOffset: 40,
    angle: -10,
    details: 'Active Learning Roadmap: Building server-side foundations with Node.js, Express.js REST APIs, request/response lifecycle, and database integration.',
    color: 'text-emerald-400',
    glowColor: 'rgba(52, 211, 153, 0.4)'
  },
  {
    id: 'github',
    name: 'Git & GitHub',
    category: 'tool',
    iconName: 'GitFork',
    xOffset: 120, // right side bottom
    yOffset: 140,
    angle: -40,
    details: 'Proficient in Git version control, branching strategies, repository management, collaborative PR workflows, and code maintenance.',
    color: 'text-slate-300',
    glowColor: 'rgba(203, 213, 225, 0.4)'
  },
  {
    id: 'tools',
    name: 'Data & Dev Tools',
    category: 'tool',
    iconName: 'Cpu',
    xOffset: 60, // right side deep bottom
    yOffset: 220,
    angle: -70,
    details: 'Power BI, Tableau, Excel, Jupyter Notebook, Google Colab, VS Code, and browser debugging workflows.',
    color: 'text-pink-400',
    glowColor: 'rgba(244, 114, 182, 0.4)'
  }
];

export const STATISTICS: StatItem[] = [
  {
    id: 'projects',
    label: 'Key Projects',
    value: 7,
    suffix: '+',
    iconName: 'Briefcase'
  },
  {
    id: 'certs',
    label: 'Certifications',
    value: 3,
    suffix: '+',
    iconName: 'Award'
  },
  {
    id: 'tech',
    label: 'Technologies',
    value: 18,
    suffix: '+',
    iconName: 'Cpu'
  }
];

export const EXPERIENCE_PROJECTS: AcademicProject[] = [
  {
    id: 'proj1',
    category: 'Machine Learning',
    title: 'Customer Segmentation Classifier',
    description: 'Developed an unsupervised learning model utilizing K-Means Clustering on retail datasets to segment consumers. Formulated visual profiling matrices inside Jupyter notebooks.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib']
  },
  {
    id: 'proj2',
    category: 'Data Analysis',
    title: 'Academic Database Optimizer',
    description: 'Designed and built a robust student database schema reflecting university metrics with parameterized SQL queries for rapid search, complete with transaction logs.',
    tech: ['SQL Server', 'Python-DB Connectors', 'Data Cleansing']
  },
  {
    id: 'proj3',
    category: 'Deep Learning',
    title: 'Neural Image Identifier',
    description: 'Engineered a convolutional neural network prototype designed to categorize image sets, identifying optimizations in pooling layers to reduce compute overhead by 25%.',
    tech: ['TensorFlow', 'Python', 'NumPy', 'Jupyter']
  },
  {
    id: 'proj4',
    category: 'Data-Driven Web App',
    title: 'Interactive Sales Dashboard',
    description: 'Assembled a full-stack mockup of a sales forecasting platform using high-chart visualizations to display real-time business health indices.',
    tech: ['React', 'Tailwind CSS', 'Vite', 'Lucide Icons']
  },
  {
    id: 'proj5',
    category: 'Data Science',
    title: 'Predictive Price Evaluator',
    description: 'Created a multivariable linear regression analyzer model predicting estate value points. Integrated data standardization procedures to minimize outliers.',
    tech: ['Python', 'Seaborn', 'Scipy', 'Pandas']
  },
  {
    id: 'proj6',
    category: 'Frontend / Web Development',
    title: 'FoamXpress — Vehicle Grooming & Booking Platform',
    description: 'A modern, responsive car and bike wash booking web application built with React and TypeScript. Features vehicle-type selection, dynamic service tier customization, instant price computation, real-time slot selection, and structured form validation.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'State Management']
  },
  {
    id: 'proj7',
    category: 'Frontend / Web Development',
    title: 'SmileSync — Smart Dental Practice Management UI',
    description: 'A clean, responsive dental clinic management interface built with React and TypeScript. Features dynamic appointment scheduling, patient record cards, multi-doctor timeline filtering, and interactive clinic status dashboards with seamless component architecture.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Component Design']
  }
];

export const CERTIFICATIONS = [
  {
    title: "IBM Data Visualization Using Python",
    provider: "IBM (International Business Machines)",
    date: "2024",
    credentialId: "IBM-DV-92842"
  },
  {
    title: "IBM Machine Learning with R",
    provider: "IBM Core and R-Studio Specialist",
    date: "2025",
    credentialId: "IBM-MLR-18492"
  },
  {
    title: "Intermediate Machine Learning Certification",
    provider: "InternElite Professional Academy",
    date: "2025",
    credentialId: "IE-IML-7729"
  }
];
