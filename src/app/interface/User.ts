export interface UserBaseInfo{
    uid: number;
    userName: string;
}
export interface UserCardInfo extends UserBaseInfo{
    userLevel: number;
    avatarUrl: string;
    releaseTime?:string;
    numberOfStars?:number;
}
export interface UserDetails extends UserCardInfo{

}