import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiUrl } from '../Config';
import { PostCardDetail } from '../interface/Post';
import { httpOptions, PostCardDetailIndexRequestParams, PostCardDetailRequestParams, PostSearchRequestParams, Requester } from '../interface/Request';
import { PostCardDetailIndexResponse, PostCardDetailResponse, PostSearchResponse } from '../interface/Response';

@Injectable({
  providedIn: 'root'
})
export class PostCardDetailService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  requestPostCardDetailIndex(req: Requester<PostCardDetailIndexRequestParams>):Observable<PostCardDetailIndexResponse> {
    return this.httpClient.post<PostCardDetailIndexResponse>(ApiUrl,req,httpOptions);

  }

  requestPostCardDetail(req:Requester<PostCardDetailRequestParams>):Observable<PostCardDetailResponse> {
    return this.httpClient.post<PostCardDetailResponse>(ApiUrl,req,httpOptions);
    // const postCards=of(POST_CARD);
    //  postCards;
  }

  // requestPostCardDetail(req:Requester<PostCardDetailRequestParams>):Observable<PostCardDetail[]> {
  //   const postCardsDetail=of([POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST]);
  //   return postCardsDetail;
  // }

  search(req: Requester<PostSearchRequestParams>):Observable<PostSearchResponse>{
    return this.httpClient.post<PostSearchResponse>(ApiUrl,req,httpOptions);
  }
}
