//Interface.  Defines what values an Article should have.
export interface IArticle {
    //The id of the article
    id: string;
    //Is it a paid article?
    isPaymentRequired: boolean;
    //Is it members only?  Articles can be free, free and members only, paid for everybody, or paid and members only.
    isMemberOnly: boolean;
    //The title of the article
    title:string;
    //A brief description of an article
    description:string;
    //A brief summary of an article
    excerpt:number;
    //The actual article itself.
    contents:string[];

}