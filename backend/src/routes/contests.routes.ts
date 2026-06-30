import { Router } from 'express';
import { getContests, predictRating, getLeaderboard, getAchievements } from '../controllers/contests.controller';

const router = Router();

router.get('/contests', getContests);
router.post('/contests/predict', predictRating);
router.get('/leaderboard', getLeaderboard);
router.get('/achievements', getAchievements);

export default router;
