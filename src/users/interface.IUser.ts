export interface IMinUserData {

    id: string;

    username: string;

    name: string;

}

export interface IUser extends IMinUserData {

    password: string;

    email: string;

}