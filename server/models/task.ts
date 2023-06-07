import { Schema, model } from 'mongoose';

// Task interface
export interface ITask {
    name: string;
    _id?: Schema.Types.ObjectId;
    createdBy?: Schema.Types.ObjectId;
    description: string;
    time_start?: Date;
    time_end?: Date;
    categories: [Schema.Types.ObjectId];
    tab: Schema.Types.ObjectId;
}

// Task model
const taskSchema = new Schema<ITask>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    time_start: { type: Schema.Types.Date, required: false },
    time_end: { type: Schema.Types.Date, required: false },
    categories: { type: [Schema.Types.ObjectId], required: true },
    tab: { type: Schema.Types.ObjectId, required: true }
})

export const TaskModel = model('Task', taskSchema);
