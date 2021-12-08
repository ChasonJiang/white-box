import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from "../../interface/Comment";
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { COMMENT } from '../../comment';
import { IonInfiniteScroll } from '@ionic/angular';
import { CommentCardIndexRequestParams, CommentCardRequestParams, Requester } from 'src/app/interface/Request';
import { getCurrentUserCard } from 'src/app/util/util';
@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html',
  styleUrls: ['./comment-area.component.scss'],
})
export class CommentAreaComponent implements AfterViewInit,OnInit {

  @Input() pid?:number;
  @ViewChild("CommentsContainer",{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  comments?:Comment[];
  private commentIndexList:number[];
  private reqFailed: boolean=false;
  private counter: number = 0;
  private card_size: number=10;
  private isEnd: boolean =false;

  constructor(
    private commentService: CommentService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

  ngOnInit() {
    console.log("comment area is available");
    // this.getComments();
  }

  // getComments(){
  //   this.comments=this.commentService.requestComments();
  // }
  ngAfterViewInit(){
    // this.renderCommentCard(COMMENT);
    this.getCommentIndex();
  }

  getCommentIndex(){
    let req:Requester<CommentCardIndexRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:'GetCommentIndexList'
      },
      body:{
        pid:this.pid,
      }
    };

    try{
      this.commentService.requestCommentIndex(req)
      .subscribe({
        next:res=>{
          this.commentIndexList=res.cid;
      },
      complete:()=>{
        console.log('GetCommentIndexList');
        this.lazyLoad(this.commentIndexList);
      },
      error:() => {
        console.log('GetCommentIndexList error')
        this.reqFailed=true;
      }
    })
    }catch(err) {
      console.log(err.message);
    }finally{

    }

  }

  lazyLoad(commentIndexList:number[]):void{
    this.reqFailed=false;
    let index_strat=this.counter*this.card_size;
    let index_end=this.counter*this.card_size+this.card_size;
    if(index_strat>commentIndexList.length){
      this.infiniteScroll.disabled = false;
      this.isEnd=false;
      throw new Error("commentIndexList is empty");
    }else if(index_end>commentIndexList.length){
      index_end=commentIndexList.length;
    }
    
    let req:Requester<CommentCardRequestParams>={
      head:{
        uid:getCurrentUserCard().uid,
        type:"GetCommentList"
      },
      body:{
        pid:this.pid,
        cid:commentIndexList.slice(index_strat,index_end),
      }as CommentCardRequestParams
    }

    this.commentService.requestComments(req)
      .subscribe({next:res=>{
        console.log("GetCommentList");
        // console.log(postCardDetailResponse.postCardsDetail);
        this.renderCardList(res.comments);
        this.counter++;
      },
      error:() => {
        this.reqFailed=true;
      }
    });

  }

  renderCardList(comments:Comment[]){
    for (let comment of comments)
    {
      const ComponentFactory=this.componentFactoryResolver.resolveComponentFactory(CommentCardComponent);
      const ComponentRef=this.viewContainerRef.createComponent(ComponentFactory);
      ComponentRef.instance.comment=comment;
    }
  }
  loadComments(event){
    this.lazyLoad(this.commentIndexList);
    console.log("loading comments");
    event.target.complete();

  }

}
