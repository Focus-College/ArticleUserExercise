import { User } from "./class.user";
import { IUser } from "./interface.IUser";

// ======== SINGLETON ======== \\

export class LoggedInUser implements IUser {

    // private instance ensures that only one LoggedInUser can exist at a time. 
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