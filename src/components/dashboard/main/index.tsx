import { css } from "@emotion/react";
import { Blur, Faded } from "../../ui/animated";

const Main = () => {

    return(
        <>
            <div css={main}>
                <Faded>
                    <Blur>
                        <div className="description">
                            <div className="left">
                                <h1>Lorem ipsum</h1>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>
                            <div className="right">
                                <img loading="lazy" src="https://images.pexels.com/photos/258353/pexels-photo-258353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="preview-card" />
                            </div>
                        </div>
                    </Blur>
                </Faded>
                <div className="popular">
                    <h3 style={{margin: '3rem 0'}}>Aulas populares:</h3>
                    <Faded>
                        <div className="list">
                            {Array(300).fill(0).map((_, index) => (
                                <div className="item" key={index}>
                                    <img loading="lazy" src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=640:*' />                                
                                </div>
                            ))}
                        </div>
                    </Faded>
                </div>
            </div>
        </>
    );
};


const main = css`
    width: 100%;
    min-height: 100vh;

    .description {
        margin: 20vh 0;
        margin-top: calc(20vh + 72px);
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        .left {
            width: 500px;
        }

        h1 {
            font-size: 32px;
            color: #fcfcfc;
            letter-spacing: -2px;
            margin-bottom: 1.4rem;
        }

        p {
            line-height: 1.8rem;
            font-size: 19px;
        }

        img {
            width: 300px;
            height: 300px;
            clip-path: circle(); 
        }

    }
    
    .popular {
        margin-top: 5rem;
        margin: 3rem;

        .list {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;

            .item {
                margin: 1rem 1.5rem 0 1.5rem;

                img {
                    width: 250px;
                    /* height: 250px; */
                    cursor: pointer;
                    margin-bottom: 3rem;
                    object-fit:contain;
                    filter: brightness(0.8) grayscale(50%);
                    transition: transform .2s, filter .5s;
                    transition-delay: 0;
                    transform: scale(1.1);
                    
                    &:hover {
                        filter: brightness(1) grayscale(0);
                        transform: scale(1.2);
                    }
                }
            }
        }
    }

    @media screen and (max-width: 956px) {
        .description {
            display: none;
        }
    }
    
`;

export {Main};