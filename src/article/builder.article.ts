import { v4 } from 'uuid';
//generator for unique id.
import { Article } from './class.article';

export enum ArticleAccess {
    ALLOW_GUESTS,
    PAID_MEMBERS_ONLY,
    MEMBERS_ONLY,
    PAYMENT_REQUIRED
}
//enum allows acess to some required pairs, or signifier which can point to a number or something else
//ArticleAccess.ALLOW_Guests and can point to a number


// builder
export class ArticleBuilder {

    private article:Article;
//articale set to Article Class

    constructor( private id?:string ){ //id as an optional param
        this.reset(); //refreshes the object instance
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


    
    requirePayment( isPaymentRequired:boolean = true ){ //sets this article  to the inputted bool 'payment'
        this.article.isPaymentRequired = isPaymentRequired;
    }

    limitToMembers( isMemberOnly:boolean = true ){ //sets this article to the inputted bool 'member'
        this.article.isMemberOnly = isMemberOnly;
    }
    
    getArticle(){ //not a getter, but does return this.article meaning the obj rather than a value 
        return this.article;
    }

}

// director
export class ArticleDirector {
    //gives sub options to article creation

    constructor( private builder:ArticleBuilder ){
        //constructor takes in a builder of type ArticleBuilder
    }

    make( type:ArticleAccess ){
        //make uses type enums, and limits all possible to 4 options.
        //allows guests not used. The rest set the conditions for the article beyond default
        switch( type ){
            case ArticleAccess.MEMBERS_ONLY: this.builder.limitToMembers(); break;
            case ArticleAccess.PAYMENT_REQUIRED: this.builder.requirePayment(); break;
            //first two cases, express first 2 options, and then break before anything else
            //each addiing certain trait to this obj
            case ArticleAccess.PAID_MEMBERS_ONLY: //combines both and then breaks 
                this.builder.requirePayment();
                this.builder.limitToMembers();
                break;
        }
        //finally the builder of 3 types is returned, or the default is returned
        return this.builder;
    }

}