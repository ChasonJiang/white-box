import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Requester, UploadCommentRequestParams, UploadPostRequestParams } from 'src/app/interface/Request';
import { CommentService } from 'src/app/services/comment.service';
import { getCurrentUserCard } from 'src/app/util/util';

@Component({
  selector: 'app-comment-editer',
  templateUrl: './comment-editer.component.html',
  styleUrls: ['./comment-editer.component.scss'],
})
export class CommentEditerComponent implements OnInit {
   content:string=null;
  @Input() comment_info:{pid:number, cid?:number,sub_cid?:number,};

  constructor(
    private modalController: ModalController,
    private commentService: CommentService,
  ) { }

  ngOnInit() {}

  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  sendComment(content: string) {
    let body:UploadCommentRequestParams={
      pid:this.comment_info.pid,
      cid:this.comment_info.cid,
      sub_cid:this.comment_info.sub_cid,
      content:content
    }

    let req:Requester<UploadCommentRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:"UploadComment"
      },
      body:body
    }

    try{
      this.commentService.uploadComment(req).subscribe({
        next: res => {
          if(res.success){
            console.log("评论成功！");
          }else{
            console.log("评论失败原因："+res.message);
          }
        },
        error: ()=>{
          console.log("评论失败!");
        }
      })
    }catch(err){
      console.log(err.message);
    }finally{

    }
    
  }

  Submit(){
    this.sendComment(this.content);
    this.modalDismiss();
  }

}
