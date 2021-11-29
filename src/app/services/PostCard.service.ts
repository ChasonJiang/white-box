import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostCard } from "../interface/Post";
import { POST_CARD } from "../postcard";
import { Requester } from '../interface/Request'
@Injectable({
  providedIn: 'root'
})
export class PostCardService {
  constructor() { }

  requestPostCard(req:Requester<void>):Observable<PostCard[]> {
    const postCards=of(POST_CARD);
    return postCards;
  }
}
