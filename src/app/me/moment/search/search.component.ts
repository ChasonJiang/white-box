import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PostCardDetailComponent } from 'src/app/common-component/post-card-detail/post-card-detail.component';
import { PostCardDetail } from 'src/app/interface/Post';
import { MomentRequestParams, PostCardDetailRequestParams, PostSearchRequestParams, Requester, SearchRequestParams, } from 'src/app/interface/Request';
import { PostCardDetailIndexResponse, PostSearchResponse } from 'src/app/interface/Response';
import { UserCard, UserInfo } from 'src/app/interface/User';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { getCurrentUserCard } from 'src/app/util/util';
import { PostCardDetailService } from '../../../services/post-card-detail.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit{
  @Input() uid:string;
  @ViewChild("SearchResultContainer",{read: ViewContainerRef}) searchResultContainer:ViewContainerRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private searchContent:string = "";
  private searchResults:string[];
  // private postCardsDetail:PostCardDetail[];
  private userCard: UserCard;
  private counter: number = 0;
  private reqFailed: boolean =false;
  private card_size: number=10;
  private isEnd:boolean=false;
  private searchLock:boolean = false;
  private lazyLoadLock:boolean = false;
  @Input() userInfo: UserInfo;

  constructor(
    private modalController: ModalController,
    private searchService: SearchService<PostCardDetailIndexResponse>,
    private PostCardDetailService:PostCardDetailService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private userService: UserService,

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

  renderCardList(userCard:UserCard,postCardsDetail:PostCardDetail[]){
    for (let item of postCardsDetail)
    {
      const ComponentFactory=this.componentFactoryResolver.resolveComponentFactory(PostCardDetailComponent);
      const ComponentRef=this.searchResultContainer.createComponent(ComponentFactory);
      ComponentRef.instance.postCardDetail=item;
      ComponentRef.instance.userCard=userCard;
    }
  }

  lazyLoad(pids:string[]):void{
    if(this.lazyLoadLock){
      console.log("lazyLoad is locked");
      return;
    }
    this.lazyLoadLock=true;
    this.reqFailed=false;
    let index_strat=this.counter*this.card_size;
    let index_end=this.counter*this.card_size+this.card_size;
    console.log("start:"+index_strat+",end:"+index_end+",length:"+pids.length);
    if(index_strat>=pids.length){
      this.lazyLoadLock=false;
      throw new Error("momentsIndexList is empty");
    }else if(index_end>=pids.length){
      index_end=pids.length;
    }
    let req:Requester<MomentRequestParams>={
      head:{
        // uid:this.userCard.uid,
        type:"GetMoments"
      },
      body:{
        uid:this.uid,
        pid:pids.slice(index_strat,index_end),
      }
    }
    console.log(req)
    this.userService.requestMoments(req)
      .subscribe({next:res=>{
        console.log("Search GetMoments");
        // console.log(postCardDetailResponse.postCardsDetail);
        this.userInfo = res.userInfo;
        // console.log(res)
        this.renderCardList(res.userInfo,res.postCardsDetail);
        this.counter++;
      },
      complete:() => {
        this.lazyLoadLock=false;
        this.infiniteScroll.complete();
        // console.log("12");
      },
      error:() => {
        this.infiniteScroll.complete();
        this.lazyLoadLock=false;
        this.reqFailed=true;
        // console.log("11");
      }
    });

  }
  searchSubmit(content: string){

    this.search(content);

  }

  search(content: string){
    if(this.searchLock){
      console.log("SearchPostCardDetail is locked");
      return;
    }
    this.searchLock=true;
    this.searchContent=content;
    this.reqFailed=false;
    let req:Requester<PostSearchRequestParams>={
      head:{
        uid:this.uid,
        type:'SearchPostCardDetail'
      },
      body:{
        content:this.searchContent
      }as PostSearchRequestParams
    }
    try{
      this.searchService.search(req)
        .subscribe({
          next:res =>{
            if(res.success){
              console.log("SearchPostCardDetail");
              this.searchResults=res.pid;
              this.counter=0;
              this.searchResultContainer.clear();
              this.lazyLoad(this.searchResults);
            }else{
              console.log(res.message);
            }

          // console.log(postCardsIndexRes);
        },
        complete:()=>{
          this.searchLock=false;
        },
        error:()=>{
          this.searchLock=false;
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
