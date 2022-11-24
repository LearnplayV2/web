import { css } from "@emotion/react";
import { FormEvent, useState } from "react";
import {
	Groups,
	GroupVisibility,
	ICreateGroup,
} from "../../../../service/groups";
import { closeModal, setModal } from "../../../../store/alert";
import GroupData from "@components/dashboard/pages/groups/data";
import store from "@/store/storeConfig";
import { ColorRing } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

interface IStudyGroupsModalProps {
	errMsg?: string;
}

const StudyGroupsModal = (props: IStudyGroupsModalProps) => {
	const { errMsg: errorMsg } = props;
	const { dispatch } = store;
    const location = useLocation();

	const [btnActive, setBtnActive] = useState(true);

	const [groupTitle, setGroupTitle] = useState<string>("");
	const [groupDescription, setGroupDescription] = useState<string>("");
	const [groupVisibility, setGroupVisibility] = useState<GroupVisibility>(
		GroupVisibility.public
	);

	class Handle {
		static async submit(e: FormEvent) {
			e.preventDefault();
		}

		static async createGroup() {
            setBtnActive(false);
			try {
				const data: ICreateGroup = {
					title: groupTitle.trim(),
					description: groupDescription.trim(),
					visibility: groupVisibility,
				};
				await Groups.add(data);
				dispatch(closeModal());
                if(location.pathname.includes('groups')) {
                    dispatch(GroupData.get({}));
                }
			} catch (err: any) {
				const errMessage =
					err?.response?.data?.response?.message ??
					"Ocorreu um erro inesperado, tente novamente";
				dispatch(
					setModal({
						element: <StudyGroupsModal errMsg={errMessage} />,
						fx: false,
						width: "40%",
					})
				);
			}

            setTimeout(() => {
                setBtnActive(true);
            }, 1500);
		}
	}

	return (
		<>
			<h2>Criar grupo de estudos</h2>
			<br />

			<form onSubmit={Handle.submit}>
				<input
					onChange={(e) => setGroupTitle(e.target.value)}
					className="outlined"
					css={Styles.input()}
					type="text"
					placeholder="Título do grupo"
					autoFocus
				/>
				<textarea
					onChange={(e) => setGroupDescription(e.target.value)}
					className="outlined"
					css={Styles.input()}
					style={{ resize: "none" }}
					placeholder="Descrição do grupo"
				></textarea>

				<div style={{ display: "flex" }}>
					<div style={{ flexGrow: "1" }}>
						{errorMsg && <p style={{ fontWeight: "bold" }}>{errorMsg}</p>}
					</div>

					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
						<select
							id="visibility"
							onChange={(e) => setGroupVisibility(e.target.value)}
						>
							<option value={GroupVisibility.public}>Público</option>
							<option value={GroupVisibility.private}>Privado</option>
						</select>
                        <button
                            type="submit"
                            onClick={Handle.createGroup}
                            style={{ marginLeft: "1rem" }}
                            className="text-white danger"
                            disabled={!btnActive}
                        >
                            Adicionar grupo
                        </button>
					</div>
				</div>
			</form>
		</>
	);
};

class Styles {
	static input = () => css`
		width: -webkit-fill-available;
	`;
}

export { StudyGroupsModal };
