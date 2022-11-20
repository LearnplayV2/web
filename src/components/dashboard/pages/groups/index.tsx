import { FetchGroups, Groups } from "../../../../service/groups";
import { Faded } from "../../../ui/animated";
import { Dashboard } from "../../page";

const Group = () => {
    const { data, error, isLoading } = Groups.fetch();
    const errorMsg = 'Ocorreu um erro inesperado, tente novamente mais tarde';

    return(
        <Dashboard hasLeftMenu={true}>
            <Faded>
                <div className="main-wrapper">
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
            <h1>Grupos de estudo</h1>
            <span>Atualmente há {data.groups.length} grupos públicos que você pode ingressar:</span>
            <br />

            <div style={{marginTop: '4rem'}}>
                {data.groups.map(
                (group, index) => (
                    <div key={index}>
                        <h2>{group.title}</h2>
                        <p>{group.description}</p>
                    </div>
                ))}

                to do pagination
            </div>
        </>
    );
}

export {Group};