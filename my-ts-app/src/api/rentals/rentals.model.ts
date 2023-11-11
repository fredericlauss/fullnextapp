import * as z from 'zod';
import mongoose from 'mongoose';
import { WithId } from 'mongodb';
import { ObjectId } from "mongodb";

export const Rental = z.object({
    itemId: z.string().min(1).refine((val) => {
        try {
            return new ObjectId(val);
        } catch (error) {
            return false;
        }
    }),
    studentEmail: z.string().email(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
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
