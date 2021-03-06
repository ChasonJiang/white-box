import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { CommunityCardComponent } from 'src/app/community/community-area/community-card/community-card.component';
import { Requester, SearchRequestParams, TopicCardRequestParams, } from 'src/app/interface/Request';
import { TopicCardIndexResponse } from 'src/app/interface/Response';
import { Topic, TopicCard } from 'src/app/interface/Topic';
import { SearchService } from 'src/app/services/search.service';
import { TopicCardService } from 'src/app/services/topic-card.service';
import { getCurrentUserCard } from 'src/app/util/util';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
})
export class TopicListComponent implements OnInit, AfterViewInit{
  @Output() topic:Topic=null;
  @ViewChild("SearchResultContainer",{read: ViewContainerRef}) searchResultContainer:ViewContainerRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private topicCards: TopicCard[];
  private reqFailed: boolean=false;
  private counter: number = 0;
  private card_size: number=10;
  private isEnd: boolean =false;
  // private topicCards: TopicCard[];
  private topicCardIndexList: number[];

  private searchResults:number[];

  constructor(
    private modalController: ModalController,
    private searchService: SearchService<TopicCardIndexResponse>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private topicCardService: TopicCardService,


  ) { }




  ngOnInit() {
    // this.getpostCardDetail();

  }
  
  ngAfterViewInit() {
    try{
      // this.toggleInfiniteScroll();
      this.refresh();
    }catch(e){
      this.reqFailed=true;
      console.log(e);
    }
    // this.lazyLoad(this.topicCardIndexList);
  }

  goBack(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }



  lazyLoad(topicCardIndexList:number[]):void{
    this.reqFailed=false;
    let index_strat=this.counter*this.card_size;
    let index_end=this.counter*this.card_size+this.card_size;
    if(index_strat>topicCardIndexList.length){
      throw new Error("topicCardIndexList is empty");
    }else if(index_end>topicCardIndexList.length){
      index_end=topicCardIndexList.length;
    }
    let req:Requester<TopicCardRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:"GetTopicCardList"
      },
      body:{
        tid:topicCardIndexList.slice(index_strat,index_end),
      }
    }

    this.topicCardService.requestTopicCard(req)
      .subscribe({next:res=>{
        console.log("GetTopicCardList");
        // console.log(res);
        // for(let i of postCards.pid){
        //   console.log(i);
        // }

        this.renderCardList(res.topicCards);
        this.counter++;
      },
      error:() => {
        this.reqFailed=true;
      }
    });

  }
  // getTopicCard() { 
  //   this.topicCardService.requestTopicCard().subscribe(topicCards=>this.topicCards=topicCards);
  //   return this.topicCards;
  // }

  // searchSubmit(searchContent:string){
  //   this.TopicCardContainer.clear();
  //   console.log(searchContent);
  // }

  searchSubmit(content: string){
    this.reqFailed=false;
    let req:Requester<SearchRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:'SearchTopicCardList'
      },
      body:{
        content:content
      }as SearchRequestParams
    }
    try{
      this.searchService.search(req)
        .subscribe({
          next:res =>{
          console.log("SearchTopicCardList");
          this.topicCardIndexList=res.tid;
          // console.log(postCardsIndexRes);
        },
        complete:()=>{
          this.counter=0;
          this.searchResultContainer.clear();

          this.lazyLoad(this.topicCardIndexList);
        },
        error:()=>{
          this.reqFailed=true;
        }
      });

    }catch(err){
      // console.log("do refresh");
      console.log(err.message);

    }finally{
      
    }

  }

  renderCardList(topicCards:TopicCard[]){
    for (let topicCard of topicCards)
    {
      const ComponentFactory=this.componentFactoryResolver.resolveComponentFactory(CommunityCardComponent);
      const ComponentRef=this.searchResultContainer.createComponent(ComponentFactory);
      ComponentRef.instance.topicCard=topicCard;
      ComponentRef.instance.showMode=true;
    }
  }

  loadData(event) {
    try{
      this.lazyLoad(this.topicCardIndexList);

    }catch(err){
      console.log(err.message);
      this.infiniteScroll.disabled = true;
    }finally{
      event.target.complete();
    }
  }

  refresh(){
    this.reqFailed=false;
    let req:Requester<void>={
      head:{
        uid:getCurrentUserCard().uid,
        type:"GetTopicCardIndexList"
      },

    }

    try{
      this.topicCardService.requestTopicCardIndexList(req)
        .subscribe({
          next:res =>{
          console.log("GetTopicCardIndexList");
          this.topicCardIndexList=res.tid;
          // console.log(postCardsIndexRes);
        },
        complete:()=>{
          this.counter=0;
          this.searchResultContainer.clear();

          this.lazyLoad(this.topicCardIndexList);
        },
        error:()=>{
          this.reqFailed=true;
        }
      });

    }catch(err){
      // console.log("do refresh");
      console.log(err.message);

    }finally{
      
    }
  }

  doRefresh(event) {
      // console.log('Async operation has ended');
      // this.TopicCardContainer.clear();
      // this.lazyLoad(this.topicCardIndexlist);
      // event.target.complete();

      this.refresh();
      this.infiniteScroll.disabled = false;
      this.isEnd=false;
      
      event.target.complete();
    }

  searchChange(){

  }
}

