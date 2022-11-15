import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LeftMenuState {
    isShowing: boolean;
}

const initialState: LeftMenuState = {
    isShowing: false
}

const leftMenuSlice = createSlice({
    name: 'leftMenu',
    initialState,
    reducers: {
        toggleLeftMenu(state, action: PayloadAction<boolean | undefined>) {
            if(action?.payload) {
                state.isShowing = action.payload;
            } else {
                state.isShowing = !state.isShowing;
            }
        }
    }
});

export const {toggleLeftMenu} = leftMenuSlice.actions;
export default leftMenuSlice.reducer;