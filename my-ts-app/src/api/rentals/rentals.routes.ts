import { Router } from "express";
import * as ItemsHandlers from './rentals.handlers'

const router = Router();

router.get('/', ItemsHandlers.findAll);


export default router;