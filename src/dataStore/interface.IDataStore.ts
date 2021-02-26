export interface IDataStore<T extends { id:string }> {

    set( id:string, value:T ): IDataStore<T>;
    get( id:string ): T;
    delete( id:string ): boolean;

}