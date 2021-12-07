import { PostCard, PostCardDetail } from "./Post";
import { UserCard, UserInfo } from "./User";

export interface PostCardIndexResponse{
    pid: number[];
}

export interface PostCardResponse{
    postCards: PostCard[];
}

export interface PostCardIndexResponse{
    pid: number[];
}
export interface PostCardDetailIndexResponse{
    pid: number[];
}
export interface PostCardDetailResponse{
    postCardsDetail: PostCardDetail[];
}

export interface UserDetailsResponse{
    success: boolean;
    message?: string;
    userInfo?: UserInfo;
}

export interface TopicSearchResponse{
    success: boolean;
    message?: string;
    pid?: number[];
}