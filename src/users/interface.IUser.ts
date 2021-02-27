export interface IMinUserData {

    id: string;

    username: string;

    name: string;

}

export interface IUser extends IMinUserData { //Iuser = interface + IminUser(interface) 

    password: string;

    email: string;

}