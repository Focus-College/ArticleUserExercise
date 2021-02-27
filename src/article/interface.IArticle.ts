export interface IArticle {

    id: string;

    isPaymentRequired: boolean;

    isMemberOnly: boolean;

    title:string;

    description:string;

    excerpt:number;

    contents:string[];

}

// this is all the information that is being exported, what is required for the IArticle. String can reference
// text and not numbers.
// Boolen is yes or not or true or false so is payment needed yes or no, is it members only yes or no.
//excerpt is a number and will only be done in numbers