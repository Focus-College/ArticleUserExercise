import { User } from "./class.user";
import { IUser } from "./interface.IUser";

export class LoggedInUser implements IUser {


    private static instance:LoggedInUser;
    private user:User;

    get id(){
        return this.user.id;
    }

    get email(){
        return this.user.email;
    }

    get username(){
        return this.user.username;
    }

    get password(){
        return this.user.password;
    }

    get name(){
        return this.user.name;
    }
    //calling on a constructor for a user
    constructor( user?:User ){

        if( LoggedInUser.instance ){

            user && (LoggedInUser.instance.user = user);
            return LoggedInUser.instance;

        }

        if( !user ){
            
            throw new Error('A user is required when creating a Logged In User for the first time');

        } else {

            this.user = user;
            LoggedInUser.instance = this;

        }

    }

}