import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Requester, SubCommentRequestParams } from 'src/app/interface/Request';
import { UserCard } from 'src/app/interface/User';
import { CommentService } from 'src/app/services/comment.service';
import { getCurrentUserCard } from 'src/app/util/util';
import { Comment, SubComment } from "../../interface/Comment";
import { CommentEditerComponent } from '../comment-editer/comment-editer.component';
@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit,AfterViewInit {
  @Input() comment?:Comment;
  @Input() userCard?:UserCard;
  private reply:SubComment[];
  private reqFailed: boolean=false;

  constructor(
    private modalController: ModalController,
    private commentService: CommentService,
  ) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.getSubComment();
  }

  async createCommentEditerModal(){
    const modal = await this.modalController.create({
      component:CommentEditerComponent,
      cssClass:"transparent-class",
      componentProps:{
      }
    });
    
    return await modal.present();
  }

  getSubComment(){
    this.reqFailed=false;
    let req:Requester<SubCommentRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:"GetSubCommentList",
      },
      body:{
        pid:this.comment.pid,
        cid:this.comment.cid,
        sub_cid:this.comment.sub_cid
      }
    };

    try{
      this.commentService.requestSubComments(req).subscribe({
        next:res=>{
          this.reply=res.subComments;
      },
      complete:()=>{},
      error:()=>{
        this.reqFailed=true;
      }
    });
    }catch(err){
      console.log(err.message);
    }finally{

    }
  }

  

}
