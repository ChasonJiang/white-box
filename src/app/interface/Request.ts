export interface Requester<T>{
    head:RequestHead;
    body?:T;
}



export interface RequestHead{
    // uid: uid of the requester 
    // type: type of the request eg: PostCardList,Post, CommentList, PostCardDetailList, etc.
    uid: number;
    type: string;

}



export interface PostRequestParams{
    pid: number[];

}

export interface PostCardRequestParams{
    pid: number[];
}

export interface PostCardDetailRequestParams{
    pid: number[];
}

export interface CommentCardRequestParams{
    pid: number;
}


export interface TopicSearchRequestParams{
    tid:number;
    content:string;
}