import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'List users route placeholder',
    users: [],
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    message: 'Create user route placeholder',
    user: req.body,
  });
});

export default router;
