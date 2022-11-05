import { css, keyframes } from "@emotion/react";

const LoadingPage = () => {

    return(
        <div css={loadingBg}>
            <div>
                Um momento, por favor ...
            </div>
        </div>
    );
}


const transparency = keyframes`
    0%    { opacity: 1; }
    20%   { opacity: 0; }
    40%   { opacity: 1; }
    80%   { opacity: 0; }
    100%  { opacity: 1; }
`;

const loadingBg = css`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: greenyellow;

    & > div {
        font-size: 28px;
        user-select: none;
        animation: ${transparency} 8s infinite;
    }

`;


export {LoadingPage};