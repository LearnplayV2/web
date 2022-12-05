import { IGroupState } from "@/components/dashboard/pages/groups/group/store";
import ToggleMenu from "@/components/ui/toggleMenu";
import { ToggleMenuState } from "@/components/ui/toggleMenu/store";
import { RootState } from "@/store/storeConfig";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";

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
	const [count, setCount] = useState<number>(1);
	const toggleMenu = useSelector((state: RootState) => state.toggleMenu) as ToggleMenuState[];
	const isActive = toggleMenu.find((menu) => menu.id === "links")?.active;

	// ----------------------------- autoscroll
	useEffect(() => {
		if (ref.current) {
			ref.current!.scrollTop = ref.current!.scrollHeight;
		}
	}, [count, isActive]);
	// ----------------------------- autoscroll

	class Handle {
		static incrementLink() {
			setCount((state) => state + 1);
		}

		static decrementLink() {
			setCount((state) => state - 1);
		}
	}

	return (
		<div css={Styles.form} ref={ref}>
			{Array.from({ length: count }).map((e, i) => (
				<div className="row">
					{i == count - 1 && i != 0 && (
						<div className="btn bg danger" onClick={Handle.decrementLink}>
							<FiTrash title="Deletar linha" />
						</div>
					)}
					<div>
						<input type="text" placeholder="Título do link" />
					</div>
					<div style={{ flexBasis: "100%" }}>
						<input type="url" placeholder="URL do link" />
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
