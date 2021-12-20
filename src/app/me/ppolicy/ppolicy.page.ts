import { Component, OnInit } from '@angular/core';
import { AlertController, AnimationController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ppolicy',
  templateUrl: './ppolicy.page.html',
  styleUrls: ['./ppolicy.page.scss'],
})
export class PpolicyPage implements OnInit {

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
