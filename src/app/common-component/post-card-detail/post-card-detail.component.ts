import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostCardDetail } from 'src/app/interface/Post';
import { UserCard } from 'src/app/interface/User';
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
  constructor(
    public modalController:ModalController,
    private renderer:Renderer2
  ) { }

  ngOnInit() {
    this.shellPost(this.postCardDetail.content);
    // console.log(this.postCardDetail.postContent)
    
  }

  shellPost(content:string){
    let div=this.renderer.createElement('div');
    div.innerHTML=content;
    let _content:string=div.innerText;
    if(_content.length>this.lengthLimit){
      this.postContent=_content.slice(0,this.lengthLimit)+"...";
    }


    let imgs=div.querySelectorAll('.images');
    for(let img of imgs){
        this.imgUrl.push(img.src);
    }
  }

  async createModal(pid:number){
        // console.log(this.postCardDetail);
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'post': this.postCardDetail,
        'userCard': this.userCard,
        'detailMode':true
      },
    });
    return await modal.present();
  }
}
