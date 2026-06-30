import { Request, Response } from 'express';
import { generateRoadmap, analyzeResume, auditGithubRepo, chatWithMentor } from '../services/gemini.service';

export const getRoadmap = async (req: Request, res: Response) => {
  const { careerTarget, currentSkills } = req.body;
  try {
    const result = await generateRoadmap(careerTarget, currentSkills);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getResumeAnalysis = async (req: Request, res: Response) => {
  const { resumeText } = req.body;
  try {
    const result = await analyzeResume(resumeText);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getGithubAnalysis = async (req: Request, res: Response) => {
  const { repoUrl } = req.body;
  try {
    const result = await auditGithubRepo(repoUrl);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMentorChat = async (req: Request, res: Response) => {
  const { messages } = req.body;
  try {
    const result = await chatWithMentor(messages);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
