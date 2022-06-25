import { GetServerSidePropsContext } from "next";

export default function Page() {
    return null;
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {

    return {
        redirect: {
            destination: '/',
        }
    }
    
}