import { FetchStatus } from '@/class/fetchStatus';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGroupPostsState } from './types';

const initialState = {
    item: null,
    status: FetchStatus.INITIAL,
    message: null
} as IGroupPostsState;

const posts = createSlice({
    name: 'group-posts',
    initialState,
    reducers: {
        setPosts(state: any, action: PayloadAction<IGroupPostsState>) {
            if(action.payload) {
                state.item = action.payload;
                state.status = FetchStatus.SUCCESS;
                state.message = action.payload?.message ?? null;
            }
        },
        setStatus(state: IGroupPostsState, action: PayloadAction<string>) {
            state.status = action.payload;
        },
        setMessage(state: any, action: PayloadAction<string>) {
            state.message = action.payload;
        },
        setTemporaryMessage(state: IGroupPostsState, action: PayloadAction<string>) {
            state.message = action.payload;
            setTimeout(() => {
                state.message = null;
            }, 3000);
        }
    }
});

export default posts;
