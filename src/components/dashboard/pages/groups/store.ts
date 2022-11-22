import { FetchStatus } from "@components/ui/fetchComponent";
import { FetchGroups } from "@service/groups";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGroupsState {
    data: FetchGroups | null;
    status: FetchStatus;
}

interface IGroupPayloadAction {
    error?: boolean;
    isLoading?: boolean;
    data?: FetchGroups;
}

const initialState : IGroupsState = {
    data: null,
    status: FetchStatus.INITIAL
};

const groups = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups(state, action: PayloadAction<IGroupPayloadAction>) {
            if(action.payload.data) {
                state.data = action.payload.data;
                state.status = action.payload.isLoading ? FetchStatus.LOADING : action.payload.error ? FetchStatus.ERROR : FetchStatus.SUCCESS;
            } else {
                state.status = FetchStatus.INITIAL;
            }
        }
    }
});

export default groups;