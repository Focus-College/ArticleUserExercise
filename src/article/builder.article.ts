import { v4 } from 'uuid';
import { Article } from './class.article';

//Enums allow a developer to define a set of named constants.
export enum ArticleAccess {
    ALLOW_GUESTS,
    PAID_MEMBERS_ONLY,
    MEMBERS_ONLY,
    PAYMENT_REQUIRED
}

// builder

export class ArticleBuilder {
//Private class means that the info is only accessed by members of the same class
    private article:Article;
//the constructor is what is responsible for  initializing the variables, this is referring to a created privat ID,
// this is so that the correct user sees the correct article
    constructor( private id?:string ){
        this.reset();
    }




    reset(){
     // If the correct user picks the correct article for their membership/status then this is the code allowing
    // it if the user ID is correct to load this article
        this.article = this.id && Article.load(this.id) || new Article({
           //this v4 refers to a component that will generate a unique identifier
            id: v4(),
           //Payment false = payment not needed
            isPaymentRequired: false,
            //Members only is also false
            isMemberOnly: false,
           // title a description is a empty since it is stored on a database or .JSON file, we do not need to show it
            // here
            title: '',
            description: '',
            excerpt: 0,
            contents: []
        });
    }


    //Boolean is what we can use, as a true and false, yes or no, here it is saying that is a boolean so optional if a
    //user wants to pay but if the user wants to read this article then they must pay.
    requirePayment( isPaymentRequired:boolean = true ){
        this.article.isPaymentRequired = isPaymentRequired;
    }
    //This is still a boolean and this is saying that it is only viewable to members.
    limitToMembers( isMemberOnly:boolean = true ){
        this.article.isMemberOnly = isMemberOnly;
    }
    //If a member and payment received then they get this article
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