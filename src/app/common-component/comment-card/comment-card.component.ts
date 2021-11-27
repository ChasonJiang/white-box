import { Component, Input, OnInit } from '@angular/core';
import { PostRequestOptions } from 'src/app/interface/Requeste';
import { UserCardInfo } from 'src/app/interface/User';
import { Comment } from "../../interface/Comment";
@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() comment?:Comment;
  @Input() userCardInfo?:UserCardInfo;
  constructor() { }

  ngOnInit() {}
  

}
