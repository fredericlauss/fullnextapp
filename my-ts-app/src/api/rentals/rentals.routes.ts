import { Router } from "express";
import * as RentalsHandlers from './rentals.handlers';
import { Rental } from "./rentals.model";
import { validateResquest } from "../../middlewares";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

const router = Router();

router.get('/', RentalsHandlers.findAll);

router.get('/:id',
validateResquest({
    params: ParamsWithId,
}), 
RentalsHandlers.findOne);

router.post('/', 
validateResquest({
    body: Rental,
}), 
RentalsHandlers.creatOne);

// router.put('/:id', ItemsHandlers.updateOne);
// router.get('/:id', ItemsHandlers.deleteOne);

// router.post('/:id/send-reminder', ItemsHandlers.reminder);

export default router;