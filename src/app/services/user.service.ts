import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDetailsResponse } from '../interface/Response';
import { UserCard, UserInfo }from"../interface/User";
import { USER_CARD_INFO } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

   requestLoginValidation():Observable<UserDetailsResponse> {
     const userInfo: UserInfo = {
       uid:0,
       userName:'test',
       userLevel:10,
       avatarUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F26%2F20200326212002_rxlyj.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640697027&t=df8a02eff4d6e537c10fbc6870de5825",

     }
     const userDetailsResponse:UserDetailsResponse={
      success:true,
      userInfo:userInfo
     }
    return of(userDetailsResponse);
  }


  login(){
    this.requestLoginValidation().subscribe(userDetailsResponse=>{
      if(userDetailsResponse.success){
        localStorage.setItem('userInfo', JSON.stringify(userDetailsResponse.userInfo));
      }else{
        console.log(userDetailsResponse.message);
      }
    });
  }

  loginStatusCheck(){
    if(localStorage.getItem('userInfo')!=null){
      return true;
    }
    return false;
  }

  requestUserCardInfo(uid: number):UserCard{
    console.log("request user card info");
    return USER_CARD_INFO;
  }
}
