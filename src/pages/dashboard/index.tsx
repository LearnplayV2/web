import { GetServerSideProps } from "next/types";
import { usePrivateRoute } from "../../authentication";
import PrivateTemplate from "../../components/template/private";
import usePageTitle from "../../hooks/usePageTitle";
import { wrapper } from "../../store/store";

export default function Page() {

    usePageTitle('Dashboard');

    return (
        <PrivateTemplate>
            Em construção.
        </PrivateTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ dispatch }) => usePrivateRoute(async (ctx) => {

    return {
        props: {}
    }
}));
