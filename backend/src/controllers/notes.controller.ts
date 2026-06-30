import { Request, Response } from 'express';
import { readDB, writeDB } from '../config/db';

export const getNotes = (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.notes);
};

export const createNote = (req: Request, res: Response) => {
  const { title, content, category } = req.body;
  const db = readDB();

  const newNote = {
    id: 'n_' + Date.now(),
    title: title || 'Untitled Note',
    content: content || '',
    category: category || 'General',
    updatedAt: new Date().toISOString()
  };

  db.notes.unshift(newNote);
  writeDB(db);
  res.json(newNote);
};

export const deleteNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDB();

  db.notes = db.notes.filter((n: any) => n.id !== id);
  writeDB(db);
  res.json({ success: true });
};
