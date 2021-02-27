import { v4 } from "uuid";
import { User } from "./class.user";
import { IUser } from "./interface.IUser";

export class UserBuilder {

    user: User;
//user for this class Userbuilder of type user.

    constructor( private id?:string ){
        this.reset();
        //resets the object on private id.
    }

    reset(){
        //resets this user to flat values and gives a new id...
        this.user = this.id && User.load(this.id) || new User({ 
            id: v4(),
            username: '',
            name: ''
        });
    }

    getUser(){
        return this.user;
    }

}

export class NewUserBuilder extends UserBuilder {

    //new user Builder uses UserBuilder class
    constructor(){
        super();
        //calls parent constructor
    }

    //sets the data on inputs, output is :Partial of type IUser
    setRequiredData({ username, name, email, password }:Partial<IUser>){

        this.user.username = username;
        this.user.name = name;
        this.user.email = email;
        this.user.password = password;

    }

}