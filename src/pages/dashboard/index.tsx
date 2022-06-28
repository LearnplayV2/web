import { usePrivateRoute } from "../../authentication";
import PrivateTemplate from "../../components/template/private";
import usePageTitle from "../../hooks/usePageTitle";
import { UserType } from "../../Types/user";

export default function Page(props : any) {

    usePageTitle('Dashboard');

    const user = props.user as UserType;

    return(
        <PrivateTemplate userUuid={user.uuid!}>
            Em construção.
        </PrivateTemplate>
    );
}

export const getServerSideProps = usePrivateRoute(async (ctx) => {
    return {
        props: {}
    }
});  
