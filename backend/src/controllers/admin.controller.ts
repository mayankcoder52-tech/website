import { Request, Response } from 'express';
import {
  readDB,
  writeDB,
  initialUser,
  initialProblems,
  initialAchievements,
  initialContests,
  initialNotes,
  initialAuditLogs,
} from '../config/db';

export const getAdminStats = (req: Request, res: Response) => {
  const db = readDB();
  res.json({
    activeUsersCount: 1240,
    apiSuccessRate: '99.94%',
    databaseStatus: 'Healthy (SQLite Sync JSON)',
    auditLogs: db.auditLogs,
  });
};

export const getAuditLogs = (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.auditLogs);
};

export const createAuditLog = (req: Request, res: Response) => {
  const { action } = req.body;
  const db = readDB();

  const newLog = {
    id: 'l_' + Date.now(),
    adminEmail: db.user.email,
    action,
    timestamp: new Date().toISOString(),
    ip: '127.0.0.1'
  };

  db.auditLogs.unshift(newLog);
  writeDB(db);
  res.json(newLog);
};

export const resetDB = (req: Request, res: Response) => {
  const db = {
    user: initialUser,
    problems: initialProblems,
    achievements: initialAchievements,
    contests: initialContests,
    notes: initialNotes,
    auditLogs: [
      {
        id: 'l_' + Date.now(),
        adminEmail: initialUser.email,
        action: 'Completely reset and reseeded simulated database',
        timestamp: new Date().toISOString(),
        ip: '127.0.0.1'
      },
      ...initialAuditLogs
    ],
  };
  writeDB(db);
  res.json({ success: true, user: db.user });
};

export const seedProblems = (req: Request, res: Response) => {
  const db = readDB();
  db.problems = initialProblems;
  db.auditLogs.unshift({
    id: 'l_' + Date.now(),
    adminEmail: db.user.email,
    action: 'Parsed and reseeded algorithmic problems lists',
    timestamp: new Date().toISOString(),
    ip: '127.0.0.1'
  });
  writeDB(db);
  res.json({ success: true });
};
