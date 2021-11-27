import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from "../../interface/Comment";
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { PostRequestOptions } from '../../interface/Requeste'
import { COMMENT } from '../../comment';
@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html',
  styleUrls: ['./comment-area.component.scss'],
})
export class CommentAreaComponent implements AfterViewInit,OnInit {

  @Input() pid?:number;
  @ViewChild("CommentsContainer",{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  comments?:Comment[];

  constructor(
    private commentService: CommentService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

  ngOnInit() {
    console.log("comment area is available");
    this.getComments();
  }

  getComments(){
    this.comments=this.commentService.requestComments();
  }
  ngAfterViewInit(){
    this.lazyLoad(COMMENT);
  }
  lazyLoad(comments:Comment[]){
    for (let comment of comments)
    {
      const ComponentFactory=this.componentFactoryResolver.resolveComponentFactory(CommentCardComponent);
      const ComponentRef=this.viewContainerRef.createComponent(ComponentFactory);
      ComponentRef.instance.comment=comment;
      ComponentRef.instance.userCardInfo=comment.userInfo;
    }
  }

}
