import { css } from '@emotion/react';

class GroupStyles {
    static content = css`
        .group__post-details {
            display: flex;
            flex-direction: row;
            align-items: center;

            .author {
                display: flex;
                flex-direction: row;
                flex-grow: 1;
                align-items: center;

                .picture {
                    position: relative;

                    img {
                        width: 50px;
                        height: 50px;
                        object-fit: cover;
                        clip-path: circle();
                        cursor: pointer;
                        transition: filter 0.2s ease-in-out;

                        &:hover {
                            filter: brightness(120%);
                        }
                    }
                }

                .name {
                    margin-left: 1rem;
                    align-self: flex-start;
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;

                    & a {
                        text-decoration: none;
                        color: white;
                    }
                }
            }
        }
    `;
    static pagination = css`
        margin: 2rem 0;

        li {
            cursor: pointer;
            user-select: none;
            list-style: none;
            display: inline;
            padding: 1rem;
            background-color: red;
        }
    `;
}

export default GroupStyles;
