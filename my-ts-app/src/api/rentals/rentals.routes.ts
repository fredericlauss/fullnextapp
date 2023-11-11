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

router.delete('/:id',
validateResquest({
    params: ParamsWithId,
}), 
RentalsHandlers.deleteOne);

router.post('/:id/send-reminder',
validateResquest({
    params: ParamsWithId,
}),
RentalsHandlers.reminder);

export default router;