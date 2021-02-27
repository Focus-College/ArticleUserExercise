import { staticImplements } from '../common/staticImplements';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IArticle } from './interface.IArticle';
// Line 7 is new to me
@staticImplements<IStorableStatic<Article>>()
// class Article that used the layout of interface IArticle
export class Article implements IArticle {
    // id is a string(v4)
    id:string;
    // article type boolean
    isPaymentRequired:boolean;
    // article type boolean
    isMemberOnly:boolean;
    // The Articles title is a string and by default it's an empty string.
    title:string = "";
    // The Articles description is a string and by default it's an empty string.
    description:string = "";
    // 
    excerpt:number = 0;
    // the contents of the article are stored in an array and return an array.
    contents:string[] = [];

    // static property that used IDataStore that must follow the IArticle interface
    // creates a new store with methods that gives access to setting an article
    // getting an article
    // deleting an article 
    // that are in or will be in the json file "articles" 
    private static store:IDataStore<IArticle> = new JsonDataStore<IArticle>(`articles.json`);

    // (factory) static create method
    // uses an id of an article to load the desired Article 
    static load( id:string ): Article | undefined {
        // using the parameter "id" and using the private property store.get method
        // set the contents of data with an article 
        const data = Article.store.get(id);
        // return the data and create a new Article or return undefined.
        return data && new Article( data ) || undefined;

    }

    // takes in the contents of data and assigns it to this parent class
    // Do I have this backwards??
    constructor( data:IArticle ){

        Object.assign( this, data );

    }
    // Method save 
    save():void{
        // Save an article to the designated json file.
        Article.store.set(this.id, this);
    }

    delete():void{
        // delete an article using the ID of an article if it exists
        Article.store.delete(this.id);
    }

}