import { staticImplements } from '../common/staticImplements';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IArticle } from './interface.IArticle';


@staticImplements<IStorableStatic<Article>>() 
//unkown @ use, of type<IstorableStatic which is also of type Article> nested types?
export class Article implements IArticle {
//article uses Iarticle interface 
    id:string;

    isPaymentRequired:boolean;

    isMemberOnly:boolean;

    title:string = "";

    description:string = "";

    excerpt:number = 0;

    contents:string[] = [];

    private static store:IDataStore<IArticle> = new JsonDataStore<IArticle>(`articles.json`);
// store is of type article, which adheres Iarticle interface, which is a new instance of Js.DataSt.. also of type article

    // (factory) static create method
    static load( id:string ): Article | undefined {
        //a static function called load, taking id as a param, as a strig. With an expected return of Article or undefined
        //difference between null and undefined?

        const data = Article.store.get(id);
        //new data loaded equal to Article it's store and then does a get from it based on the id!
        return data && new Article( data ) || undefined;
        //returns said data and Article(data)? or undefined?

    }

    constructor( data:IArticle ){

        Object.assign( this, data );
//constructor relies on an assign which copies all properties from target object to 'this' meaning
//this instance of the object.
    }

    save():void{ //void -> no return
        Article.store.set(this.id, this);
        //Store.set has the current article on this.id be moved to 'this' 
        //assumption this refers to the store.. object.
    }

    delete():void{ 
        Article.store.delete(this.id);
        //acesses store which acesses the data based on the id
        //than runs the delete function off of the method. On this id
    }

}