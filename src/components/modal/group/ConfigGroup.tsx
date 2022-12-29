import groupReducer, { IGroupState, ILinks } from "@/components/dashboard/pages/group/store";
import ToggleMenu from "@/components/ui/toggleMenu";
import { ToggleMenuState } from "@/components/ui/toggleMenu/store";
import { useTimeout } from "@/hooks/useTimeout";
import { Groups, IGroupLinks } from "@/service/groups/groups";
import { RootState } from "@/store/storeConfig";
import { css } from "@emotion/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const ConfigGroup = () => {
	const groupState = useSelector((state: RootState) => state.group) as IGroupState;
	const data = groupState.data!;
	const dispatch = useDispatch();

	const [groupTitle, setGroupTitle] = useState(data.title);
	const [groupDescription, setGroupDescription] = useState(data.description);

	class Handle {
		static async basicConfig(e: FormEvent) {
			e.preventDefault();
			try {
				const form = new FormData(e.target as HTMLFormElement);
				const payloadConfig = {
					title: form.get("title") as string,
					description: form.get("description") as string,
				};
				await Groups.config(data.uuid, payloadConfig);
				dispatch(groupReducer.actions.setGroupConfig(payloadConfig));
			} catch (err) {
				console.log(err);
			}
		}
	}

	return (
		<div style={{ minHeight: "400px" }}>
			<h3>Editar grupo</h3>
			<br />
			<ToggleMenu firstActive={true} header={<li>Configurações básicas</li>} id="config">
				<div className="form">
					<form onSubmit={Handle.basicConfig}>
						<input
							name="title"
							className="outlined full"
							type="text"
							placeholder="Nome do grupo"
							value={groupTitle}
							onChange={(e) => setGroupTitle(e.target.value)}
						/>
						<textarea style={{ resize: "none" }} name="description" className="full" onChange={(e) => setGroupDescription(e.target.value)}>
							{groupDescription}
						</textarea>
						<div style={{ float: "right", marginBottom: "1rem" }}>
							<button className="text-white" type="submit">
								Salvar
							</button>
						</div>
						<div style={{ clear: "both" }}></div>
					</form>
				</div>
			</ToggleMenu>
			<ToggleMenu id="links" header={<li>Links</li>}>
				<SetLinks />
			</ToggleMenu>
		</div>
	);
};

