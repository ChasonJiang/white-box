import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { detailedgame } from '../game';

@Component({
  selector: 'app-gameintroduce',
  templateUrl: './gameintroduce.component.html',
  styleUrls: ['./gameintroduce.component.scss'],
})
export class GameintroduceComponent implements OnInit {

  @Input() detailedgame?:detailedgame;
  constructor(public modalController:ModalController,) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  };
}
