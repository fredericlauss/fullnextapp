import * as z from 'zod';
import mongoose from 'mongoose';
import { WithId } from 'mongodb';

export const Item = z.object({
    name: z.string().min(1),
});

export type Item = z.infer<typeof Item>;
export type ItemWithId = WithId<Item>;

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true},
})
export const Items = mongoose.model<Item>('item', itemSchema);
