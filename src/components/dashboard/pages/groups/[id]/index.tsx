import { Dashboard } from "@/components/dashboard/page";
import store from "@/store/storeConfig";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Data from "./data";

const GroupId = () => {
  const params = useParams();
  const {id: groupId, title: groupTitle} = params;
  const {dispatch} = store;

  useEffect(() => {
    if(typeof groupId != 'undefined') {
      dispatch(Data.get(groupId));
    }
  }, [groupId]);
  
  return(
    <Dashboard hasLeftMenu={true}> 
      <div className="container" style={{marginTop: '10px'}}>
        hello
      </div>
    </Dashboard>
  );
};

export {GroupId};