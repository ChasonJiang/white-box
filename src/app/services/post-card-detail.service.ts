import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostCardDetail } from '../interface/Post';
import { PostCardDetailRequestParams, Requester } from '../interface/Request';
import { POST } from '../post';
@Injectable({
  providedIn: 'root'
})
export class PostCardDetailService {

  constructor() { }

  requestPostCardDetail(req:Requester<PostCardDetailRequestParams>):Observable<PostCardDetail[]> {
    const postCardsDetail=of([POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST]);
    return postCardsDetail;
  }
}
