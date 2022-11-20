import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INotification {
    firstValueSetted: boolean;
    notifications: INotificationDetails[]
}

export interface INotificationDetails {
    id: number,
    title: string,
    userId: string,
    description: string | null,
    read: boolean,
    createdAt: string,
    updatedAt: string,
}

const initialState : INotification = {
    firstValueSetted: false,
    notifications: []
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setFirstValue(state) {
            state.firstValueSetted = true;
        },
        set(state, action: PayloadAction<INotificationDetails[]>) {
            if(!state.firstValueSetted) {
                state.firstValueSetted = true;
            }
            state.notifications = action.payload;
        },
    }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;