import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-footer',
  templateUrl: './comment-footer.component.html',
  styleUrls: ['./comment-footer.component.scss'],
})
export class CommentFooterComponent implements OnInit {

  @Input() numberOfComments?: number;

  enableBackdropDismiss = false;
  showBackdrop = false;
  shouldPropagate = false;
  showCommentBox= false;

  constructor() { }

  ngOnInit() {}

  openCommentBox(){
    // this.enableBackdropDismiss=!this.enableBackdropDismiss;
    this.showBackdrop=!this.showBackdrop;
    this.showCommentBox=!this.showCommentBox;

  }
  closeCommentBox(){
    console.log('closing comment box')
    this.showCommentBox=!this.showCommentBox;
    this.showBackdrop=!this.showBackdrop;
  }

}
