import { GetServerSideProps } from "next";
import { TOKEN, usePrivateRoute } from "../../authentication";
import PrivateTemplate from "../../components/template/private";
import { Container } from "../../components/UI";
import { wrapper } from "../../store/store";
import UserService from '../../services/users';
import { parseCookies } from "nookies";
import { UserType } from '../../Types/user';
import Link from "next/link";
import moment from "moment";

export default function Page(props: any) {

    const { members } = props;

    return (
        <PrivateTemplate>
            <Container widthPercent={50} marginTop='15vh' marginBottom="50px">
                <h5 className="text-3xl text-green-500">Novos membros</h5>
                <div className="overflow-x-auto mt-5">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Perfil</th>
                                <th>Nome</th>
                                <th>Ingressou em</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member: UserType, i : number) => (
                                <tr key={i}>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded">
                                                <img src={member.user_items?.photo ?? defaultUserImage()} />
                                            </div>
                                        </div>
                                    </td>
                                    <td><Link href={`./profile/${member.uuid}`}><a>{member.name}</a></Link></td>
                                    <td>{moment(member.createdAt).format('D/MM/YYYY, H:mm')}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </Container>
        </PrivateTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ dispatch }) => usePrivateRoute(async (ctx) => {

    try {
        const cookies = parseCookies(ctx);
        const response = await UserService.GetMembers(cookies[TOKEN]);

        return {
            props: {
                members: response.data
            }
        }

    } catch (err) {
        console.log(err)
    }

    return {
        props: {}
    }
}));
