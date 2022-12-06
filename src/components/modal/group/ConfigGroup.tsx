import group, { IGroupState, ILinks } from "@/components/dashboard/pages/groups/group/store";
import ToggleMenu from "@/components/ui/toggleMenu";
import { ToggleMenuState } from "@/components/ui/toggleMenu/store";
import { useTimeout } from "@/hooks/useTimeout";
import { Groups, IGroupLinks } from "@/service/groups";
import { RootState } from "@/store/storeConfig";
import { css } from "@emotion/react";
import { createRef, FormEvent, useEffect, useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ConfigGroup = () => {
	const group = useSelector((state: RootState) => state.group) as IGroupState;
	const data = group.data!;

	const [groupTitle, setGroupTitle] = useState(data.title);
	const [groupDescription, setGroupDescription] = useState(data.description);

	return (
		<div style={{ minHeight: "400px" }}>
			<h3>Editar grupo</h3>
			<br />
			<ToggleMenu firstActive={true} header={<li>Configurações básicas</li>} id="config">
				<div className="form">
					<form>
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
	const ref = useRef<HTMLDivElement>(null);
	const groupData = useSelector((state: RootState) => state.group) as IGroupState;
	const [count, setCount] = useState<number>(groupData.data?.links?.length && groupData.data.links.length > 0 ? groupData.data.links.length : 1);
	const toggleMenu = useSelector((state: RootState) => state.toggleMenu) as ToggleMenuState[];
	const isActive = toggleMenu.find((menu) => menu.id === "links")?.active;
	const timeout = useTimeout();

	const [loading, setLoading] = useState(false);
	const [btnText, setBtnText] = useState("Salvar");
	const [error, setError] = useState("");
	const dispatch = useDispatch();

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
			const urls = form.getAll("url");
			const titles = form.getAll("title");
			let data: IGroupLinks[] = [];
			urls.forEach((item, i) => data.push({ title: titles[i] as string, url: item as string }));
			console.log(data);
			setLoading(true);
			setBtnText("Salvando...");
			if (typeof groupData.data?.uuid != "undefined")
				try {
					timeout.start();
					const response = await Groups.addOrUpdateLinks(groupData.data.uuid, data);
					console.log('todo reload response')
					timeout.stop();
				} catch (err) {
					setError("Ocorreu um erro inesperado, tente novamente mais tarde");
					console.log(err);
				}
		}
	}

	return (
		<div css={Styles.form} ref={ref}>
			<form onSubmit={Handle.saveLinks} style={{ display: "contents" }}>
				{Array.from({ length: count }).map((e, i) => (
					<div className="row">
						{i == count - 1 && (
							<div className="btn bg danger" onClick={Handle.decrementLink}>
								<FiTrash title="Deletar linha" />
							</div>
						)}
						<div>
							<input type="text" name={"title"} placeholder="Título do link" value={groupData.data?.links[i]?.title} />
						</div>
						<div style={{ flexBasis: "100%" }}>
							<input type="url" name={"url"} placeholder="URL do link" value={groupData.data?.links[i]?.url} />
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
					{count >= 1 && (
						<div className="btn bg danger" onClick={Handle.decrementLink}>
							<FiTrash title="Deletar linha" />
						</div>
					)}
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "-webkit-fill-available",
						marginTop: "1rem",
						paddingRight: "1rem",
						alignItems: "center",
					}}
				>
					<b>{error}</b>
					<button type="submit" className="text-white" disabled={loading}>
						{btnText}
					</button>
				</div>
				<div style={{ clear: "both" }}></div>
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
