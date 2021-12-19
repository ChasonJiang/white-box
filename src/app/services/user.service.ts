import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiUrl } from '../Config';
import { FollowRequestParams, httpOptions, LoginRequestParams, LoginValidationRequestParams, LogoutRequestParams, RegisterRequestParams, Requester } from '../interface/Request';
import { FollowResponse, LoginResponse, LoginValidationResponse, LogoutResponse, RegisterResponse, UserDetailsResponse } from '../interface/Response';
import { UserCard, UserInfo }from"../interface/User";
// import { USER_CARD_INFO } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient,
    private router:Router,
  ) { }

  changeFollowStatus(req:Requester<FollowRequestParams>):Observable<FollowResponse>{
    return this.httpClient.post<FollowResponse>(ApiUrl,req,httpOptions);
  }

  requestLogin(req:Requester<LoginRequestParams>):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(ApiUrl,req,httpOptions);
  }

  requestRegister(req:Requester<RegisterRequestParams>):Observable<RegisterResponse>{
    return this.httpClient.post<LoginResponse>(ApiUrl,req,httpOptions);
  }
  // requestLogOut():Observable<RegisterResponse>{
    
  // }
  loginStatusCheck():boolean{
    if((localStorage.getItem('token')!=null || localStorage.getItem('token')!=undefined)&& (localStorage.getItem('userInfo')!=null || localStorage.getItem('userInfo')!=undefined)){
      return true;
    }else{
      return false;
    }
  }
  requestLogOut(req: Requester<LogoutRequestParams>):Observable<LogoutResponse>{
    return this.httpClient.post<LogoutResponse>(ApiUrl,req,httpOptions);

  }

  requestLoginValidat(req: Requester<LoginValidationRequestParams>):Observable<LoginValidationResponse>{
    return this.httpClient.post<LoginValidationResponse>(ApiUrl,req,httpOptions);
  }

}
