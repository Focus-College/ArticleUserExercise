/*
    article builder
    ----------------------
        enum ArticleAccess

        // builder - design pattern 
        export class ArticleBuilder

            private article:Article
            constructor( private id?:string )
            reset()
            requirePayment( isPaymentRequired:boolean = true )
            limitToMembers( isMemberOnly:boolean = true )
            getArticle()
            
        // director - design pattern 
        export class ArticleDirector
        constructor( private builder:ArticleBuilder )
        make( type:ArticleAccess )
            switch( type )
            case ArticleAccess.MEMBERS_ONLY
            case ArticleAccess.PAYMENT_REQUIRED
            case ArticleAccess.PAID_MEMBERS_ONLY


*/

// import v4, Article
import { v4 } from 'uuid';
import { Article } from './class.article';

// type of article, to create differents articles depending on this type
export enum ArticleAccess {
    ALLOW_GUESTS,
    PAID_MEMBERS_ONLY,
    MEMBERS_ONLY,
    PAYMENT_REQUIRED
}

// builder
// this pattern use director methode to create different article depending on type enum
export class ArticleBuilder {

    // article variable 
    private article:Article;

    // Builder constructor to create article, using reset method to initate it.
    constructor( private id?:string ){
        this.reset();
    }

    // reset article by using default values
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

    // to assign article as paid one
    requirePayment( isPaymentRequired:boolean = true ){
        this.article.isPaymentRequired = isPaymentRequired;
    }

    // to assign article as member only
    limitToMembers( isMemberOnly:boolean = true ){
        this.article.isMemberOnly = isMemberOnly;
    }
    
    // to return article
    getArticle(){
        return this.article;
    }

}

// director
// to orient the builder 
export class ArticleDirector {

    // create builder orientation 
    constructor( private builder:ArticleBuilder ){

    }

    // orienting the builder to creat the article depending on enum type
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