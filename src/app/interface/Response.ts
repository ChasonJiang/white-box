import { UserInfo } from "./User";

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