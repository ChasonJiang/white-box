import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostCard } from "../interface/Post";
import { POST_CARD } from "../postcard";
import { PostCardRequestParams, Requester } from '../interface/Request';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../ServerConfig';

@Injectable({
  providedIn: 'root'
})
export class PostCardService {
  constructor(
    private httpClient:HttpClient,
    ) { }

  requestPostCardIndex(req: Requester<void>):Observable<number[]> {
    return this.httpClient.post<number[]>(ApiUrl,req);

  }

  requestPostCard(req:Requester<PostCardRequestParams>):Observable<PostCard[]> {
    return this.httpClient.post<PostCard[]>(ApiUrl,req);
    // const postCards=of(POST_CARD);
    //  postCards;
  }
}
