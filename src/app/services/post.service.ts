import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../interface/Post';
import { PostRequestOptions, RequestHeader } from '../interface/Requeste';
import { POST } from '../post'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor() { }

  requestPost(RH:RequestHeader<PostRequestOptions>):Observable<Post>{
    console.log("request post...");
    const post=of(POST);
    return post;
  }
}
