import { AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostCard,PostInfo } from "../interface/Post"
import { PostCardService } from 'src/app/services/PostCard.service';
import { PostComponent } from '../common-component/post/post.component';
import { PostCardComponent } from '../common-component/post-card/post-card.component';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit,OnInit {
  @ViewChild('postCardContainer',{read: ViewContainerRef }) postCardContainerViewContainerRef:ViewContainerRef;
  // @ViewChild('ion-content',{read: ElementRef}) ionContentRef:ElementRef;
  postCards?: PostCard[];
  // private postCardCompts:any[];


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private postCardService:PostCardService,
    private injector: Injector,
    private appRef: ApplicationRef
  
  ) {

   }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('userInfo')).uid);
  }
  ngAfterViewInit(){
    this.lazyLoadPostCard(this.updatePostCard());
  }

  updatePostCard(){
    
    this.postCardService.requestPostCard({header:{uid:JSON.parse(localStorage.getItem('userInfo')).uid,type:''}})
      .subscribe(postCards=>{
        this.postCards=postCards;
      });
      return this.postCards;
  }

  lazyLoadPostCard(postCards:PostCard[]){
    for (let postCard of postCards)
    {
      const postCardComponentFactory=this.componentFactoryResolver
        .resolveComponentFactory(PostCardComponent);
      const postCardComponentRef=this.postCardContainerViewContainerRef.createComponent(postCardComponentFactory);
      postCardComponentRef.instance.postCard=postCard;
  
    }
  }
  doRefresh(event) {
    // console.log('Begin async operation');
      console.log('Async operation has ended');
      this.postCardContainerViewContainerRef.clear();
      this.lazyLoadPostCard(this.updatePostCard());
      event.target.complete();
    }

  loadData(event) {
    this.lazyLoadPostCard(this.updatePostCard());
    event.target.complete();
              // event.target.disabled = true;
    // setTimeout(() => {
    //   console.log('Done');
    //   event.target.complete();

    //   // App logic to determine if all data is loaded
    //   // and disable the infinite scroll
    //   if (data.length == 1000) {
    //     event.target.disabled = true;
    //   }
    // }, 500);
  }


}
