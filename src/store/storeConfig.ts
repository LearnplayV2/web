import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alert, { AlertState } from "./alert";
import dropdowns, { DropdownState } from './dropdown';
import leftMenu, { LeftMenuState } from "./leftMenu";

export interface RootState {
    alert: AlertState;
    dropdowns: DropdownState[];
    leftMenu: LeftMenuState;
}

const reducers = combineReducers({
    alert,
    dropdowns,
    leftMenu
});

const store = configureStore({
    reducer: reducers
});

export default store;