import { GetServerSideProps } from "next/types";
import { usePrivateRoute } from "../../authentication";
import PrivateTemplate from "../../components/template/private";
import usePageTitle from "../../hooks/usePageTitle";
import { wrapper } from "../../store/store";
import { UserType } from "../../Types/user";

export default function Page({user}: {user: UserType}) {
    usePageTitle('Dashboard');

    return (
        <PrivateTemplate>
            <div className="container bg-white-opacity-7 mt-20 m-auto p-8">
                <h3 className="text-3xl text-green-400">Bem vindo, {user.name}</h3>
            </div>
        </PrivateTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ dispatch }) => usePrivateRoute(async (ctx) => {

    return {
        props: {}
    }
}));
