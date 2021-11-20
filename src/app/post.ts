import { Post } from './interface/Post'

const CONTENT:string=`<ion-text>The refresher provides pull-to-refresh functionality on a content component. The pull-to-refresh pattern lets a user pull down on a list of data using touch in order to retrieve more data.</ion-text>
<ion-text>Data should be modified during the refresher's output events. Once the async operation has completed and the refreshing should end, call complete() on the refresher.</ion-text>
<ion-title>Native Refreshers</ion-title>
<ion-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU"></ion-img>
<ion-text>Both iOS and Android platforms provide refreshers that take advantage of properties exposed by their respective devices that give pull to refresh a fluid, native-like feel.</ion-text>`;
export const POST:Post={
    uid:88888888,
    title:"Post Title",
    coverUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHlJW3iX0eSx0YEsPnrToEC7iKW4m3TEgiQ&usqp=CAU",
    releaseTime:"2021-11-18",
    topic:"test domain",
    numberOfComments:5,
    numberOfApproval:99,
    content:CONTENT
};