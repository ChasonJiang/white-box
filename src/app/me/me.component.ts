import { Component, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { MyAnimation } from '../util/animation';
import { getUserInfo } from '../util/util';
import { gamelibraryComponent } from './gamelibrary/gamelibrary.component';
import { MomentComponent } from './moment/moment.component';
import { WishgameComponent } from './wishgame/wishgame.component';
@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit {

  constructor(
    public modalController:ModalController,
    public animationCtrl: AnimationController

  ) { }

  ngOnInit() {}

  async createMomentModal(){
    let animation=MyAnimation(this.animationCtrl);
        // console.log(this.postCardDetail);
        // console.log(this.postCardDetail);
    const modal = await this.modalController.create({
      component:MomentComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'uid':getUserInfo().uid
      },
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }

  async creategamelibraryModal(){
    let animation=MyAnimation(this.animationCtrl);
        // console.log(this.postCardDetail);
        // console.log(this.postCardDetail);
    const modal = await this.modalController.create({
      component:gamelibraryComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'uid':getUserInfo().uid
      },
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }


  async creategamewishModal(){
    let animation=MyAnimation(this.animationCtrl);
        // console.log(this.postCardDetail);
        // console.log(this.postCardDetail);
    const modal = await this.modalController.create({
      component:WishgameComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'uid':getUserInfo().uid
      },
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }
}
