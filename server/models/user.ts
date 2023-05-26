import { Schema, model } from 'mongoose';

// User interface
interface IUser {
    _id: Schema.Types.ObjectId;
    email: string;
    googleId: string;
    tasks: [Schema.Types.ObjectId];
    category: [Schema.Types.ObjectId];
}

// User model
const userSchema = new Schema<IUser>({
    _id: { type: Schema.Types.ObjectId, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        }, message: 'Le champ e-mail doit être une adresse e-mail valide.'
        }
    },
    googleId: { type: String, required: true },
    tasks: { type: [Schema.Types.ObjectId], required: true },
    category: { type: [Schema.Types.ObjectId], required: true }
})

export const UserModel = model('User', userSchema);
