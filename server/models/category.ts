import { Schema, model } from 'mongoose';

// Category interface
interface ICategory {
    name: string;
    _id: Schema.Types.ObjectId;
}

// Category model
const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true }
})

export const CategoryModel = model('Category', categorySchema);
