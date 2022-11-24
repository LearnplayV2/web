import { FetchStatus } from "@/class/fetchStatus";
import { FetchGroups, Groups } from "@/service/groups";
import store from "@/store/storeConfig";
import { Dispatch } from "redux";
import groups from "./store";

export interface GroupParams {
    page?: string;
}

export interface GroupQuery {
  title?: string;
}

class Data {
  static get(params: GroupParams) {
    return async (dispatch : Dispatch) => {
      const {page} = params;
      const {query} = store.getState().groups;

      dispatch(groups.actions.setStatus(FetchStatus.LOADING));
      try {
        const response = await Groups.fetch(page, query);
        dispatch(groups.actions.setGroups({ data: response.data }));
        
      } catch (err) {
        console.log("err", err);
        dispatch(groups.actions.setStatus(FetchStatus.ERROR));
      }
    };

  }

  static resetGroups() {
    const {dispatch} = store;
    dispatch(groups.actions.reset());
  }
}

export default Data;