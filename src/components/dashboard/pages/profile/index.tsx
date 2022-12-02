import { css } from "@emotion/react";
import { Header } from "../../header";
import { FiLogOut } from "react-icons/fi";
import { Session } from "../../../../authentication";
import { useNavigate } from "react-router-dom";
import { ProfilePicture } from "../../header/profilePicture";
import { useFileUpload } from "js-media-package";
import { useDispatch } from "react-redux";
import { setModal } from "../../../../store/alert";
import { UserService } from "../../../../service/user";
import { Faded } from "../../../ui/animated";
import { Dashboard } from "../../page";
import { resetProfilePicture, updateProfilePicture } from "../../../../store/profilePicture";
import { Notifications } from "../../../../service/socket/notifications";

const ProfilePage = () => {
	const { sendFile, base64File } = useFileUpload();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleProfilePicture = async () => {
		try {
			if (base64File) {
				dispatch(updateProfilePicture("/assets/loading.gif"));
				await UserService.changeProfilePicture(base64File);
				dispatch(updateProfilePicture(base64File));
				Notifications.send({ message: "Você alterou a foto de perfil" });
			}
		} catch (err) {
			dispatch(updateProfilePicture("/assets/default-avatar.jpg"));
			dispatch(setModal({ element: "Ops... Não foi possível carregar imagem," }));
		}
	};

	class Handle {
		static logout = () => {
			Session.Logout(() => navigate("/"));
			dispatch(resetProfilePicture());
		};
	}

	return (
		<Dashboard hasLeftMenu={true}>
			<Header />
			<Faded>
				<div css={container}>
					<h2>Meu perfil</h2>
					<button onClick={Handle.logout} className="logoutBtn" type="button">
						<div>
							<FiLogOut />
						</div>
						Sair
					</button>
					<div style={{ clear: "both" }}></div>

					<div css={userDetails}>
						<label htmlFor="profilePicture">
							<ProfilePicture />
						</label>
						<input type="file" onChange={sendFile} id="profilePicture" />
						<div style={{ fontSize: "24px", marginTop: "1rem" }}>{Session.user()?.name}</div>
					</div>
				</div>
			</Faded>
		</Dashboard>
	);
};

const userDetails = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 3rem;

	img {
		width: 106px;
		height: 106px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid green;
		cursor: pointer;
		transition: border-color 0.3s, opacity 0.6s;

		&:hover {
			opacity: 0.8;
			border-color: #16a34a;
		}
	}

	input[type="file"] {
		display: none;
	}
`;

const container = css`
	width: 60%;
	margin: 15vh auto;
	min-height: 400px;
	background: #262626;
	box-sizing: border-box;
	padding: 2rem 2.3rem;

	h2 {
		color: #16a34a;
		float: left;
	}

	.logoutBtn {
		background: #991b1b;
		color: #fff;
		float: right;

		div {
			display: inline;
			margin-right: 10px;
		}

		&:hover {
			filter: brightness(120%);
		}
	}
`;

export { ProfilePage };
