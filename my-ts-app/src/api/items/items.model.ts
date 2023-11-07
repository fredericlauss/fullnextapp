import * as z from 'zod';
import { db } from '../../db';
import { WithId, ObjectId } from 'mongodb';

export const Item = z.object({
    name: z.string().min(1),
    rentId: z.string().min(1).refine((val) => {
        try {
            return new ObjectId(val);
        } catch (error) {
            return false;
        }
    }),
});

export type Item = z.infer<typeof Item>;
export type ItemWithId = WithId<Item>;
export const Items = db.collection<Item>('items');
