import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { buygameRequestParams, Requester } from 'src/app/interface/Request';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { getCurrentUserCard } from 'src/app/util/util';
import { detailedgame } from '../game';

@Component({
  selector: 'app-buygame',
  templateUrl: './buygame.component.html',
  styleUrls: ['./buygame.component.scss'],
})
export class BuygameComponent implements OnInit {
@Input() detailedgame:detailedgame;
  reqFailed: boolean;
  constructor(public modalController:ModalController,
    public toastController: ToastController,
    private gameserviceService:GameserviceService,) { }

  ngOnInit() {}




buygame(){
  let req: Requester<buygameRequestParams> = {
    head: {
      uid: getCurrentUserCard().uid,
      type: 'buygame'
    },
    body: {
      
    } as buygameRequestParams
  }
  try {
    this.gameserviceService.buygame(req).subscribe({
        next: res => {
          console.log("buygame");
          console.log(res.success)
          this.presentToast()
        },
        error: () => {
          this.reqFailed = true;
        }
      });

  } catch (err) {
    // console.log("do refresh");
    console.log(err.message);
  } finally {
  }
}





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
