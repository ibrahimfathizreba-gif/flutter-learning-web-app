export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Basics" | "OOP" | "OOP Mapping" | "Async & Streams" | "Widgets & Composition";
  constraints: string;
  starterCode: string;
  javaContrast: string;
}

export interface Concept {
  id: string;
  name: string;
  category: "Language Basics" | "OOP Mapping" | "Asynchronous Code" | "Architecture & Composition";
  summary: string;
  javaComparison: string;
  javaSnippet: string;
  dartSnippet: string;
  proTips: string;
}

export interface ProjectModule {
  id: string;
  title: string;
  description: string;
  architectureType: string;
  learningOutcomes: string[];
  javaContext: string;
  folderStructure: {
    name: string;
    type: "file" | "folder";
    description: string;
    children?: any[]; // Recursive structure for folder explorer
  }[];
  fileTemplates: {
    filePath: string;
    description: string;
    code: string;
  }[];
  checklists: {
    id: string;
    task: string;
    explanation: string;
  }[];
}

export interface VideoResource {
  id: string;
  title: string;
  url: string;
  duration: string;
  channel: string;
  description: string;
  category: "Getting Started" | "Deep-Dive Architecture" | "State Management" | "Dart Concurrency";
}

export interface ForumResource {
  id: string;
  name: string;
  url: string;
  description: string;
  platform: "Reddit" | "Discord" | "GitHub" | "Official Docs" | "StackOverflow";
}
