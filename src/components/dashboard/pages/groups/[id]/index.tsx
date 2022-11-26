import { FetchStatus } from "@/class/fetchStatus";
import { Dashboard } from "@/components/dashboard/page";
import store, { RootState } from "@/store/storeConfig";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Data from "./data";
import { IGroupState } from "./store";
import { Styles } from "./styles.css";
import {BsGear} from 'react-icons/bs';
import { setModal } from "@/store/alert";
import { ConfigGroup } from "@/components/modal/group/ConfigGroup";

const GroupId = () => {
	const params = useParams();
	const group = useSelector((state: RootState) => state.group) as IGroupState;
	const { id: groupId } = params;
	const { dispatch } = store;

	useEffect(() => {
		if (typeof groupId != "undefined") {
			dispatch(Data.get(groupId));
		}
	}, [groupId]);

	switch (group.status) {
		case FetchStatus.INITIAL || FetchStatus.LOADING:
			return <h3>Carregando...</h3>;
		case FetchStatus.ERROR:
			return <h3>Ocorreu um erro inesperado, tente novamente.</h3>;
		case FetchStatus.SUCCESS:
			return (
				<Dashboard hasLeftMenu={true}>
					<div className="container" style={{ marginTop: "4rem" }}>
						<MainGroup />
					</div>
				</Dashboard>
			);
	}
};

const MainGroup = () => {
	const group = useSelector((state: RootState) => state.group) as IGroupState;
	const data = group.data!;

	return (
		<>
			<Cover />
			to do
		</>
	);
};

const Cover = () => {
	const group = useSelector((state: RootState) => state.group) as IGroupState;
	const data = group.data!;
  const dispatch = useDispatch();
  
  class Handle {
    static config = () => {
      dispatch(setModal({element: <ConfigGroup />}));
    }
  }

	return (
		<>
			<div css={Styles.cover}>
				<div className="title">
					<span>{data.title}</span>
					<div className="description">
						<span>{data.description}</span>
					</div>
          {data.participation.isStaff && (
            <div className="config" title="configurar" onClick={Handle.config}>
              <BsGear size={24} />
            </div>
          )}
				</div>
				<div className="links">
					{data.links.map((link) => (
						<li>
							<a href={link.url}>{link.title}</a>
						</li>
					))}
				</div>
			</div>
		</>
	);
};

export { GroupId };
