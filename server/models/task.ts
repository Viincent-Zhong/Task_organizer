import { Schema, model } from 'mongoose';

// Task interface
interface ITask {
    name: string;
    _id: Schema.Types.ObjectId;
    time_start: Schema.Types.Date;
    time_end: Schema.Types.Date;
    categories: [Schema.Types.ObjectId];
}

// Task model
const taskSchema = new Schema<ITask>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
    time_start: { type: Schema.Types.Date, required: false },
    time_end: { type: Schema.Types.Date, required: false },
    categories: { type: [Schema.Types.ObjectId], required: true }
})

export const TaskModel = model('Task', taskSchema);
