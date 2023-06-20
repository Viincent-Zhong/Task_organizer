import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITab } from '../services/Tab'
import { ITask } from '../services/Task';

export interface ITabSlice {
    tab: ITab;
    tasks: ITask[];
    ftasks: ITask[];
}

export const tabSlice = createSlice({
    name: 'tab',
    initialState: [] as ITabSlice[],
    reducers: {
        sliceAddTab: (state, action: PayloadAction<ITab>) => {
            state.push({tab: action.payload, tasks: [], ftasks: []});
        },
        sliceAddManyTab: (state, action: PayloadAction<ITab[]>) => {
            const tabs = action.payload.map((tab) => ({
                tab: tab,
                tasks: [],
                ftasks: []
            }));
            state.push(...tabs)
        },
        sliceDeleteTab: (state, action) => {
            const id = action.payload;
            return state.filter(tab => tab.tab._id !== id);
        },
        sliceUpdateTab: (state, action: PayloadAction<ITab>) => {
            const tab = action.payload;
            const found = state.find(indexTab => indexTab.tab._id === tab._id);
            if (found) {
                found.tab.name = tab.name;
            } else
                state.push({tab: action.payload, tasks: [], ftasks: []});
        },
    },
});

export const { sliceAddTab, sliceAddManyTab, sliceDeleteTab, sliceUpdateTab } = tabSlice.actions

export default tabSlice.reducer