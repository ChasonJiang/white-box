import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
})
export class RegisterPage implements OnInit {

  uid:any;

  psw:any;

  login(){
    if (this.psw=="test"&&this.psw=="test") {
      console.log("123");
      location.href='index.html';
    }
  }

  constructor() { }

  ngOnInit() {
  }

}

