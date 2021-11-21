import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostCard,PostInfo } from "../interface/Post"
import { PostCardService } from 'src/app/services/PostCard.service';
import { PostComponent } from '../common-component/post/post.component';
import { PostCardComponent } from '../common-component/post-card/post-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('postCardContainer',{read: ViewContainerRef }) postCardContainerViewContainerRef:ViewContainerRef;
  // @ViewChild('ion-content',{read: ElementRef}) ionContentRef:ElementRef;
  postCards?: PostCard[];
  private postCardCompts:any[];


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private postCardService:PostCardService,
    private injector: Injector,
    private appRef: ApplicationRef
  
  ) {

   }

  ngOnInit() {
    this.postCards=this.updatePostCard();

  }


  updatePostCard():PostCard[]{
    return this.postCardService.getPostCard();
  }

  lazyLoadPostCard(postCards:PostCard[]){
    for (let postCard of postCards)
    {
      const postCardComponentFactory=this.componentFactoryResolver
        .resolveComponentFactory(PostCardComponent);
      //   .create(this.injector);
      // this.appRef.attachView(postCardComponentFactory.hostView);
      const postCardComponentRef=this.postCardContainerViewContainerRef.createComponent(postCardComponentFactory);
      postCardComponentRef.instance.postCard=postCard;
      // this.postCardCompts.push(postCardComponentRef);
  
    }
  }
  doRefresh(event) {
    // console.log('Begin async operation');
      console.log('Async operation has ended');
      this.updatePostCard();
      this.postCardContainerViewContainerRef.clear();
      this.lazyLoadPostCard(this.postCards);
      event.target.complete();
    }
    onScroll(event){
      
      console.log(event.scrollTop);
      
    }


}
