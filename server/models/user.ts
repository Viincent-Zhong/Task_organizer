import { Schema, model } from 'mongoose';

// User interface
interface IUser {
    name: string;
    _id: Schema.Types.ObjectId;
    googleId: string;
    email: string;
    tasks: [Schema.Types.ObjectId];
    category: [Schema.Types.ObjectId];
}

// User model
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    tasks: { type: [Schema.Types.ObjectId], required: true },
    category: { type: [Schema.Types.ObjectId], required: true }
})

export const UserModel = model('User', userSchema);
