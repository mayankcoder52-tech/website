import { Request, Response } from 'express';
import { readDB, writeDB, initialUser } from '../config/db';
import { signToken } from '../utils/jwt';

export const getProfile = (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.user);
};

export const register = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const db = readDB();

  db.user = {
    ...initialUser,
    name: name || 'New Alchemist',
    email: email || 'user@example.com',
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || 'forge')}`,
    xp: 200,
    level: 1,
    streak: 1,
    rank: 450,
  };
  writeDB(db);

  // Generate stateless JWT token
  const token = signToken({
    id: db.user.id,
    email: db.user.email,
    role: db.user.role,
    name: db.user.name
  });

  res.json({ success: true, user: db.user, token });
};

export const login = (req: Request, res: Response) => {
  const { email } = req.body;
  const db = readDB();
  db.user.email = email || db.user.email;
  writeDB(db);

  // Generate stateless JWT token
  const token = signToken({
    id: db.user.id,
    email: db.user.email,
    role: db.user.role,
    name: db.user.name
  });

  res.json({ success: true, user: db.user, token });
};

export const logout = (req: Request, res: Response) => {
  res.json({ success: true });
};
