export interface PostInfo{
    uid:number;
    title:string;
    coverUrl:string;
    releaseTime:string;
    topic:string;
}

export interface PostCard extends PostInfo{
    numberOfComments:number;
}

export interface PostContent{
    // content is a template of the post,and it included text and image
    content:string;
    // imageUrl:string[];
}

export interface Post extends PostCard,PostContent{
    numberOfApproval:number;
}

export interface PostRequestOptions{
    uid:number;
    hash:string; //uid + 发布时间的hash  保证资源的唯一识别码
}