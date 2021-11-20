import { Injectable } from '@angular/core';
import { UserCardInfo }from"../interface/User";
import { USER_CARD_INFO } from "../user"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  requestUserCardInfo(uid: number):UserCardInfo{
    console.log("request user card info");
    return USER_CARD_INFO;
  }
}
