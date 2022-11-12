import { useQuery } from "@tanstack/react-query";
import { CSSProperties } from "styled-components";
import { UserService } from "../../../../service/userService";

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
        return <img  {...props} src={data.photo} />;
    return <img {...props}  src='/assets/default-avatar.jpg' />;
}

export {ProfilePicture};