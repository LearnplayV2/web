import { FetchStatus } from "@/class/fetchStatus";
import { Groups } from "@/service/groups";
import { Dispatch } from "redux";
import group from "./store";

class Data {
  static get(groupId: string) {
    return async (dispatch: Dispatch) => {
      dispatch(group.actions.setStatus(FetchStatus.LOADING));
      try {
        const response = await Groups.fetchOne(groupId);
        dispatch(group.actions.setGroup({ data: response.data, status: FetchStatus.SUCCESS }));
      } catch (err) {
        dispatch(group.actions.setStatus(FetchStatus.ERROR));
      }
    };
  }
}

export default Data;