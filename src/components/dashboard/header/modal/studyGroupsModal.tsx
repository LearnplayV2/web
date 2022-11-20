import { css } from "@emotion/react";
import { FormEvent } from "react";

const StudyGroupsModal = () => {

    class Handle {
        static submit(e: FormEvent) {
            e.preventDefault();
            
        }
    }

    return(
        <>
            <h2>Criar grupo de estudos</h2>
            <br />
            <form onSubmit={Handle.submit}>
                <input className="outlined" css={Styles.input()} type="text" placeholder="Nome do grupo" autoFocus/>
                <textarea className="outlined" css={Styles.input()} style={{resize: 'none'}} placeholder="Descrição do grupo"></textarea>
                <div style={{float: 'right'}}>
                    <select id="visibility">
                        <option value="">Público</option>
                        <option value="">Privado</option>
                    </select>
                    <button style={{marginLeft: '1rem'}} className="text-white danger">Adicionar grupo</button>
                </div>
                <div style={{clear: 'both'}}></div>
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