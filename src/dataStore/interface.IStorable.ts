export interface IStorable {

    save():void;
    delete():void;

}

export interface IStorableStatic<T> {

    new( ...args:any[] ): IStorable;
    load(id:string):T;

}