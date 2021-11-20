import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from "../../interface/Comment";
import { PostRequestOptions } from '../../interface/Post'

@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html',
  styleUrls: ['./comment-area.component.scss'],
})
export class CommentAreaComponent implements OnInit {

  @Input() postRequestOptions?:PostRequestOptions;

  comments?:Comment[];

  constructor(
    private commentService: CommentService,
    ) { }

  ngOnInit() {
    console.log("comment area is available");
    this.getComments();
  }

  getComments(){
    this.comments=this.commentService.requestComments();
  }

}
