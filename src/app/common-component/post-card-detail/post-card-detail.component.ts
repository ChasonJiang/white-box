import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { PostCardDetail } from 'src/app/interface/Post';
import { UserCard } from 'src/app/interface/User';
import { MyAnimation } from 'src/app/util/animation';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-card-detail',
  templateUrl: './post-card-detail.component.html',
  styleUrls: ['./post-card-detail.component.scss'],
})
export class PostCardDetailComponent implements OnInit {
  private postContent:string;
  @Input() userCard:UserCard;
  @Input() postCardDetail?:PostCardDetail
  private imgUrl:string[]=[];
  private lengthLimit:number = 180;
  private img_range:number[] = [];

  constructor(
    public modalController:ModalController,
    private renderer:Renderer2,
    public animationCtrl: AnimationController

  ) { }

  ngOnInit() {
    this.shellPost(this.postCardDetail.content);
    // console.log(this.postCardDetail.content)
    
  }

  shellPost(content:string){
    let div=this.renderer.createElement('div');
    div.innerHTML=content;
    let _content:string=div.innerText;
    if(_content.length>=this.lengthLimit){
      this.postContent=_content.slice(0,this.lengthLimit)+"...";
    }else{
      this.postContent=_content
    }
    // console.log(_content)


    let imgs=div.querySelectorAll('.images');
    for(let img of imgs){
        this.imgUrl.push(img.src);
    }
    this.img_range=Array.from(Array(this.imgUrl.length).keys());
    this.img_range.pop();

  }

  async createModal(pid:number){
    let animation=MyAnimation(this.animationCtrl);
        // console.log(this.postCardDetail);
        // console.log(this.postCardDetail);
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'pid':this.postCardDetail.pid,
        'post': this.postCardDetail,
        'userCard': this.userCard,
        'detailMode':true
      },
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }
}
