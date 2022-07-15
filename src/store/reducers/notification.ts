import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
    notifications: Notification[]
}

export interface NotificationProps {
    id: number,
    userId: string,
    title: string,
    description: string;
    read: boolean;
    createdAt: string;
}

const INITIAL_STATE : NotificationState = {
    notifications: []
}

export const setNotification = createAction<any>('NOTIFICATION_SET');
export const addNotification = createAction<any>('NOTIFICATION_ADD');

export const notificationsReducer = createReducer(INITIAL_STATE, (builder) => {
    builder
        .addCase(setNotification, (state, action) => {
            state.notifications = (action.payload);
        })
        .addCase(addNotification, (state, action) => {
            state.notifications.unshift(action.payload);
        })
});