import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCardInfo } from 'src/app/interface/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() uid?:number;
  userCardInfo?: UserCardInfo;
  constructor(
    private userService:UserService,
  ) { }

  ngOnInit() {
    this.getUserCardInfo();
  }

  getUserCardInfo(){
    console.log("uid:"+this.uid);
    this.userCardInfo=this.userService.requestUserCardInfo(this.uid);
    console.log(this.userCardInfo.avatarUrl)
  }

}
