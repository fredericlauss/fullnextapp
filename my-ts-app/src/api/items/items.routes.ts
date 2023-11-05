import { Router } from "express";
import * as ItemsHandlers from './items.handlers'

const router = Router();

router.get('/', ItemsHandlers.findAll);
router.post('/', ItemsHandlers.creatOne);

export default router;