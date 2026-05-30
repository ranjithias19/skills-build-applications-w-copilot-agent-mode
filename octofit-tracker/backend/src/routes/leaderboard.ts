import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (req, res) => {
  const board = await Leaderboard.find().populate('user').sort({ rank: 1 }).lean();
  res.json(board);
});

export default router;
