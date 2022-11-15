import { useLocation } from "react-router-dom";
import { search } from "./styles.css";

const Search = () => {

    const location = useLocation();
    const pathname = location.pathname.replace('/', '').split('/');
    
    if(pathname.length > 1) {
        return null;
    }

    const placeholder = () => {
        return 'Procurar por aula...';
    };
        
    return(
        <div css={search}>
            <input type="text" placeholder={placeholder()} />
        </div>
    );
}

export {Search};