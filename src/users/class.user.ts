/*

    user class 
    --------------
    @staticImplements<IStorableStatic<User>>()

    export class User implements IUser 

        get password(): string 
        set password( plainTextPassword:string )
        get email():string
        set email( emailAddress:string )
        private static store:IDataStore<IUser> 
        static load( id:string )
        static login( username:string, password:string )
        static hash( plainTextPassword:string )
        constructor( data:IMinUserData|IUser )
        comparePassword( plainTextPassword:string ): boolean 
        toJSON(): IUser 
        save():void
        delete():void

*/


// import crypto, Joi, staticImplements, JsonDataStore, IDataStore, 
//        IStorableStatic, LoggedInUser, IMinUserData, IUser
import crypto from 'crypto';
import Joi from 'joi';
import { staticImplements } from '../common/staticImplements';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { LoggedInUser } from './class.loggedInUser';
import { IMinUserData, IUser } from './interface.IUser';

@staticImplements<IStorableStatic<User>>()
export class User implements IUser {

    id: string;

    username: string;

    private _password: string = '';

    get password(): string {
        return this._password;
    }

    set password( plainTextPassword:string ){
        
        const validation = Joi.string().min(8).required();
        Joi.assert( plainTextPassword, validation );
        this._password = crypto.createHash("sha256").update(plainTextPassword).digest("hex");

    }

    name: string;

    private _email: string = '';

    get email():string{
        return this._email;
    }

    set email( emailAddress:string ){

        const validation = Joi.string().email();
        Joi.assert( emailAddress, validation );
        this._email = emailAddress;

    }
    
    private static store:IDataStore<IUser> = new JsonDataStore<IUser>(`users.json`);

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