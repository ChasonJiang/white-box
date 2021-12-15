import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { PostCardDetail } from 'src/app/interface/Post';
import { PostCardDetailComponent } from '../post-card-detail/post-card-detail.component';
import { PostCardDetailService } from '../../services/post-card-detail.service';
import { UserCard } from 'src/app/interface/User';
import { getCurrentUserCard } from 'src/app/util/util';
import { PostCardDetailIndexRequestParams, PostCardDetailRequestParams, Requester } from 'src/app/interface/Request';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-post-card-detail-area',
  templateUrl: './post-card-detail-area.component.html',
  styleUrls: ['./post-card-detail-area.component.scss'],
})
export class PostCardDetailAreaComponent implements OnInit,AfterViewInit {

  @ViewChild("Container",{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  @Input() tid:number;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  postCardsDetail:PostCardDetail[];
  private postCardsDetailIndexList:number[];
  private userCard: UserCard=getCurrentUserCard();
  private reqFailed: boolean=false;
  private counter: number = 0;
  private card_size: number=10;
  private isEnd: boolean =false;

  
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


  lazyLoad(postCardsDetailIndex:number[]):void{
    this.reqFailed=false;
    let index_strat=this.counter*this.card_size;
    let index_end=this.counter*this.card_size+this.card_size;
    if(index_strat>postCardsDetailIndex.length){
      throw new Error("postCardsDetailIndex is empty");
    }else if(index_end>postCardsDetailIndex.length){
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
      .subscribe({next:postCardDetailResponse=>{
        console.log("GetPostCardDetailList");
        // console.log(postCardDetailResponse.postCardsDetail);
        this.renderCardList(postCardDetailResponse.postCardsDetail);
        this.counter++;
      },
      error:() => {
        this.reqFailed=true;
      }
    });

  }

  renderCardList(postCardsDetail:PostCardDetail[]):void{
    for (let postCardDetail of postCardsDetail)
    {
      const postCardComponentFactory=this.componentFactoryResolver
        .resolveComponentFactory(PostCardDetailComponent);
      const postCardComponentRef=this.viewContainerRef.createComponent(postCardComponentFactory);
      postCardComponentRef.instance.postCardDetail=postCardDetail;
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
          console.log("GetPostCardsDetailIndexList");
          this.postCardsDetailIndexList=res.pid;
          // console.log(postCardsIndexRes);
        },
        complete:()=>{
          this.counter=0;
          this.viewContainerRef.clear();

          this.lazyLoad(this.postCardsDetailIndexList);
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


  loadData(event) {
    try{
      this.lazyLoad(this.postCardsDetailIndexList);
    }catch(err){
      console.log(err.message);
      this.infiniteScroll.disabled = true;
      // this.reqFailed=true;
    }finally{
      event.target.complete();
    }
  }

}
