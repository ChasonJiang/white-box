import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostCardDetail } from '../interface/Post';
import { PostCardDetailRequestOptions, RequestHeader } from '../interface/Requeste';
import { POST } from '../post';
@Injectable({
  providedIn: 'root'
})
export class PostCardDetailService {

  constructor() { }

  requestPostCardDetail(RH:RequestHeader<PostCardDetailRequestOptions>):Observable<PostCardDetail[]> {
    const postCardsDetail=of([POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST]);
    return postCardsDetail;
  }
}
