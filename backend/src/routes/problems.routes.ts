import { Router } from 'express';
import { getProblems, runProblem } from '../controllers/problems.controller';

const router = Router();

router.get('/problems', getProblems);
router.post('/problems/:id/run', runProblem);

export default router;
