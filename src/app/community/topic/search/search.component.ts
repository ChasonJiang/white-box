import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PostCardDetailComponent } from 'src/app/common-component/post-card-detail/post-card-detail.component';
import { PostCardDetail } from 'src/app/interface/Post';
import { PostCardDetailRequestParams, PostSearchRequestParams, Requester, SearchRequestParams, } from 'src/app/interface/Request';
import { PostCardDetailIndexResponse, PostSearchResponse } from 'src/app/interface/Response';
import { UserCard } from 'src/app/interface/User';
import { SearchService } from 'src/app/services/search.service';
import { getCurrentUserCard } from 'src/app/util/util';
import { PostCardDetailService } from '../../../services/post-card-detail.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit{
  @Input() tid:number;
  @ViewChild("SearchResultContainer",{read: ViewContainerRef}) searchResultContainer:ViewContainerRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private searchContent:string = "";
  private searchResults:number[];
  // private postCardsDetail:PostCardDetail[];
  private userCard: UserCard=getCurrentUserCard();
  private counter: number = 0;
  private reqFailed: boolean =false;
  private card_size: number=10;
  private isEnd:boolean=false;

  constructor(
    private modalController: ModalController,
    private searchService: SearchService<PostCardDetailIndexResponse>,
    private PostCardDetailService:PostCardDetailService,
    private componentFactoryResolver: ComponentFactoryResolver,

  ) { }

  ngOnInit() {

  }
  
  ngAfterViewInit(){
  }

  goBack(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  renderCardList(data:{postCardsDetail:PostCardDetail,userCard:UserCard}[]){
    for (let item of data)
    {
      const ComponentFactory=this.componentFactoryResolver.resolveComponentFactory(PostCardDetailComponent);
      const ComponentRef=this.searchResultContainer.createComponent(ComponentFactory);
      ComponentRef.instance.postCardDetail=item.postCardsDetail;
      ComponentRef.instance.userCard=item.userCard;
    }
  }
  lazyLoad(searchResults:number[]):void{
    this.reqFailed=false;
    let index_strat=this.counter*this.card_size;
    let index_end=this.counter*this.card_size+this.card_size;
    if(index_strat>searchResults.length){
      throw new Error("searchResults is empty");
    }else if(index_end>searchResults.length){
      index_end=searchResults.length;
    }
    let req:Requester<PostCardDetailRequestParams>={
      head:{
        uid:this.userCard.uid,
        type:"GetPostCardDetailList"
      },
      body:{
        pid:searchResults.slice(index_strat,index_end),
      }
    }

    this.PostCardDetailService.requestPostCardDetail(req)
      .subscribe({next:res=>{
        // console.log("GetPostCardDetailList");
        // console.log(postCardDetailResponse.postCardsDetail);
        this.renderCardList(res.data);
        this.counter++;
      },
      error:() => {
        this.reqFailed=true;
      }
    });

  }
  searchSubmit(content: string){
    this.searchContent=content;
    this.reqFailed=false;
    let req:Requester<PostSearchRequestParams>={
      head:{
        uid:this.userCard.uid,
        type:'SearchPostCardDetail'
      },
      body:{
        tid:this.tid,
        content:this.searchContent
      }as PostSearchRequestParams
    }
    try{
      this.searchService.search(req)
        .subscribe({
          next:res =>{
          this.searchResults=res.pid;
          // console.log(postCardsIndexRes);
        },
        complete:()=>{
          this.counter=0;
          this.searchResultContainer.clear();
          // console.log("SearchPostCardDetail");
          // console.log(this.searchResults)
          this.lazyLoad(this.searchResults);
        },
        error:()=>{
          this.reqFailed=true;
          console.log("SearchPostCardDetail error");

        }
      });

    }catch(err){
      // console.log("do refresh");
      console.log(err.message);

    }finally{
      
    }

  }

  doRefresh(event) {
    this.searchSubmit(this.searchContent);
    event.target.complete();

  }
  

  loadData(event) {
    try{
      this.lazyLoad(this.searchResults);
    }catch(err){
      console.log(err.message);
      this.infiniteScroll.disabled = true;
      // this.reqFailed=true;
    }finally{
      event.target.complete();
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    this.isEnd!=this.isEnd;
  }

}
