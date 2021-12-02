import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-showdetailedgame',
  templateUrl: './showdetailedgame.component.html',
  styleUrls: ['./showdetailedgame.component.scss'],
})
export class ShowdetailedgameComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}





  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
