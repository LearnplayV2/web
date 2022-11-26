import { Dashboard } from "@/components/dashboard/page";
import store, { RootState } from "@/store/storeConfig";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Data from "./data";
import { IGroupState } from "./store";

const GroupId = () => {
	const params = useParams();
	const { id: groupId, title: groupTitle } = params;
	const { dispatch } = store;

	useEffect(() => {
		if (typeof groupId != "undefined") {
			dispatch(Data.get(groupId));
		}
	}, [groupId]);

	return (
		<Dashboard hasLeftMenu={true}>
			<div className="container" style={{ marginTop: "10px" }}>
				<ListGroup />
			</div>
		</Dashboard>
	);
};

const ListGroup = () => {
	const group = useSelector((state: RootState) => state.group) as IGroupState;
	console.log(group);

	return <div>hello</div>;
};

export { GroupId };
