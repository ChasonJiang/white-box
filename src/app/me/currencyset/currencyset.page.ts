import { Component, OnInit } from '@angular/core';
import { AlertController ,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-currencyset',
  templateUrl: './currencyset.page.html',
  styleUrls: ['./currencyset.page.scss'],
})
export class CurrencysetPage implements OnInit {

  constructor(
    private modalController:ModalController,
  ) { }

  ngOnInit() {
  }



  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }



}
