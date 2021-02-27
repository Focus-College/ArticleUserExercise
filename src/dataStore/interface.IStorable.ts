import { IDataStore } from "./interface.IDataStore";
//IStorable requires save() and delete() functions that return nothing.
export interface IStorable {

    save():void;
    delete():void;

}
//IStorableStatic<T> T is a generic, any object type.  new(...args:any[]):IStorable means that
//IStorableStatic requires an object that implements IStorable, and has a constructor.
//It also requires impelementation of a load() function, that takes an id.
export interface IStorableStatic<T> {

    new( ...args:any[] ): IStorable;
    load(id:string):T;

}