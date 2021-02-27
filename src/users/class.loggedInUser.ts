import { User } from "./class.user";
import { IUser } from "./interface.IUser";

//Singleton pattern.  A singleton is a class that even if it's created more than once,
//there can only be one.
//This singleton represents a logged in user, and only one user can be
//logged in at a time.
export class LoggedInUser implements IUser {
    //The instance of LoggedInUser is stored here.
    private static instance:LoggedInUser;
    //The user's data is stored here.
    private user:User;
    //Gets the data for the logged in user.
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
    //LoggedInUser does not require a user except on the first creation.
    constructor( user?:User ){
        //If the instance already exists, set the user to the new User, and return the instance in LoggedInUser.instance
        if( LoggedInUser.instance ){

            user && (LoggedInUser.instance.user = user);
            return LoggedInUser.instance;

        }
        //Did we somehow not get a user and this is the first time creating?  Throw an error.
        if( !user ){
            
            throw new Error('A user is required when creating a Logged In User for the first time');

        } else {
            //Otherwise, put the current user into this.user, and the current instance into LoggedInUser.instance
            this.user = user;
            LoggedInUser.instance = this;

        }

    }

}