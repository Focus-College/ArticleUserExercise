import { v4 } from "uuid";
import { User } from "./class.user";
import { IUser } from "./interface.IUser";

export class UserBuilder {
    // A property that uses the paramaters and methods of class User
    user: User;
    
    constructor( private id?:string ){
        // using the id of a user, reset the users data
        this.reset();
    }

    reset(){
        // resets the users data and return the new data of the user
        // or just create a new User.
        this.user = this.id && User.load(this.id) || new User({
            // gives a user a serial number :)
            id: v4(),
            // blank username
            username: '',
            // blank name
            name: ''
        });
    }

    getUser(){
        // returns the user when called.
        return this.user;
    }

}

// class that is extended from UserBuilder ( inherets the methods and constructor )
// this is more of a Director.
export class NewUserBuilder extends UserBuilder {

    // because we extended from UserBuilder which has a constuctor
    // we need to call super();
    constructor(){
        super();
    }

    // Takes in 4 arguments to set the data of a new User.
    setRequiredData({ username, name, email, password }:Partial<IUser>){

        this.user.username = username;
        this.user.name = name;
        this.user.email = email;
        this.user.password = password;

    }

}