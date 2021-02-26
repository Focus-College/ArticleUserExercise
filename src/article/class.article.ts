import { staticImplements } from '../common/staticImplements';
import { IStorableStatic } from '../dataStore/interface.IStorable';
import { JsonDataStore } from '../dataStore/class.JsonDataStore';
import { IDataStore } from '../dataStore/interface.IDataStore';
import { IArticle } from './interface.IArticle';

@staticImplements<IStorableStatic<Article>>()
export class Article implements IArticle {

    id:string;

    isPaymentRequired:boolean;

    isMemberOnly:boolean;

    title:string = "";

    description:string = "";

    excerpt:number = 0;

    contents:string[] = [];

    private static store:IDataStore<IArticle> = new JsonDataStore<IArticle>(`articles.json`);

    // (factory) static create method
    static load( id:string ): Article | undefined {

        const data = Article.store.get(id);
        return data && new Article( data ) || undefined;

    }

    constructor( data:IArticle ){

        Object.assign( this, data );

    }

    save():void{
        Article.store.set(this.id, this);
    }

    delete():void{
        Article.store.delete(this.id);
    }

}