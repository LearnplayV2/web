import { css } from "@emotion/react";
import { ProfilePicture } from "./profilePicture";

const Header = () => {
    return(
        <div css={header}>
            <span className="title">
                LearnPlay
            </span>
            <div className="user-items">
                <ProfilePicture />
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
            width: 32px;
            cursor:pointer;
            height: 32px;
            object-fit: cover;
            clip-path: circle();
        }
    }
`;

export {Header};