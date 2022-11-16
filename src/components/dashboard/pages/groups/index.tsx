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
            to do
        </>
    );
}

export {Group};