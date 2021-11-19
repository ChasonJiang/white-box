import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../common-component/post/post.component';
import { ModalController } from '@ionic/angular';
import { PostCardService } from '../services/PostCard.service';
<<<<<<< HEAD
import { PostCard,PostInfo } from "../interface/Post"
=======
import { PostCard } from "../interface/PostCard"
>>>>>>> f8752b5f9aa4d3f92493c9e8ad49da90ac486d75

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  postCards?: PostCard[];
  constructor(
    public modalController:ModalController,
    private postCardService:PostCardService
    ) {}

  ngOnInit() {
    this.postCards=this.updatePostCard();
  }

<<<<<<< HEAD
  async createModal(postInfo:PostInfo){
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'postInfo': postInfo,
      }
=======
  async createModal(){
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class"
>>>>>>> f8752b5f9aa4d3f92493c9e8ad49da90ac486d75
    });
    
    return await modal.present();
  }

  updatePostCard():PostCard[]{
    return this.postCardService.getPostCard();
  }

}
