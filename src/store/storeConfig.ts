import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alert, { AlertState } from "./alert";
import dropdowns, { DropdownState } from './dropdown';
import leftMenu, { LeftMenuState } from "./leftMenu";
import profilePicture, { ProfilePictureState } from "./profilePicture";

export interface RootState {
    alert: AlertState;
    dropdowns: DropdownState[];
    leftMenu: LeftMenuState;
    profilePicture: ProfilePictureState;
}

const reducers = combineReducers({
    alert,
    dropdowns,
    leftMenu,
    profilePicture
});

const store = configureStore({
    reducer: reducers
});

export default store;