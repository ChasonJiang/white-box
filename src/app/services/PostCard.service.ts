import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostCard } from "../interface/Post";
import { POST_CARD } from "../postcard";
import { httpOptions, PostCardRequestParams, Requester } from '../interface/Request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrl } from '../Config';
import { PostCardIndexResponse } from '../interface/Response';

@Injectable({
  providedIn: 'root'
})
export class PostCardService {
  constructor(
    private httpClient:HttpClient,
    ) { }

  requestPostCardIndex(req: Requester<void>):Observable<PostCardIndexResponse> {
    return this.httpClient.post<PostCardIndexResponse>(ApiUrl,req,httpOptions);

  }

  requestPostCard(req:Requester<PostCardRequestParams>):Observable<PostCard[]> {
    return this.httpClient.post<PostCard[]>(ApiUrl,req,httpOptions);
    // const postCards=of(POST_CARD);
    //  postCards;
  }
}
