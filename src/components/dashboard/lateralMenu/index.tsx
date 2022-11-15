import { css } from "@emotion/react";

const RightMenu = () => {

    return(
        <div css={lateralMenu}>
            <div className="relative">
                to do
            </div>
        </div>
    );
}

const lateralMenu = css`
    position: fixed;
    z-index: 1;
    top: 25%;
    
    .relative {
        position: relative;
    }
`;

export {RightMenu};