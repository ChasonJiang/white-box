import { UserDetails } from "./User";

export interface UserDetailsResponse{
    success: boolean;
    message?: string;
    userDetails?: UserDetails;
}