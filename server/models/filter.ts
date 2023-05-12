import { Schema, model } from 'mongoose';

// Filter interface
interface IFilter {
    name: string;
    _id: Schema.Types.ObjectId;
    categories: [Schema.Types.ObjectId];
}

// Filter model
const filterSchema = new Schema<IFilter>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
    categories: { type: [Schema.Types.ObjectId], required: true }
})

export const FilterModel = model('Filter', filterSchema);
