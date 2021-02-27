// simple interface to define the paramaters of an Article (class.article.ts)
// all are mandatory.
export interface IArticle {

    id: string;

    // unless set, will be false
    isPaymentRequired: boolean;
    // unless set, will be false
    isMemberOnly: boolean;

    title:string;

    description:string;

    excerpt:number;

    contents:string[];

}