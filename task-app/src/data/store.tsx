import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tabReducer from './tabSlice'
import categoryReducer from './categorySlice'

const rootReducer = combineReducers({
    tab: tabReducer,
    category: categoryReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
});

export default store;