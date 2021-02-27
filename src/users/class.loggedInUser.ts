import { User } from "./class.user";
import { IUser } from "./interface.IUser";

export class LoggedInUser implements IUser { //uses interface Iuser

    private static instance:LoggedInUser; //bound tl class static instance of type self
    private user:User;

    get id(){
        return this.user.id; //returns it's own id
    }

    get email(){
        return this.user.email; //returns it's own email
    }

    get username(){
        return this.user.username; //returns it's own username
    }

    get password(){
        return this.user.password; //returns it's own password
    }

    get name(){
        return this.user.name; //returns it's own name
    }
//each is a get returning a value, of some part of itself.

    constructor( user?:User ){ //to make thing., need a user, but maybe not 

        if( LoggedInUser.instance ){
//if the logged in user instance exists.
            user && (LoggedInUser.instance.user = user); // if param user is equal logged instance of user return the logged in isntance
            return LoggedInUser.instance;

        }

        if( !user ){ //if there is no user
            
            throw new Error('A user is required when creating a Logged In User for the first time');

        } else {
            //and if there is a user, but no logged in instance.
            //the constructor sets the instance to this instance && and the user to this.user.
            //meaning it recursively sets itself with the user input.
            //and then if a new user would be inputted it would check against instance, and then returning it if new user was same as old user
            //and otherwise throw an error if user was null
            //and if it does exist. creates.
            this.user = user;
            LoggedInUser.instance = this;

        }

    }

}