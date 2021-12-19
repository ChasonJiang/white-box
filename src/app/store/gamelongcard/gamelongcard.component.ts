import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdddetailedgameComponent } from '../adddetailedgame/adddetailedgame.component';
import { DetailedGameComponent } from '../detailedgame/detailedgame.component';
import { simplegame } from '../game';

@Component({
  selector: 'app-gamelongcard',
  templateUrl: './gamelongcard.component.html',
  styleUrls: ['./gamelongcard.component.scss'],
  
})
export class GamelongcardComponent implements OnInit {
  @Input() simplegame:simplegame;
  @Input() operation;
  constructor(public modalController:ModalController) { }

  ngOnInit() {}


  async showModelDetailed(gameId:number){
    const modal=await this.modalController.create({
      component:DetailedGameComponent,
      cssClass: 'fullscreen-class',//modal的css
      componentProps:{"gameId":gameId}//传入title
    })
    return await modal.present();
  }
  async showModelmodify(gameId:number){
    const modal=await this.modalController.create({
      component:AdddetailedgameComponent,
      cssClass: 'fullscreen-class',//modal的css
      componentProps:{"gameId":gameId}//传入title
    })
    return await modal.present();
  }

  chooseshowModel(){
   console.log(this.operation);
    if(this.operation=='modify'){
      return this.showModelmodify(this.simplegame.gid)
    }
    else{
      return this.showModelDetailed(this.simplegame.gid)
    }
  }


}
