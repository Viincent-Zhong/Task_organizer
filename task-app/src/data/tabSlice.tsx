import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITab } from '../services/Tab'

export const tabSlice = createSlice({
    name: 'tab',
    initialState: [] as ITab[],
    reducers: {
        sliceAddTab: (state, action: PayloadAction<ITab>) => {
            state.push(action.payload);
        },
        sliceAddManyTab: (state, action: PayloadAction<ITab[]>) => {
            state.push(...action.payload);
        },
        sliceDeleteTab: (state, action) => {
            const id = action.payload;
            return state.filter(tab => tab._id !== id);
        },
        sliceUpdateTab: (state, action: PayloadAction<ITab>) => {
            const tab = action.payload;
            const found = state.find(tab => tab._id === tab._id);
            if (found) {
                found.name = tab.name;
            } else
                state.push(action.payload);
        },
    },
});

export const { sliceAddTab, sliceAddManyTab, sliceDeleteTab, sliceUpdateTab } = tabSlice.actions

export default tabSlice.reducer