import { UserCard, UserInfo } from "../interface/User";

export function checkLoginStatus():boolean{
    if(localStorage.getItem('userInfo')!=null){
      return true;
    }
    return false;
  }

export function getUserInfo():UserInfo|null{
  if(checkLoginStatus()){
    let userInfo:UserInfo=JSON.parse(localStorage.getItem('userInfo'));
    return userInfo;
  }
  return null;
}

export function getCurrentUserCard():UserCard|null{
    return getUserInfo() as UserCard;
}