import { NextFunction, Request, Response } from "express";
import { Rental, RentalWithId, Rentals } from "./rentals.model";
import { Item, ItemWithId, Items } from "../items/items.model";
import { ObjectId } from "mongodb";

export async function findAll(req: Request, res: Response<RentalWithId[]>, next: NextFunction) {
    try {
        const items = await Rentals.find().exec();
        res.json(items);
    } catch (error) {
        next(error)
    }
}


export async function creatOne(req: Request<{}, RentalWithId, Rental>, res: Response<RentalWithId>, next: NextFunction) {
    try {
        const item = await Items.findOne({
            _id: new ObjectId(req.body.itemId),
        });
        if (!item) {
            res.status(404);
            throw new Error(`Item with id "${req.body.itemId}" not found`)
        }
        console.log(item)
        if (item.isRented === true) {
            res.status(400);
            throw new Error(`item with ID ${req.body.itemId} already rented`);
        }

        if (item.rentalId) {
            res.status(400);
            throw new Error(`item with ID ${req.body.itemId} has already an renting ID`);
        }

        const newRentalData = { ...req.body };
        const newRental = new Rentals(newRentalData);
        const savedRental = await newRental.save();

        await Items.findByIdAndUpdate(req.body.itemId, { isRented: true, rentalId: savedRental._id });

        res.status(201).json(savedRental);
    } catch (error) {
        console.log(error)
        next(error);
    }
}