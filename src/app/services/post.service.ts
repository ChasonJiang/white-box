import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../interface/Post';
import { PostRequestParams, Requester } from '../interface/Request';
import { POST } from '../post'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor() { }

  requestPost(req:Requester<PostRequestParams>):Observable<Post>{
    console.log("request post...");
    const post=of(POST);
    return post;
  }
}
