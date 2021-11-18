import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { PostInfo,Post,PostRequestOptions } from '../../interface/Post';
import { CommonModule } from '@angular/common';
import { DynamicTemplateRendererService } from"../../services/dynamic-template-renderer.service";
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  // @ViewChild("content") contentRef: TemplateRef<any>;
  @ViewChild("postContainer", {read: ViewContainerRef}) postContainer: ViewContainerRef;
  private componentRef: ComponentRef<{}>;
  @Input() postInfo?: PostInfo;
  post?: Post;
  
  template: string = "";
  constructor(
    public modalController:ModalController,
    private postService:PostService,
    private dynamicTemplateRendererService:DynamicTemplateRendererService

  ) { }

  ngOnInit() {
    this.renderPost();


  }

  getPost(){
    this.post=this.postService.requestPost({uid:"",title:""});
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
    this.componentRef=this.dynamicTemplateRendererService.compileTemplate(this.post.content,this.postContainer);
  }

}
