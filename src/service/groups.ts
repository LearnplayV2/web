import { GroupQuery } from "@/components/dashboard/pages/groups/data";
import { headers, service } from ".";
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
		return service.get(this.path(), { params: query, headers });
	}

	static add(props: ICreateGroup) {
		return service.post(this.path("/new"), props, { headers });
	}

	static addOrUpdateLinks(groupId: string, links: IGroupLinks[]) {
		return service.post(this.path("/set/links"), links, { params: {id: groupId}, headers });
	}

	static fetchOne(uuid: string) {
		return service.get(this.path("/").concat(uuid), { headers });
	}

	static joinOrExit(groupId: string) {
		return service.post(this.path("/joinOrExit"), { id: groupId }, { headers });
	}
}

export { Groups };
