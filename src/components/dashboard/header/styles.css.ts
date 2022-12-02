import { css } from "@emotion/react";

const basicDropDownList = css`
    list-style: none;
    padding:0;
    width: max-content;
    min-width: 230px;
    word-break: break-all;

    @media screen and (max-width: 900px) {
        min-width: 130px;
        max-width: 230px;
    }

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
    box-shadow: 1px 19px 23px #2020245e;
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
        font-weight: 600;
        letter-spacing: -1px;
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
            
            .icon-wrapper {
                padding: 0.5rem 0.8rem;
                
                &:hover {
                    background: #cccccc1c;
                    border-radius: 8px;
                    cursor: pointer;
                }

            }

            &:not(:last-child) {
                margin-right: 4px;
            }

            & > a > img {
                margin-left: 1rem;
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

    @media screen and (max-width: 830px) {
        flex-direction: column;
        height: auto;
        background-color: #201f24b5;

        .user-items {
            margin:.5rem 0;
        }

    }
    
`;

const search = css `

    input {
        border-radius: 7px;
        min-width: 200px;
        font-family: sans-serif;
        font-weight:bold;
        font-size: 13px;
        transition: min-width .2s ease-in, background .2s ease-in-out;

        &:hover {
            background: #343434;
            filter:none;
        }

        &:hover, &:focus {
            min-width: 300px;
        }

        &:focus {
            filter: brightness(110%);
        }
    }

    @media screen and (max-width: 830px) {
        input {
            padding: 10px;
            margin-top: 4px;
            min-width: 200px;
        }
    }

`;


export {basicDropDownList, header, search};