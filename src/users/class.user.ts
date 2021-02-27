import crypto from 'crypto';
import Joi from 'joi';
//schema description package https://joi.dev/api/?v=17.4.0
import { staticImplements } from '../common/staticImplements';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { LoggedInUser } from './class.loggedInUser';
import { IMinUserData, IUser } from './interface.IUser';

@staticImplements<IStorableStatic<User>>() //Storable type uses User
//there is a generic something that allows both Article and User to be stored as the inserted type
export class User implements IUser { //uses user interface

    id: string;

    username: string;

    private _password: string = '';

    get password(): string {
        return this._password;
    } //grabs password of this class instance


    set password( plainTextPassword:string ){ //takes sring password
        
        const validation = Joi.string().min(8).required(); //8char required. similar style to assertion libaries
        Joi.assert( plainTextPassword, validation ); //validation makes sure the input Pass (passes) validation const
        this._password = crypto.createHash("sha256").update(plainTextPassword).digest("hex");
        //then the password is set to this thing, and put through into a hash.
    }

    name: string;

    private _email: string = '';

    get email():string{ // gets email, return type is a string
        return this._email; //get back the email of this object
    }

    set email( emailAddress:string ){

        const validation = Joi.string().email();
        Joi.assert( emailAddress, validation );
        this._email = emailAddress; //email type validation, assertion that email matches validation

    }
    
    private static store:IDataStore<IUser> = new JsonDataStore<IUser>(`users.json`);
// new JsonDataStore is of type IDataStore using the Iuser template.
//are there multiple stores? or it one store with multiple types but getting sent to the same place.

    static load( id:string ): User | undefined {
        //taking an id
        const data = User.store.get( id ); //gets an id, and returns the data from the get 
        return data && new User( data ) || undefined; // returns said data and user formatted object or undefined
    }

    static login( username:string, password:string ): LoggedInUser {
        
        const users = [ ...this.store.values() ];
        //users is a spread out array of this store values (is the return what's spread)
        const data = users.find( user => user.username === username && user.password === User.hash( password ));
        //data is doing a search on user on user's username where it's equal too username and user's password which itself 
        //is equal to the user.hash of their password. (so the hash is set than than the inputted password is hashed to check)

        Joi.assert(data, Joi.object());
        //asertion that the data is an object
        
        const user = new User( data ); //new user is eqqual to a User populated by data.
        return new LoggedInUser( user ); //the return is that user, wrapped in a loggedInUser or logged in taking it as a param

    }
    
    static hash( plainTextPassword:string ){
        //takes plain password, returns sha256 hip and cool password 
        return crypto.createHash("sha256").update(plainTextPassword).digest("hex");
    }

    constructor( data:IMinUserData|IUser ){
//object is created, of type IminUseData which is Iuser+ 
        Object.assign( this, data );
        //data is assigned to this object.
    }

    comparePassword( plainTextPassword:string ): boolean {
        //hashes the password, to match it against the stored password on this object...
        const password = User.hash( plainTextPassword );
        return password === this.password;

    }

    //returns password, username, name, email id, currently on the object.
    toJSON(): IUser {
        return {
            password: this.password,
            username: this.username,
            name: this.name,
            email: this.email,
            id: this.id
        };
    }

    save():void{ //no return
        
        const validation = Joi.object({ 
            id: Joi.string().uuid().required(),  //verifies that string is a uuid
            username: Joi.string().required(), 
            password: Joi.string().hex().required(), //verifies hex 
            email: Joi.string().email().required(),
            name: Joi.string().required()
        });//the rest is just listing the props as required and string

        Joi.assert( this.toJSON(), validation ); //does it pass declared validation
        
        User.store.set( this.id, this );
//User object. store of user object. based on the id of this object, set this object.
    }

    delete():void{
        User.store.delete( this.id );
        //grabs and nukes this object on the id of this object.
    }

}