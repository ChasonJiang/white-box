import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PostCard } from "../interface/Post"
import { PostCardService } from 'src/app/services/PostCard.service';

import { PostCardComponent } from '../common-component/post-card/post-card.component';
import { getCurrentUserCard } from '../util/util';
import { PostCardRequestParams, Requester } from '../interface/Request';
import { UserCard } from '../interface/User';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';
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
  @ViewChild(IonRefresher) ionRefresher:IonRefresher;
  // private postCards?: PostCard[];
  private postCardsIndexList:string[];
  private userCard: UserCard=getCurrentUserCard();
  private card_size:number=15;
  private counter:number=0;
  private isEnd:boolean=false;
  private reqFailed:boolean=false;
  private lazyLoadLock:boolean=false;
  private refreshLock:boolean=false;
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
      // this.toggleInfiniteScroll();
      this.refresh();
    }catch(e){
      this.reqFailed=true;
      console.log(e);
    }
    

  }


  lazyLoad(postCardsIndex:string[]):void{
    this.lazyLoadLock=true;
    this.reqFailed=false;
    let index_strat=this.counter*this.card_size;
    let index_end=this.counter*this.card_size+this.card_size;
    console.log("start:"+index_strat+",end:"+index_end+",length:"+postCardsIndex.length);
    if(index_strat>=postCardsIndex.length){
      this.lazyLoadLock=false;
      throw new Error("postCards is empty");
    }else if(index_end>=postCardsIndex.length){
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

    this.postCardService.requestPostCard(req)
      .subscribe({next:postCardResponse=>{
        console.log("GetPostCardList");
        // console.log(postCardResponse.postCards);
        this.renderPostCardList(postCardResponse.postCards);
        this.counter++;
      },
      complete:()=>{
        this.infiniteScroll.complete();
        this.lazyLoadLock=false;
      },
      error:() => {
        this.infiniteScroll.complete();
        this.lazyLoadLock=false;
        this.reqFailed=true;
      }
    });

  }

  renderPostCardList(postCards:PostCard[]):void{
    for (let postCard of postCards)
    {
      const postCardComponentFactory=this.componentFactoryResolver
        .resolveComponentFactory(PostCardComponent);
      const postCardComponentRef=this.postCardContainerViewContainerRef.createComponent(postCardComponentFactory);
      postCardComponentRef.instance.postCard=postCard;
    }
  }

  refresh(){
    this.refreshLock=true;
    this.reqFailed=false;
    let req:Requester<void>={
      head:{
        uid:this.userCard.uid,
        type:"GetPostCardIndexList"
      },
    }

    try{
      console.log("GetPostCardIndexList");
      let isError:boolean = false;
      this.postCardService.requestPostCardIndex(req)
        .subscribe({
          next:res =>{
            if(res.success){
              console.log("GetPostCardIndexList");
              this.postCardsIndexList=res.pid;
              this.counter=0;
              this.postCardContainerViewContainerRef.clear();
    
              this.lazyLoad(this.postCardsIndexList);
            }else{
              console.log(res.message);
            }
          // console.log(res);
        },
        complete:()=>{
          this.ionRefresher.complete();
          this.refreshLock=false;
        },
        error:()=>{
          this.ionRefresher.complete();
          this.refreshLock=false;
          this.reqFailed=true;
        }
      });

    }catch(err){
      console.log("do refresh");
      // console.log(err.message);

    }finally{
      
    }
  }

  doRefresh(event) {
    if(!this.refreshLock){
      this.refresh();
    }else{
      console.log("refresh id locked");
    }

    this.infiniteScroll.disabled = false;
    this.isEnd=false;
    
    // event.target.complete();

  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    this.isEnd!=this.isEnd;
  }

  loadPostCard(event) {
    
    try{
      if(!this.lazyLoadLock){
        this.lazyLoad(this.postCardsIndexList);
      }else{
        console.log("lazyLoad is locked");
      }
    }catch(err){
      console.log(err.message);
      this.infiniteScroll.disabled = true;
      // this.reqFailed=true;
    }finally{
      // event.target.complete();
    }
  }


}
