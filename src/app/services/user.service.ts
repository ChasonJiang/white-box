import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiUrl } from '../Config';
import { FollowRequestParams, httpOptions, LoginRequestParams, RegisterRequestParams, Requester } from '../interface/Request';
import { FollowResponse, LoginResponse, RegisterResponse, UserDetailsResponse } from '../interface/Response';
import { UserCard, UserInfo }from"../interface/User";
// import { USER_CARD_INFO } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  changeFollowStatus(req:Requester<FollowRequestParams>):Observable<FollowResponse>{
    return this.httpClient.post<FollowResponse>(ApiUrl,req,httpOptions);
  }

  requestLoginValidation(req:Requester<LoginRequestParams>):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(ApiUrl,req,httpOptions);
  }

  requestRegister(req:Requester<RegisterRequestParams>):Observable<RegisterResponse>{
    return this.httpClient.post<LoginResponse>(ApiUrl,req,httpOptions);
  }

  loginStatusCheck(){
    if(localStorage.getItem('userInfo')!=null){
      return true;
    }
    return false;
  }

}
