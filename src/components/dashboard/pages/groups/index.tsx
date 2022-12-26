import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { Faded } from "@components/ui/animated";
import { Dashboard } from "@components/dashboard/page";
import { isEmpty } from "@utils/isEmpty";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "@store/storeConfig";
import { FetchStatus } from "@class/fetchStatus";
import Data from "./data";
import { Pagination as Paginate } from "@components/ui/pagination";
import { useGroupsQuery } from "../../header/search";
import EncodeURI from "@/utils/encodeURI";
import { useTimeout } from "@/hooks/useTimeout";
import { Skeleton } from "@/components/ui/Loading";

const Group = () => {
	const { dispatch } = store;
	const params = useGroupsQuery();

	useEffect(() => {
		dispatch(Data.get({ ...params }));
	}, []);

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
	const timeout = useTimeout();
	const [loading, setLoading] = useState(true);

	if (data?.totalItems == 0) {
		return <h3>Nenhum grupo foi encontrado.</h3>;
	}

	useEffect(() => {
		timeout.start();
		if (status == FetchStatus.SUCCESS) {
			timeout.stop();
		}
	}, [status]);

	useEffect(() => {
		if (timeout.finished) {
			setLoading(false);
		}
	}, [timeout]);

	switch (status) {
		case FetchStatus.ERROR:
			return <h3>{data?.toString() ?? "Erro ao carregar grupos."}</h3>;
		default:
			return loading ? (
				<Loading />
			) : (
				<>
					<SearchMsg />
					<div style={{ marginTop: "2rem" }}>
						{typeof data?.groups != "undefined" &&
							data?.groups?.map((group, index) => (
								<div key={index} style={{ marginBottom: "3rem" }}>
									<h2>
										<Link to={{ pathname: `../group/${group.uuid}/${EncodeURI(group.title)}` }} className="nounderline">
											{group.title}
										</Link>
									</h2>
									<p>{!isEmpty(group?.description) ? group.description : "Sem descrição"}</p>
								</div>
							))}
						<Pagination />
					</div>
				</>
			);
	}
};

const Loading = () => {
	return (
		<div style={{ marginTop: "1rem" }}>
			<Skeleton width="80%" height="2rem" darkMode />
			{Array.from(Array(8)).map((e, i) =>
				i % 2 ? (
					<Skeleton style={{ marginTop: "1rem 0" }} width="50%" height="4rem" darkMode />
				) : (
					<Skeleton style={{ margin: "1rem 0" }} width="50%" height="2rem" darkMode />
				)
			)}
		</div>
	);
};

const SearchMsg = () => {
	let { data } = useSelector((state: RootState) => state.groups);
	data = data!;

	const hasQuery = (query?: string): boolean => {
		return (typeof query != "undefined" && query?.length > 0) ?? false;
	};

	return (
		<>
			<p>
				{hasQuery(data?.query?.title) ? (
					`Mostrando resultados para "${data.query.title}". ${data.totalItems} grupo(s) encontrado(s).`
				) : (
					<>Atualmente há {data.totalItems} grupos públicos que você pode ingressar</>
				)}
			</p>
		</>
	);
};

const Pagination = () => {
	const { data, status } = useSelector((state: RootState) => state.groups);
	const navigate = useNavigate();
	const params = useGroupsQuery();

	class Handle {
		static page(i: any) {
			i = parseInt(i);
			return i + 1 == 0 ? i + 2 : i + 1;
		}

		static previous() {
			if (typeof params.page != "undefined") {
				const page = parseInt(params.page);
				return `${page == 1 ? 1 : page - 1}`;
			}
			return "1";
		}

		static next() {
			if (data?.hasNextPage && typeof params.page != "undefined") {
				const page = parseInt(params.page);
				return `${page + 1}`;
			}
			return "2";
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
			if (!disabled) callback();
		}
	}

	return status == FetchStatus.SUCCESS ? (
		<Paginate
			left={{
				disabled: Handle.disabled("left"),
				callback: () => navigate({ pathname: "/dashboard/groups", search: createSearchParams({ ...params, page: Handle.previous() }).toString() }),
			}}
			right={{
				disabled: Handle.disabled("right"),
				callback: () => navigate({ pathname: "/dashboard/groups", search: createSearchParams({ ...params, page: Handle.next() }).toString() }),
			}}
			path={"/dashboard/groups"}
			params={params}
			totalPages={data?.totalPages}
			active={params.page}
		/>
	) : null;
};

export { Group };
