import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentEditerComponent } from '../comment-editer/comment-editer.component';

@Component({
  selector: 'app-comment-footer',
  templateUrl: './comment-footer.component.html',
  styleUrls: ['./comment-footer.component.scss'],
})
export class CommentFooterComponent implements OnInit {

  @Input() numberOfComments?: number;

  // enableBackdropDismiss = false;
  // showBackdrop = false;
  // shouldPropagate = false;
  // showCommentBox= false;

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
