import { Injectable } from '@angular/core';
import { simpleGame ,detailedGame,storeShowImg} from '../store/gamelist';
import { simplegame,detailedgame,storeshowimg } from '../store/game';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { Requester } from '../interface/Request';



@Injectable({
  providedIn: 'root'
})
export class GameserviceService {

  constructor() { }
getSimpleGame(req:Requester<void>): Observable<simplegame[]>{

  return  of(simpleGame);
}

getDetaileGamelist():detailedgame[]{
  return detailedGame;
}


find(id:number):detailedgame{
for(let game of detailedGame){
  if(game.gid == id){
    return game;
  }
}
}
getstoreShowImg():string[]{
  return storeShowImg.storeimg;
}


initdetailedgame():detailedgame{
return {
  gid:null,
  gameName: null,
  imgUrl: null,
  imgshow: [],
  gameLable: [],
  Minimumprice: null,
  nowPrice: null,
  oldPrice: null,
  Minimum:null,
  gameType: [],
  score: null,
  onlineNumber: null,
  favorableRate: null,
  OnlineMaxYesterday: null,
  averageOlnine: null,
  playerNumber: null,
  onlineTime: null,


  dlc: [],
  briefintroduction: {
      text:null,
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
