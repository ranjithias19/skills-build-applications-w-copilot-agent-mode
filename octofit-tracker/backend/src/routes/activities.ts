import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'List activities route placeholder',
    activities: [],
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    message: 'Create activity route placeholder',
    activity: req.body,
  });
});

export default router;
