interface IPosts {
	totalPages: number;
	totalItems: number;
	page: number;
	hasNextPage: boolean;
	data: IPostsData[];
}

interface IPostsData {
	id: string;
	content: string;
	member: any;
}

export default IPosts;