export interface UserType {
    uuid?: string;
    name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    token?: string;
}

export interface UserItems {
  uuid: string;
  userId: string;
  photo: string;
}