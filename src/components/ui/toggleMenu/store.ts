import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToggleMenuState {
  active: boolean;
  id: string;
}

const initialState : ToggleMenuState[] = [];

const toggleMenu = createSlice({
  name: 'toggleMenu',
  initialState,
  reducers: {
    setMenu(state, action: PayloadAction<ToggleMenuState>) {
      const index = state.findIndex(m => m.id == action.payload.id);
      if (index >= 0) {
        state[index].active = action.payload.active;
      } else {
        state.splice(0, state.length);
        state.push(action.payload);
      }
    },
    resetMenu(state) {
      state.splice(0, state.length);
    }
  }
});

export default toggleMenu;