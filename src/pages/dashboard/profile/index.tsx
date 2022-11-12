import { css } from "@emotion/react";
import { Header } from "../../../components/dashboard/components/header";
import {FiLogOut} from 'react-icons/fi';
import { Session } from "../../../authentication";
import { useNavigate } from "react-router-dom";
import { ProfilePicture } from "../../../components/dashboard/components/header/profilePicture";
import { useEffect } from "react";
import { useFileUpload } from "js-media-package";
import { useDispatch } from "react-redux";
import { setModal } from "../../../store/alert";
import { UserService } from "../../../service/userService";
import { Faded } from "../../../components/ui/animated";

const ProfilePage = () => {
    const { sendFile, base64File } = useFileUpload();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        handleProfilePicture();
    }, [base64File]);

    const handleProfilePicture = async () => {
        try {
            if(base64File) {
                await UserService.changeProfilePicture(base64File);
                navigate(0);
            }
            
        } catch(err) {
            dispatch(setModal('Ops... Não foi possível carregar imagem,'));
        }
    };

    return(
        <> 
            <Header />
            <Faded>
                <div css={container}>
                    <h2>Meu perfil</h2>
                    <button onClick={() => Session.Logout(() => navigate('/'))} className="logoutBtn" type="button">
                        <div> 
                            <FiLogOut />
                        </div>
                        Sair
                    </button>
                    <div style={{clear: 'both'}}></div>

                    <div css={userDetails}>
                        <label htmlFor="profilePicture">
                            <ProfilePicture />
                        </label>
                        <input type="file" onChange={sendFile} id="profilePicture" />
                        <div style={{fontSize: '24px', marginTop: '1rem'}}>
                            {Session.user()?.name}
                        </div>
                    </div>
                </div>
            </Faded>
        </>
    );
}

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
        transition: border-color .3s, opacity .6s;
        
        &:hover {
            opacity: .8;
            border-color: #16a34a;
        }
    }
    
    input[type=file] {
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
        background: #991B1B;
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

export {ProfilePage};