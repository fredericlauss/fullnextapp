import { NextFunction, Request, Response } from "express";
import { Item, ItemWithId, Items } from "./itmes.model";
import { ZodError } from "zod";

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
        const validateResult = await Item.parseAsync(req.body);
        const insertResult = await Items.insertOne(validateResult);
        if (!insertResult.acknowledged) throw new Error('Error inserting item');
        res.status(201);
        res.json({
            _id: insertResult.insertedId,
            ...validateResult,
    });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(422);
        }
        next(error)
    }
}