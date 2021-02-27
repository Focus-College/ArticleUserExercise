import { v4 } from "uuid";
import { User } from "./class.user";
import { IUser } from "./interface.IUser";

//Builder pattern.  This code builds a new User
export class UserBuilder {
    //The user to build
    user: User;
    //When the constructor is called, set the default options.
    constructor( private id?:string ){
        this.reset();
    }
    //Set the default options for a user
    reset(){
        this.user = this.id && User.load(this.id) || new User({
            id: v4(),
            username: '',
            name: ''
        });
    }
    //Returns the current user.
    getUser(){
        return this.user;
    }

}
//Builds a new user, inheriting from UserBuilder.  A NewUserBuilder is a UserBuilder, but for new users.
export class NewUserBuilder extends UserBuilder {
    //Super calls the parent constructor.  Required by JavaScript.
    constructor(){
        super();
    }
    //Sets the required information for a user.  Partial means that not all the data may be there.
    setRequiredData({ username, name, email, password }:Partial<IUser>){

        this.user.username = username;
        this.user.name = name;
        this.user.email = email;
        this.user.password = password;

    }

}