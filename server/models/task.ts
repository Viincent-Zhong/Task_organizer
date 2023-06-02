import { Schema, model } from 'mongoose';

// Task interface
interface ITask {
    name: string;
    _id: Schema.Types.ObjectId;
    createdBy: Schema.Types.ObjectId;
    description: string;
    time_start: Schema.Types.Date;
    time_end: Schema.Types.Date;
    categories: [Schema.Types.ObjectId];
}

// Task model
const taskSchema = new Schema<ITask>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    time_start: { type: Schema.Types.Date, required: false },
    time_end: { type: Schema.Types.Date, required: false },
    categories: { type: [Schema.Types.ObjectId], required: true }
})

interface ITasks {
    _id: Schema.Types.ObjectId;
    createdBy: Schema.Types.ObjectId;
    tasks: [ITask]
}

const tasksSchema = new Schema<ITasks>({
    _id: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    tasks: { type: [taskSchema], required: true }
})

export const TasksModel = model('Tasks', tasksSchema);
