import { staticImplements } from '../common/staticImplements';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IArticle } from './interface.IArticle';

@staticImplements<IStorableStatic<Article>>()

//Here we have the base Article Class, which uses the IArticle interface
export class Article implements IArticle {

    
    // Here the properties of the article class are created and given default values
    id:string;
    isPaymentRequired:boolean;
    isMemberOnly:boolean;
    title:string = "";
    description:string = "";
    excerpt:number = 0;
    contents:string[] = [];

    // The store method is a private method that belongs to Article; It uses JsonDataStore to create a new .json file to store information in 
    private static store:IDataStore<IArticle> = new JsonDataStore<IArticle>(`articles.json`);

    // ========== Static Factory Create Method ============= \\
    // load takes in an id(typed as a string) as a parameter, and returns an object matching Article
    static load( id:string ): Article | undefined {

        // data is using the get method within the store property above. And is finding an article based on an id
        const data = Article.store.get(id);

        // Then because the data will be in the form of a json object, the data is passed into a new article and returned.
        // Or if there is no data(no article by the id searched for) it will return undefined
        return data && new Article( data ) || undefined;

    }

    // the constructer is what is called each time a new class is created.  In this case we take the parameter data, matching the IArticle interface
    constructor( data:IArticle ){
        
        //  Object.assign takes a targeted object, and injects the properties of the source object. 
        //  In this case, it takes data, and passes it into itself
        Object.assign( this, data );

    }

    // ====== In order to be used the save and delete methods must be used by calling them on an instance of a class ====== \\

    //the save method does not return anything(void). What the save method does is it uses the store.set method within the Article class to set an 
    // id equal to "this.is", and then it passes the rest of the data in with "this"
    save():void{
        Article.store.set(this.id, this);
    }

    //the delete method does not return anything. It uses the store.delete method in the article class and passes in an id equal to "this.id"
    delete():void{
        Article.store.delete(this.id);
    }

}