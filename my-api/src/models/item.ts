import { Schema , model } from 'mongoose'
import IItem from '../interfaces/item'


const TodoSchema: Schema = new Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: true}
},
{
    timestamps: true
})

export default model<IItem>('Todo', TodoSchema)