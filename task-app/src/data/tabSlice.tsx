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
        // TAB
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
            const tabIndex = state.findIndex(index => index.tab._id === id);
            if (tabIndex !== -1)
                state.splice(tabIndex, 1)
            return state.filter(tab => tab.tab._id !== id);
        },
        sliceUpdateTab: (state, action: PayloadAction<ITab>) => {
            const tab = action.payload;
            const found = state.find(index => index.tab._id === tab._id);
            if (found) {
                found.tab.name = tab.name;
            } else
                state.push({tab: action.payload, tasks: [], ftasks: []});
        },

        // TASK
        sliceAddTask: (state, action: PayloadAction<{id: string, task: ITask}>) => {
            const { id, task } = action.payload;
            const tab = state.find(index => index.tab._id === id);
            if (tab)
                tab.tasks.push(task);
        },
        sliceAddManyTask: (state, action: PayloadAction<{id: string, tasks: ITask[]}>) => {
            const { id, tasks } = action.payload;
            const tab = state.find(index => index.tab._id === id);
            if (tab)
                tab.tasks.push(...tasks);
        },
        sliceDeleteTask: (state, action: PayloadAction<{id: string, task: ITask}>) => {
            const { id, task } = action.payload;
            const tab = state.find(indexTab => indexTab.tab._id === id);
            if (tab) {
                const taskIndex = tab.tasks.findIndex(index => index._id === task._id);
                if (taskIndex !== -1)
                    tab.tasks.splice(taskIndex, 1);
            }
        },
        sliceUpdateTaskName: (state, action: PayloadAction<{id: string, taskID: string, name: string}>) => {
            const { id, taskID, name } = action.payload;
            const tab = state.find(indexTab => indexTab.tab._id === id);
            if (!tab)
                return
            const foundTask = tab.tasks.find(index => index._id === taskID);
            if (foundTask)
                foundTask.name = name
        },
        sliceUpdateTaskDescription: (state, action: PayloadAction<{id: string, taskID: string, description: string}>) => {
            const { id, taskID, description } = action.payload;
            const tab = state.find(indexTab => indexTab.tab._id === id);
            if (!tab)
                return
            const foundTask = tab.tasks.find(index => index._id === taskID);
            if (foundTask)
                foundTask.description = description
        },
        sliceUpdateTaskStartDate: (state, action: PayloadAction<{id: string, taskID: string, sdate: Date | null}>) => {
            const { id, taskID, sdate } = action.payload;
            const tab = state.find(indexTab => indexTab.tab._id === id);
            if (!tab)
                return
            const foundTask = tab.tasks.find(index => index._id === taskID);
            if (foundTask)
                foundTask.time_start = sdate
        },
        sliceUpdateTaskEndDate: (state, action: PayloadAction<{id: string, taskID: string, edate: Date | null}>) => {
            const { id, taskID, edate } = action.payload;
            const tab = state.find(indexTab => indexTab.tab._id === id);
            if (!tab)
                return
            const foundTask = tab.tasks.find(index => index._id === taskID);
            if (foundTask)
                foundTask.time_end = edate
        },
        sliceAddTaskCategory: (state, action: PayloadAction<{id: string, taskID: string, categoryID: string}>) => {
            const { id, taskID, categoryID } = action.payload;
            const tab = state.find(indexTab => indexTab.tab._id === id);
            if (!tab)
                return
            const foundTask = tab.tasks.find(index => index._id === taskID);
            if (foundTask)
                foundTask.categories.push(categoryID)
        },
        sliceDeleteTaskCategory: (state, action: PayloadAction<{id: string, taskID: string, categoryID: string}>) => {
            const { id, taskID, categoryID } = action.payload;
            const tab = state.find(indexTab => indexTab.tab._id === id);
            if (!tab)
                return
            const foundTask = tab.tasks.find(indexTask => indexTask._id === taskID);
            if (foundTask) {
                const catIndex = foundTask.categories.findIndex(index => index === categoryID)
                if (catIndex !== -1)
                    foundTask.categories.splice(catIndex, 1);
            }
        },
    },
});

export const {
    sliceAddTab, sliceAddManyTab, sliceDeleteTab, sliceUpdateTab,
    sliceAddTask, sliceAddManyTask, sliceDeleteTask, sliceUpdateTaskName, sliceUpdateTaskDescription, sliceUpdateTaskStartDate, sliceUpdateTaskEndDate, sliceAddTaskCategory, sliceDeleteTaskCategory
} = tabSlice.actions

export default tabSlice.reducer