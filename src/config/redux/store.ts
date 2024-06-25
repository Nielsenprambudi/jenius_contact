import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";

const store = configureStore({
    reducer: {
        api: apiReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;