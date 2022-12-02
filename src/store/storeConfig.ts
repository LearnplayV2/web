import group, { IGroupState } from "@/components/dashboard/pages/groups/group/store";
import groups, { IGroupsState } from "@/components/dashboard/pages/groups/store";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import alert, { AlertState } from "./alert";
import dropdowns, { DropdownState } from './dropdown';
import leftMenu, { LeftMenuState } from "./leftMenu";
import notifications, { INotification} from "./notifications";
import profilePicture, { ProfilePictureState } from "./profilePicture";
import toggleMenu, { ToggleMenuState } from "@/components/ui/toggleMenu/store";

export interface RootState {
    alert: AlertState;
    dropdowns: DropdownState[];
    leftMenu: LeftMenuState;
    profilePicture: ProfilePictureState;
    notifications: INotification;
    groups: IGroupsState;
    group: IGroupState;
    toggleMenu: ToggleMenuState[];
}

const reducers = combineReducers({
    alert,
    dropdowns,
    leftMenu,
    profilePicture,
    notifications,
    groups: groups.reducer,
    group: group.reducer,
    toggleMenu: toggleMenu.reducer
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(thunk)
});

export default store;