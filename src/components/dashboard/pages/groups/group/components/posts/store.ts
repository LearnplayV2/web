import { FetchStatus } from '@/class/fetchStatus';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IPosts, { IGroupPostsState, IPostsData } from './types';

const initialState = {
    item: null,
    status: FetchStatus.INITIAL,
    message: null
} as IGroupPostsState;

const posts = createSlice({
    name: 'group-posts',
    initialState,
    reducers: {
        setPosts(state: any, action: PayloadAction<IPosts>) {
            if(action.payload) {
                state.item = action.payload;
                state.status = FetchStatus.SUCCESS;
            }
        },
        addPost(state: any, action: PayloadAction<IPostsData>) {
            if(action.payload) {
                state.item.data.unshift(action.payload);
                state.item.totalItems++;
            }
        },
        setMessage(state: any, action: PayloadAction<string>) {
            state.message = action.payload;
        }
    }
});

export default posts;
