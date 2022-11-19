import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModal } from "../store/alert";

const All = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(setModal({element: 'Erro 404: Página não encontrada'}));
        navigate('/');
    }, []);

    return(<></>);
}

export {All};