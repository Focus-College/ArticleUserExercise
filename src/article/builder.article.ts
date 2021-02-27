import { v4 } from 'uuid';
import { Article } from './class.article';

// enum for the types of an article
export enum ArticleAccess {
    // If not initiated with a value, each member will increment by 1 starting at 0.
    ALLOW_GUESTS, // 0
    PAID_MEMBERS_ONLY, // 1
    MEMBERS_ONLY, // 2
    PAYMENT_REQUIRED // 3
}

// Class for articles type Builder
export class ArticleBuilder {

    // Private property that method "reset, requirePayment, LimitToMembers, and getArticle adhere to"
    private article:Article;

    // public constructor that takes in a private id which is a string
    constructor( private id?:string ){
        //reset an article using the id of an article
        this.reset();
    }

    // resets property article to the follow properties listed in this method
    reset(){
        // this.article = article.id and uses the static load in class.article to select the article
        // or
        // create a new artile with base properties and a new id.
        this.article = this.id && Article.load(this.id) || new Article({
            id: v4(),
            isPaymentRequired: false,
            isMemberOnly: false,
            title: '',
            description: '',
            excerpt: 0,
            // held in an array
            contents: []
        });
    }

    // A method that when called well set an article to require a payment using a boolean
    // when called, the paramater has a default of true, so no arguments etc are required.
    // public 
    requirePayment( isPaymentRequired:boolean = true ){
        this.article.isPaymentRequired = isPaymentRequired;
    }

    // a method that sets the article type to true by default when called.
    // public 
    limitToMembers( isMemberOnly:boolean = true ){
        this.article.isMemberOnly = isMemberOnly;
    }
    
    // method to return the instance of this.article
    getArticle(){
        return this.article;
    }

}

// director
export class ArticleDirector {
    
    // private constructor that when called will use the ArticleBuilder class to create a new instance 
    // once a user selects the type of article
    
    constructor( private builder:ArticleBuilder ){

    }
    // A user can select which type of article they select it to be using a switch statement
    // if they choose PAID_MEMBERS_ONLY, the article will be require both a payment and is limited 
    // to members
    // each case has a break following to prevent multiple choices to be selected.
    make( type:ArticleAccess ){
        // parameter is the enum ArticleAccess (3 choices)
        switch( type ){
            case ArticleAccess.MEMBERS_ONLY: this.builder.limitToMembers(); break;
            case ArticleAccess.PAYMENT_REQUIRED: this.builder.requirePayment(); break;
            case ArticleAccess.PAID_MEMBERS_ONLY:
                this.builder.requirePayment();
                this.builder.limitToMembers();
                break;
        }
        // once finished, return the instance.
        return this.builder;
    }

}