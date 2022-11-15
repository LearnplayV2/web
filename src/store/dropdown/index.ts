import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DropdownState {
    id: string;
    isActive: boolean;
}

const initialState : DropdownState[] = [];

const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        toggleDropdown(state, action: PayloadAction<string>) {
            const index = state.findIndex((dropdown) => dropdown.id === action.payload);
            if (index >= 0) {
                state.filter(dropdown => dropdown.id !== action.payload ? dropdown.isActive = false : dropdown.isActive = !dropdown.isActive);
                
            } else {
                state.push({
                    id: action.payload,
                    isActive: true
                });
            }
        },
    }
});

export const {toggleDropdown} = dropdownSlice.actions;
export default dropdownSlice.reducer;