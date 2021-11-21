import { Component, Input, OnInit } from '@angular/core';
import { PostRequestOptions } from 'src/app/interface/Post';
import { Comment } from "../../interface/Comment";
@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() comment?:Comment;
  @Input() postRequestOptions?:PostRequestOptions;
  constructor() { }

  ngOnInit() {}

}
