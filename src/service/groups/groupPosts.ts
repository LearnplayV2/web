import { Session } from "@/authentication";
import { service } from "..";
import { Groups } from "./groups";

class GroupPosts {
	static path = Groups.path;

  static index(groupId: string) {
		const token = Session.token();
    return service.get(this.path('/posts/').concat(groupId), {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  static create(groupId: string) {
    const token = Session.token();
    return service.post(this.path('/posts/').concat(groupId), {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
  
}

export default GroupPosts;