import { Request, Response } from 'express';
import { readDB } from '../config/db';
import { predictContestRating } from '../services/gemini.service';

export const getContests = (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.contests);
};

export const predictRating = async (req: Request, res: Response) => {
  const { currentRating, expectedRank, solvedCount } = req.body;
  try {
    const result = await predictContestRating(Number(currentRating), Number(expectedRank), Number(solvedCount));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getLeaderboard = (req: Request, res: Response) => {
  const db = readDB();
  const mockLeaderboard = [
    { rank: 1, name: 'Algorithm Overlord', xp: 9400, level: 10, streak: 45, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=overlord' },
    { rank: 2, name: 'DP Master', xp: 8200, level: 9, streak: 30, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=dpmaster' },
    { rank: 3, name: 'SaaS Alchemist', xp: 7500, level: 8, streak: 14, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=alchemist' },
    { rank: db.user.rank, name: db.user.name, xp: db.user.xp, level: db.user.level, streak: db.user.streak, avatar: db.user.avatar, current: true }
  ];
  res.json(mockLeaderboard);
};

export const getAchievements = (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.achievements);
};
