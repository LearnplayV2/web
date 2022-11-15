import { useLocation } from "react-router-dom";
import { search } from "./styles.css";

const Search = () => {

    const location = useLocation();
    const pathname = location.pathname.replace('/', '').split('/');

    class Condition {
        static isPage(pageName: string) {
            return pathname.some(name => name == pageName);
        }
    };

    if( !Condition.isPage('groups') && 
        pathname.length > 1
    ) {
        return null;
    }

    const placeholder = () => {
        if(Condition.isPage('groups')) {
            return 'Procurar por grupos...';
        } else
        return 'Procurar por aula...';
    };
        
    return(
        <div css={search}>
            <input type="text" placeholder={placeholder()} />
        </div>
    );
}

export {Search};