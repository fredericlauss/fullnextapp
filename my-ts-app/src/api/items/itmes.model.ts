import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

export const Item = z.object({
    name: z.string().min(1),
});

export type Item = z.infer<typeof Item>;
export type ItemWithId = WithId<Item>;
export const Items = db.collection<Item>('items');