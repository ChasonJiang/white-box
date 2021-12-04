import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SimpleGameSearchRequestParams } from 'src/app/interface/Request';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { simplegame } from '../game';

@Component({
  selector: 'app-gamesearch',
  templateUrl: './gamesearch.component.html',
  styleUrls: ['./gamesearch.component.scss'],
})
export class GamesearchComponent implements OnInit {
  @ViewChild('search') search:any;
  @Input() operation:string;
  searchmsg:string = '';
  simpleGamelist?:simplegame[];

  constructor(public modalController:ModalController,
    private gameserviceService:GameserviceService,) { }


  ngOnInit() {}

  getsearchmsg(e:string) {
    this.searchmsg=e;
    this.simpleGamelist= this.gameserviceService.getsearchsimplegamelist(
      {head:{uid:JSON.parse(localStorage.getItem('userInfo')).uid,type:'SimpleGameSearchRequestParams'}})
      console.log(this.simpleGamelist)
  }


  
















  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  };
}



