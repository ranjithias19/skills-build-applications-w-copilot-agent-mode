import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'List workouts route placeholder',
    workouts: [],
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    message: 'Create workout route placeholder',
    workout: req.body,
  });
});

export default router;
