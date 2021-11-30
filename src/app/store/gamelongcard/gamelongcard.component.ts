import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailedGameComponent } from '../detailedgame/detailedgame.component';
import { simplegame } from '../game';

@Component({
  selector: 'app-gamelongcard',
  templateUrl: './gamelongcard.component.html',
  styleUrls: ['./gamelongcard.component.scss'],
  
})
export class GamelongcardComponent implements OnInit {
  @Input() simplegame:simplegame;

  constructor(public modalController:ModalController) { }

  ngOnInit() {}


  async showModelDetailed(gameId:number){
    const modal=await this.modalController.create({
      component:DetailedGameComponent,
      cssClass: 'my-custom-class',//modal的css
      componentProps:{"gameId":gameId}//传入title
    })
    return await modal.present();
  }

}
