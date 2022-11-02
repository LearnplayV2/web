import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

export interface AlertSlice {
    isActive: boolean;
    element?: React.ReactNode;
}

const initialState : AlertSlice = {
    isActive: false,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<React.ReactNode>) => {
            state.isActive = true;
            state.element = action.payload;
        },
        closeModal(state) {
            state.isActive = false;
            state.element = undefined;
        }
    }
});

export const {setModal, closeModal} = alertSlice.actions
export default alertSlice.reducer;