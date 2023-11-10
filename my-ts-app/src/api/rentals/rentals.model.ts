import * as z from 'zod';
import mongoose from 'mongoose';
import { WithId } from 'mongodb';

export const Rental = z.object({
    itemId: z.string(),
    studentEmail: z.string().email(),
    startDate: z.date(),
    endDate: z.date(),
});

export type Rental = z.infer<typeof Rental>;
export type RentalWithId = WithId<Rental>;

const RentalSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true },
    studentEmail: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
})
export const Rentals = mongoose.model<Rental>('rental', RentalSchema);
