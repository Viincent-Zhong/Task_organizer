import { Schema, model } from 'mongoose';

// User interface
interface IUser {
    name: string;
    email: string;
}

// User model
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true }
})

export const UserModel = model('User', userSchema);
