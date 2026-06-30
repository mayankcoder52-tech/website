import { Router } from 'express';
import { getRoadmap, getResumeAnalysis, getGithubAnalysis, getMentorChat } from '../controllers/gemini.controller';

const router = Router();

router.post('/gemini/roadmap', getRoadmap);
router.post('/gemini/resume', getResumeAnalysis);
router.post('/gemini/github', getGithubAnalysis);
router.post('/gemini/chat', getMentorChat);

export default router;
