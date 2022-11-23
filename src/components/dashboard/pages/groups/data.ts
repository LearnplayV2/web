import { FetchGroups, Groups } from "@/service/groups";
import store from "@/store/storeConfig";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
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
      
      function onSuccess(data: FetchGroups) {
        dispatch(groups.actions.setGroups({ data }));
      }
      
      function onError() {
        dispatch(groups.actions.setStatus({ error: true }));
      }
     
      dispatch(groups.actions.setStatus({ isLoading: true }));
    
      try {
        const response = await Groups.fetch(page, query);
        return onSuccess(response.data);
        
      } catch (err) {
        console.log("err", err);
        return onError();
      }

    };

  }

  static resetGroups() {
    const {dispatch} = store;
    dispatch(groups.actions.reset());
  }
}

export default Data;