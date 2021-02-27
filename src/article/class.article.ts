import { staticImplements } from '../common/staticImplements';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IArticle } from './interface.IArticle';

@staticImplements<IStorableStatic<Article>>()
export class Article implements IArticle {

    //This is saying that ID is needed, that it is a string
    id:string;
    // Payment needed will be yes or no
    isPaymentRequired:boolean;
    //user is, or is not a member
    isMemberOnly:boolean;
    //title will be a string left empty
    title:string = "";
    //description also a string and left empty
    description:string = "";
    //excerpt is like an entry in a book like 1 of 6, this has one of 0
    excerpt:number = 0;
    // these contents are all a sting and [] is an empty array and it equals an empty one (I think)
    contents:string[] = [];
    //This is referencing another file in this program, it is the articles.json, it is saying that the IArticles are
    //being kept track of through the specified path to the articles.json
    private static store:IDataStore<IArticle> = new JsonDataStore<IArticle>(`articles.json`);




    // (factory) static create method is a creation method declared as static, it can be called on a class and not
    //require an object to be created
    static load( id:string ): Article | undefined {

        const data = Article.store.get(id);
        return data && new Article( data ) || undefined;

    }
    // the constructor is used to create an object, here it is creating data for IArticle
    constructor( data:IArticle ){

        Object.assign( this, data );

    }
    // this is for the article ID, storing it and its id
    save():void{
        Article.store.set(this.id, this);
    }
    //then store the article and delete the id
    delete():void{
        Article.store.delete(this.id);
    }

}