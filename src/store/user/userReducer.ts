import { createAction, createReducer } from "@reduxjs/toolkit"

export type UserState = {
    uuid: string | undefined;
}

const INITIAL_STATE : UserState = {
    uuid: undefined
}

export const changeUuid = createAction<string>('USER_UUID_CHANGED');

export const userReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(changeUuid, (state, action) => {
            state.uuid = action.payload
        })
});
