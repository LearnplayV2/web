import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alert, { AlertState } from "./alert";
import dropdowns, { DropdownState } from './dropdown';

export interface RootState {
    alert: AlertState;
    dropdowns: DropdownState[];
}

const reducers = combineReducers({
    alert,
    dropdowns
});

const store = configureStore({
    reducer: reducers
});

export default store;