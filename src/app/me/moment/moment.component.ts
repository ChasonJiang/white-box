import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { PostCardDetail } from 'src/app/interface/Post';
import { PostCardDetailComponent } from '../../common-component/post-card-detail/post-card-detail.component';
import { PostCardDetailService } from '../../services/post-card-detail.service';
import { UserCard, UserInfo } from 'src/app/interface/User';
import { getCurrentUserCard } from 'src/app/util/util';
import { MomentIndexRequestParams, MomentRequestParams, PostCardDetailIndexRequestParams, PostCardDetailRequestParams, Requester } from 'src/app/interface/Request';
import { IonInfiniteScroll, IonRefresher, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent implements OnInit {

  @ViewChild("Container",{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  @Input() uid:string;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) ionRefresher:IonRefresher;
  postCardsDetail:PostCardDetail[];
  private momentsIndexList:string[];
  @Input() userInfo: UserInfo;
  private reqFailed: boolean=false;
  private counter: number = 0;
  private card_size: number=10;
  private isEnd: boolean =false;
  private lazyLoadLock:boolean=false;
  
  constructor(
    public modalController:ModalController,
    private componentFactoryResolver: ComponentFactoryResolver,
    private userService: UserService
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

  goBack() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  lazyLoad(pids:string[]):void{
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

    this.userService.requestMoments(req)
      .subscribe({next:res=>{
        console.log("GetMoments");
        // console.log(postCardDetailResponse.postCardsDetail);
        this.userInfo = res.userInfo;
        this.renderCardList(res.userInfo,res.postCardsDetail);
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

  renderCardList(userInfo:UserInfo,postCardsDetail:PostCardDetail[]):void{
    for (let item of postCardsDetail)
    {
      const postCardComponentFactory=this.componentFactoryResolver
        .resolveComponentFactory(PostCardDetailComponent);
      const postCardComponentRef=this.viewContainerRef.createComponent(postCardComponentFactory);
      postCardComponentRef.instance.postCardDetail=item;
      postCardComponentRef.instance.userCard=userInfo;
    }
  }

  refresh(){
    this.reqFailed=false;
    let req:Requester<MomentIndexRequestParams>={
      head:{
        uid:this.uid,
        type:"GetMomentIndexList"
      },
      body:{
        uid:this.uid,
      } as MomentIndexRequestParams,
    };

    try{
      this.userService.requestMomentIndexList(req)
        .subscribe({
          next:res =>{
            if(res.success){
              console.log("GetMomentIndexList");
              this.momentsIndexList=res.pid;
              this.counter=0;
              this.viewContainerRef.clear();
              // console.log(res.pid);
              this.lazyLoad(this.momentsIndexList);
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
        this.lazyLoad(this.momentsIndexList);
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
