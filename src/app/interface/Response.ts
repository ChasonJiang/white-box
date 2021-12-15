import { Post, PostCard, PostCardDetail } from "./Post";
import { TopicCard } from "./Topic";
import { UserCard, UserInfo } from "./User";
<<<<<<< HEAD
import { Comment } from "./Comment";
import { detailedgame, simplegame } from "../store/game";
=======
import { Comment,SubComment } from "./Comment";
>>>>>>> c1a7d78be7ef78241328893ecf414ca201d29694
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

export interface CommentIndexResponse{
    cid:number[];
}

export interface CommentResponse{
    comments:Comment[]
}
export interface SubCommentResponse{
    subComments:SubComment[]
}
export interface UploadPostResponse{
    success: boolean;
    message?: string;
}
export interface UploadCommentResponse{
    success: boolean;
    message?: string;
}
<<<<<<< HEAD

// store
//查询
export interface searchsimplegamelistResponse{
    success: boolean;
    simplegamelist?:simplegame[];
}
//store三个模块
export interface simplegamelistResponse{
    success: boolean;
    simplegamelist?:simplegame[];
}
//store的展示游戏图片
export interface storeShowImgResponse{
    success: boolean;
    storeShowImg?:string[];
}

export interface getdetailedgameResponse{
    success: boolean;
    detailedgame:detailedgame;
}

export interface addresultResponse{
    success: boolean;
    message?: string;
}

export interface buygameresultResponse{
    success: boolean;
    message?: string;
=======
export interface FollowResponse{
    success: boolean;
    message?: string;
}
export interface LoginResponse{
    success: boolean;
    message?: string;
    userInfo?:UserInfo;
>>>>>>> c1a7d78be7ef78241328893ecf414ca201d29694
}