import { RootState } from "@/store/storeConfig";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Styles from "./styles.css";

const Aside = () => {
    const { id: groupId } = useParams();
    const { group } = useSelector((state: RootState) => state);

    console.log('members', group.data?.members)
    console.log('staff', group.data?.staffs)

    return(
        <aside css={Styles.index}>
            <section>
                <h3>Membros</h3>
                to do
            </section>
        </aside>
    );
};

export default Aside;