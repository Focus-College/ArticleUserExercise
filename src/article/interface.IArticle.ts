/* 
    article interface

*/
export interface IArticle {
    
    // article id
    id: string;

    // boolean for the payment article
    isPaymentRequired: boolean;

    // boolean for the member article only
    isMemberOnly: boolean;

    //title of the article, should be string
    title:string;

    // article description to explain more information about the article
    description:string;

    // article excerpt
    excerpt:number;

    // article contents, array to contain it all
    contents:string[];

}