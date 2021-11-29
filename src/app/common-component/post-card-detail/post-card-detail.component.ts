import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostCardDetail } from 'src/app/interface/Post';
import { UserCard } from 'src/app/interface/User';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-card-detail',
  templateUrl: './post-card-detail.component.html',
  styleUrls: ['./post-card-detail.component.scss'],
})
export class PostCardDetailComponent implements OnInit {

  @Input() postCardDetail?:PostCardDetail
  constructor(
    public modalController:ModalController,
  ) { }

  ngOnInit() {
    // console.log(this.postCardDetail.postContent)
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
