import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    mode: null,
    job: null
}

const modalSlice = createSlice({ 
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.mode = action.payload.mode;
            state.job = action.payload.job;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.mode = null;
            state.job = null;
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;