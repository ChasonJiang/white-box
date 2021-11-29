export interface UserBaseInfo{
    uid: number;
    userName: string;
}
export interface UserCard extends UserBaseInfo{
    userLevel: number;
    avatarUrl: string;
    releaseTime?:string;
    numberOfStars?:number;
}

export interface UserDetails extends UserBaseInfo{
    userLevel: number;
    avatarUrl: string;
}