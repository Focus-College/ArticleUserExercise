import { v4 } from "uuid";
import { User } from "./class.user";
import { IUser } from "./interface.IUser";

export class UserBuilder {





    // Users private id
    user: User;
    
    constructor( private id?:string ){
        this.reset();
    }
    // If they are not signed in this is directing them to
    reset(){
        this.user = this.id && User.load(this.id) || new User({
            id: v4(),
            username: '',
            name: ''
        });
    }
    // if user id is correct then it returns that they are a user
    getUser(){
        return this.user;
    }

}


// export means send to/out is an extension that extends UserBuilder
export class NewUserBuilder extends UserBuilder {
    //here you are using your constructor
    constructor(){
        super();
    }


    //this is what is required for the user, a user name, their name, e mail and a password
    setRequiredData({ username, name, email, password }:Partial<IUser>){
        // this is the code for that
        this.user.username = username;
        this.user.name = name;
        this.user.email = email;
        this.user.password = password;

    }

}