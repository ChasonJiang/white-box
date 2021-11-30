import { Component, OnInit } from '@angular/core';
import { detailedgame } from '../game';
import { ActionSheetController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-adddetailedgame',
  templateUrl: './adddetailedgame.component.html',
  styleUrls: ['./adddetailedgame.component.scss'],
})
export class AdddetailedgameComponent implements OnInit {
  detailedgame?:detailedgame;
  
  constructor( public modalController:ModalController,) { }

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  };



}
