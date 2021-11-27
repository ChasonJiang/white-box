import { AfterViewInit, Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { PostInfo,Post } from '../../interface/Post';
import { UserService } from '../../services/user.service';
import { UserCardInfo } from 'src/app/interface/User';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from "../../interface/Comment";
import { DynamicTemplateRendererService } from"../../services/dynamic-template-renderer.service";
import { PostRequestOptions } from 'src/app/interface/Requeste';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit,AfterViewInit {
  @ViewChild("postContainer", {read: ViewContainerRef}) postContainer: ViewContainerRef;
  @Input() pid?: number;
  private componentRef: ComponentRef<{}>;
  post?: Post;
  userCardInfo?: UserCardInfo;

  constructor(
    public modalController:ModalController,
    private postService:PostService,
    private dynamicTemplateRendererService:DynamicTemplateRendererService,
  ) { }

   ngOnInit() {
    // this.getPost();
    this.getPost();

    // console.log("ok")

  }
  ngAfterViewInit(){

    this.renderPost();
  }

  async getPost(){
    await this.postService.requestPost({ uid:0 ,type:"Post",requestOptions:{pid:0}})
      .subscribe(post => {
        this.post=post;
      });
    return this.post;
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
    // console.log(post.postContent.content)
    this.componentRef=this.dynamicTemplateRendererService.compileTemplate(
      { 
        selector: "app-post-content", 
        template: this.post.postContent.content ,
        styles:["ion-img{padding-top:10px;padding-bottom:10px;}"],
      }, this.postContainer);
    // this.componentRef=this.dynamicTemplateRendererService.createComponent({ selector: "app-post-content", template: post.postContent.content }, this.postContainer);
  }  

}

