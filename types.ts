import { type FC, type SVGProps } from 'react';

export type View = 'dashboard' | 'builder' | 'tools' | 'chat';
export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export interface WindowState {
  id: number;
  view: View;
  zIndex: number;
}

export interface Tool {
  id: string;
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  description: string;
  category: 'Development' | 'Deployment' | 'Analysis';
  details: {
    purpose: string;
    sourceLink: string;
    example: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

export interface Translations {
  [key: string]: any;
}

// FIX: Implemented full types for OperatingSystem, Simulation, AcademyModule, and Vulnerability.
export interface Simulation {
  scenario: string;
  script: {
    command: string;
    output: string | string[];
    delay?: number;
  }[];
}

export interface OperatingSystem {
  id: string;
  name: string;
  description: string;
  logo: FC<SVGProps<SVGSVGElement>>;
  category: string;
  details: {
    philosophy: string;
    status: 'Active' | 'Archived';
    versions: { name: string; hash: string }[];
    quickStart: string[];
  };
}

export interface AcademyModule {
  id: string;
  title: string;
  description: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  path: string;
  objectives: string[];
  labDescription: string;
  simulation: Simulation;
}

export interface Vulnerability {
  id: string;
  name: string;
  cve: string;
  description: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  details: {
    summary: string;
    technicalAnalysis: string;
  };
  simulation: Simulation;
}