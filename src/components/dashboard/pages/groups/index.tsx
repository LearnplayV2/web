import { Groups } from "../../../../service/groups";
import { Dashboard } from "../../page";

const Group = () => {

    const { data, error, isLoading } = Groups.fetch();

    if(isLoading) return null;
    
    return(
        <Dashboard hasLeftMenu={true}>
            {data?.toString()}
        </Dashboard>
    );
}

export {Group};