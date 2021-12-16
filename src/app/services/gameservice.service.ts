import { Injectable } from '@angular/core';
import { simpleGame, detailedGame, storeShowImg } from '../store/gamelist';
import { simplegame, detailedgame } from '../store/game';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { adddetailedgameRequestParams, buygameRequestParams, getdetailedgameRequestParams, httpOptions, Requester, searchSimpleGameRequestParams, SimpleGameRequestParams } from '../interface/Request';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../Config';
import { addresultResponse, buygameresultResponse, getdetailedgameResponse, searchsimplegamelistResponse, simplegamelistResponse, storeShowImgResponse } from '../interface/Response';


@Injectable({
  providedIn: 'root'
})
export class GameserviceService {

  constructor(private httpClient: HttpClient,) { }
  




  getdetailedgame(req: Requester<getdetailedgameRequestParams>): Observable<getdetailedgameResponse> {
    return this.httpClient.post<getdetailedgameResponse>(ApiUrl, req, httpOptions)
  }


  

  
  getstoreShowImg(req: Requester<null>): Observable<storeShowImgResponse> {
    return this.httpClient.post<storeShowImgResponse>(ApiUrl, req, httpOptions)

  }



  // getsearchsimplegamelist(req:Requester<void>): simplegame[]{
  //   let simpleGamelist:simplegame[];
  //       of(simpleGame).subscribe(_SimpleGamelist=>{
  //       simpleGamelist=_SimpleGamelist;
  //     })
  //     return simpleGamelist;
  //   }
  getsearchsimplegamelist(req: Requester<searchSimpleGameRequestParams>): Observable<searchsimplegamelistResponse> {

    return this.httpClient.post<searchsimplegamelistResponse>(ApiUrl, req, httpOptions)

  }

  getsimplegamelist(req: Requester<SimpleGameRequestParams>): Observable<simplegamelistResponse> {

    return this.httpClient.post<simplegamelistResponse>(ApiUrl, req, httpOptions)

  }


  addgame(req: Requester<adddetailedgameRequestParams>): Observable<addresultResponse> {

    return this.httpClient.post<addresultResponse>(ApiUrl, req, httpOptions)

  }
  updategame(req: Requester<adddetailedgameRequestParams>): Observable<addresultResponse> {

    return this.httpClient.post<addresultResponse>(ApiUrl, req, httpOptions)

  }

  buygame(req: Requester<buygameRequestParams>): Observable<buygameresultResponse> {

    return this.httpClient.post<buygameresultResponse>(ApiUrl, req, httpOptions)

  }


  initdetailedgame(): detailedgame {
    return {
      gid: null,
      gameName: null,
      imgUrl: null,
      imgshow: [],
      gameLable: [],
      Minimumprice: null,
      nowPrice: null,
      oldPrice: null,
      Minimum: null,
      gameType: [],
      score: null,
      onlineNumber: null,
      favorableRate: null,
      OnlineMaxYesterday: null,
      averageOlnine: null,
      playerNumber: null,
      onlineTime: null,


     
      briefintroduction: {
        text: null,
        Issuedate: null,
        Developers: null,
        publisher: null,
      }
    }
  }











  //  getDetaileGame(id:number):detailedgame{
  //   return this.getDetaileGamelist().filter(element => element.id==id);
  //  }


}

