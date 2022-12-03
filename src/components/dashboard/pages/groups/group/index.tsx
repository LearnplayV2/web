import { FetchStatus } from "@/class/fetchStatus";
import { Dashboard } from "@/components/dashboard/page";
import store, { RootState } from "@/store/storeConfig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Data from "./data";
import { IGroupState } from "./store";
import { Styles } from "./styles.css";
import { BsGear } from "react-icons/bs";
import { closeModal, setModal } from "@/store/alert";
import { ConfigGroup } from "@/components/modal/group/ConfigGroup";
import { Skeleton } from "@/components/ui/Loading";
import { css } from "@emotion/react";
import { useTimeout } from "@/hooks/useTimeout";
import { Groups } from "@/service/groups";

const GroupId = () => {
	const params = useParams();
	const group = useSelector((state: RootState) => state.group) as IGroupState;
	const { id: groupId } = params;
	const { dispatch } = store;
	const timeout = useTimeout();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (typeof groupId != "undefined") {
			timeout.start();
			dispatch(Data.get(groupId));
			timeout.stop();
		}
	}, [groupId]);

	useEffect(() => {
		if (timeout.finished) {
			setLoading(false);
		}
	}, [timeout]);

	return (
		<Dashboard hasLeftMenu={true}>
			<div className="container" style={{ marginTop: "4rem" }}>
				{loading ? (
					<Loading />
				) : (
					(() => {
						switch (group.status) {
							case FetchStatus.SUCCESS:
								return <MainGroup />;
							case FetchStatus.ERROR:
								return <h1>{group.data?.toString() ?? "Ocorreu um erro inesperado, tente novamente mais tarde."}</h1>;
						}
					})()
				)}
			</div>
		</Dashboard>
	);
};

const Loading = () => {
	class Styles {
		static main = css`
			margin: 2rem 0;
			display: flex;
			width: 100%;
			height: 100vh;
			flex-direction: row;
			justify-content: space-between;

			.left {
				width: 65%;
			}

			.right {
				width: 33%;
			}
		`;
	}

	return (
		<>
			<Skeleton height="200px" width="100%" darkMode />
			<div css={Styles.main}>
				<div className="left">
					<Skeleton style={{ marginBottom: "10px" }} height="5%" width="100%" darkMode />
					<Skeleton style={{ marginTop: "20px" }} height="30%" width="100%" darkMode />
					<Skeleton style={{ marginTop: "20px" }} height="5%" width="100%" darkMode />
					<Skeleton style={{ marginTop: "20px" }} height="30%" width="100%" darkMode />
				</div>
				<div className="right">
					<Skeleton height="100%" width="100%" darkMode />
				</div>
			</div>
		</>
	);
};

const MainGroup = () => {
	const group = useSelector((state: RootState) => state.group) as IGroupState;
	const data = group.data!;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const Cover = () => {
		class Handle {
			static config = () => {
				dispatch(setModal({ element: <ConfigGroup />, fx: true }));
			};
		}

		return (
			<>
				<div css={Styles.cover}>
					<div className="title">
						<span>{data.title}</span>
						{data.description.length > 0 && (
							<div className="description">
								<span>{data.description}</span>
							</div>
						)}
						{data.participation == "staff" && (
							<div className="config" title="configurar" onClick={Handle.config}>
								<BsGear size={24} />
							</div>
						)}
					</div>
					<div className="links">
						{data.links.map((link) => (
							<li>
								<a href={link.url} target="_blank">
									{link.title}
								</a>
							</li>
						))}
					</div>
				</div>
			</>
		);
	};

	class Handle {
		static async joinOrExitGroup() {
			if (data.participation == "staff") {
				const element = (
					<>
						<h1>Tem certeza que deseja apagar o grupo?</h1>
						Essa ação não poderá ser desfeita mais tarde. <br />
						<br />
						Todos os itens serão excluídos, isso <b>inclui</b>:
						<br />
						<br />
						<li>Membros</li>
						<li>Links</li>
						<li>Staffs</li>
						<li>Postagens</li>
						<div style={{ float: "right", margin: "2rem 0 0 0" }}>
							<button type="button" onClick={Handle.delete} className="bg warning">
								Confirmo minha decisão
							</button>
							&nbsp;&nbsp;
							<button type="button" className="bg info" onClick={() => dispatch(closeModal())}>
								Cancelar
							</button>
						</div>
						<div style={{ clear: "both" }}></div>
					</>
				);
				return dispatch(setModal({ element }));
			}
			Handle.delete();
		}

		static async delete() {
			try {
				await Groups.joinOrExit(data.uuid);
				navigate(0);
			} catch (err) {
				console.log(err);
			}
		}
	}

	console.log("participation", data.participation);

	return (
		<>
			<Cover />
			{typeof data?.participation != "undefined" ? (
				<>
					<div css={Styles.notMember}>
						<button className="bg success" type="button" onClick={Handle.joinOrExitGroup}>
							{data.participation == "staff" ? "Deletar grupo" : "Sair do grupo"}
						</button>
					</div>
				</>
			) : (
				<>
					<div css={Styles.notMember}>
						<button className="bg success" type="button" onClick={Handle.joinOrExitGroup}>
							Participar do grupo
						</button>
					</div>
				</>
			)}
		</>
	);
};

export { GroupId };
