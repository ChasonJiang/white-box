import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { PostCardDetail } from 'src/app/interface/Post';
import { PostCardDetailComponent } from '../post-card-detail/post-card-detail.component';
import { PostCardDetailService } from '../../services/post-card-detail.service';
import { UserCard } from 'src/app/interface/User';
import { getCurrentUserCard } from 'src/app/util/util';
import { PostCardDetailIndexRequestParams, PostCardDetailRequestParams, Requester } from 'src/app/interface/Request';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-post-card-detail-area',
  templateUrl: './post-card-detail-area.component.html',
  styleUrls: ['./post-card-detail-area.component.scss'],
})
export class PostCardDetailAreaComponent implements OnInit,AfterViewInit {

  @ViewChild("Container",{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  @Input() tid:number;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) ionRefresher:IonRefresher;
  postCardsDetail:PostCardDetail[];
  private postCardsDetailIndexList:string[];
  private userCard: UserCard=getCurrentUserCard();
  private reqFailed: boolean=false;
  private counter: number = 0;
  private card_size: number=10;
  private isEnd: boolean =false;
  private lazyLoadLock:boolean=false;
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private PostCardDetailService: PostCardDetailService
  ) { }

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


  lazyLoad(postCardsDetailIndex:string[]):void{
    this.lazyLoadLock=true;
    this.reqFailed=false;
    let index_strat=this.counter*this.card_size;
    let index_end=this.counter*this.card_size+this.card_size;
    console.log("start:"+index_strat+",end:"+index_end+",length:"+postCardsDetailIndex.length);
    if(index_strat>=postCardsDetailIndex.length){
      this.lazyLoadLock=false;
      throw new Error("postCardsDetailIndex is empty");
    }else if(index_end>=postCardsDetailIndex.length){
      index_end=postCardsDetailIndex.length;
    }
    let req:Requester<PostCardDetailRequestParams>={
      head:{
        uid:this.userCard.uid,
        type:"GetPostCardDetailList"
      },
      body:{
        pid:postCardsDetailIndex.slice(index_strat,index_end),
      }
    }

    this.PostCardDetailService.requestPostCardDetail(req)
      .subscribe({next:res=>{
        console.log("GetPostCardDetailList");
        // console.log(postCardDetailResponse.postCardsDetail);
        this.renderCardList(res.data);
        this.counter++;
      },
      complete:() => {
        this.lazyLoadLock=false;
        this.infiniteScroll.complete();
      },
      error:() => {
        this.infiniteScroll.complete();
        this.lazyLoadLock=false;
        this.reqFailed=true;
      }
    });

  }

  renderCardList(data:{postCardsDetail:PostCardDetail,userCard:UserCard}[]):void{
    for (let item of data)
    {
      const postCardComponentFactory=this.componentFactoryResolver
        .resolveComponentFactory(PostCardDetailComponent);
      const postCardComponentRef=this.viewContainerRef.createComponent(postCardComponentFactory);
      postCardComponentRef.instance.postCardDetail=item.postCardsDetail;
      postCardComponentRef.instance.userCard=item.userCard;
    }
  }

  refresh(){
    this.reqFailed=false;
    let req:Requester<PostCardDetailIndexRequestParams>={
      head:{
        uid:this.userCard.uid,
        type:"GetPostCardDetailIndexList"
      },
      body:{
        tid:this.tid,
      } as PostCardDetailIndexRequestParams,
    }

    try{
      this.PostCardDetailService.requestPostCardDetailIndex(req)
        .subscribe({
          next:res =>{
            if(res.success){
              console.log("GetPostCardsDetailIndexList");
              this.postCardsDetailIndexList=res.pid;
              this.counter=0;
              this.viewContainerRef.clear();
    
              this.lazyLoad(this.postCardsDetailIndexList);
            }else{
              console.log(res.message);
            }
          // console.log(postCardsIndexRes);
        },
        complete:()=>{
          this.ionRefresher.complete();
          
        },
        error:()=>{
          this.ionRefresher.complete();
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

  }


  loadData(event) {
    try{
      if(!this.lazyLoadLock){
        this.lazyLoad(this.postCardsDetailIndexList);
      }else{
        console.log("lazyLoad is locked");
      }

    }catch(err){
      console.log(err.message);
      this.infiniteScroll.disabled = true;
      // this.reqFailed=true;
    }finally{
      
    }
  }

}
