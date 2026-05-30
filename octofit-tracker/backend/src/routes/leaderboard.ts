import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Leaderboard route placeholder',
    leaderboard: [],
  });
});

export default router;
