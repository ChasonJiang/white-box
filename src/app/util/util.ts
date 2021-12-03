import { UserCard, UserInfo } from "../interface/User";

export function checkLoginStatus():boolean{
    if(localStorage.getItem('userInfo')!=null){
      return true;
    }
    return false;
  }

export function getUserInfo():UserInfo|null{
  if(checkLoginStatus()){
    let userCard:UserCard=JSON.parse(localStorage.getItem('userInfo'));
    return userCard;
  }
  return null;
}

export function getCurrentUserCard():UserCard|null{
  let userCard:UserCard=getUserInfo();
    if(userCard){
        return userCard;
    }
    return null;
}