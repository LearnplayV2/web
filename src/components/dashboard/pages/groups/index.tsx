import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FetchGroups, Groups } from "../../../../service/groups";
import { Faded } from "../../../ui/animated";
import { Dashboard } from "../../page";
import {MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md';

function useGroups(page?: string) {
    return useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const {data} = await Groups.fetch(page);
            return data as FetchGroups;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
}

const Group = () => { 
    const params = useParams();
    const { data, error, isLoading } = useGroups(params.page);
    const errorMsg = 'Ocorreu um erro inesperado, tente novamente mais tarde';

    return(
        <Dashboard hasLeftMenu={true}>
            <Faded>
                <div className="main-wrapper">
                    <h1>Grupos de estudo</h1>
                    {error 
                        ? (<h1>{errorMsg}</h1>) 
                        : isLoading ? (<h1>Um momento por favor...</h1>)
                        : (
                            data 
                                ? (<ListGroups data={data} />) 
                                : (<h1>{errorMsg}</h1>)
                        )
                    }
                </div>
            </Faded>
        </Dashboard>
    );

}

const ListGroups = (props : {data: FetchGroups}) => {
    const { data } = props;

    if(data.totalItems == 0) {
        return <h1>Nenhum grupo foi criado ainda.</h1>;
    }

    return(
        <> 
            <p style={{marginTop: '1rem'}}>Listando {data.groups.length} grupos públicos nessa página:</p>

            <div style={{marginTop: '4rem'}}>
                {data.groups.map(
                (group, index) => (
                    <div key={index}>
                        <h2>{group.title}</h2>
                        <p>{(group?.description && group?.description.length) == 0 && ('Sem descrição')}</p>
                    </div>
                ))}

                <Pagination data={data} />
            </div>
        </>
    );
}

const Pagination = (props: {data: FetchGroups}) => {
    const { data } = props; 
    const params = useParams();

    const active = (page: any) => params.page == page;

    console.log(data)
    
    return(
        <div css={Styles.pagination()}>
            <div>
                {(params?.page == undefined || parseInt(params.page) > 1) && (
                    <a href={`/dashboard/groups/${params?.page ? parseInt(params.page) - 1 : 1}`} className="btn"><MdKeyboardArrowLeft size={18} /></a>
                )}
                {Array(data.totalPages).fill(0).map(
                (_, i) => (
                    <div key={i}><a href={`/dashboard/groups/${i + 1}`} className={`btn ${active(i+1) && 'active'}`}>{i + 1}</a></div>
                ))}
                {data.hasNextPage && (
                    <a href={`/dashboard/groups/${params?.page ? parseInt(params.page) + 1 : 1}`} className="btn"><MdKeyboardArrowRight size={18} /></a>
                )}
            </div>
        </div>
    );
};

class Styles {
    static pagination = () => css`
        margin-top: 2rem;

        div {
            display: flex;
        }

        .btn {
            padding: 0 0.5rem;
            padding: 0.5rem 1rem;
            background: #aa00ff;
            color: #fff;
            box-shadow: 0px 0px 5px #4e4e4e;
            filter: brightness(90%);
            
            &:hover {
                text-decoration: none;
                filter: brightness(100%);
            }

            &.active {
                filter: brightness(80%);
            }
        }
    `;
}

export {Group};