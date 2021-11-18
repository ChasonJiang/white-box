import { Injectable } from '@angular/core';
import { PostCard } from "../interface/PostCard";

@Injectable({
  providedIn: 'root'
})
export class PostCardService {
  public postCards: PostCard[]=[
    {
      uid:"88888888",
      title:"Post Title",
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
      releaseTime:"2021-11-18",
      communityDomain:"test domain",
      numberOfComments:5,
  },
  {
    uid:"88888888",
    title:"Post Title",
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
    releaseTime:"2021-11-18",
    communityDomain:"test domain",
    numberOfComments:5,
},
{
  uid:"88888888",
  title:"Post Title",
  imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  communityDomain:"test domain",
  numberOfComments:5,
},
{
  uid:"88888888",
  title:"Post Title",
  imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  communityDomain:"test domain",
  numberOfComments:5,
},
{
  uid:"88888888",
  title:"Post Title",
  imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  communityDomain:"test domain",
  numberOfComments:5,
}
  ];
  constructor() { }

  getPostCard(){
    return this.postCards
  }
}
