import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { PostCard } from "../interface/Post";
=======
import { PostCard } from "../interface/PostCard";
>>>>>>> f8752b5f9aa4d3f92493c9e8ad49da90ac486d75

@Injectable({
  providedIn: 'root'
})
export class PostCardService {
  public postCards: PostCard[]=[
    {
      uid:"88888888",
      title:"Post Title",
<<<<<<< HEAD
      coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
      releaseTime:"2021-11-18",
      topic:"test domain",
=======
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
      releaseTime:"2021-11-18",
      communityDomain:"test domain",
>>>>>>> f8752b5f9aa4d3f92493c9e8ad49da90ac486d75
      numberOfComments:5,
  },
  {
    uid:"88888888",
    title:"Post Title",
<<<<<<< HEAD
    coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
    releaseTime:"2021-11-18",
    topic:"test domain",
=======
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
    releaseTime:"2021-11-18",
    communityDomain:"test domain",
>>>>>>> f8752b5f9aa4d3f92493c9e8ad49da90ac486d75
    numberOfComments:5,
},
{
  uid:"88888888",
  title:"Post Title",
<<<<<<< HEAD
  coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  topic:"test domain",
=======
  imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  communityDomain:"test domain",
>>>>>>> f8752b5f9aa4d3f92493c9e8ad49da90ac486d75
  numberOfComments:5,
},
{
  uid:"88888888",
  title:"Post Title",
<<<<<<< HEAD
  coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  topic:"test domain",
=======
  imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  communityDomain:"test domain",
>>>>>>> f8752b5f9aa4d3f92493c9e8ad49da90ac486d75
  numberOfComments:5,
},
{
  uid:"88888888",
  title:"Post Title",
<<<<<<< HEAD
  coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  topic:"test domain",
  numberOfComments:5,
},
{
  uid:"88888888",
  title:"Post Title",
  coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  topic:"test domain",
  numberOfComments:5,
},
{
uid:"88888888",
title:"Post Title",
coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
releaseTime:"2021-11-18",
topic:"test domain",
numberOfComments:5,
},
{
uid:"88888888",
title:"Post Title",
coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
releaseTime:"2021-11-18",
topic:"test domain",
numberOfComments:5,
},
{
  uid:"88888888",
  title:"Post Title",
  coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  topic:"test domain",
  numberOfComments:5,
},
{
uid:"88888888",
title:"Post Title",
coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
releaseTime:"2021-11-18",
topic:"test domain",
numberOfComments:5,
},
{
uid:"88888888",
title:"Post Title",
coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
releaseTime:"2021-11-18",
topic:"test domain",
numberOfComments:5,
},
=======
  imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
  releaseTime:"2021-11-18",
  communityDomain:"test domain",
  numberOfComments:5,
}
>>>>>>> f8752b5f9aa4d3f92493c9e8ad49da90ac486d75
  ];
  constructor() { }

  getPostCard(){
    return this.postCards
  }
}
