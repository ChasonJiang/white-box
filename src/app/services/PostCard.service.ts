import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostCard } from "../interface/Post";
import { POST_CARD } from "../postcard";
import { PostCardRequestOptions, RequestHeader } from '../interface/Requeste'
@Injectable({
  providedIn: 'root'
})
export class PostCardService {
  constructor() { }

  requestPostCard(RH:RequestHeader<void>):Observable<PostCard[]> {
    const postCards=of(POST_CARD);
    return postCards;
  }
}