const SetLinks = () => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement>(null);
	const groupData = useSelector((state: RootState) => state.group) as IGroupState;
	const [count, setCount] = useState<number>(groupData.data?.links?.length && groupData.data.links.length > 0 ? groupData.data.links.length : 1);
	const toggleMenu = useSelector((state: RootState) => state.toggleMenu) as ToggleMenuState[];
	const isActive = toggleMenu.find((menu) => menu.id === "links")?.active;
	const timeout = useTimeout();

	const [loading, setLoading] = useState(false);
	const [btnText, setBtnText] = useState("Salvar");
	const [error, setError] = useState("");
	interface IInputRef {
		title?: string;
		url?: string;
	}
	const [inputController, setInputController] = useState<IInputRef[]>([]);

	// ----------------------------- autoscroll
	useEffect(() => {
		if (ref.current) {
			ref.current!.scrollTop = ref.current!.scrollHeight;
		}
	}, [count, isActive]);
	// ----------------------------- autoscroll

	useEffect(() => {
		if (timeout.finished) {
			setLoading(false);
			setBtnText("Salvar");
		}
	}, [timeout]);

	// get initial data
	useEffect(() => {
		setInputController(groupData.data?.links ?? []);
	}, [groupData]);

	class Handle {
		static incrementLink() {
			setCount((state) => state + 1);
		}

		static decrementLink() {
			setCount((state) => state - 1);
		}

		static async saveLinks(e: FormEvent) {
			e.preventDefault();
			const form = new FormData(e.target as HTMLFormElement);
			let payloadLinks: IGroupLinks[] = [];
			form.getAll("url").forEach((item, i) => {
				if (form.getAll("title")[i] && form.getAll("url")[i]) {
					payloadLinks.push({ title: form.getAll("title")[i] as string, url: item as string });
				}
			});
			setLoading(true);
			setBtnText("Salvando...");
			timeout.start();
			if (typeof groupData.data?.uuid != "undefined")
				try {
					console.log(payloadLinks);
					const response = await Groups.addOrUpdateLinks(groupData.data.uuid, payloadLinks);
					timeout.stop();
					dispatch(groupReducer.actions.setGroupLinks({ links: response.data }));
					// prevent count 0
					if (count == 0) setCount(1);
					setError("");
				} catch (err) {
					setError("Ocorreu um erro inesperado, tente novamente mais tarde");
					console.log(err);
				}
		}

		static onChange(ev: ChangeEvent) {
			const target = (ev.target as HTMLInputElement);
			const id = parseInt(target.id);
			console.log(target.name, target.value)
			setInputController(prevState => ({
				...prevState,
				[id]: { ...prevState[id], [target.name]: target.value }
			}));
		}
	}

	return (
		<div>
			<form onSubmit={Handle.saveLinks} style={{ display: "contents" }}>
				<div css={Styles.form} ref={ref}>
					{Array.from({ length: count }).map((e, i) => (
						<div className="row" key={i}>
							{i == count - 1 && i >= 1 && (
								<div className="btn bg danger" onClick={Handle.decrementLink}>
									<FiTrash title="Deletar linha" />
								</div>
							)}
							<div>
								<input
									type="text"
									name={"title"}
									id={i.toString()}
									placeholder="Título do link"
									onChange={Handle.onChange}
									value={inputController[i]?.title}
								/>
							</div>
							<div style={{ flexBasis: "100%" }}>
								<input
									type="url"
									name={"url"}
									id={i.toString()}
									placeholder="URL do link"
									onChange={Handle.onChange}
									value={inputController[i]?.url}
								/>
							</div>
							{i == count - 1 && (
								<div className="btn bg success" onClick={Handle.incrementLink}>
									<MdAdd title="Adicionar linha" />
								</div>
							)}
						</div>
					))}
					<div className="mobile-controls">
						<div className="btn bg success" onClick={Handle.incrementLink}>
							<MdAdd title="Adicionar links" />
						</div>
						{count >= 2 && (
							<div className="btn bg danger" onClick={Handle.decrementLink}>
								<FiTrash title="Deletar linha" />
							</div>
						)}
					</div>
					<div style={{ clear: "both" }}></div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "-webkit-fill-available",
						alignItems: "center",
					}}
				>
					<b>{error}</b>
					<button type="submit" className="text-white" disabled={loading}>
						{btnText}
					</button>
				</div>
			</form>
		</div>
	);
};

class Styles {
	static form = css`
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		height: 300px;
		overflow-y: auto;
		margin-bottom: 10px;

		.row {
			display: flex;
			flex-direction: row;
			width: -webkit-fill-available;

			input[type="url"] {
				width: -webkit-fill-available;
			}
		}

		.btn {
			display: flex;
			cursor: pointer;
			justify-content: center;
			align-self: stretch;
			width: 21px;
			border-radius: 3px;

			svg {
				align-self: center;
			}
		}

		@media screen and (max-width: 1192px) {
			.mobile-controls {
				display: flex;
				flex-direction: row;
				width: -webkit-fill-available;
				justify-content: space-between;

				.btn {
					padding: 0.6em;
					font-weight: bold;
					display: block;

					&:first-child {
						margin-right: 10px;
					}
				}
			}

			.btn {
				display: none;
			}

			.row {
				flex-direction: column;

				input {
					width: -webkit-fill-available;
				}
			}
		}

		@media screen and (min-width: 1192px) {
			.mobile-controls {
				display: none;
			}
		}
	`;
}

export { ConfigGroup };
