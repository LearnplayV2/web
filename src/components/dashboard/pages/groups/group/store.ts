import { FetchStatus } from "@/class/fetchStatus";
import Participation from "@/class/participation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGroupState {
  data: IGroup | null;
  status: FetchStatus;
}

export interface IGroup {
  uuid: string;
  title: string;
  participation?: Participation;
  links: ILinks[],
  members: IMember[],
  staff: IMember[],
  description: string | null;
  visibility: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILinks {
  id?: string;
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
      } 
      state.status = action.payload.status ?? FetchStatus.SUCCESS;
    },
    setStatus(state, action: PayloadAction<FetchStatus>) {
      state.status = action.payload;
    },
    setGroupLinks(state, action: PayloadAction<{links: ILinks[]}>) {
      if(state.data == null) return;
        state.data.links = action.payload.links;
    },
    setGroupConfig(state, action:PayloadAction<{title: string, description: string | null}>) {
      if(state.data == null) return;
      state.data.title = action.payload.title;
      state.data.description = action.payload.description;
    }
  }
});

export default group;
