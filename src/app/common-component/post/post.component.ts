import { AfterViewInit, Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { Post } from '../../interface/Post';
import { UserCard } from 'src/app/interface/User';
import { DynamicTemplateRendererService } from"../../services/dynamic-template-renderer.service";
import { getCurrentUserCard } from 'src/app/util/util';
import { PostRequestParams, Requester } from 'src/app/interface/Request';



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
  @Input() post: Post={
    uid:-1,
    pid:-1,
    title: '',
    content: '',
    coverUrl:'',
    numberOfApproval:0,
    numberOfComments:0,
    isPaper:false,
    releaseTime:'',
    topic:[{
      tid:-1,
      name:'',
    }],
  };
  @Input() userCard: UserCard={
    uid:-1,
    avatarUrl:'',
    userLevel:0,
    userName:''
  };
  private reqFailed: boolean=false;

  constructor(
    public modalController:ModalController,
    private postService:PostService,
    private dynamicTemplateRendererService:DynamicTemplateRendererService,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    if(!this.previewMode){
      this.loadPost();
    }else{
      this.userCard=getCurrentUserCard();
      this.renderPost(this.post);
    }
  }

  loadPost(){
    this.reqFailed=false;
    let req:Requester<PostRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:'GetPost'
      },
      body:{
        pid:this.pid,
      }
    };
    try{
      this.postService.requestPost(req)
      .subscribe({
        next:res => {
        this.post=res.post;
        this.userCard=res.userCard;
      },
      complete:() => {
        console.log(this.post);
        this.renderPost(this.post);

      },
      error:() => {
        console.log("resquest post error")
        this.reqFailed=true;

      }
    });
    }catch(e){
      console.log(e);
    }finally{

    }

    // return this.post;
  }

  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }



  renderPost(post:Post){
    if(this.componentRef){
      this.componentRef.destroy();
      this.componentRef=null;
    }
    // console.log(post.postContent.content)
    this.componentRef=this.dynamicTemplateRendererService.compileTemplate(
      { 
        selector: "app-post-content", 
        template: post.content ,
        styles:["ion-img{padding-top:10px;padding-bottom:10px;}"],
      }, 
      this.postContainer,
      class DynamicTemplateComponent{
        constructor(){}
        showImg(e){
          console.log(e.target.id);
        }
      }
      );
    // this.componentRef=this.dynamicTemplateRendererService.createComponent({ selector: "app-post-content", template: post.postContent.content }, this.postContainer);
  }  

}

