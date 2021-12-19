import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import { Post } from 'src/app/interface/Post';
import { PhotoService } from 'src/app/services/photo.service';
import { PostComponent } from '../post/post.component';
import { getCurrentUserCard, sha256 } from 'src/app/util/util';
import { AlertController } from '@ionic/angular';
import { Topic } from 'src/app/interface/Topic';
import { TopicListComponent } from './topic-list/topic-list.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { CameraResultType } from '@capacitor/camera';
import { PostService } from 'src/app/services/post.service';
import { Requester, UploadPostRequestParams } from 'src/app/interface/Request';
import { MyAnimation } from 'src/app/util/animation';


@Component({
  selector: 'app-post-editer',
  templateUrl: './post-editer.component.html',
  styleUrls: ['./post-editer.component.scss'],
})
export class PostEditerComponent implements OnInit {
  // @Input() editerType: string;
  @ViewChild('Container',{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  private isShowCover:boolean = false;
  private coverUrl:string;
  private currentEditerType: string;
  private isShowtitle:boolean = false;
  private imgCounter:number = 0;
  private showSpinner:boolean = false;
  @Input() paperMode:boolean = false;
  @Input() topics:Topic[]=[];

  private TypeDict={
    'post':"帖子/动态",
    'paper':"文章/文图"
  }

  constructor(
    private modalController: ModalController,
    private photoService:PhotoService,
    private alertController:AlertController,
    private postService:PostService,
    private imageCompress:NgxImageCompressService,
    private elementRef: ElementRef,
    private renderer:Renderer2,
    public animationCtrl: AnimationController

  ) { }

  ngOnInit() {
    if(this.paperMode){
      this.currentEditerType=this.TypeDict['paper'];
    }else{
      this.currentEditerType=this.TypeDict['post'];
    }

  }

  async createPreviewModal(pid:number){
    let animation=MyAnimation(this.animationCtrl);
    if(!this.checkPost()){return}
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'post': this.packUpPost(),
        'previewMode':true,
      },
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }

  async createTopicListModal(){
    let animation=MyAnimation(this.animationCtrl);
    const modal = await this.modalController.create({
      component:TopicListComponent,
      cssClass:"fullscreen-class",
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    await modal.present();
    const {data}=await modal.onWillDismiss();
    if(data.topic!=undefined){
      this.topics.push(data.topic);
    }
    return 
  }

  

  async alert(msg: string){
    const alert = await this.alertController.create({
      header:'提示',
      message: msg,
      buttons:['确认'],
    });

    await alert.present();
  }

  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  //检查帖子是否编辑完整
  private checkPost():boolean{
    // let cover = this.viewContainerRef.element.nativeElement.querySelector('#cover');
    let title = this.viewContainerRef.element.nativeElement.querySelector('.title');
    let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    // console.log(cover.src);
    if(this.paperMode){
      if(!this.isShowCover){
        this.alert("请添加封面！");
        return false;
      }
      if(title.innerText=='' || title.innerText==null){
        this.alert("请输入标题！");
        return false;
      }
    }
    
    main_textarea.innerText //消除多余元素
    if(main_textarea.innerHTML=='' || main_textarea.innerHTML==null){
      this.alert("请输入正文！");
      return false;
    }
    if(this.topics.length==0 || this.topics===undefined){
      this.alert("请添加话题！");
      return false;
    }
    return true;
  }

  //将编辑好的帖子打包成Post对象
  private packUpPost():Post{

    let _userCard=getCurrentUserCard();
    let cover = this.viewContainerRef.element.nativeElement.querySelector('#cover');
    let title = this.viewContainerRef.element.nativeElement.querySelector('.title');
    let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    let releaseTime=new Date().getTime().toString();
    let pid:string = sha256(String(_userCard.uid)+releaseTime);
    console.log(pid);
    console.log(this.topics)
    let post={
      uid:_userCard.uid as string, // fake uid
      pid:pid, // fake pid
      userCard:_userCard,
      content:main_textarea.innerHTML,
      numberOfComments:0,
      numberOfApproval:0,
      isPaper:this.paperMode?true:false,
      releaseTime:releaseTime,
      topic:this.topics,
    }
    if(this.isShowtitle || this.paperMode){
      post['title']=title.innerText;
    }
    if(this.isShowCover){
      post['coverUrl']=cover.src;
    }
    return post as Post;
  }

  sendPost(){
    if(!this.checkPost()){return}
    this.showSpinner=true;
    let post:Post = this.packUpPost();
    let req:Requester<UploadPostRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:'UploadPost'
      },
      body:{
        post:post
      }
    }
    this.postService.uploadPost(req).subscribe({
      next:res =>{
        this.showSpinner=false;
        if(res.success){
          this.alert("发表成功！");
          this.modalDismiss();
          
        }else{
          this.alert("失败提示:\n"+res.message);
        }
      },
      complete:()=>{
        
      },
      error:()=>{
        this.showSpinner=false;
        this.alert("发表失败！");
      }
    });

  }


  saveDraft(){
    let post:Post = this.packUpPost();
    
  }

  deleteImg(){

  }


  insertImg(){
    // let title = this.viewContainerRef.ele ment.nativeElement.querySelector('title');
    let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    console.log(main_textarea.innerText);
    let image:string;
    from(this.photoService.takePicture({
      quality:100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    })).subscribe(
      url=>{
        this.imageCompress.compressFile(url, -2, 50, 30).then(img => {
          main_textarea.innerHTML+="<img src=" + img +` class="images" (click)="showImg($event);" style='border-radius: 4px; margin-top:4px;margin-bottom:4px'><div><br></div>`;

        });

      });
      

    // console.log(main_textarea.innerText);

  }
  appendCover(){

    from(this.photoService.takePicture()).subscribe(
      url=>{
        this.coverUrl=url;
        if(this.coverUrl){
          console.log("coverUrl ok")
          this.isShowCover=true;
        }
      }
      );
  }
  deleteTopic(topic:Topic){
    this.topics.splice(this.topics.indexOf(topic),1);
  }
  
}
