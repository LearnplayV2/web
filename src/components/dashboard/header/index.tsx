import { css } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePicture } from "./profilePicture";
import { RiNotification3Fill } from 'react-icons/ri';
import { MdOutlineAddCircle } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { DropdownState, toggleDropdown } from "../../../store/dropdown";
import { RootState } from "../../../store/storeConfig";
import React from "react";
import { basicDropDownList, header, search } from "./styles.css";
import {AiTwotoneVideoCamera} from 'react-icons/ai';
import {RiArticleFill} from 'react-icons/ri';
import {FaGraduationCap} from 'react-icons/fa';
import { Search } from "./search";

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
                            <li>
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
                            <li>to do</li>
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
            onBlur={() => Toggle.handleDropDown(id)}
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
                    margin-left: -230%;
                    border-radius: 8px;
                    transform: translateX(-50%);
                `}
            >
                {children}
            </ul>
        </div>
    );
}


export {Header};