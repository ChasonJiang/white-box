import { UserBaseInfo,UserCard } from './User'

export interface BaseComment{
    userInfo:UserBaseInfo,
    replyTo?:UserBaseInfo,
    commentContent:string,
    commentTime:string,
}

export interface Comment{
    cid:number,
    userCard:UserCard,
    reply:BaseComment[];
    replyTo?:UserBaseInfo,
    commentContent:string,
    commentTime:string,
}