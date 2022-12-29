import { css } from '@emotion/react';

class Styles {
    static index = css`
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(2, 9vw);
        grid-gap: 15px;

        img {
            cursor: pointer;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: filter .2s;

            &:hover {
                filter: brightness(108%);
            }

            &#img_0 {
                grid-column-start: 1;
                grid-column-end: 3;
                grid-row-start: 1;
                grid-row-end: 3;
            }

            &#img_1 {
                grid-column-start: 3;
                grid-column-end: 5;
                grid-row-start: 1;
                grid-row-end: 3;
            }
        }
    `;
}

export default Styles;
