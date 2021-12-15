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
    usersign: 'feizhuliuzi',
    attentionnumber: 165,
    fansnumber: 115,
    collectionnumber: 1981,
    userLevel: 0,
    avatarUrl: '123',
    usersex: '',
    userbirth: 0,
    usermail: ''
  }
  

  constructor() { }

  ngOnInit() {}

}
