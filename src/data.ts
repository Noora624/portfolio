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
    details: 'Intermediate to advanced Python. Core expertise in programming logic, automation scripts, NumPy, Pandas, and object-oriented architectures.',
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
    details: 'Proficient in relational databases, write aggregate queries, complex joins, database schema design, and MySQL/PostgreSQL management.',
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
    details: 'Supervised and unsupervised models, scikit-learn, clustering analysis, linear regression, and neural network foundations.',
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
    details: 'Extract insights from unstructured data, statistical analysis, cleaning datasets, and exploratory data analysis (EDA).',
    color: 'text-green-400',
    glowColor: 'rgba(74, 222, 128, 0.4)'
  },
  {
    id: 'data-viz',
    name: 'Data Viz',
    category: 'tool',
    iconName: 'TrendingUp',
    xOffset: -60, // left side deep bottom
    yOffset: 220,
    angle: -110,
    details: 'Creating impactful visualizations using Matplotlib, Seaborn, Tableau, and interactive dashboard systems.',
    color: 'text-indigo-400',
    glowColor: 'rgba(129, 140, 248, 0.4)'
  },
  {
    id: 'ai',
    name: 'AI Engineering',
    category: 'ml',
    iconName: 'Cpu',
    xOffset: 120, // right side top
    yOffset: -160,
    angle: 30,
    details: 'Explorations in artificial neural network setups, natural language processing models, and AI agent frameworks.',
    color: 'text-pink-400',
    glowColor: 'rgba(244, 114, 182, 0.4)'
  },
  {
    id: 'full-stack',
    name: 'Full Stack',
    category: 'language',
    iconName: 'Laptop',
    xOffset: 150, // right side upper-mid
    yOffset: -60,
    angle: 5,
    details: 'Web-application frontends styled with Tailwind CSS, React dashboards, and server-side mock endpoint proxy configurations.',
    color: 'text-sky-400',
    glowColor: 'rgba(56, 189, 248, 0.4)'
  },
  {
    id: 'jupyter',
    name: 'Jupyter Hub',
    category: 'tool',
    iconName: 'BookOpen',
    xOffset: 150, // right side lower-mid
    yOffset: 40,
    angle: -10,
    details: 'Drafting data stories, embedding data validation plots, and code documentation in collaborative Jupyter notebooks.',
    color: 'text-orange-500',
    glowColor: 'rgba(249, 115, 22, 0.4)'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tool',
    iconName: 'GitFork',
    xOffset: 120, // right side bottom
    yOffset: 140,
    angle: -40,
    details: 'Proficient in Git workflows, hosting repositories, version control management, and collective team code reviews.',
    color: 'text-slate-300',
    glowColor: 'rgba(203, 213, 225, 0.4)'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tool',
    iconName: 'Terminal',
    xOffset: 60, // right side deep bottom
    yOffset: 220,
    angle: -70,
    details: 'Efficient environment setup, customized linter adjustments, rapid debugger operations, and developer terminal integrations.',
    color: 'text-blue-500',
    glowColor: 'rgba(59, 130, 246, 0.4)'
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
    value: 15,
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
    category: 'Web Application',
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
    category: 'Web Application',
    title: 'FoamXpress',
    description: 'A modern Car & Bike Wash booking platform where users can select vehicle type, choose services, view pricing, and make bookings through a responsive interface.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS']
  },
  {
    id: 'proj7',
    category: 'Web Application',
    title: 'SmileSync',
    description: 'A smart dental clinic management system that allows appointment booking, patient management, and provides a clean, responsive UI for dental professionals and patients alike.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS']
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
