import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import { Post } from 'src/app/interface/Post';
import { PhotoService } from 'src/app/services/photo.service';
import { USER_CARD_INFO } from 'src/app/user';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-editer',
  templateUrl: './post-editer.component.html',
  styleUrls: ['./post-editer.component.scss'],
})
export class PostEditerComponent implements OnInit {
  @Input() editerType: string;
  @ViewChild('Container',{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  private imgUrl:string[];
  private isShowCover:boolean = false;
  private coverUrl:string;
  private currentEditerType: string;
  private TypeDict={
    'post':"帖子/动态",
    'paper':"文章/文图"
  }
  constructor(
    private modalController: ModalController,
    private photoService:PhotoService
  ) { }

  ngOnInit() {
    this.currentEditerType=this.TypeDict[this.editerType];
  }

  async createPreviewModal(pid:number){

    let cover = this.viewContainerRef.element.nativeElement.querySelector('#cover');
    let title = this.viewContainerRef.element.nativeElement.querySelector('.title');
    let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    
    let post:Post={
      uid:0, // fake uid
      pid:0, // fake pid
      userCard:USER_CARD_INFO,
      title: title.innerText,
      coverUrl:cover.src,
      postContent:{
        content:main_textarea.innerHTML
      },
      numberOfComments:0,
      numberOfApproval:0,
      releaseTime:"2021-11-29", // fake releaseTime
      topic:{
        tid:0,
        name:"test domain",
    },
    }
        
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'post': post,
        'previewMode':true,
      },
    });
    return await modal.present();
  }

  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  sendPost(){
    let cover = this.viewContainerRef.element.nativeElement.querySelector('#cover');
    let title = this.viewContainerRef.element.nativeElement.querySelector('.title');
    let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    
    let post:Post={
      uid:0, // fake uid
      pid:0, // fake pid
      userCard:USER_CARD_INFO,
      title: title.innerText,
      coverUrl:cover.src,
      postContent:{
        content:main_textarea.innerHTML
      },
      numberOfComments:0,
      numberOfApproval:0,
      releaseTime:"2021-11-29", // fake releaseTime
      topic:{
        tid:0,
        name:"test domain",
    },
    }
    console.log(post);
  }

  deleteImg(url:string){
    this.imgUrl.slice(this.imgUrl.indexOf(url),1);
  }

  insertImg(){
    
    // let title = this.viewContainerRef.ele ment.nativeElement.querySelector('title');
    let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    console.log(main_textarea.innerText);
    from(this.photoService.takePicture()).subscribe(
      url=>{
        main_textarea.innerHTML+="<img src=" + url +" style='border-radius: 4px; margin-top:4px;margin-bottom:4px'><div><br></div>";
      });

    // console.log(main_textarea.innerText);

  }
  appendCover(){

    from(this.photoService.takePicture()).subscribe(
      url=>{
        this.coverUrl=url;
        if(this.coverUrl!=null){
          this.isShowCover=true;
        }
      }
      );
  }
  
}
