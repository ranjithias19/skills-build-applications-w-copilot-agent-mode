import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'List teams route placeholder',
    teams: [],
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    message: 'Create team route placeholder',
    team: req.body,
  });
});

export default router;
