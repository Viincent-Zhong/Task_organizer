import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tabReducer from './tabSlice'

const rootReducer = combineReducers({
    tab: tabReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
});

export default store;