import { AfterViewInit, Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { Post } from '../../interface/Post';
import { UserCard } from 'src/app/interface/User';
import { DynamicTemplateRendererService } from"../../services/dynamic-template-renderer.service";



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit,AfterViewInit {
  @ViewChild("postContainer", {read: ViewContainerRef}) postContainer: ViewContainerRef;
  @Input() pid?: number;
  @Input() previewMode: boolean= false;
  private componentRef: ComponentRef<{}>;
  @Input() post?: Post;
  userCard?: UserCard;

  constructor(
    public modalController:ModalController,
    private postService:PostService,
    private dynamicTemplateRendererService:DynamicTemplateRendererService,
  ) { }

   ngOnInit() {
    // this.getPost();
    if(!this.previewMode){
      this.getPost();
    }


    // console.log("ok")

  }
  ngAfterViewInit(){

    this.renderPost();
  }

  async getPost(){
    await this.postService.requestPost({header:{uid:JSON.parse(localStorage.getItem('userInfo')).uid,type:''}})
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
      }, 
      this.postContainer,
      class DynamicTemplateComponent{
        constructor(){}
        showImg(){
          console.log('img click ok!');
        }
      }
      );
    // this.componentRef=this.dynamicTemplateRendererService.createComponent({ selector: "app-post-content", template: post.postContent.content }, this.postContainer);
  }  

}

