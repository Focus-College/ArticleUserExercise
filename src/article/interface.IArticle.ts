export interface IArticle {

    id: string;

    isPaymentRequired: boolean;

    isMemberOnly: boolean;

    title:string;

    description:string;

    excerpt:number;

    contents:string[];

}