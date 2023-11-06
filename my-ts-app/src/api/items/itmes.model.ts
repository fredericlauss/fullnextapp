import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';
import { Rent } from '../rents/rents.model';

export const Item = z.object({
    name: z.string().min(1),
    location: Rent.optional(),
});

export type Item = z.infer<typeof Item>;
export type ItemWithId = WithId<Item>;
export const Items = db.collection<Item>('items');