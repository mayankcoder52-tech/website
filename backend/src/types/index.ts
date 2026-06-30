export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  acceptanceRate: number;
  solved: boolean;
  description: string;
  starterCode: string;
  testCases: Array<{ input: string; expectedOutput: string }>;
  solutionExplanation: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  xp: number;
  level: number;
  streak: number;
  joinedAt: string;
  bio: string;
  githubUrl: string;
  rank: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  xpValue: number;
}

export interface Contest {
  id: string;
  title: string;
  duration: string;
  startTime: string;
  participants: number;
  status: string;
  problems: Problem[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  category: string;
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  timestamp: string;
  ip: string;
}

export interface DatabaseState {
  user: User;
  problems: Problem[];
  achievements: Achievement[];
  contests: Contest[];
  notes: Note[];
  auditLogs: AuditLog[];
}
