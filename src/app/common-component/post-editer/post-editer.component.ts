import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import { Post } from 'src/app/interface/Post';
import { PhotoService } from 'src/app/services/photo.service';
import { USER_CARD_INFO } from 'src/app/user';
import { PostComponent } from '../post/post.component';
import { getCurrentUserCard } from 'src/app/util/util';
import { AlertController } from '@ionic/angular';

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
  @Input() paperMode:boolean = false;
  private TypeDict={
    'post':"帖子/动态",
    'paper':"文章/文图"
  }

  constructor(
    private modalController: ModalController,
    private photoService:PhotoService,
    private alertController:AlertController,
  ) { }

  ngOnInit() {
    if(this.paperMode){
      this.currentEditerType=this.TypeDict['paper'];
    }else{
      this.currentEditerType=this.TypeDict['post'];
    }

  }

  async createPreviewModal(pid:number){
    if(!this.checkPost()){return}
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'post': this.packUpPost(),
        'previewMode':true,
      },
    });
    return await modal.present();
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
    return true;
  }

  //将编辑好的帖子打包成Post对象
  private packUpPost():Post{
    
    let cover = this.viewContainerRef.element.nativeElement.querySelector('#cover');
    let title = this.viewContainerRef.element.nativeElement.querySelector('.title');
    let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');

    let _userCard=getCurrentUserCard();
    let post={
      uid:_userCard.uid, // fake uid
      pid:-1, // fake pid
      userCard:_userCard,
      postContent:{
        content:main_textarea.innerHTML
      },
      numberOfComments:0,
      numberOfApproval:0,
      isPaper:this.paperMode?true:false,
      releaseTime:new Date().getTime().toString(),
      topic:{
        tid:0,
        name:"test domain",
    },
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
    from(this.photoService.takePicture()).subscribe(
      url=>{
        main_textarea.innerHTML+="<img src=" + url +` (click)="showImg();" style='border-radius: 4px; margin-top:4px;margin-bottom:4px'><div><br></div>`;
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
  
}
