import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import items from './items/items.routes'
import Rentals from './rentals/rentals.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API',
  });
});

router.use('/items', items)
router.use('/rentals', Rentals)

export default router;
