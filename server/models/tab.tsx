import { Schema, model } from 'mongoose';

// Tab interface
interface ITab {
    name: string;
    _id: Schema.Types.ObjectId;
    tasks: [Schema.Types.ObjectId];
}

// Tab model
const tabSchema = new Schema<ITab>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
    tasks: { type: [Schema.Types.ObjectId], required: true }
})

export const TabModel = model('Tab', tabSchema);
