import { Router } from "express";
import * as ItemsHandlers from './rentals.handlers'

const router = Router();

router.get('/', ItemsHandlers.findAll);
// router.get('/:id', ItemsHandlers.findOne);
// router.post('/', ItemsHandlers.creatOne);
// router.put('/:id', ItemsHandlers.updateOne);
// router.get('/:id', ItemsHandlers.deleteOne);

// router.post('/:id/send-reminder', ItemsHandlers.reminder);

export default router;