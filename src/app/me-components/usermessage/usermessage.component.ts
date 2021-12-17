import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/interface/User';
@Component({
  selector: 'app-usermessage',
  templateUrl: './usermessage.component.html',
  styleUrls: ['./usermessage.component.css'],
})
export class UsermessageComponent implements OnInit {

  user:UserInfo =     {
    uid:"164921960",
    userName:'柴浩',
    signature:'好果汁，你让我疯狂',
    numberOfFollow: 1561,
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
