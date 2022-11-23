import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AlertState, closeModal, setModal } from '../../../store/alert';
import { RootState } from '../../../store/storeConfig';
import { Case } from '../conditional';
import './style.scss';

const Alert = (props: React.PropsWithChildren) => {
    const { children } = props;

    const { isActive, element, fx, compact, width } = useSelector((state: RootState) => state.alert) as AlertState;

    const dispatch = useDispatch();

    useEffect(() => {
        if(isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isActive]);

    const effects = css`
        ${isActive && 'filter: blur(5px);'}
        ${isActive && 'transform: scale(.9);'}
        transition: filter .7s ease-out .3s, transform .3s ease-in;
    `;

    const blurFx = css`
        ${isActive && 'filter: blur(5px);'}
        transition: filter .5s ease-out .3s;
    `;

    const toggleModal = () => {
        dispatch(closeModal());
    };

    const handleWidth = () : string => {
        let innerWidth = window.innerWidth;
        if(innerWidth < 800) {
            return '80%';
        }
        return compact ? '' : width;
    };

    return (
        <>
            <div className={`alert ${!isActive ? 'clickable' : 'transition'}`}>
                <div className="transparent-child" onClick={toggleModal}></div>
                <Case condition={isActive}>
                    <div style={{width: handleWidth()}} className={`alert-body`}>
                        <div className="close" onClick={toggleModal}>
                            <MdClose size={26} />
                        </div>
                        {element}
                    </div>
                </Case>
            </div>
            <div className="all" css={fx ? effects : blurFx}>
                {children}
            </div>
        </>
    );
};

export { Alert };
