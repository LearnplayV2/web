import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "styled-components";
import { UserService } from "../../../service/user";
import { updateProfilePicture } from "../../../store/profilePicture";
import { RootState } from "../../../store/storeConfig";

interface Data {
    photo: string;
}

const useProfilePicture = () => {
    return useQuery({
        queryKey: ['profile-picture'],
        queryFn: async () => {
            const {data} = await UserService.profilePicture();
            return data as Data;
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });
};

const ProfilePicture = ({props}: any) => {
    const {profilePicture} = useSelector(state => state) as RootState;
    const {data, isLoading, status} = useProfilePicture();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateProfilePicture(data?.photo));
    }, [status]);    

    return <img 
                css={css`transition: filter .3s; &:hover{filter: brightness(120%)}`} 
                {...props} 
                src={isLoading ? '/assets/loading.gif' : profilePicture.url} />;
}

export {ProfilePicture};