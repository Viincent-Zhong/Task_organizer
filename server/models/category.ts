import { Schema, model } from 'mongoose';

// Category interface
export interface ICategory {
    name: string;
    createdBy?: Schema.Types.ObjectId;
    _id?: Schema.Types.ObjectId;
}

// Category model
const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    _id: { type: Schema.Types.ObjectId, required: true }
})

export const CategoryModel = model('Category', categorySchema);
