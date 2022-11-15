import { css } from "@emotion/react";

const basicDropDownList = css`
    list-style: none;
    padding:0;
    width: max-content;
    min-width: 230px;

    li {
        display: flex;
        flex-direction: column;
        padding: 0.7rem 1rem;
        cursor: pointer;
        
        &:hover {
            background: #424242;
        }

        span {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items:center;

            .ico {
                font-size: 18px;
                padding-right: 10px;
            }
        }
        
    }

`;

const header = css`
    background: #201F24;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding:0 1rem;
    height: 72px;

    .title {
        font-size: 24px;
        color: #16a34a;
        user-select:none;
        cursor: pointer;
        transition: color .5s;

        &:hover {
            color: #0fcf0f;
        }
    }

    .user-items {
        display: flex;
        flex-direction: row;
        align-items: center;

        .item {
            font-size: 22px;
            
            svg {
                cursor: pointer;
            }

            &:not(:last-child) {
                margin-right: 1.8rem;
            }

        }
        
        img {
            width: 42px;
            height: 42px;
            cursor:pointer;
            object-fit: cover;
            clip-path: circle();
        }
    }
`;

const search = css `

    input {
        border: 1px solid #555;
        border-radius: 30px;
        min-width: 300px;
    }

`;


export {basicDropDownList, header, search};