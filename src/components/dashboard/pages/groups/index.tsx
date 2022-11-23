import { css } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchGroups, Groups } from "@service/groups";
import { Faded } from "@components/ui/animated";
import { Dashboard } from "@components/dashboard/page";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { isEmpty } from "@utils/isEmpty";
import { Dispatch, useEffect } from "react";
import { IGroupsState } from "./store";
import { connect, useSelector } from "react-redux";
import { RootState } from "@store/storeConfig";
import { FetchComponent, FetchStatus } from "@components/ui/fetchComponent";
import Data from "./data";

interface IGroup extends React.PropsWithChildren, IGroupsState {
	dispatch: Dispatch<any>;
}

const Group = connect(mapStateToProps)((props: IGroup) => {
	const {status} = props;

	useEffect(() => {
		return () => {
			Data.resetGroups();
		}
	}, []);

	console.log('status', status)
	
	return (
		<>
			<Dashboard hasLeftMenu={true}>
				<Faded>
					<div className="main-wrapper">
						<h1>Grupos de estudo</h1>
						<FetchComponent
							status={status}
							onError={<b>Ocorreu um erro inesperado, tente novamente</b>}
							onLoading={<b>Aguarde um momento...</b>}
						>
							<ListGroups />
						</FetchComponent>
					</div>
				</Faded>
			</Dashboard>
		</>
	);
});

const ListGroups = () => {
	const { data } = useSelector((state: RootState) => state.groups);

	if (data?.totalItems == 0) {
		return <h1>Nenhum grupo foi criado ainda.</h1>;
	}

	return (
		<>
			<p style={{ marginTop: "1rem" }}>
				Atualmente há {data?.totalItems} grupos públicos que você pode ingressar.
			</p>

			<div style={{ marginTop: "4rem" }}>
				{data?.groups.map((group, index) => (
					<div key={index}>
						<h2>{group.title}</h2>
						<p>
							{!isEmpty(group?.description)
								? group.description
								: "Sem descrição"}
						</p>
					</div>
				))}

				<Pagination />
			</div>
		</>
	);
};

const Pagination = () => {
	const { data, status } = useSelector((state: RootState) => state.groups);
	const params = useParams();
	const navigate = useNavigate();
	const active = (page: any) => params.page == page;

	useEffect(() => {
		Data.get({page: params.page});
	}, [params]);
	
	class Handle {
		static page(i: any) {
			i = parseInt(i);
			return i + 1 == 0 ? i + 2 : i + 1;
		}

		static previous() {
			if (typeof params.page != "undefined") {
				const page = parseInt(params.page);
				return page == 1 ? 1 : page - 1;
			}
			return 1;
		}

		static next() {
			if (data?.hasNextPage && typeof params.page != "undefined") {
				const page = parseInt(params.page);
				return page + 1;
			}
			return 2;
		}
	}

	return (
		<div css={Styles.pagination()}>
			{status == FetchStatus.SUCCESS && (
				<div>
					{typeof params.page != "undefined" && parseInt(params.page) > 1 && (
						<div onClick={() => navigate(`/dashboard/groups/${Handle.previous()}`)} className="btn">
							<MdKeyboardArrowLeft size={18} />
						</div>
					)}
					{Array(data?.totalPages)
						.fill(0)
						.map((_, i) => (
							<div key={i}>
								<div
									onClick={() => navigate(`/dashboard/groups/${Handle.page(i)}`)}
									className={`btn ${active(Handle.page(i)) && "active"}`}
								>
									{i + 1}
								</div>
							</div>
						))}
					{data?.hasNextPage && (
						<div onClick={() => navigate(`/dashboard/groups/${Handle.next()}`)} className="btn">
							<MdKeyboardArrowRight size={18} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

class Styles {
	static pagination = () => css`
		margin: 2rem 0;

		div {
			display: flex;
		}

		.btn {
			padding: 0 0.5rem;
			cursor: pointer;
			user-select: none;
			padding: 0.5rem 1rem;
			background: #393b4c;
			color: #fff;
			box-shadow: 0px 0px 5px #121212;
			filter: brightness(90%);

			&:hover {
				text-decoration: none;
				filter: brightness(100%);
			}

			&.active {
				filter: brightness(80%);
			}
		}
	`;
}

function mapStateToProps(state: RootState, ownProps: IGroupsState) {
	return state.groups;
}

export { Group };
