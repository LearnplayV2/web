import { GetServerSideProps } from "next";
import { usePrivateRoute } from "../../authentication";
import PrivateTemplate from "../../components/template/private";
import { Container } from "../../components/UI";
import { wrapper } from "../../store/store";

export default function Page() {
    return(
        <PrivateTemplate>
            <Container widthPercent={50} marginTop='15vh' marginBottom="50px">
                <h5 className="text-3xl">Novos membros</h5>

            </Container>
        </PrivateTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ dispatch }) => usePrivateRoute(async (ctx) => {

    return {
        props: {}
    }
}));
