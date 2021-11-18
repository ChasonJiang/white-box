import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../common-component/post/post.component';
import { ModalController } from '@ionic/angular';
import { PostCardService } from '../services/PostCard.service';
import { PostCard } from "../interface/PostCard"

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

  async createModal(){
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class"
    });

    return await modal.present();
  }

  updatePostCard():PostCard[]{
    return this.postCardService.getPostCard();
  }

}
