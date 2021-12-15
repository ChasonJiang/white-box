import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { adddetailedgameRequestParams, Requester } from 'src/app/interface/Request';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { getCurrentUserCard } from 'src/app/util/util';
import { DetailedGameComponent } from '../detailedgame/detailedgame.component';
import { detailedgame, simplegame } from '../game';

@Component({
  selector: 'app-showlongcard',
  templateUrl: './showlongcard.component.html',
  styleUrls: ['./showlongcard.component.scss'],
})
export class ShowlongcardComponent implements OnInit {
  @Input() detailedgame:detailedgame;
  reqFailed: boolean;
  constructor(public modalController:ModalController,private gameService:GameserviceService,) { }

  ngOnInit() {}













  async showModelDetailed(gameId:number,detailedgame){
    const modal=await this.modalController.create({
      component:DetailedGameComponent,
      cssClass: 'my-custom-class',//modal的css
      componentProps:{"gameId":gameId,
       "_detailedgame":detailedgame},//传入title
    })
    console.log(detailedgame)
    return await modal.present();
  }



  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
