//The requirements for an IDataStore.  T is a generic type, it can be any object.  It's decided when creating a new IDataStore
//{ id: string } is the file name.
export interface IDataStore<T extends { id:string }> extends Map<string, T> {

    set( id:string, value:T ): this;
    get( id:string ): T;
    delete( id:string ): boolean;

}