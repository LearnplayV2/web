import styled from "styled-components";
import { COLORS, MEDIA_QUERY } from "../../utils/config";

export const Col = styled.div`
    margin: 1rem 0;
`;

export const Row = styled.div`
    display: flex;
`

interface ContainerProps {
    widthPercent?: number;
}

export const Container = styled.div<ContainerProps>`
    margin:0 auto;
    margin-top: 15vh;
    background: ${COLORS.secondary};
    width: ${props => props.widthPercent ? `${props.widthPercent}%` : '80%'};
    box-sizing:border-box;
    padding: 2rem;

    @media (max-width: ${MEDIA_QUERY.MEDIUM}px) {
        width: 90%;
    }
    
`;

export const PenIcon = ({color}: {color: string}) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={color} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>