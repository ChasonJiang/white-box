import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gamesearch',
  templateUrl: './gamesearch.component.html',
  styleUrls: ['./gamesearch.component.scss'],
})
export class GamesearchComponent implements OnInit {

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
