export interface SkillNode {
  id: string;
  name: string;
  category: 'language' | 'database' | 'ml' | 'tool';
  iconName: string;
  xOffset: number; // percentage radius offset
  yOffset: number; // percentage radius offset
  angle: number; // angle in degrees around avatar
  details: string;
  color: string;
  glowColor: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

export interface AcademicProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
}

