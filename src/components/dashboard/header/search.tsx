import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { search } from "./styles.css";
import GroupData from '@components/dashboard/pages/groups/data';
import { useDispatch } from "react-redux";
import groups from "../pages/groups/store";

const Search = () => {
    const location = useLocation();
    const pathname = location.pathname.replace('/', '').split('/');
    const [searchValue, setSearchValue] = useState<string>('');
    const dispatch = useDispatch();

    class Handle {
        static search(e: React.KeyboardEvent) {
            if(e.key == 'Enter') {
                if(Handle.isPage('groups')) {
                    dispatch(groups.actions.setQuery({title: (e.target as HTMLInputElement).value}));
                    GroupData.get({});
                }
            }
        }
        
        static isPage(pageName: string) {
            return pathname.some(name => name == pageName);
        }

        static placeholder() {
            if(Handle.isPage('groups')) {
                return 'Procurar por grupos...';
            } else
            return 'Procurar por aula...';
        }

        static selection(e: React.MouseEvent) {
            (e.target as HTMLInputElement).select();
        } 
    };

    if( !Handle.isPage('groups') && 
        pathname.length > 1
    ) {
        return null;
    }

    return(
        <div css={search}>
            <input onKeyUp={Handle.search} onClick={Handle.selection} value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text" placeholder={Handle.placeholder()} />
        </div>
    );
}

export {Search};