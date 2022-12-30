import { FetchStatus } from "@/class/fetchStatus";
import member_type from "@/class/participation";

export interface IGroupPostsState {
	item: IPosts | null;
	status: FetchStatus;
	message: null | string;
}

interface IPosts {
	totalPages: number;
	totalItems: number;
	page: number;
	hasNextPage: boolean;
	data: IPostsData[];
}

export interface IPostsData {
	id: string;
	content: string;
	member: IMember;
	attachments: IGroupAttachments[];
	createdAt: string;
	updatedAt: string;
}

export interface IMember {
	id: string;
	type: member_type;	
	createdAt: string;
	updatedAt: string;
	user: IUser;
}

export interface IUser {
	name: string;
	uuid: string;
}

export interface IAttachments {
	id: string;
	fileName: string;
	url: string;
	fileType: string;
}

interface IGroupAttachments extends IAttachments {
	groupId: string;
	memberId: string;
}

export default IPosts;