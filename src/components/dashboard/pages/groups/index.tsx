import { css } from "@emotion/react";
import { useNavigate, useParams } from "react-router-dom";
import { Faded } from "@components/ui/animated";
import { Dashboard } from "@components/dashboard/page";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { isEmpty } from "@utils/isEmpty";
import { CSSProperties, Dispatch, useEffect } from "react";
import groups, { IGroupsState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "@store/storeConfig";
import { FetchStatus } from "@class/fetchStatus";
import Data from "./data";
import {Pagination as Paginate} from '@components/ui/pagination';

const Group = () => {
	const { dispatch } = store;
	const params = useParams();

	useEffect(() => {
		dispatch(Data.get({ page: params.page }));
	}, [params]);

	return (
		<Dashboard hasLeftMenu={true}>
			<Faded>
				<div className="main-wrapper">
					<h1>Grupos de estudo</h1>
					<br />
					<ListGroups />
				</div>
			</Faded>
		</Dashboard>
	);
};

const ListGroups = () => {
	const { data, status } = useSelector((state: RootState) => state.groups);

	if (data?.totalItems == 0) {
		return <h3>Nenhum grupo foi encontrado.</h3>;
	}

	switch (status) {
		case FetchStatus.LOADING || FetchStatus.INITIAL:
			return <h3>Carregando...</h3>;
		case FetchStatus.ERROR:
			return <h3>Erro ao carregar grupos.</h3>;
		case FetchStatus.SUCCESS:
			return (
				<>
					<SmallMessage />
					<div style={{ marginTop: "2rem" }}>
						{data?.groups.map((group, index) => (
							<div key={index}>
								<h2>{group.title}</h2>
								<p>{!isEmpty(group?.description) ? group.description : "Sem descrição"}</p>
							</div>
						))}

						<Pagination />
					</div>
				</>
			);
		default:
			return <>Ocorreu um erro inesperado, tente novamente mais tarde.</>;
	}
};

const SmallMessage = () => {
	let { data, status } = useSelector((state: RootState) => state.groups);
	data = data!;

	return (
		<>
			<p>
				to do: <br />
				Atualmente há {data.totalItems} grupos públicos que você pode ingressar.
			</p>
		</>
	);
};

const Pagination = () => {
	const { data, status } = useSelector((state: RootState) => state.groups);
	const navigate = useNavigate();
	const active = (page: any) => params.page == page;
	const params = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (typeof params.page != "undefined") {
			// set query page
			dispatch(groups.actions.setQuery({ page: params.page }));
		}
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

		static disabled(direction: string): boolean {
			switch (direction) {
				case "left":
					return !(typeof params.page != "undefined" && parseInt(params.page) > 1);
				case "right":
					return !(data?.hasNextPage ?? false);
				default:
					return true;
			}
		}

		static navigate(disabled: boolean, callback: any) {
			if(!disabled) callback();
		}
	}

	return (
		<div css={Styles.pagination()}>
			{status == FetchStatus.SUCCESS && (
				<Paginate 
					left={{disabled: Handle.disabled('left'), callback: () => navigate(`/dashboard/groups/${Handle.previous()}`)}}
					right={{disabled: Handle.disabled('right'), callback: () => navigate(`/dashboard/groups/${Handle.next()}`)}}
					path={'/dashboard/groups'}
					totalPages={data?.totalPages}
					active={params.page}
				 />
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
