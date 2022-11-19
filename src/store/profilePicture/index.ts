import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfilePictureState {
    url: string;
}

const initialState: ProfilePictureState = {
    url: '/assets/default-avatar.jpg'
}

const profilePictureSlice = createSlice({
    name: 'profilePicture',
    initialState,
    reducers: {
        updateProfilePicture(state, action: PayloadAction<string | undefined>) {
            if(action.payload) {
                state.url = action.payload;
            }
        },
        resetProfilePicture(state) {
            state.url = initialState.url;
        }
    }
});

export const { updateProfilePicture, resetProfilePicture } = profilePictureSlice.actions;
export default profilePictureSlice.reducer;