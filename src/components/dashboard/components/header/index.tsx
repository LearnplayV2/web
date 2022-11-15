import { css } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePicture } from "./profilePicture";
import { RiNotification3Fill } from 'react-icons/ri';
import { MdOutlineAddCircle } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { DropdownState, toggleDropdown } from "../../../../store/dropdown";
import { RootState } from "../../../../store/storeConfig";
import React from "react";

const Header = () => {

    const {dropdowns} = useSelector(state => state) as RootState;
    
    const navigate = useNavigate();
    
    class Redirect {
        static homePage() {
            navigate('/dashboard');
        }
    }

    class Find {
        static dropdownIsActive(id: string) {
            return dropdowns.find((dropdown: DropdownState) => dropdown.id === id)?.isActive ?? false;
        }
    }

    return(
        <div css={header}>
            <span className="title" onClick={Redirect.homePage}>
                LearnPlay
            </span>
            <div className="user-items">
                <div className="item">
                    <Dropdown title={<MdOutlineAddCircle />} id="add_item" isActive={Find.dropdownIsActive('add_item')}>
                        hello
                    </Dropdown>
                </div>
                <div className="item">
                    <Dropdown title={<RiNotification3Fill />} id="notifications" isActive={Find.dropdownIsActive('notifications')}>
                        to do notifications
                    </Dropdown>
                </div>
                <div className="item">
                    <Link to={'/dashboard/profile'}>
                        <ProfilePicture />
                    </Link>
                </div>
            </div>
        </div>
    );
}

const Dropdown = (props: {id: string, isActive: boolean, title: React.ReactNode, children: React.ReactNode}) => {
    const {id, isActive, children, title} = props;
    const dispatch = useDispatch();

    class Toggle {
        static handleDropDown(e: React.MouseEvent) {
            const target = e.currentTarget as HTMLDivElement;
            dispatch(toggleDropdown(target.id));
        }
    }

    return(
        <div css={css`
            position: relative;
            cursor:pointer;
        `}>
            <div id={id} onClick={Toggle.handleDropDown}>
                {title}
            </div>
            <ul 
                onClick={e => e.stopPropagation()}
                css={css`
                    display: ${isActive ? 'block': 'none'};
                    cursor: text;
                    position: absolute;
                    user-select: auto;
                    padding: 1rem;
                    background: #44424a;
                    width: 100px;
                    font-size: 14px;
                    margin-left: -50%;
                    transform: translateX(-50%);
                `}
            >
                {children}
            </ul>
        </div>
    );
}

const header = css`
    background: #201F24;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
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
        display: flex;
        flex-direction: row;
        align-items: center;

        .item {
            font-size: 22px;
            user-select: none;
            
            svg {
                cursor: pointer;
            }

            &:not(:last-child) {
                margin-right: 1.8rem;
            }

        }
        
        
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