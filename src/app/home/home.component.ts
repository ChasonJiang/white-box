import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PostCard } from "../interface/Post"
import { PostCardService } from 'src/app/services/PostCard.service';

import { PostCardComponent } from '../common-component/post-card/post-card.component';
import { getCurrentUserCard } from '../util/util';
import { PostCardRequestParams, Requester } from '../interface/Request';
import { UserCard } from '../interface/User';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit,OnInit {
  @ViewChild('postCardContainer',{read: ViewContainerRef }) postCardContainerViewContainerRef:ViewContainerRef;
  // @ViewChild('ion-content',{read: ElementRef}) ionContentRef:ElementRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private postCards?: PostCard[];
  private postCardsIndex:number[];
  private userCard: UserCard=getCurrentUserCard();
  private card_size:number=15;
  private counter:number=0;
  private isEnd:boolean=false;
  // private postCardCompts:any[];


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private postCardService:PostCardService,
  
  ) {

   }

  ngOnInit() {

  }
  ngAfterViewInit(){
    this.getpostCardIndex();
    this.lazyLoadPostCard(this.getPostCard());
  }

  getpostCardIndex(){
    let req:Requester<void>={
      head:{
        uid:this.userCard.uid,
        type:"GetPostCardIndexList"
      },
    }
    this.postCardService.requestPostCardIndex(req)
      .subscribe(indexlist =>this.postCardsIndex);
  }

  getPostCard():PostCard[]|null {
    let index_strat=this.counter*this.card_size;
    let index_end=this.counter*this.card_size+this.card_size;
    if(index_strat>this.postCardsIndex.length){
      this.infiniteScroll.disabled=true;
      this.isEnd=true;
      return null
    }else if(index_end>this.postCardsIndex.length){
      index_end=this.postCardsIndex.length;
    }
    let req:Requester<PostCardRequestParams>={
      head:{
        uid:this.userCard.uid,
        type:"GetPostCardList"
      },
      body:{
        pid:this.postCardsIndex.slice(index_strat,index_end),
      }
    }
    this.postCardService.requestPostCard(req)
      .subscribe(postCards=>{
        this.postCards=postCards;
      });
      this.counter++;
      return this.postCards;
  }

  lazyLoadPostCard(postCards:PostCard[]):void{
    if(!postCards){return}
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
    this.infiniteScroll.disabled=true;
    this.isEnd=true;
    this.lazyLoadPostCard(this.getPostCard());
    event.target.complete();



  }

  loadData(event) {
    this.lazyLoadPostCard(this.getPostCard());
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
