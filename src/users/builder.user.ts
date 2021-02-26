import { v4 } from "uuid";
import { User } from "./class.user";
import { IUser } from "./interface.IUser";

export class UserBuilder {

    user: User;
    
    constructor( private id?:string ){
        this.reset();
    }

    reset(){
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