import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { sha256 } from 'src/app/util/util';
import { CommentEditerComponent } from '../comment-editer/comment-editer.component';

@Component({
  selector: 'app-comment-footer',
  templateUrl: './comment-footer.component.html',
  styleUrls: ['./comment-footer.component.scss'],
})
export class CommentFooterComponent implements OnInit {

  @Input() numberOfComments?: number;
  @Input() pid: string;
  // enableBackdropDismiss = false;
  // showBackdrop = false;
  // shouldPropagate = false;
  // showCommentBox= false;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  async createCommentEditerModal(){
    let time:string=new Date().getTime().toString();
    let comment_info={
      pid:this.pid,
      cid:sha256(this.pid+time)
    };

    const modal = await this.modalController.create({
      component:CommentEditerComponent,
      cssClass:"transparent-class",
      componentProps:{
        comment_info:comment_info,
      }
    });
    
    return await modal.present();
  }
}
