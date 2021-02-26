import { v4 } from 'uuid';
import { Article } from './class.article';

export enum ArticleAccess {
    ALLOW_GUESTS,
    PAID_MEMBERS_ONLY,
    MEMBERS_ONLY,
    PAYMENT_REQUIRED
}

// builder
export class ArticleBuilder {

    private article:Article;

    constructor( private id?:string ){
        this.reset();
    }

    reset(){
        this.article = this.id && Article.load(this.id) || new Article({
            id: v4(),
            isPaymentRequired: false,
            isMemberOnly: false,
            title: '',
            description: '',
            excerpt: 0,
            contents: []
        });
    }

    requirePayment( isPaymentRequired:boolean = true ){
        this.article.isPaymentRequired = isPaymentRequired;
    }

    limitToMembers( isMemberOnly:boolean = true ){
        this.article.isMemberOnly = isMemberOnly;
    }
    
    getArticle(){
        return this.article;
    }

}

// director
export class ArticleDirector {

    constructor( private builder:ArticleBuilder ){

    }

    make( type:ArticleAccess ){
        
        switch( type ){
            case ArticleAccess.MEMBERS_ONLY: this.builder.limitToMembers(); break;
            case ArticleAccess.PAYMENT_REQUIRED: this.builder.requirePayment(); break;
            case ArticleAccess.PAID_MEMBERS_ONLY:
                this.builder.requirePayment();
                this.builder.limitToMembers();
                break;
        }
        
        return this.builder;
    }

}