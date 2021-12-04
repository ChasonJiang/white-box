import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserCard } from 'src/app/interface/User';
import { Comment } from "../../interface/Comment";
import { CommentEditerComponent } from '../comment-editer/comment-editer.component';
@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() comment?:Comment;
  @Input() userCard?:UserCard;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  async createCommentEditerModal(){
    const modal = await this.modalController.create({
      component:CommentEditerComponent,
      cssClass:"transparent-class",
      componentProps:{
      }
    });
    
    return await modal.present();
  }
  

}
