import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Requester, SearchRequestParams, TopicCardRequestParams, } from 'src/app/interface/Request';
import { TopicCardIndexResponse } from 'src/app/interface/Response';
import { TopicCard } from 'src/app/interface/Topic';
import { SearchService } from 'src/app/services/search.service';
import { TopicCardService } from 'src/app/services/topic-card.service';
import { getCurrentUserCard } from 'src/app/util/util';
import { CommunityCardComponent } from './community-card/community-card.component';

@Component({
  selector: 'app-community-area',
  templateUrl: './community-area.component.html',
  styleUrls: ['./community-area.component.scss'],
})
export class CommunityAreaComponent implements OnInit, AfterViewInit {
  @ViewChild('TopicCardContainer',{read: ViewContainerRef}) TopicCardContainer:ViewContainerRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private topicCards: TopicCard[];
  private topicCardIndexList: number[];

  @Input() tid: number;
  private reqFailed: boolean=false;
  private counter: number = 0;
  private card_size: number=10;
  private isEnd: boolean =false;
  
  constructor(
    private topicCardService: TopicCardService,
    private searchService: SearchService<TopicCardIndexResponse>,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    try{
      // this.toggleInfiniteScroll();
      this.refresh();
    }catch(e){
      this.reqFailed=true;
      console.log(e);
    }
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
        this.renderCardList(res.topicCards);
        this.counter++;
      },
      error:() => {
        this.reqFailed=true;
      }
    });

  }


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
          this.TopicCardContainer.clear();

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
      const ComponentRef=this.TopicCardContainer.createComponent(ComponentFactory);
      ComponentRef.instance.topicCard=topicCard;
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
          this.TopicCardContainer.clear();

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
      this.refresh();
      this.infiniteScroll.disabled = false;
      this.isEnd=false;
      
      event.target.complete();
    }



}
