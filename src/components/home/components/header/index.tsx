import { useDispatch } from "react-redux";
import { setModal } from "../../../../store/alert";

const Header = () => {

    const dispatch = useDispatch();

    return(
        <div className="header">
            <span onClick={() => dispatch(setModal({element:'LearnPlay é uma plataforma open-source, onde todos podem contribuir.'}))}>
                LearnPlay
            </span>
        </div>
    );
};

export {Header};