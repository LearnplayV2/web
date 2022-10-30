'use client';

import styles from './container.module.scss';
import { useState, createContext } from 'react';
import Login from './login';
import Register from './register';

export type AccCtxProps = {
    hasAcc: boolean;
    toggleHasAcc?: () => void;
};

export const AccountContext = createContext<AccCtxProps | null>({ hasAcc: false });

const Container = () => {
    const [hasAcc, setHasAcc] = useState(false);

    const toggleHasAcc = () => {
        setTimeout(() => {
            setHasAcc((state) => !state);
        }, 150);
    };

    return (
        <div className={styles.container}>
            <div className="title">
                <h1>
                    A plataforma do <span className="color-green-accent">conhecimento</span>
                </h1>
                <img src="/assets/img1.png" />
                <p>
                    Somos uma comunidade que compartilha conhecimento. <br />
                    Acesse grupos de estudo, compartilhe artigos e aulas. <br />
                    Não fique de fora.
                </p>
            </div>
            <AccountContext.Provider value={{ hasAcc, toggleHasAcc }}>
                {hasAcc ? <Register /> : <Login />}
            </AccountContext.Provider>
        </div>
    );
};

export { Container };
