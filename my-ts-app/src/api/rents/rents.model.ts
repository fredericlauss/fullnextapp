import * as z from 'zod';
import { db } from '../../db';
import { WithId, ObjectId } from 'mongodb';

export const Rent = z.object({
    name: z.string().min(1),
    itemId: z.string().min(1).refine((val) => {
        try {
            return new ObjectId(val);
        } catch (error) {
            return false;
        }
    }),
});

export type Rent = z.infer<typeof Rent>;
export type RentWithId = WithId<Rent>;
export const Rents = db.collection<Rent>('rents');