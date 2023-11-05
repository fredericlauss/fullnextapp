import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import items from './items/items.routes'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/items', items)

export default router;
