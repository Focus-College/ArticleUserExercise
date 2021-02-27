/*
    user interface
*/ 

export interface IMinUserData {
  
    // user id
    id: string;

    // user name for connection
    username: string;

    // user name
    name: string;

}

export interface IUser extends IMinUserData {

    // user password for connection
    password: string;

    //user email
    email: string;

}