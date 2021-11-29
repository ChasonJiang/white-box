import { UserInfo } from "./User";

export interface UserDetailsResponse{
    success: boolean;
    message?: string;
    userInfo?: UserInfo;
}