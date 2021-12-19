import { Component, Input, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { PostCard } from "../../interface/Post"

import { PostComponent } from '../post/post.component';
import {MyAnimation} from '../../util/animation'

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() postCard: PostCard;
  constructor(
    public modalController:ModalController,
    public animationCtrl: AnimationController

  ) { }

  ngOnInit() {

  }

  async createModal(pid:number){
    let animation=MyAnimation(this.animationCtrl);
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'pid': pid,
      },
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }

}
