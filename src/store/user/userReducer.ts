import { createAction, createReducer } from "@reduxjs/toolkit"

export type UserState = {
    photo: string | undefined;
}

const INITIAL_STATE : UserState = {
    photo: undefined
}

export const changePhoto = createAction<string>('PHOTO_CHANGED');

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(changePhoto, (state, action) => {
            state.photo = action.payload
        })
});
