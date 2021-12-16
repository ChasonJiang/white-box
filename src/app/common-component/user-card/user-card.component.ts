import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCard } from 'src/app/interface/User';
import { getCurrentUserCard } from 'src/app/util/util';
import { FollowRequestParams, Requester } from 'src/app/interface/Request';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  // @Input() uid?:number;
  @Input() releaseTime:string;
  @Input() userCard?: UserCard;
  @Input() postMode:boolean = false;
  private isFollow:boolean = false;
  constructor(
    private userService:UserService,
  ) { }

  ngOnInit() {
    // this.getUserCardInfo();
  }
  followingToggle(){
    let req:Requester<FollowRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:"ChangeFollowStatus",
      },
      body:{
        follow_uid:this.userCard.uid,
        follow:!this.isFollow,
      }
    }
    try{
      this.userService.changeFollowStatus(req).subscribe({
        next:res=>{
          if(res.success){
            this.isFollow=!this.isFollow;
          }
      }});
    }catch(err){
      console.log(err.message);
    }

  }

  // getUserCard(){
  //   console.log("uid:"+this.uid);
  //   this.userCard=this.userService.requestUserCardInfo(this.uid);
  //   console.log(this.userCard.avatarUrl)
  // }

}
