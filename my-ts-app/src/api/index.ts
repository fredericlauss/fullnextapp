import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import items from './items/items.routes'
import Rentals from './rentals/rentals.routes';
import students from './students/students.routes'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API',
  });
});

router.use('/items', items)
router.use('/rentals', Rentals)
router.use('/students', students)

export default router;
