import { Injectable } from '@angular/core';
import { PostCard } from "../interface/Post";
import { POST_CARD } from "../postcard";

@Injectable({
  providedIn: 'root'
})
export class PostCardService {
  public postCards?: PostCard[]=POST_CARD;
  constructor() { }

  getPostCard(){
    return this.postCards
  }
}
