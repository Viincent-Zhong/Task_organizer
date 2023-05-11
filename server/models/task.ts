import { Schema, model } from 'mongoose';

// Task interface
interface ITask {
    name: string;
}

// Task model
const taskSchema = new Schema<ITask>({
    name: { type: String, required: true }
})

export const TaskModel = model('Task', taskSchema);
