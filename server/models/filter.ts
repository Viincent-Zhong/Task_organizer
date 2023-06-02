import { Schema, model } from 'mongoose';

// Filter interface
interface IFilter {
    name: string;
    _id: Schema.Types.ObjectId;
    createdBy: Schema.Types.ObjectId;
    categories: [Schema.Types.ObjectId];
}

// Filter model
const filterSchema = new Schema<IFilter>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    categories: { type: [Schema.Types.ObjectId], required: true }
})

interface IFilters {
    _id: Schema.Types.ObjectId;
    createdBy: Schema.Types.ObjectId;
    filters: [IFilter]
}

// filters model
const filtersSchema = new Schema<IFilters>({
    _id: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    filters: { type: [filterSchema], required: true }
})

export const FiltersModel = model('Filters', filtersSchema);
