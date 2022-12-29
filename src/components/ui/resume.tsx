import HTML from '@/utils/htmlParse';
import { css } from '@emotion/react';
import { useRef, useState } from 'react';

interface IProps {
    text: string;
}

const Resume = (props: IProps) => {
    const [hasOpened, setOpened] = useState<boolean>(false);
    const textRef = useRef<HTMLDivElement>(null);
    
    function learnMore() {
        if(textRef.current) {
            textRef.current.className = '';
            setOpened(true);
        }
    };

    return (
        <div className="resume" css={Styles.resume}>
            <div ref={textRef} css={Styles.resumeText}>{HTML.parse(props.text)}</div>
            {!hasOpened && (
                <div onClick={learnMore} css={Styles.btn}>{HTML.remoteEntities(HTML.remove(props.text)).length >= 596 && <>Continue lendo...</>}</div>
            )}
        </div>
    );
};

class Styles {
    static resume = css`
        display: flex;
        flex-direction: column;
    `;

    static resumeText = css`
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
    `;

    static btn = css`
        color: grey;
        margin-top: 1rem;
        align-self: center;
        cursor: pointer;
        user-select: none;
    `;
}

export default Resume;
