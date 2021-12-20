import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCard } from 'src/app/interface/User';
import { getCurrentUserCard } from 'src/app/util/util';
import { FollowRequestParams, Requester } from 'src/app/interface/Request';
import { MyAnimation } from 'src/app/util/animation';
import { MomentComponent } from 'src/app/me/moment/moment.component';
import { AnimationController, ModalController } from '@ionic/angular';

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
    public animationCtrl: AnimationController,
    private modalController: ModalController,


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

  
  async createMomentModal(uid:string){
    let animation=MyAnimation(this.animationCtrl);
        // console.log(this.postCardDetail);
        // console.log(this.postCardDetail);
    const modal = await this.modalController.create({
      component:MomentComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'uid':uid
      },
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }

  // getUserCard(){
  //   console.log("uid:"+this.uid);
  //   this.userCard=this.userService.requestUserCardInfo(this.uid);
  //   console.log(this.userCard.avatarUrl)
  // }

}
