import { css } from '@emotion/react';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AlertSlice, closeModal, setModal } from '../../../store/alert';
import { RootState } from '../../../store/storeConfig';
import { Case } from '../conditional';
import './style.scss';

const Alert = (props: React.PropsWithChildren) => {
    const { children } = props;

    const { isActive, element } = useSelector((state: RootState) => state.alert) as AlertSlice;

    const dispatch = useDispatch();

    const blurEffect = css`
        ${isActive && 'filter: blur(5px);'}
        ${isActive && 'transform: scale(.9);'}
        transition: filter .7s ease-out .3s, transform .3s ease-in;
    `;

    const toggleModal = () => {
        dispatch(closeModal());
    };

    return (
        <>
            <div className={`alert ${!isActive ? 'clickable' : 'transition'}`}>
                <div className="transparent-child" onClick={toggleModal}></div>
                <Case condition={isActive}>
                    <div className="alert-body">
                        <div className="close" onClick={toggleModal}>
                            <MdClose size={26} />
                        </div>
                        {element}
                    </div>
                </Case>
            </div>
            <div className="all" css={blurEffect}>
                {children}
            </div>
        </>
    );
};

export { Alert };
