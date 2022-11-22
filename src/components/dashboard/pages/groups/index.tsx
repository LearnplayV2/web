import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import { FetchGroups, Groups } from "@service/groups";
import { Faded } from "@components/ui/animated";
import { Dashboard } from "@components/dashboard/page";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { isEmpty } from "@utils/isEmpty";
import { Dispatch, useEffect } from "react";
import { IGroupsState } from "./store";
import { connect, useSelector } from "react-redux";
import { RootState } from "@store/storeConfig";
import groups from "./store";
import { FetchComponent, FetchStatus } from "@components/ui/fetchComponent";

interface IGroup extends React.PropsWithChildren, IGroupsState {
	dispatch: Dispatch<any>;
}

const Group = connect(mapStateToProps)((props: IGroup) => {
	const { status, dispatch, data } = props;
	const params = useParams<{ page: string }>(); 
	
	useEffect(() => {
		if (status == FetchStatus.INITIAL) {
			Handle.loadGroups(params.page);
		}

		return () => {
			Handle.resetGroups();
		}
	}, []);

	class Handle {
		static async loadGroups(page?: string) {
			dispatch(groups.actions.setGroups({ isLoading: true }));
			try {
				const response = await Groups.fetch(page);
				dispatch(groups.actions.setGroups({ data: response.data }));
			} catch (err) {
				console.log("err", err);
				dispatch(groups.actions.setGroups({ error: true }));
			}
		}

		static resetGroups() {
			dispatch(groups.actions.setGroups({ data: undefined }));
		}
	}

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
	const { data } = useSelector((state: RootState) => state.groups);
	const params = useParams();
	const active = (page: any) => params.page == page;

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
			<div>
				{typeof params.page != "undefined" && parseInt(params.page) > 1 && (
					<a href={`/dashboard/groups/${Handle.previous()}`} className="btn">
						<MdKeyboardArrowLeft size={18} />
					</a>
				)}
				{Array(data?.totalPages)
					.fill(0)
					.map((_, i) => (
						<div key={i}>
							<a
								href={`/dashboard/groups/${Handle.page(i)}`}
								className={`btn ${active(Handle.page(i)) && "active"}`}
							>
								{i + 1}
							</a>
						</div>
					))}
				{data?.hasNextPage && (
					<a href={`/dashboard/groups/${Handle.next()}`} className="btn">
						<MdKeyboardArrowRight size={18} />
					</a>
				)}
			</div>
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
