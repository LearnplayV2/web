import { GetServerSideProps } from "next";
import { useAuth } from "../../authentication";

export default function Page() {
    return(
        <>
            dashboard
        </>
    );
}

export const getServerSideProps : GetServerSideProps = useAuth(async (ctx) => {
    return {
        props: {}
    }
});