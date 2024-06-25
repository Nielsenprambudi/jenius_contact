import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface objectContact {
    id?: string;
    firstName: string;
    lastName: string;
    age: string;
    photo: string;
}


interface initState {
    contact?: objectContact[];
    tempContact?: objectContact;
    showModal?: boolean;
}

let initialState: initState = {
    contact: [],
    tempContact: {
        id: "",
        firstName: "",
        lastName: "",
        age: "",
        photo: ""
    },
    showModal: false
}

export const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        getContact: (state, action: PayloadAction<objectContact[]>) => {
            state.contact = action.payload;
        },
        clearContact: (state) => {
            state.contact = [];
        },
        showModal: (state, action: PayloadAction<boolean>) => {
            state.showModal = action.payload;
        },
        saveContactTemp: (state, action: PayloadAction<objectContact>) => {
            state.tempContact = action.payload;
        },        
        delContactTemp: (state) => {
            state.tempContact = {
                id: "",
                firstName: "",
                lastName: "",
                age: "",
                photo: ""
            };
        }        
    }
});

export const {
    getContact, 
    clearContact, 
    showModal,
    saveContactTemp,
    delContactTemp
} = apiSlice.actions;

export default apiSlice.reducer;