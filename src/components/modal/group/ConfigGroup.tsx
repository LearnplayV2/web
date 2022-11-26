import { IGroupState } from "@/components/dashboard/pages/groups/[id]/store";
import ToggleMenu from "@/components/ui/toggleMenu";
import { RootState } from "@/store/storeConfig";
import { useState } from "react";
import { useSelector } from "react-redux";

const ConfigGroup = () => {
  const group = useSelector((state: RootState) => state.group) as IGroupState;
	const data = group.data!;

  const [groupTitle, setGroupTitle] = useState(data.title);
  const [groupDescription, setGroupDescription] = useState(data.description);
  
  return(
    <div style={{minHeight: '400px'}}>
      <h3>Editar grupo</h3>
      <br />
      <ToggleMenu header={
        <li>Configurações básicas</li>
      } id="config">
        <div className="form">
          <form>
            <input name="title" className="outlined full" type="text" placeholder="Nome do grupo" value={groupTitle} onChange={e => setGroupTitle(e.target.value)} />
            <textarea style={{resize: 'none'}} name="description" className="full" onChange={e => setGroupDescription(e.target.value)}>
              {groupDescription}
            </textarea>
          </form>
        </div>
      </ToggleMenu>
      <ToggleMenu id="links" header={
        <li>Links</li>
      }>
        to do adicioanr links
      </ToggleMenu>
    </div>
  );
};

export {ConfigGroup};