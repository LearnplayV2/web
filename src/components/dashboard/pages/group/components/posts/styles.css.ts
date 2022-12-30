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
                    font-size: 18px;

                    & a{
                        color: white;
                    }
                }
            }
        }
    `;
}

export default GroupStyles;
