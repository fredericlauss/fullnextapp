import { Document } from 'mongoose'

interface IItem extends Document {
    name: string;
    quantity: number;
}

export default IItem;