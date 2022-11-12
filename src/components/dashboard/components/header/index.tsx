import { css } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePicture } from "./profilePicture";

const Header = () => {

    const navigate = useNavigate();
    
    const homePage = () => {
        navigate('/dashboard');
    };
    
    return(
        <div css={header}>
            <span className="title" onClick={homePage}>
                LearnPlay
            </span>
            <div className="user-items">
                <Link to={'/dashboard/profile'}>
                    <ProfilePicture />
                </Link>
            </div>
        </div>
    );
}

const header = css`
    background: #201F24;
    box-sizing: border-box;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding:0 1rem;
    height: 72px;

    .title {
        font-size: 24px;
        color: #16a34a;
        user-select:none;
        cursor: pointer;
        transition: color .5s;

        &:hover {
            color: #0fcf0f;
        }
    }

    .user-items {
        img {
            width: 42px;
            height: 42px;
            cursor:pointer;
            object-fit: cover;
            clip-path: circle();
        }
    }
`;

export {Header};