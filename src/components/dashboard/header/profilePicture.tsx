import { useQuery } from "@tanstack/react-query";
import { css, CSSProperties } from "styled-components";
import { UserService } from "../../../service/userService";

interface Data {
    photo: string;
}

const useProfilePicture = () => {
    return useQuery({
        queryKey: ['profile-picture'],
        queryFn: async () => {
            const {data} = await UserService.profilePicture();
            return data as Data;
        }
    });
};

const ProfilePicture = ({props}: any) => {
    const {data, error, status, isLoading} = useProfilePicture();
    
    if(data)
        return <img css={css`transition: filter .3s; &:hover{filter: brightness(120%)}`} {...props} src={data.photo} />;
    return <img {...props} css={css`transition: filter .3s; &:hover{filter: brightness(120%)}`} src='/assets/default-avatar.jpg' />;
}

export {ProfilePicture};