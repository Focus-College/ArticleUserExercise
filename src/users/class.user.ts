import crypto from 'crypto';
import Joi from 'joi';
import { staticImplements } from '../common/staticImplements';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { LoggedInUser } from './class.loggedInUser';
import { IMinUserData, IUser } from './interface.IUser';

@staticImplements<IStorableStatic<User>>()

// User class is implementing IUser, which means that it will have all the properties of IUser
export class User implements IUser {

    // Both id and username are public, string properties
    id: string;
    username: string;

    // password is hidden as a private property, only able to be retrieved by a getter below Abstracting the data
    private _password: string = '';

    // this getter is used to retrieve the password from a User
    get password(): string {
        return this._password;
    }

    // here we use a setter to set the password, which takes a string as a parameter. This is used becuase it is a password is private. 
    set password( plainTextPassword:string ){
        
        //the validation method makes sure that the password is at least 8 charaters long
        const validation = Joi.string().min(8).required();
        // We make sure that the password meets the validation requirements 
        Joi.assert( plainTextPassword, validation );
        //then we hash the password to protect it. 
        this._password = crypto.createHash("sha256").update(plainTextPassword).digest("hex");

    }

    //public name variable
    name: string;

    //private email variable, can only be read/set with getters, and setters
    private _email: string = '';

    //use a getter to access the email information
    get email():string{
        return this._email;
    }

    //use a setter to set the email inforation
    set email( emailAddress:string ){

        //here we create a validation where .email ensures that the string is a valid email
        const validation = Joi.string().email();

        // Then we use assert to check the validation against the emailAddress being passed in 
        Joi.assert( emailAddress, validation );

        // And if it passes then we set the email
        this._email = emailAddress;

    }
    
    //here we create a new store, or a place to store our user data, called users.json
    private static store:IDataStore<IUser> = new JsonDataStore<IUser>(`users.json`);

    //load takes in an id, and either returns a User(if one is found) or undefined (if one is not found)
    static load( id:string ): User | undefined {
        // data uses the store.get method and passes in an id to get a User
        const data = User.store.get( id );

        //Then the data is passed into a new user to create a new user. OR if no user was found it will return undefined
        return data && new User( data ) || undefined;
    }

    // Login takes in two parameters, email and password, and returns a LoggedInUser
    static login( username:string, password:string ): LoggedInUser {
        
        //users gets all the values from the .json file using .values()
        const users = [ ...this.store.values() ];
        
        //data looks through the array of users for the one that matches the parameters given
        const data = users.find( user => user.username === username && user.password === User.hash( password ));
        // here assert evaluates data to ensure it is an object
        Joi.assert(data, Joi.object());
        
        //user takes the data and passes it into a new User
        const user = new User( data );

        // Then the new user is returned as a LoggedInUser
        return new LoggedInUser( user );

    }
    
    // the hash method is used to "hash" a password, or encrypt it so the infomation stays safe
    static hash( plainTextPassword:string ){
        return crypto.createHash("sha256").update(plainTextPassword).digest("hex");
    }

    // the Users constructor takes in data and specifies the minimum required data with the Interfaces
    constructor( data:IMinUserData|IUser ){
        // And object.assign assigns the data to the instance being created. 
        Object.assign( this, data );

    }

    //the comaparePassword method takes in a string password and hashes it. We then check the users password agains the parameter to see if the function
    // returns true or false
    comparePassword( plainTextPassword:string ): boolean {
        
        const password = User.hash( plainTextPassword );
        return password === this.password;

    }

    // the toJSON metho returns an IUser as specified in the interface
    toJSON(): IUser {
        // Then we are setting all the data of this specific instance
        return {
            password: this.password,
            username: this.username,
            name: this.name,
            email: this.email,
            id: this.id
        };
    }

    // the save method is used to save a user
    save():void{
        
        // here we create our validation where everything below is required
        const validation = Joi.object({
            id: Joi.string().uuid().required(),
            username: Joi.string().required(),
            password: Joi.string().hex().required(),
            email: Joi.string().email().required(),
            name: Joi.string().required()
        });

        //then we take all the information, turn it to json, and then validate it
        Joi.assert( this.toJSON(), validation );
        
        //if the information passes the validation then it will be stored in the .json
        User.store.set( this.id, this );

    }

    //delete must be called on an instance, and deletes the user from the store. 
    delete():void{
        User.store.delete( this.id );
    }

}