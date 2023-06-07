import { Schema, model } from 'mongoose';

// Tab interface
export interface ITab {
    name: string;
    _id?: Schema.Types.ObjectId;
    createdBy?: Schema.Types.ObjectId;
}

// Tab model
const tabSchema = new Schema<ITab>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
})

export const TabModel = model('Tab', tabSchema);
