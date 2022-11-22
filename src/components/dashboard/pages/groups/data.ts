import { Groups } from "@/service/groups";
import store from "@/store/storeConfig";
import groups from "./store";

export interface GroupParams {
    page?: string;
}

export interface GroupQuery {
  title?: string;
}

class Data {
  static async get(params: GroupParams) {
    const {page} = params;
    const {dispatch} = store;
    const {query} = store.getState().groups;

    dispatch(groups.actions.setGroups({ isLoading: true, query }));

    console.log('query', store.getState().groups)
    
    try {

      const response = await Groups.fetch(page, query);
      dispatch(groups.actions.setGroups({ data: response.data }));
    } catch (err) {

      console.log("err", err);
      dispatch(groups.actions.setGroups({ error: true }));
    }

  }

  static resetGroups() {
    const {dispatch} = store;
    dispatch(groups.actions.reset());
  }
}

export default Data;