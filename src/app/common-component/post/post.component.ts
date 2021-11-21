import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { PostInfo,Post,PostRequestOptions } from '../../interface/Post';
import { UserService } from '../../services/user.service';
import { UserCardInfo } from 'src/app/interface/User';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from "../../interface/Comment";
import { DynamicTemplateRendererService } from"../../services/dynamic-template-renderer.service";
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @ViewChild("postContainer", {read: ViewContainerRef}) postContainer: ViewContainerRef;
  @Input() postInfo?: PostInfo;
  private componentRef: ComponentRef<{}>;
  post?: Post;
  userCardInfo?: UserCardInfo;

  // commentPRO?:PostRequestOptions;
  // status:Boolean=false;
  // changeStatus(){
  //   this.status = !this.status;
  // }


  constructor(
    public modalController:ModalController,
    private postService:PostService,
    private dynamicTemplateRendererService:DynamicTemplateRendererService,
  ) { }

  ngOnInit() {
    // this.getPost();
    this.renderPost();
  }

  async getPost(){
    this.post=this.postService.requestPost({ uid: 0, hash:"" });
  }

  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async createModal(postInfo:PostInfo){
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'postInfo': postInfo,
      }
    });
    
    return await modal.present();
  }

  async renderPost(){
    if(this.componentRef){
      this.componentRef.destroy();
      this.componentRef=null;
    }
    await this.getPost();
    this.componentRef=this.dynamicTemplateRendererService.compileTemplate({ selector: "app-post-content", template: this.post.content ,styles:["ion-img{padding-top:10px;padding-bottom:10px;}"],}, this.postContainer);
    // this.componentRef=this.dynamicTemplateRendererService.createComponent({ selector: "app-post-content", template: this.post.content }, this.postContainer);

  }  

}
