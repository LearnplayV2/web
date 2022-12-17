import { FetchStatus } from "@/class/fetchStatus";
import { Groups } from "@/service/groups/groups";
import { Dispatch } from "redux";
import group from "./store";

class Data {
  static get(groupId: string) {
    return async (dispatch: Dispatch) => {
      dispatch(group.actions.setStatus(FetchStatus.LOADING));
      try {
        const response = await Groups.fetchOne(groupId);
        dispatch(group.actions.setGroup({ data: response.data, status: FetchStatus.SUCCESS }));
      } catch (err: any) {
        dispatch(group.actions.setGroup({ data: err?.response?.data?.message ?? null, status: FetchStatus.ERROR }));
      }
    };
  }
}

export default Data;