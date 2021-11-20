import { UserBaseInfo,UserCardInfo } from './User'

export interface BaseComment{
    userInfo:UserBaseInfo,
    replyTo?:UserBaseInfo,
    commentContent:string,
    commentTime:string,
}
export interface Comment extends BaseComment{
    userInfo:UserCardInfo,
    reply:BaseComment[];
}