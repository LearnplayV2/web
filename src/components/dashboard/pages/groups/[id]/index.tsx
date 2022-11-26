import { FetchStatus } from "@/class/fetchStatus";
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

  switch(group.status) {
    case FetchStatus.INITIAL || FetchStatus.LOADING:
      return <h3>Carregando...</h3>;
    case FetchStatus.ERROR:
      return <h3>Ocorreu um erro inesperado, tente novamente.</h3>;
  }

  const data = group.data!;

	return(
    <>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </>
  );
};

export { GroupId };
