import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : string[] = [];

const toggleMenu = createSlice({
  name: 'toggleMenu',
  initialState,
  reducers: {
    setMenu(state, action: PayloadAction<string>) {
      const index = state.findIndex(m => m == action.payload);
      if (index >= 0) {
        state = state.splice(index, 1);
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