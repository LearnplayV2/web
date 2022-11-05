import { useQuery } from "@tanstack/react-query";
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

const ProfilePicture = () => {
    const {data, error, status, isLoading} = useProfilePicture();
    
    if(data)
        return <img src={data.photo} />;
    return <img src='/assets/default-avatar.jpg' />;
}

export {ProfilePicture};