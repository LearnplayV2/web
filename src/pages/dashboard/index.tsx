import { NextPage } from "next/types";
import { usePrivateRoute } from "../../authentication";
import PrivateTemplate from "../../components/template/private";
import usePageTitle from "../../hooks/usePageTitle";
import { wrapper } from "../../store/store";

const Page : NextPage = () => {

    usePageTitle('Dashboard');

    return(
        <PrivateTemplate>
            Em construção.
        </PrivateTemplate>
    );
}

export default Page;

//@ts-ignore
Page.getInitialProps = wrapper.getInitialPageProps(({dispatch}) => usePrivateRoute(async(ctx) => {

    return {
        props: {}
    }
}, dispatch));
