import { FetchStatus } from "@class/fetchStatus";
import { Groups } from "@service/groups";
import store from "@store/storeConfig";
import { Dispatch } from "redux";
import groups from "./store";

export interface GroupQuery extends GroupParams {
  page?: string;
}

export interface GroupParams {
  title?: string;
}

class Data {
  static get(params: GroupQuery) {
    return async (dispatch : Dispatch) => {

      let query = {
        ...params,
        ...store.getState().groups.query
      };

      dispatch(groups.actions.setStatus(FetchStatus.LOADING));
      try {
        const response = await Groups.fetch(query);
        dispatch(groups.actions.setGroups({ data: response.data }));
        
      } catch (err) {
        dispatch(groups.actions.setGroups({data: err?.response?.data?.message ?? null , status: FetchStatus.ERROR}));
      }
    };
  }

  static resetGroups() {
    const {dispatch} = store;
    dispatch(groups.actions.reset());
  }
}

export default Data;