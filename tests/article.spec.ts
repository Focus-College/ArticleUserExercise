import { JsonDataStore } from '../src/dataStore/class.JsonDataStore';
import { ArticleAccess, ArticleBuilder, ArticleDirector } from '../src/article/builder.article';
import { IArticle } from '../src/article/interface.IArticle';

import { expect } from "chai";
import "mocha";


describe("Articles", () => {
    
    beforeEach(() => {
        JsonDataStore.reset('articles.json');
    })

    describe('Builder', () => {

        let id:string;
        
        const data:Partial<IArticle> = {
            isPaymentRequired: false,
            isMemberOnly: false,
            title: '',
            description: '',
            excerpt: 0
        };

        it("Should Create Blank / Default Article", () => {
        
            const builder = new ArticleBuilder();
            const article = builder.getArticle();

            expect( article ).to.be.an('object').that.includes( data );
            expect( article.contents ).to.be.an('array').with.length(0);
            expect( article.id ).to.be.a('string');
    
        });

        it("Should Save Article", () => {
        
            const builder = new ArticleBuilder();
            const article = builder.getArticle();
            id = article.id;
            expect(() => article.save()).to.not.throw();
    
        });

        it("Should Load Last Article", () => {
        
            const builder = new ArticleBuilder( id );
            const article = builder.getArticle();

            expect( article ).to.be.an('object').that.includes( data );
            expect( article.contents ).to.be.an('array').with.length(0);
            expect( article.id ).to.be.a('string').that.eq( id );
    
        });

        it("Should Delete Last Article", () => {
        
            const builder = new ArticleBuilder( id );
            const article = builder.getArticle();
            article.delete();

            const builder2 = new ArticleBuilder( id );
            const article2 = builder2.getArticle();

            expect( article2 ).to.be.an('object').that.includes( data );
            expect( article2.contents ).to.be.an('array').with.length(0);
            expect( article2.id ).to.be.a('string').that.does.not.eq( id );
    
        });

        it("Should Create Member Only Article", () => {
        
            const builder = new ArticleBuilder();
            builder.limitToMembers();
            const article = builder.getArticle();
            
            expect( article ).to.be.an('object').that.includes({ ...data, isMemberOnly: true, isPaymentRequired: false });
            expect( article.contents ).to.be.an('array').with.length(0);
            expect( article.id ).to.be.a('string');
    
        });

        it("Should Create Article That Requires Payment", () => {
        
            const builder = new ArticleBuilder();
            builder.requirePayment();
            const article = builder.getArticle();
            
            expect( article ).to.be.an('object').that.includes({ ...data, isMemberOnly: false, isPaymentRequired: true });
            expect( article.contents ).to.be.an('array').with.length(0);
            expect( article.id ).to.be.a('string');
    
        });

        

    });

    describe('Director', () => {

        const data:Partial<IArticle> = {
            isPaymentRequired: false,
            isMemberOnly: false,
            title: '',
            description: '',
            excerpt: 0
        };

        it("Should Create Member Only Article", () => {
        
            const builder = new ArticleBuilder();
            const director = new ArticleDirector( builder );
            director.make( ArticleAccess.MEMBERS_ONLY );
            const article = builder.getArticle();
            
            expect( article ).to.be.an('object').that.includes({ ...data, isMemberOnly: true, isPaymentRequired: false });
            expect( article.contents ).to.be.an('array').with.length(0);
            expect( article.id ).to.be.a('string');
    
        });

        it("Should Create Article That Requires Payment", () => {
        
            const builder = new ArticleBuilder();
            const director = new ArticleDirector( builder );
            director.make( ArticleAccess.PAYMENT_REQUIRED );
            const article = builder.getArticle();
            
            expect( article ).to.be.an('object').that.includes({ ...data, isMemberOnly: false, isPaymentRequired: true });
            expect( article.contents ).to.be.an('array').with.length(0);
            expect( article.id ).to.be.a('string');
    
        });

        it("Should Create Member Only Article That Requires Payment", () => {
        
            const builder = new ArticleBuilder();
            const director = new ArticleDirector( builder );
            director.make( ArticleAccess.PAID_MEMBERS_ONLY );
            const article = builder.getArticle();
            
            expect( article ).to.be.an('object').that.includes({ ...data, isMemberOnly: true, isPaymentRequired: true });
            expect( article.contents ).to.be.an('array').with.length(0);
            expect( article.id ).to.be.a('string');
    
        });

        it("Should Create Article That Allows Guests", () => {
        
            const builder = new ArticleBuilder();
            const director = new ArticleDirector( builder );
            director.make( ArticleAccess.ALLOW_GUESTS );
            const article = builder.getArticle();
            
            expect( article ).to.be.an('object').that.includes({ ...data, isMemberOnly: false, isPaymentRequired: false });
            expect( article.contents ).to.be.an('array').with.length(0);
            expect( article.id ).to.be.a('string');
    
        });

    });

    after(() => {
        JsonDataStore.clear(`articles.json`);
    });

});
