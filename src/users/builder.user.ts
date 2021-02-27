import { v4 } from "uuid";
import { User } from "./class.user";
import { IUser } from "./interface.IUser";


// ========BUILDER ======== \\

export class UserBuilder {

    // here we make sure that each user, matches the class User
    user: User;
    
    // the constructor os a userBuilder takes in an optional id and runs the reset method below
    constructor( private id?:string ){
        this.reset();
    }

    // reset checks to see if the user already exists, and creates a new blank user if it does not
    reset(){
        this.user = this.id && User.load(this.id) || new User({
            id: v4(),
            username: '',
            name: ''
        });
    }

    //getUser returns the specific instance of the User
    getUser(){
        return this.user;
    }

}

// Here newUSerBUilder extends(which takes all the properties and methods) of UserBuilder
export class NewUserBuilder extends UserBuilder {

    constructor(){
        super();
    }

    setRequiredData({ username, name, email, password }:Partial<IUser>){

        this.user.username = username;
        this.user.name = name;
        this.user.email = email;
        this.user.password = password;

    }

}