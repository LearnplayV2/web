import { Session } from "@/authentication";
import { service } from "..";
import { Groups } from "./groups";

interface IGroupAttachmentDelete {
	fileNames: string[];
}

class GroupAttachments {
	static path = Groups.path;

	static create(groupId: string, data: FormData) {
		const token = Session.token();
		return service.post(this.path("/posts/").concat(groupId).concat('/attachment'), data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});
	}

	static delete(groupId: string, data: IGroupAttachmentDelete) {
		const token = Session.token();
		return service.delete(this.path("/posts/").concat(groupId).concat('/attachment'), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data
		});
	}
}

export default GroupAttachments;
