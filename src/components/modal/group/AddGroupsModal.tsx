import { css } from "@emotion/react";
import { FormEvent, useState } from "react";
import { Groups, GroupVisibility, ICreateGroup } from "../../../service/groups/groups";
import { closeModal, setModal } from "../../../store/alert";
import GroupData from "@/components/dashboard/pages/groups/data";
import store from "@/store/storeConfig";
import { useLocation, useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

interface IStudyGroupsModalProps {
	errMsg?: string;
}

const StudyGroupsModal = (props: IStudyGroupsModalProps) => {
	const { errMsg: errorMsg } = props;
	const { dispatch } = store;
	const location = useLocation();
	const navigate = useNavigate();

	const [captchaPass, setCaptchaPass] = useState<boolean>(false);
	const [btnActive, setBtnActive] = useState<boolean>(true);

	const [groupTitle, setGroupTitle] = useState<string>("");
	const [groupDescription, setGroupDescription] = useState<string>("");
	const [groupVisibility, setGroupVisibility] = useState<GroupVisibility>(GroupVisibility.public);

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
				const response = await Groups.add(data);
				dispatch(closeModal());
				if (location.pathname.includes("groups")) {
					dispatch(GroupData.get({}));
				}
				setCaptchaPass(false);
				navigate(`/dashboard/group/${response.data.groupId}`);
			} catch (err: any) {
				const errMessage = err?.response?.data?.response?.message ?? "Ocorreu um erro inesperado, tente novamente";
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

		static captcha(token?: any) {
			setCaptchaPass(typeof token != 'undefined');
		}
		
	}

	return (
		<>
			<h2>Criar grupo de estudos</h2>
			<br />

			<form onSubmit={Handle.submit}>
				<input onChange={(e) => setGroupTitle(e.target.value)} className="outlined" css={Styles.input()} type="text" placeholder="Título do grupo" autoFocus />
				<textarea
					onChange={(e) => setGroupDescription(e.target.value)}
					className="outlined"
					css={Styles.input()}
					style={{ resize: "none" }}
					placeholder="Descrição do grupo"
				></textarea>

				<div style={{ display: "flex" }}>
					<div style={{ flexGrow: "1" }}>{errorMsg && <p style={{ fontWeight: "bold" }}>{errorMsg}</p>}</div>

					<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
						<select id="visibility" onChange={(e) => setGroupVisibility(e.target.value)}>
							<option value={GroupVisibility.public}>Público</option>
							<option value={GroupVisibility.private}>Privado</option>
						</select>
						<div style={{ marginLeft: "1rem" }}>
							{captchaPass 
								? (
									<button type="submit" onClick={Handle.createGroup}className="text-white danger" disabled={!btnActive}>
										{btnActive ? "Adicionar grupo" : "Processando..."}
									</button> 
								) 
								: (
									<ReCAPTCHA onChange={Handle.captcha} sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_APIKEY} />
								)
							}
						</div>
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
