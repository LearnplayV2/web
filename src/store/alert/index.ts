import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

export interface AlertState {
    isActive: boolean;
    element?: React.ReactNode;
    fx?: boolean;
}

const initialState : AlertState = {
    isActive: false,
    fx: true
};

interface Action {
    element: React.ReactNode;
    fx?: boolean;
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<Action>) => {
            if(typeof action.payload.fx != 'undefined') {
                state.fx = action.payload.fx;
            }
            state.isActive = true;
            state.element = action.payload.element;
        },
        closeModal(state) {
            state.isActive = false;
            state.element = undefined;
        }
    }
});

export const {setModal, closeModal} = alertSlice.actions
export default alertSlice.reducer;