import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

export interface AlertState {
    isActive: boolean;
    element?: React.ReactNode;
    compact: boolean;
    fx?: boolean;
    width: string;
}

const initialState : AlertState = {
    isActive: false,
    fx: true,
    compact: false,
    width: '50%'
};

interface Action {
    element: React.ReactNode;
    fx?: boolean;
    compact?: boolean;
    width?: string;
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<Action>) => {
            if(typeof action.payload.fx != 'undefined') {
                state.fx = action.payload.fx;
            }
            if(typeof action.payload.compact != 'undefined') {
                state.compact = action.payload.compact;
            }
            if(typeof action.payload.width != 'undefined') {
                state.width = action.payload.width;
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