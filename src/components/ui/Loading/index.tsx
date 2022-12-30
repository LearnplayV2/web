import { css } from '@emotion/react';
import { CSSProperties } from 'react';

interface Props {
    style?: any;
    width: string;
    height: string;
    darkMode?: boolean;
}

interface ILoading {
    skeleton: React.FC<Props>;
    spinner: React.FC<{style: CSSProperties}>;
}

const Loading = {} as ILoading;

const Skeleton = (props: Props) => {
    const { darkMode, style, height, width } = props;

    class Styles {
        static skeleton = css`
            ${darkMode ? 'background: #ffffff12;' : 'background: #3a373712;'}
            animation: shine 1s ease-in-out forwards infinite;
            animation-direction: alternate;

            @keyframes shine {
                0% {
                    opacity: 0.3;
                    transform: translateY(3px) scale(0.98);
                }
                85%,
                100% {
                    opacity: 1;
                    transform: translateY(0px) scale(1);
                }
            }
        `;
    }

    return <div className="skeleton" css={Styles.skeleton} style={{ ...style, width, height }}></div>;
};

const Spinner = (props: {style: CSSProperties}) => {
    class Styles {
        static spinner = css`
            border: 0 solid transparent;
            border-radius: 50%;
            width: 100px;
            height: 100px;

            ::before,
            ::after {
                content: '';
                border: 7px solid #ccc;
                border-radius: 50%;
                width: inherit;
                height: inherit;
                position: absolute;
                animation: loader 2s linear infinite;
                opacity: 0;
            }

            ::before {
                animation-delay: 1s;
            }

            @keyframes loader {
                0% {
                    transform: scale(1);
                    opacity: 0;
                }

                50% {
                    opacity: 1;
                }

                100% {
                    transform: scale(0);
                    opacity: 0;
                }
            }
        `;
    }

    return <div className="spinner" css={Styles.spinner} style={{...props.style}}></div>;
};

Loading.skeleton = Skeleton;
Loading.spinner = Spinner;
export { Skeleton };
export default Loading;
