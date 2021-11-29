import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCard } from 'src/app/interface/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  // @Input() uid?:number;
  @Input() releaseTime:string;
  @Input() userCard?: UserCard;
  constructor(
    private userService:UserService,
  ) { }

  ngOnInit() {
    // this.getUserCardInfo();
  }

  // getUserCard(){
  //   console.log("uid:"+this.uid);
  //   this.userCard=this.userService.requestUserCardInfo(this.uid);
  //   console.log(this.userCard.avatarUrl)
  // }

}
