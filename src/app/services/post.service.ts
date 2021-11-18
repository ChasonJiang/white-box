import { Injectable } from '@angular/core';
import { Post,PostRequestOptions } from '../interface/Post';
import { POST } from '../post'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  post:Post=POST;
  constructor() { }

  requestPost(postRequestOptions:PostRequestOptions):Post{
    console.log("request post...");
    return this.post;
  }
}
