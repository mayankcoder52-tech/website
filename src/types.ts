/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Moderator' | 'User';
  xp: number;
  level: number;
  streak: number;
  joinedAt: string;
  bio: string;
  githubUrl?: string;
  rank: number;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptanceRate: number;
  solved: boolean;
  description: string;
  starterCode: string;
  testCases: { input: string; expectedOutput: string }[];
  solutionExplanation?: string;
}

export interface Contest {
  id: string;
  title: string;
  duration: string;
  startTime: string;
  participants: number;
  status: 'Upcoming' | 'Active' | 'Completed';
  problems: Problem[];
}

export interface ActivityLog {
  id: string;
  type: 'problem_solved' | 'contest_joined' | 'achievement_unlocked' | 'note_created';
  title: string;
  timestamp: string;
  xpEarned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  xpValue: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  resources: string[];
}

export interface ResumeAnalysis {
  score: number;
  summary: string;
  keySkills: string[];
  vulnerabilities: string[];
  atsAdvice: string[];
}

export interface GithubAnalysis {
  repoName: string;
  qualityScore: number;
  issuesDetected: string[];
  languageRatio: Record<string, number>;
  refactoringSuggestions: string[];
}

export interface UserNote {
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
