export interface UserBaseInfo{
    uid: number;
    userName: string;
}
export interface UserCardInfo extends UserBaseInfo{
    userLevel: number;
    avatarUrl: string;
}
export interface UserDetails extends UserCardInfo{

}