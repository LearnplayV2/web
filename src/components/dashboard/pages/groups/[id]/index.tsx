import { Dashboard } from "@/components/dashboard/page";
import { useParams } from "react-router-dom";

const GroupId = () => {
  const params = useParams();
  const {id: groupId, title: groupTitle} = params;
  console.log(groupId)
  
  return(
    <Dashboard hasLeftMenu={true}> 
      <div className="container" style={{marginTop: '10px'}}>
        hello
      </div>
    </Dashboard>
  );
};

export {GroupId};