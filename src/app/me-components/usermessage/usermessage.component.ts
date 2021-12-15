import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/interface/User';
@Component({
  selector: 'app-usermessage',
  templateUrl: './usermessage.component.html',
  styleUrls: ['./usermessage.component.css'],
})
export class UsermessageComponent implements OnInit {

  user:UserInfo = {
    uid: 1649,
    userName: 'queshi',
    userpsw: '1649',
    usersign: 'feizhuliuzi',
    attentionnumber: 165,
    fansnumber: 115,
    collectionnumber: 1981,
    userLevel: 0,
    avatarUrl: '123'
  }
  

  constructor() { }

  ngOnInit() {}

}
