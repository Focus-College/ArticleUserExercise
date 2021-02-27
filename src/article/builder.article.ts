import { v4 } from 'uuid';
import { Article } from './class.article';
//Article access option values.  
export enum ArticleAccess {
    ALLOW_GUESTS,
    PAID_MEMBERS_ONLY,
    MEMBERS_ONLY,
    PAYMENT_REQUIRED
}

// builder.  A builder pattern creates an object that you then set the types for.
// In this ArticleBuilder, it sets the requirement for payment and member limitations.
export class ArticleBuilder {
    //Where the articles is stores.
    private article:Article;
    //Uses reset() to set the default data for an article.
    constructor( private id?:string ){
        this.reset();
    }
    //Sets the default for an article.  An author would change this to whatever they wanted for their articles.
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
    //Sets if a payment is required or not.
    requirePayment( isPaymentRequired = true ){
        this.article.isPaymentRequired = isPaymentRequired;
    }
    //Sets if membership is required to view an article.
    limitToMembers( isMemberOnly = true ){
        this.article.isMemberOnly = isMemberOnly;
    }
    //Shows the current article.
    getArticle(){
        return this.article;
    }

}

// director.  Director pattern creates option groups.  It works with a Builder pattern object to create the groups.
// In this case, it simply sets the access options.
export class ArticleDirector {
    //Makes an ArticleBuilder() required to use the ArticleDirector.
    constructor( private builder:ArticleBuilder ){

    }
    //Make an article a member/payment_required/paid_member article.
    make( type:ArticleAccess ){
        
        switch( type ){
            case ArticleAccess.MEMBERS_ONLY: this.builder.limitToMembers(); break;
            case ArticleAccess.PAYMENT_REQUIRED: this.builder.requirePayment(); break;
            case ArticleAccess.PAID_MEMBERS_ONLY:
                this.builder.requirePayment();
                this.builder.limitToMembers();
                break;
        }
        //Returns the builder, from which you can getArticle()
        return this.builder;
    }

}