import { Schema, model } from 'mongoose';

// Category interface
interface ICategory {
    name: string;
    createdBy: { type: Schema.Types.ObjectId, required: true },
    _id: Schema.Types.ObjectId;
}

// Category model
const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    _id: { type: Schema.Types.ObjectId, required: true }
})

interface ICategories {
    _id: Schema.Types.ObjectId;
    createdBy: { type: Schema.Types.ObjectId, required: true },
    categories: [ICategory]
}

// categories model
const categoriesSchema = new Schema<ICategories>({
    _id: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    categories: { type: [categorySchema], required: true }
})

export const CategoriesModel = model('Categories', categoriesSchema);
