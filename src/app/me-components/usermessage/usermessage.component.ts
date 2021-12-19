import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/interface/User';
import { getCurrentUserCard } from 'src/app/util/util';
@Component({
  selector: 'app-usermessage',
  templateUrl: './usermessage.component.html',
  styleUrls: ['./usermessage.component.css'],
})
export class UsermessageComponent implements OnInit {

  user:UserInfo = {
    uid:getCurrentUserCard().uid,
    userName:getCurrentUserCard().userName,
    signature:'好果汁，你让我疯狂',
    numberOfFollow: getCurrentUserCard().userLevel,
    numberOfFans: 191,
    numberOfCollection: 5699,
    userLevel:6,
    avatarUrl:'',
    sex:'y',
    birthDay:"0",
    email:'164921960@qq.com',
}
  

  constructor() { }

  ngOnInit() {}

}
