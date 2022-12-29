import { FetchStatus } from "@/class/fetchStatus";

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
	member: any;
	attachments: IGroupAttachments[];
}

export interface IAttachments {
	id: string;
	fileName: string;
	url: string;
	fileType: string;
	createdAt: string;
	updatedAt: string;
}

interface IGroupAttachments extends IAttachments {
	groupId: string;
	memberId: string;
}

export default IPosts;