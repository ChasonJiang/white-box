import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PostCard } from "../interface/Post"
import { PostCardService } from 'src/app/services/PostCard.service';

import { PostCardComponent } from '../common-component/post-card/post-card.component';
import { getCurrentUserCard } from '../util/util';
import { PostCardRequestParams, Requester } from '../interface/Request';
import { UserCard } from '../interface/User';
import { IonInfiniteScroll } from '@ionic/angular';
import { PostCardIndexResponse } from '../interface/Response';


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
  private reqFailed:boolean=false;
  // private postCardCompts:any[];


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private postCardService:PostCardService,
  
  ) {

   }

  ngOnInit() {

  }
  ngAfterViewInit(){
    try{
      this.postCardsIndex=this.getpostCardIndex();
      this.postCards=this.getPostCard(this.postCardsIndex);
      this.lazyLoadPostCard(this.postCards);
    }catch(e){
      console.log(e.message);
      this.reqFailed=true;
    }

  }

  getpostCardIndex(){
    let req:Requester<void>={
      head:{
        uid:this.userCard.uid,
        type:"GetPostCardIndexList"
      },
    }
    let postCardsIndexRes:PostCardIndexResponse;
    this.postCardService.requestPostCardIndex(req)
      .subscribe(res =>postCardsIndexRes);
      return postCardsIndexRes.pid;
  }

  getPostCard(postCardsIndex:number[]):PostCard[]|null {
    let index_strat=this.counter*this.card_size;
    let index_end=this.counter*this.card_size+this.card_size;
    if(index_strat>postCardsIndex.length){
      throw new Error("postCards is empty");
    }else if(index_end>postCardsIndex.length){
      index_end=postCardsIndex.length;
    }
    let req:Requester<PostCardRequestParams>={
      head:{
        uid:this.userCard.uid,
        type:"GetPostCardList"
      },
      body:{
        pid:postCardsIndex.slice(index_strat,index_end),
      }
    }

    let postCards:PostCard[];
    this.postCardService.requestPostCard(req)
      .subscribe(_postCards=>{
        postCards=_postCards;
      });
      this.counter++;
      return postCards;
  }

  lazyLoadPostCard(postCards:PostCard[]):void{
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
    this.reqFailed=false;
    try{
      this.postCardsIndex=this.getpostCardIndex();
      this.postCards=this.getPostCard(this.postCardsIndex);
      this.postCardContainerViewContainerRef.clear();
      this.toggleInfiniteScroll();
      this.lazyLoadPostCard(this.postCards);
    }catch(err){
      this.reqFailed=true;
      event.target.complete();
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    this.isEnd!=this.isEnd;
  }

  loadData(event) {
    try{
      this.postCards=this.getPostCard(this.postCardsIndex);
      this.lazyLoadPostCard(this.postCards);
    }catch(err){
      this.toggleInfiniteScroll(); 
    }finally{
      event.target.complete();
    }
  }


}
