import { NextFunction, Request, Response } from "express";
import { Item, ItemWithId, Items } from "./items.model";
import { Rentals } from "../rentals/rentals.model";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { ObjectId } from "mongodb";

export async function findAll(req: Request, res: Response<ItemWithId[]>, next: NextFunction) {
    try {
        const items = await Items.find().exec();
        res.json(items);
    } catch (error) {
        next(error)
    }
}

export async function creatOne(req: Request<{}, ItemWithId, Item>, res: Response<ItemWithId>, next: NextFunction) {
    try {
        const newItemData = { ...req.body, isRented: false, rentalId: null };
        const newItem = new Items(newItemData);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        next(error)
    }
}

export async function findOne(req: Request<ParamsWithId, ItemWithId, []>, res: Response<ItemWithId>, next: NextFunction) {
    try {
        const result = await Items.findOne({
            _id: new ObjectId(req.params.id),
        });
        if (!result) {
            res.status(404);
            throw new Error(`Item with id "${req.params.id}" not found`)
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function updateOne(req: Request<ParamsWithId, ItemWithId, Item>, res: Response<ItemWithId>, next: NextFunction) {
    try {
        const result = await Items.findOneAndUpdate({
            _id: new ObjectId(req.params.id),
        },{
            $set: req.body,
        }, {
            returnDocument: 'after',
        });
        if (!result) {
            res.status(404);
            throw new Error(`Item with id "${req.params.id}" not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export  async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
    try {
        const itemId = new ObjectId(req.params.id);
        const itemToDelete = await Items.findOne({ _id: itemId });

        if ( itemToDelete) {
        if (itemToDelete.isRented || itemToDelete.rentalId) {
            res.status(400);
            throw new Error(`Item with id "${req.params.id}" is currently rented and cannot be deleted`);
        }
        }
        const result = await Items.findOneAndDelete({ _id: itemId });

        if (!result) {
            res.status(404);
            throw new Error(`Item with id "${req.params.id}" not found`);
        }

        res.status(204).end();
    } catch (error) {
        next(error);
    }
}