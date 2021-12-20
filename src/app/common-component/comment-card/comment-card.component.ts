import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { Requester, SubCommentRequestParams } from 'src/app/interface/Request';
import { UserBaseInfo, UserCard } from 'src/app/interface/User';
import { MomentComponent } from 'src/app/me/moment/moment.component';
import { CommentService } from 'src/app/services/comment.service';
import { CommentEditerAnimation, MyAnimation } from 'src/app/util/animation';
import { getCurrentUserCard, getUserInfo, sha256 } from 'src/app/util/util';
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
  @Input() pid: string;
  private reply:SubComment[];
  private reqFailed: boolean=false;

  constructor(
    private modalController: ModalController,
    private commentService: CommentService,
    public animationCtrl: AnimationController

  ) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.getSubComment();
  }

  async createMomentModal(uid:string){
    let animation=MyAnimation(this.animationCtrl);
        // console.log(this.postCardDetail);
        // console.log(this.postCardDetail);
    const modal = await this.modalController.create({
      component:MomentComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'uid':uid
      },
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }

  async createCommentEditerModal(reply_to:UserBaseInfo){
    let animation=CommentEditerAnimation(this.animationCtrl);
    let nowDate = new Date().getTime().toString();
    let _reply_to:UserBaseInfo = {
      uid:reply_to.uid,
      userName:reply_to.userName
    };
    let comment_info={
      pid:this.pid,
      cid:this.comment.cid,
      reply_to:_reply_to,
      sub_cid:sha256(this.comment.cid+nowDate)
    };

    // console.log(comment_info);


    const modal = await this.modalController.create({
      component:CommentEditerComponent,
      cssClass:"transparent-class",
      componentProps:{
        comment_info:comment_info
      },
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    
    return await modal.present();
  }

  getSubComment(){
    if(this.comment.sub_cid.length==0 || this.comment.sub_cid==null || this.comment.sub_cid == undefined){return}
    console.log("getSubComment sub_cid: "+this.comment.sub_cid);
    this.reqFailed=false;
    let req:Requester<SubCommentRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:"GetSubCommentList",
      },
      body:{
        // pid:this.pid,
        // cid:this.comment.cid,
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
