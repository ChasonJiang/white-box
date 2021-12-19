import { Component, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { UsersettingPageModule } from 'src/app/me/usersetting/usersetting.module';
import { UsersettingPage } from 'src/app/me/usersetting/usersetting.page';
import { MyAnimation } from 'src/app/util/animation';

@Component({
  selector: 'app-meheader',
  templateUrl: './meheader.component.html',
  styleUrls: ['./meheader.component.scss'],
})
export class MeheaderComponent implements OnInit {

  constructor(
    public modalController:ModalController,
    public animationCtrl: AnimationController

  ) { }

  ngOnInit() {}

  setting(){
    this.createModal();
  }
  async createModal(){
    let animation=MyAnimation(this.animationCtrl);
    const modal = await this.modalController.create({
      component:UsersettingPage,
      cssClass:"fullscreen-class",
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }

}
