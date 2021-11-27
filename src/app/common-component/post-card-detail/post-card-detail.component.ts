import { Component, Input, OnInit } from '@angular/core';
import { PostCardDetail } from 'src/app/interface/Post';
import { UserCardInfo } from 'src/app/interface/User';

@Component({
  selector: 'app-post-card-detail',
  templateUrl: './post-card-detail.component.html',
  styleUrls: ['./post-card-detail.component.scss'],
})
export class PostCardDetailComponent implements OnInit {

  @Input() postCardDetail?:PostCardDetail
  constructor() { }

  ngOnInit() {}

}
