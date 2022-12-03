import { FetchStatus } from "@/class/fetchStatus";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGroupState {
  data: IGroup | null;
  status: FetchStatus;
}

export interface IGroup {
  uuid: string;
  title: string;
  participation: {
    isMember: boolean;
    isStaff: boolean;
  }
  links: ILinks[],
  members: IMember[],
  staff: IMember[],
  description: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
}

interface ILinks {
  id: string;
  title: string;
  url: string;
}

interface IMember {
  id: number;
  user: {
    uuid: string;
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
}

const initialState = {
  data: null,
  status: FetchStatus.INITIAL
} as IGroupState;

const group = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup(state, action: PayloadAction<IGroupState>) {
      if(action.payload.data) {
        state.data = action.payload.data;
        state.status = FetchStatus.SUCCESS;
      } 
    },
    setStatus(state, action: PayloadAction<FetchStatus>) {
      state.status = action.payload;
    }
  }
});

export default group;
