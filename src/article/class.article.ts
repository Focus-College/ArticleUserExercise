import { staticImplements } from '../common/staticImplements';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IArticle } from './interface.IArticle';

//Decorator.  Makes sure Article implements <IStorableStatic<Article>>, which are load(), save(), and delete() functions.
@staticImplements<IStorableStatic<Article>>()
export class Article implements IArticle {
    //The required properties for an article, as defined by IArticle
    id:string;

    isPaymentRequired:boolean;

    isMemberOnly:boolean;

    title = "";

    description = "";

    excerpt = 0;

    contents:string[] = [];
    //Creates the JsonDataStore. <IArticle> says that this data store is specifically for IArticles.
    //articles.json is the file name to store the IArtlces in.
    private static store:IDataStore<IArticle> = new JsonDataStore<IArticle>(`articles.json`);

    // (factory) static create method.  Loads an article from it's id.  
    // Creates an Article object, or undefined if there's no article with a matching id.
    // A static method belongs to the class rather than an instance of the class
    // A factory method is simply a method that creates something.
    static load( id:string ): Article | undefined {

        const data = Article.store.get(id);
        return data && new Article( data ) || undefined;

    }
    //The constructor.  Enforces that data coming in is of the type IArticle.
    constructor( data:IArticle ){

        Object.assign( this, data );

    }
    //Saves the current article.
    save():void{
        Article.store.set(this.id, this);
    }
    //Deletes the current article.
    delete():void{
        Article.store.delete(this.id);
    }

}