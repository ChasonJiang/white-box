import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
// import { USERS } from '../mock-user';
@Component({
  selector: 'app-personalset',
  templateUrl: './personalset.page.html',
  styleUrls: ['./personalset.page.scss'],
})
export class PersonalsetPage implements OnInit {

  testusername = '123';

  public peopleinfo:any={
    username:'',
    usersign:'',
    usersex:'m',
    usermail:'',
  }

  // user = USERS;

  constructor() { }

  ngOnInit() {
  }

  dosubmit(){
    console.log(this.peopleinfo);
  }
  

}


