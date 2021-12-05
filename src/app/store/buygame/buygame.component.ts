import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { detailedgame } from '../game';

@Component({
  selector: 'app-buygame',
  templateUrl: './buygame.component.html',
  styleUrls: ['./buygame.component.scss'],
})
export class BuygameComponent implements OnInit {
@Input() detailedgame:detailedgame;
  constructor(public modalController:ModalController,
    public toastController: ToastController) { }

  ngOnInit() {}


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  };


  async presentToast() {
    this.dismiss();
    const toast = await this.toastController.create({
      message: '购买成功，感谢您对小白盒的支持',
      duration: 3000
    });
    toast.present();
  }
}
