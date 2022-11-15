import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

const animationOptions = `
    animation-duration: .8s, .8s;
    animation-iteration-count: 1;
`;

const animationFaded = css`

@keyframes fade {
        from {
            opacity: 0;
        }
        to {
            filter:none;
            opacity: 1;
        }
    }
    
    animation-name: fade;
    ${animationOptions}
`;

const animationBlur = css`

    @keyframes blur {
        from {
            filter: blur(10px);
        }
        to {
            filter: none;
        }
    }
    
    animation-name: fade;
    ${animationOptions}
`;



const Faded = (props : PropsWithChildren) => {
    const { children } = props;

    return(
        <div css={animationFaded}>
            {children}
        </div>
    );
};

const Blur = (props : PropsWithChildren) => {
    const { children } = props;

    return(
        <div css={animationBlur}>
            {children}
        </div>
    );
};

export {Faded, Blur};