export function UserImage(photo: string | undefined) {

    let userPhoto: string = (photo == undefined) ? "/assets/default-avatar.jpg" : `${process.env.API_URL}/user/get-profile-picture/${photo}`;

    return userPhoto;
}