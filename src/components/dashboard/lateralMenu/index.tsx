import { css } from "@emotion/react";
import { useEffect } from "react";
import {HiUserGroup} from 'react-icons/hi';
import {IoChevronBackOutline, IoChevronForwardOutline, IoPersonCircleSharp} from 'react-icons/io5';
import {MdArticle} from 'react-icons/md';
import {RiVideoFill} from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftMenuState, toggleLeftMenu } from "../../../store/leftMenu";
import { RootState } from "../../../store/storeConfig";

const RightMenu = () => {
    const {isShowing} = useSelector((state: RootState) => state.leftMenu) as LeftMenuState;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        toggle();
    }, []);

    const toggle = () => {
        if(window) {
            window.innerWidth < 1000 && dispatch(toggleLeftMenu(false));
            
            window.onresize = (e) => {
                const {innerWidth} = e.currentTarget as Window;
                if(innerWidth >= 1000) {
                    if(!isShowing) {
                        dispatch(toggleLeftMenu(true));
                    }
                } else {
                    if(isShowing) {
                        dispatch(toggleLeftMenu(false));
                    }
                }
            }
        }
    };

    const toggleMenu = () => {
        dispatch(toggleLeftMenu());
    }

    return(
        <div css={lateralMenu}>
            <div className="relative">
                <div className="btn" onClick={() => navigate('/dashboard')}>
                    <RiVideoFill />
                    <Span>
                        Aulas
                    </Span>
                </div>
                <div className="btn" onClick={() => navigate('/dashboard/groups')}>
                    <HiUserGroup />
                    <Span>
                        Grupos
                    </Span>
                </div>
                <div className="btn">
                    <MdArticle />
                    <Span>Artigos</Span>
                </div>
                <div className="btn" onClick={() => navigate('/dashboard/profile')}>
                    <IoPersonCircleSharp />
                    <Span>
                        Meu perfil
                    </Span>
                </div>
                <div className="btn disabled">
                    &nbsp;
                </div>
                <div className="btn" onClick={toggleMenu}>
                    {isShowing ? <IoChevronBackOutline /> : <IoChevronForwardOutline />}
                    <Span>Ocultar</Span>
                </div>
            </div>
        </div>
    );
}

const Span = ({children}: {children: any}) => {
    const {isShowing} = useSelector((state: RootState) => state.leftMenu) as LeftMenuState;

    return(
        <span className="title" style={{display: isShowing ? 'inline': 'none'}}>
            {children}
        </span>
    );
};

const lateralMenu = css`
    position: fixed;
    z-index: 1;
    top: 25%;
    background: #3d3a469e;
    transition: background 0.5s;
    
    @media screen and (min-width: 1000px) {
        left: -10px;
        transition: left .3s;
        
        &:hover {
            left: 0;
        }
    }

    .relative {
        display: flex;
        flex-direction: column;
        position: relative;

        .btn {
            display: flex;
            align-items: center;
            padding: 1rem;
            user-select: none;
            color: #f9f9f9;
            
            svg {
                height: 24px;
                width: 24px;
            }
            
            &:not(.disabled):hover {
                cursor: pointer;
                background: #3f3e42;
            }
            
            span {
                margin-left: 10px;
            }
        }
    }
`;

export {RightMenu};