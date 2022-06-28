import { createAction, createReducer } from "@reduxjs/toolkit"

export type UserState = {
    uuid: string | undefined;
    imageUuid: string | undefined;
}

const INITIAL_STATE : UserState = {
    uuid: undefined,
    imageUuid: undefined
}

export const setUserUuid = createAction<string>('USER_UUID_CHANGED');
export const setImageUuid = createAction<string>('USER_IMAGE_UUID_CHANGED');
export const setUserName = createAction<string>('USER_NAME_CHANGED');

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(setImageUuid, (state, action) => {
            state.imageUuid = action.payload
        })
        .addCase(setUserUuid, (state, action) => {
            state.uuid = action.payload
        })
});
