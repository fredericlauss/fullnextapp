import * as z from 'zod';
import mongoose from 'mongoose';
import { WithId } from 'mongodb';

export const Rental = z.object({
    name: z.string().min(1),
});

export type Rental = z.infer<typeof Rental>;
export type RentalWithId = WithId<Rental>;

const RentalSchema = new mongoose.Schema({
    name: { type: String, required: true},
})
export const Rentals = mongoose.model<Rental>('rental', RentalSchema);
