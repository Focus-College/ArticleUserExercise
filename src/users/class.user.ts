import crypto from 'crypto';
import Joi from 'joi';
import { staticImplements } from '../common/staticImplements';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { LoggedInUser } from './class.loggedInUser';
import { IMinUserData, IUser } from './interface.IUser';

// got as far as I could in the time given ( and from being late )


// I would like to know more about staticImplements 
@staticImplements<IStorableStatic<User>>()
export class User implements IUser {

    // the id of a user which will be a v4 string
    id: string;

    // users username is a string
    username: string;

    // non accessible but can be set on first compile.
    private _password: string = '';

    
    get password(): string {
        return this._password;
    }
    // a setter for setting the password of an account
    set password( plainTextPassword:string ){
        // password must have 8 miniumum required characters
        const validation = Joi.string().min(8).required();
        Joi.assert( plainTextPassword, validation );
        // encrypts the password.
        this._password = crypto.createHash("sha256").update(plainTextPassword).digest("hex");

    }
    // users real name is a string.
    name: string;

    // Non accessible e-mail,
    // by default is an empty string.
    private _email: string = '';


    get email():string{
        return this._email;
    }

    set email( emailAddress:string ){

        const validation = Joi.string().email();
        Joi.assert( emailAddress, validation );
        this._email = emailAddress;

    }
    // Targeted file using IDataStore
    private static store:IDataStore<IUser> = new JsonDataStore<IUser>(`users.json`);

    // method to load the data of a user as long as theyre an instance of this class.
    static load( id:string ): User | undefined {
        const data = User.store.get( id );
        return data && new User( data ) || undefined;
    }

    static login( username:string, password:string ): LoggedInUser {
        
        const users = [ ...this.store.values() ];
        const data = users.find( user => user.username === username && user.password === User.hash( password ));
        Joi.assert(data, Joi.object());
        const user = new User( data );
        return new LoggedInUser( user );

    }
    
    static hash( plainTextPassword:string ){
        return crypto.createHash("sha256").update(plainTextPassword).digest("hex");
    }

    constructor( data:IMinUserData|IUser ){

        Object.assign( this, data );

    }

    comparePassword( plainTextPassword:string ): boolean {
        
        const password = User.hash( plainTextPassword );
        return password === this.password;

    }

    toJSON(): IUser {
        return {
            password: this.password,
            username: this.username,
            name: this.name,
            email: this.email,
            id: this.id
        };
    }

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

    delete():void{
        User.store.delete( this.id );
    }

}