import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginRequestParams, LoginValidationRequestParams, Requester } from './interface/Request';
import { UserCard } from './interface/User';
import { UserService } from './services/user.service';
import { sha256 } from './util/util';
import { getCurrentUserCard } from './util/util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor() {}



  ngOnInit() {
     //localStorage.clear();

  }



}