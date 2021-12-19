import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/interface/User';
import { getCurrentUserCard, getUserInfo } from 'src/app/util/util';
@Component({
  selector: 'app-usermessage',
  templateUrl: './usermessage.component.html',
  styleUrls: ['./usermessage.component.css'],
})
export class UsermessageComponent implements OnInit {

  user:UserInfo = {
    uid:getUserInfo().uid,
    userName:getUserInfo().userName,
    signature:getUserInfo().signature,
    numberOfFollow: getUserInfo().numberOfFollow,
    numberOfFans: getUserInfo().numberOfFans,
    numberOfCollection: getUserInfo().numberOfCollection,
    userLevel:getUserInfo().userLevel,
    avatarUrl:getCurrentUserCard().avatarUrl,
    sex:getUserInfo().sex,
    birthDay:getUserInfo().birthDay,
    email:getUserInfo().email,
}
  

  constructor() { }

  ngOnInit() {}

}
