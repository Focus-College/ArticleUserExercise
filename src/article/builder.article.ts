import { v4 } from 'uuid';
import { Article } from './class.article';

//============ BUILDER/DIRECTOR CREATIONAL PATTERN ============ \\
// This design pattern allows us to build complex objects step by step.  The builder contains all the instructions to create different 
// parts of the Article. And the Director defines the order that the steps need to be executed.  

// ArticleAccess is an enum of different access types that an article is allowed to have
export enum ArticleAccess {
    ALLOW_GUESTS,
    PAID_MEMBERS_ONLY,
    MEMBERS_ONLY,
    PAYMENT_REQUIRED
}
 
// ====================== BUILDER ====================== \\

export class ArticleBuilder {

    // private article is the instance of the article that the builder is going to help create. 
    private article:Article;

    // Here the constructor that is run every time a new Builder is created takes in an OPTIONAL private id
    constructor( private id?:string ){
        //this.reset runs the reset method on itself, clearing all the property information
        this.reset();
    }

    // When the reset method is called, the first thing is does is check to see if the instance has an id, and then if its saved in the .json file
    // if this fails, it then creates a new blank article. 
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

    // The requirePayment method is a method that has been added as a way to change the "isPaymentRequired" property on articles to true
    requirePayment( isPaymentRequired:boolean = true ){

        // here we take the instance's isPaymentRequired property and assign it to true
        this.article.isPaymentRequired = isPaymentRequired;
    }

    //This is another optional method that we can add to our Articles. The limitToMembers method makes it so that the isMemberOnly property is set to 
    // true.  This is done so that we can set an article as Members Only. 
    limitToMembers( isMemberOnly:boolean = true ){
        this.article.isMemberOnly = isMemberOnly;
    }
    
    // getArticle retuns all the information out of an Articles Instance. 
    getArticle(){
        return this.article;
    }

}

// ====================== DIRECTOR ====================== \\

export class ArticleDirector {

    //Here we have the constructor that is run everytime a new AritcleDirector is created. As a parameter, it requires an Article Builder, 
    // this is because the Directors, and Builders work together. 
    constructor( private builder:ArticleBuilder ){

    }

    // The make method creates a new article using a type(which is the enum at the top of the page) and then depending on which type is wanted
    // a switch statement takes care of the four possible Articles we want. 
    make( type:ArticleAccess ){
        
        switch( type ){
            // Here we create a Member only Article
            case ArticleAccess.MEMBERS_ONLY: this.builder.limitToMembers(); break;
            // Creates an Article where a payemnt is required
            case ArticleAccess.PAYMENT_REQUIRED: this.builder.requirePayment(); break;
            // Creates an Aricle where it requires payment AND is limited to members only
            case ArticleAccess.PAID_MEMBERS_ONLY:
                this.builder.requirePayment();
                this.builder.limitToMembers();
                break;
        }
        // if the type was not MEMEBERS_ONLY, PAYMENT-REQUIRED, OR PAID_MEMBERS_ONLY then it will create an article with no restrictions 
        // creates a free for all article
        return this.builder;
    }

}