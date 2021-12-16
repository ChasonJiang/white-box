import { UserCard, UserInfo } from "../interface/User";
import * as Sha256 from "fast-sha256";

export function sha256(string: string): string {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = Sha256.hash(utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

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