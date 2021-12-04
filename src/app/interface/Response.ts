import { UserInfo } from "./User";

export interface PostCardIndexResponse{
    pid: number[];
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