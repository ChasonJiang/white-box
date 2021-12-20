import { Component, OnInit } from '@angular/core';
import { AlertController ,ModalController } from '@ionic/angular';
import { UserInfo } from 'src/app/interface/User';
import { getCurrentUserCard, getUserInfo } from 'src/app/util/util';
// import { USERS } from '../mock-user';
@Component({
  selector: 'app-personalset',
  templateUrl: './personalset.page.html',
  styleUrls: ['./personalset.page.scss'],
})
export class PersonalsetPage implements OnInit {

  user:UserInfo = {
    uid:getUserInfo().uid,
    userName:getUserInfo().userName,
    signature:getUserInfo().signature,
    numberOfFollow: getUserInfo().numberOfFollow,
    numberOfFans: getUserInfo().numberOfFans,
    numberOfCollection: getUserInfo().numberOfCollection,
    userLevel:getUserInfo().userLevel,
    avatarUrl:getCurrentUserCard().avatarUrl,
    sex:getUserInfo().sex,
    birthDay:getUserInfo().birthDay,
    email:getUserInfo().email,
}


  // user = USERS;

  constructor(
    private modalController:ModalController,
  ) { }

  ngOnInit() {
  }


  save(){
    console.log(1)

  }

  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  dosubmit(){
    // console.log(this.peopleinfo);
  }
  

}


