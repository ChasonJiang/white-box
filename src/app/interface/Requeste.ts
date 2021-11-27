export interface RequestHeader<T>{
    // uid: uid of the requester 
    // type: type of the request eg: PostCardList,Post, CommentList, PostCardDetailList, etc.
    uid: number;
    type: string;
    requestOptions?: T;
}

export interface PostRequestOptions{
    pid: number;

}

export interface PostCardRequestOptions{
    pid: number;
}

export interface PostCardDetailRequestOptions{
    pid: number;
}

export interface CommentCardRequestOptions{
    pid: number;
}
