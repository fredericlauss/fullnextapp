import { Router } from "express";
import * as StudentsHandlers from './students.handlers';

const router = Router();

router.get('/', StudentsHandlers.findAll);

export default router;