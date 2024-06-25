import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../http";
import axios from "axios";

export interface objectContact {
    id?: string;
    firstName: string;
    lastName: string;
    age: number;
    photo: string;
}


interface initState {
    contact?: objectContact[];
    showModal?: boolean;
}

let initialState: initState = {
    contact: [],
    showModal: false
}

export const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        getContact: (state, action: PayloadAction<objectContact[]>) => {
            state.contact = action.payload;
        },
        showModal: (state, action: PayloadAction<boolean>) => {
            state.showModal = action.payload;
        }        
    }
});

export const {getContact, showModal} = apiSlice.actions;

export default apiSlice.reducer;