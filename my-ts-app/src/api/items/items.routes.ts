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

router.put('/:id',
validateResquest({
    params: ParamsWithId,
    body: Item,
}), 
ItemsHandlers.updateOne);

router.delete('/:id',
validateResquest({
    params: ParamsWithId,
}), 
ItemsHandlers.deleteOne);

export default router;