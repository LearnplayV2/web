import parse from 'html-react-parser';

export default function nl2br(text: string) : React.ReactNode {
    const newText = `${text}`.replace(/\n/g, '<br />') as string;
    
    return parse(newText);
}