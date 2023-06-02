import { Schema, model } from 'mongoose';

// Tab interface
interface ITab {
    name: string;
    _id: Schema.Types.ObjectId;
    createdBy: Schema.Types.ObjectId;
    tasks: [Schema.Types.ObjectId];
}

// Tab model
const tabSchema = new Schema<ITab>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    tasks: { type: [Schema.Types.ObjectId], required: true }
})

interface ITabs {
    _id: Schema.Types.ObjectId;
    createdBy: Schema.Types.ObjectId;
    tabs: [ITab]
}

// Tabs model
const tabsSchema = new Schema<ITabs>({
    _id: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    tabs: { type: [tabSchema], required: true }
})

export const TabsModel = model('Tabs', tabsSchema);
