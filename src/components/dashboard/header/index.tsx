import { css } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePicture } from "./profilePicture";
import { RiNotification3Fill } from 'react-icons/ri';
import { MdOutlineAddCircle } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { DropdownState, toggleDropdown } from "../../../store/dropdown";
import { RootState } from "../../../store/storeConfig";
import React from "react";
import { basicDropDownList, header } from "./styles.css";
import {AiTwotoneVideoCamera} from 'react-icons/ai';
import {RiArticleFill} from 'react-icons/ri';
import {FaGraduationCap} from 'react-icons/fa';
import { Search } from "./search";
import { NotificationsList } from "./notifications";
import { setModal } from "../../../store/alert";
import { StudyGroupsModal } from "./modal/studyGroupsModal";

const Header = () => {
    const {dropdowns} = useSelector(state => state) as RootState;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
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

    class Handle {
        static modal(type: string) {
            switch(type) {
                case 'groups':
                    dispatch(setModal({element: <StudyGroupsModal />, fx: false}));
                break;
            }
        }
    }

    return(
        <div css={header}>
            <span className="title" onClick={Redirect.homePage}>
                LearnPlay
            </span>
           <Search />
            <div className="user-items">
                <div className="item">
                    <Dropdown title={<MdOutlineAddCircle />} id="add_item" isActive={Find.dropdownIsActive('add_item')}>
                        <ul css={basicDropDownList}>
                            <li>
                                <span>
                                    <AiTwotoneVideoCamera className="ico" /> Criar aula
                                </span>
                            </li>
                            <li>
                                <span>
                                    <RiArticleFill className="ico" /> Criar artigo
                                </span>
                            </li>
                            <li onClick={() => Handle.modal('groups')}>
                                <span>
                                    <FaGraduationCap className="ico" />
                                    Criar grupo de estudos
                                </span>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
                <div className="item">
                    <Dropdown title={<RiNotification3Fill />} id="notifications" isActive={Find.dropdownIsActive('notifications')}>
                        <ul css={basicDropDownList}>
                            <NotificationsList />
                        </ul>
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
        static handleDropDown(e: React.MouseEvent | string) {
            if(typeof e === 'string') {
                const id = e;
                dispatch(toggleDropdown(id));
            } else {
                const target = e.currentTarget as HTMLDivElement;
                dispatch(toggleDropdown(target.id));
            }
        }
    }

    return(
        <div 
            css={css`
                position: relative;
                cursor:pointer;
            `}
        >
            <div id={id} onClick={Toggle.handleDropDown} css={css`&:hover{ filter: brightness(120%); }`}>
                {title}
            </div>
            <ul 
                onClick={e => e.stopPropagation()}
                css={css`
                    display: ${isActive ? 'block': 'none'};
                    cursor: auto;
                    position: absolute;
                    user-select: auto;
                    padding: .8rem 0;
                    background: #323135;
                    font-size: 14px;
                    margin-top: 10px;
                    right: 0;
                    border-radius: 8px;
                    transform: translateX(30px);
                `}
            >
                {children}
            </ul>
        </div>
    );
}


export {Header};