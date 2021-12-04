import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostCard } from "../../interface/Post"

import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() postCard: PostCard;
  constructor(
    public modalController:ModalController,
  ) { }

  ngOnInit() {

  }

  async createModal(pid:number){
        
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'pid': pid,
      },
    });
    return await modal.present();
  }

}
