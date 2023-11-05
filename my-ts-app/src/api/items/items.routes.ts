import { Router } from "express";
import * as ItemsHandlers from './items.handlers'
import { Item } from "./itmes.model";
import { validateResquest } from "../../middlewares";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

const router = Router();



router.get('/', ItemsHandlers.findAll);
router.get('/:id',
validateResquest({
    params: ParamsWithId,
}), 
ItemsHandlers.findOne);
router.post('/', 
validateResquest({
    body: Item,
}), 
ItemsHandlers.creatOne);

export default router;