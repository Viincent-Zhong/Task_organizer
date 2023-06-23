import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../services/Category'

export const categorySlice = createSlice({
    name: 'category',
    initialState: [] as ICategory[],
    reducers: {
        sliceAddCategory: (state, action: PayloadAction<ICategory>) => {
            state.push(action.payload)
        },
        sliceAddManyCategory: (state, action: PayloadAction<ICategory[]>) => {
            state.push(...action.payload)
        },
        sliceDeleteCategory: (state, action) => {
            const id = action.payload;
            return state.filter(category => category._id !== id);
        },
        sliceUpdateCategory: (state, action: PayloadAction<{id: string, name: string}>) => {
            const { id, name } = action.payload;
            const found = state.find(index => index._id === id);
            if (found)
                found.name = name;
        },
    },
});

export const { sliceAddCategory, sliceAddManyCategory, sliceDeleteCategory, sliceUpdateCategory } = categorySlice.actions

export default categorySlice.reducer