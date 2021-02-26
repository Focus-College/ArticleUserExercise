export interface IDataStore<T extends { id:string }> extends Map<string, T> {

    set( id:string, value:T ): this;
    get( id:string ): T;
    delete( id:string ): boolean;

}