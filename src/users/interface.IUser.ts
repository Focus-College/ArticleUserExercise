//Defines a minimum amount of data for a user
export interface IMinUserData {
    //The ID of the user.
    id: string;
    //The username of a user.
    username: string;
    //The real name of a user.
    name: string;

}
//Defines a full user.  Extending IMinUserData means that IUser has both it's data, and the id/username/name from the IMinUserData
export interface IUser extends IMinUserData {
    //The user's password.
    password: string;
    //The user's email.
    email: string;

}