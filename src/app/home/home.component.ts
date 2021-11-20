import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../common-component/post/post.component';
import { ModalController } from '@ionic/angular';
import { PostCardService } from '../services/PostCard.service';
import { PostCard,PostInfo } from "../interface/Post"
import { AnimationController } from '@ionic/angular';
import { ModalFromBottomEnter,ModalFromBottomLeave } from "../module/myAnimation"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  postCards?: PostCard[];
  constructor(
    public modalController:ModalController,
    private postCardService:PostCardService,
    private animationCtrl:AnimationController,
    ) {}

  ngOnInit() {
    this.postCards=this.updatePostCard();
  }

  async createModal(postInfo:PostInfo){
        
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'postInfo': postInfo,
      },
    });
    
    return await modal.present();
  }

  updatePostCard():PostCard[]{
    return this.postCardService.getPostCard();
  }

}
