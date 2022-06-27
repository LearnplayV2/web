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

interface IconProps {
    color?: string;
    size?: string;
}

export const PenIcon = ({ color }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={color} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>

export const CameraIcon = ({ color, size = '50%'}: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={color} width={size} height={size}>
    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
</svg>;