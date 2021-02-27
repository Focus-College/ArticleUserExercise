
// This interface is used to define the minimum user data needed (excluding password and email)
export interface IMinUserData {

    id: string;

    username: string;

    name: string;

}

//this interface contains all the users properties
export interface IUser extends IMinUserData {

    password: string;

    email: string;

}