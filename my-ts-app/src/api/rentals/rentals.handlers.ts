import { NextFunction, Request, Response } from "express";
import { Rental, RentalWithId, Rentals } from "./rentals.model";

export async function findAll(req: Request, res: Response<RentalWithId[]>, next: NextFunction) {
    try {
        const items = await Rentals.find().exec();
        res.json(items);
    } catch (error) {
        next(error)
    }
}