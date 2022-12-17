import { GroupQuery } from "@/components/dashboard/pages/groups/data";
import { service } from ".";
import { Session } from "../authentication";

export interface FetchGroups {
	page: number;
	totalPages: number;
	hasNextPage: boolean;
	totalItems: number;
	groups: Group[];
	query: GroupQuery;
}

interface Group {
	uuid: string;
	title: string;
	description?: string;
	visibility: string;
	createdAt: string;
	updatedAt: string;
}

export interface ICreateGroup {
	title: string;
	description: string;
	visibility: GroupVisibility;
}

export class GroupVisibility {
	static private = "PRIVATE";
	static public = "PUBLIC";
}

export interface IGroupLinks {
	title: string;
	url: string;
}

class Groups {
	static path = (page?: string) => "/group".concat(page ?? "");

	static fetch(query: GroupQuery | null = null) {
		const token = Session.token();
		return service.get(this.path(), {
			params: query,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	static add(props: ICreateGroup) {
		const token = Session.token();
		return service.post(this.path("/new"), props, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	static config(groupId: string, props: { title: string; description?: string }) {
		const token = Session.token();
		return service.put(this.path("/updateConfig"), props, {
			params: { id: groupId },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	static addOrUpdateLinks(groupId: string, links: IGroupLinks[]) {
		const token = Session.token();
		return service.post(this.path("/set/links"), links, {
			params: { id: groupId },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	static fetchOne(uuid: string) {
		const token = Session.token();
		return service.get(this.path("/id/").concat(uuid), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	static joinOrExit(groupId: string) {
		const token = Session.token();
		return service.post(
			this.path("/joinOrExit"),
			{ id: groupId },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	}
}

export { Groups };
