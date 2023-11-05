import { NextFunction, Request, Response } from "express";
import { Item, ItemWithId, Items } from "./itmes.model";
import { ZodError } from "zod";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { ObjectId } from "mongodb";

export async function findAll(req: Request, res: Response<ItemWithId[]>, next: NextFunction) {
    try {
        const result = await Items.find();
        const items = await result.toArray();
        res.json(items);
    } catch (error) {
        next(error)
    }
}

export async function creatOne(req: Request<{}, ItemWithId, Item>, res: Response<ItemWithId>, next: NextFunction) {
    try {
        const insertResult = await Items.insertOne(req.body);
        if (!insertResult.acknowledged) throw new Error('Error inserting item');
        res.status(201);
        res.json({
            _id: insertResult.insertedId,
            ...req.body,
    });
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