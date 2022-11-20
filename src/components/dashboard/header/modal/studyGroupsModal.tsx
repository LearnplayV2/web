import { css } from "@emotion/react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Groups, GroupVisibility, ICreateGroup } from "../../../../service/groups";
import { closeModal, setModal } from "../../../../store/alert";

interface IStudyGroupsModalProps {
    errMsg?: string;
}

const StudyGroupsModal = (props: IStudyGroupsModalProps) => {
    const {errMsg: errorMsg} = props;
    const dispatch = useDispatch();

    const [groupTitle, setGroupTitle] = useState<string>('');
    const [groupDescription, setGroupDescription] = useState<string>('');
    const [groupVisibility, setGroupVisibility] = useState<GroupVisibility>(GroupVisibility.public);

    class Handle {
        static async submit(e: FormEvent) {
            e.preventDefault();
        }

        static async createGroup() {
            try {
                const data : ICreateGroup = {
                    title: groupTitle.trim(),
                    description: groupDescription.trim(),
                    visibility: groupVisibility
                }
                await Groups.add(data);
                dispatch(closeModal());
            } catch(err : any) {
                const errMessage = err?.response?.data?.response?.message ?? 'Ocorreu um erro inesperado, tente novamente';
                dispatch(setModal({element: <StudyGroupsModal errMsg={errMessage} />, fx: false, width: '40%'}));
            }
        }
    }

    return(
        <>
            <h2>Criar grupo de estudos</h2>
            <br />
            
            <form onSubmit={Handle.submit}>
                <input onChange={e => setGroupTitle(e.target.value)} className="outlined" css={Styles.input()} type="text" placeholder="Título do grupo" autoFocus/>
                <textarea onChange={e => setGroupDescription(e.target.value)} className="outlined" css={Styles.input()} style={{resize: 'none'}} placeholder="Descrição do grupo"></textarea>
                
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: '1'}}>
                        {errorMsg && (
                            <p style={{fontWeight: 'bold'}}>
                                {errorMsg}
                            </p>
                        )}
                    </div>

                    <div>
                        <select id="visibility" onChange={e => setGroupVisibility(e.target.value)}>
                            <option value={GroupVisibility.public}>Público</option>
                            <option value={GroupVisibility.private}>Privado</option>
                        </select>
                        <button type="submit" onClick={Handle.createGroup} style={{marginLeft: '1rem'}} className="text-white danger">Adicionar grupo</button>
                    </div>
                    
                </div>
            </form>
        </>
    );
};

class Styles {
    static input = () => css`
        width: -webkit-fill-available;
    `;
}

export {StudyGroupsModal};