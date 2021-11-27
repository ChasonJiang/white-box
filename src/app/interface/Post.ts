import { UserCardInfo } from './User'

export interface PostInfo{
    uid:number;
    pid:number;
    releaseTime:string;
    topic:string;
}

export interface PostCard extends PostInfo{
    title:string;
    coverUrl:string;
    numberOfComments:number;
}


export interface PostContent{
    // content is a template of the post,and it included text and image
    content:string;
    imgUrl?:string[];
}

export interface Post extends PostInfo{
    coverUrl?:string;
    userCardInfo:UserCardInfo;
    title?:string;
    postContent:PostContent;
    numberOfComments:number;
    numberOfApproval:number;
}

export interface PostCardDetail extends Post{
}