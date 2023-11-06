import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

export const Rent = z.object({
    name: z.string().min(1),
});

export type Rent = z.infer<typeof Rent>;
export type RentWithId = WithId<Rent>;
export const Rents = db.collection<Rent>('items');