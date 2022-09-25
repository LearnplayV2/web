import { createAction, createReducer } from "@reduxjs/toolkit"
import { defaultUserImage } from "../../utils/defaultImage";

export type UserState = {
    uuid: string | undefined;
    image: string | undefined;
    email: string | undefined;
}

const INITIAL_STATE : UserState = {
    uuid: undefined,
    image: defaultUserImage(),
    email: undefined
}

export const setUserUuid = createAction<string>('USER_UUID_CHANGED');
export const setImage = createAction<string>('USER_IMAGE_CHANGED');
export const setUserName = createAction<string>('USER_NAME_CHANGED');
export const setUserEmail = createAction<string>('USER_EMAIL_CHANGED');

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(setImage, (state, action) => {
            state.image = action.payload
        })
        .addCase(setUserUuid, (state, action) => {
            state.uuid = action.payload
        })
        .addCase(setUserEmail, (state, action) => {
            state.email = action.payload
        })
});
