import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiUrl } from '../Config';
import { Post } from '../interface/Post';
import { httpOptions, PostRequestParams, Requester } from '../interface/Request';
import { PostResponse } from '../interface/Response';
import { POST } from '../post'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(
    private httpClient:HttpClient,
  ) { }

  requestPost(req:Requester<PostRequestParams>):Observable<PostResponse>{
    return this.httpClient.post<PostResponse>(ApiUrl,req,httpOptions);

  }
}
