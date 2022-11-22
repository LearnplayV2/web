import { Groups } from "@/service/groups";
import store from "@/store/storeConfig";
import groups from "./store";

class Data {
  static async loadGroups(page?: string) {
    const {dispatch} = store;
    dispatch(groups.actions.setGroups({ isLoading: true }));
    try {
      const response = await Groups.fetch(page);
      dispatch(groups.actions.setGroups({ data: response.data }));
    } catch (err) {
      console.log("err", err);
      dispatch(groups.actions.setGroups({ error: true }));
    }
  }

  static resetGroups() {
    const {dispatch} = store;
    dispatch(groups.actions.setGroups({ data: undefined }));
  }
}

export default Data;