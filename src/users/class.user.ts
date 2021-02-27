import crypto from 'crypto';
import Joi from 'joi';
import { staticImplements } from '../common/staticImplements';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { LoggedInUser } from './class.loggedInUser';
import { IMinUserData, IUser } from './interface.IUser';

//Decorator.  Similar to the one in the article, it enforces that User has save(), load(), and delete() functions. 
@staticImplements<IStorableStatic<User>>()
export class User implements IUser {
    //The information for an IUser.
    id: string;

    //The username of the user.
    username: string;

    //Password is private, meaning it can only be seen within the User object
    private _password = '';

    //Getter for password.  Used when we want to validate a password attempt. 
    get password(): string {
        return this._password;
    }

    //Setter for password.  Using a getter and setter allows you to perform operations on the information coming in.
    //In this case, we'll require 8 characters
    //and hash the incoming password.
    set password( plainTextPassword:string ){
        
        const validation = Joi.string().min(8).required();
        Joi.assert( plainTextPassword, validation );
        this._password = crypto.createHash("sha256").update(plainTextPassword).digest("hex");

    }

    //The name of the user is stored here.
    name: string;

    //Private email variable, getter and setter.
    private _email = '';

    //Gets the current email
    get email():string{
        return this._email;
    }

    //Checks to make sure an email is an email address (of the form x@y.xyz)?
    set email( emailAddress:string ){

        const validation = Joi.string().email();
        Joi.assert( emailAddress, validation );
        this._email = emailAddress;

    }

    //Creates the data store object.
    private static store:IDataStore<IUser> = new JsonDataStore<IUser>(`users.json`);

    //Static creation method.  This loads a user in from a JSON file, or returns undefined if no user exists.
    //It creates something, and it's static.  Rquired by IStorable.
    static load( id:string ): User | undefined {
        const data = User.store.get( id );
        return data && new User( data ) || undefined;
    }

    //Logs a user in.
    static login( username:string, password:string ): LoggedInUser {
        //Get all the users
        const users = [ ...this.store.values() ];
        //Find the user with a matching username and password.
        const data = users.find( user => user.username === username && user.password === User.hash( password ));
        Joi.assert(data, Joi.object());
        const user = new User( data );
        //Logs in the user.
        return new LoggedInUser( user );

    }

    //Hashes passwords.  A hash is a math function that's easy to do, but hard to undo.
    //Example: what two prime numbers multiply to equal 793?  Now consider that computers
    //have access to many more prime numbers.
    static hash( plainTextPassword:string ){
        return crypto.createHash("sha256").update(plainTextPassword).digest("hex");
    }

    //Enforces that we require at least an IMinUserData or IUser to create a new User
    constructor( data:IMinUserData|IUser ){

        Object.assign( this, data );

    }

    //We can hash a password and store it, then hash an entered password and see
    //if it matches up against what's in our JSON stores.
    comparePassword( plainTextPassword:string ): boolean {
        
        const password = User.hash( plainTextPassword );
        return password === this.password;

    }

    //Converts a user to a JSON object
    toJSON(): IUser {
        return {
            password: this.password,
            username: this.username,
            name: this.name,
            email: this.email,
            id: this.id
        };
    }

    //Saves the user to a JSON file.  Required by IStorable
    //Joi checks to make sure we have an id, username, password, email, and name for our user.
    save():void{
        
        const validation = Joi.object({
            id: Joi.string().uuid().required(),
            username: Joi.string().required(),
            password: Joi.string().hex().required(),
            email: Joi.string().email().required(),
            name: Joi.string().required()
        });

        Joi.assert( this.toJSON(), validation );
        
        User.store.set( this.id, this );

    }

    //Deletes a user.  Required by IStorable
    delete():void{
        User.store.delete( this.id );
    }

}