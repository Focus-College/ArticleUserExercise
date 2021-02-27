/*
        Article class
    --------------------
            staticImplements<IStorableStatic<Article>>

            class Article implements IArticle

                private static store:IDataStore<IArticle>
                static load( id:string ): Article | undefined 
            
            constructor( data:IArticle )
            save():void
            delete():void

*/

// import staticImplements, IStorableStatic, JsonDataStore, IDataStore, IArticle
import { staticImplements } from '../common/staticImplements';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IArticle } from './interface.IArticle';

// imported from common/staticImplements
// this function use as constructor type to mixin with other calss
// the type is <IStorableStatic<Article>>
@staticImplements<IStorableStatic<Article>>()

//implement article interface variables 
export class Article implements IArticle {

    id:string;

    isPaymentRequired:boolean;

    isMemberOnly:boolean;

    title:string = "";

    description:string = "";

    excerpt:number = 0;

    contents:string[] = [];

    // static store to use it
    // factory method
    private static store:IDataStore<IArticle> = new JsonDataStore<IArticle>(`articles.json`);

    // (factory) static create method
    // get articles from store
    // return the articles from the store and return new articles
    static load( id:string ): Article | undefined {

        const data = Article.store.get(id);
        return data && new Article( data ) || undefined;

    }
    // article constructor to create article by using data, type IArticle interface
    constructor( data:IArticle ){

        Object.assign( this, data );

    }
    // to save article to the store by using set method, need Id and the article obj
    save():void{
        Article.store.set(this.id, this);
    }

    // to delete article depending on the article Id
    delete():void{
        Article.store.delete(this.id);
    }

}