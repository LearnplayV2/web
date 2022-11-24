import { FetchStatus } from "@class/fetchStatus";
import { FetchGroups } from "@service/groups";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupQuery } from "./data";

export interface IGroupsState {
    data: FetchGroups | null;
    status: FetchStatus;
    query: GroupQuery | null;
}

interface IGroupPayloadAction {
    error?: boolean;
    isLoading?: boolean;
    data?: FetchGroups;
    query?: GroupQuery | null;
}

const initialState : IGroupsState = {
    data: null,
    query: null,
    status: FetchStatus.INITIAL
};


const groups = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups(state, action: PayloadAction<IGroupPayloadAction>) {
            if(typeof action.payload.query != 'undefined') state.query = action.payload?.query;
            if(action.payload.data) {
                state.data = action.payload.data;
                state.status = FetchStatus.SUCCESS;
            } 
        },
        setStatus(state, action: PayloadAction<FetchStatus>) {
            state.status = action.payload;
        },
        setQuery(state, action: PayloadAction<GroupQuery>) {
            state.query = {...state.query, ...action.payload};
        },
        reset(state) {
            state.data = null;
            state.status = FetchStatus.INITIAL;
            state.query = null;
        }
    }
});

export default groups;