import { Component, OnInit } from '@angular/core';
import { NavController, RouterLinkDelegate } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  uid:any;

  psw:any;

  errorMessage:any;

  login(){
    if (this.uid=="test"&&this.psw=="test") {
      console.log("123");
      location.href='index.html';
    }
  }


  constructor() { }

  ngOnInit() {
  }

}
