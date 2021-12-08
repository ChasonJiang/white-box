import { Post, PostCard, PostCardDetail } from "./Post";
import { TopicCard } from "./Topic";
import { UserCard, UserInfo } from "./User";

export interface PostResponse{
    post: Post;
    userCard: UserCard;
}

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

export interface PostSearchResponse{
    success: boolean;
    message?: string;
    pid?: number[];
}

export interface TopicCardIndexResponse{
    tid:number[];
}

export interface TopicCardResponse{
    topicCards: TopicCard[];
}