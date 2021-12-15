import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Requester, searchSimpleGameRequestParams, SimpleGameSearchRequestParams } from 'src/app/interface/Request';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { getCurrentUserCard } from 'src/app/util/util';
import { simplegame } from '../game';

@Component({
  selector: 'app-gamesearch',
  templateUrl: './gamesearch.component.html',
  styleUrls: ['./gamesearch.component.scss'],
})
export class GamesearchComponent implements OnInit {
  @ViewChild('search') search: any;
  @Input() operation: string;
  searchmsg: string = '';
  simpleGamelist?: simplegame[];
  reqFailed: boolean;

  constructor(public modalController: ModalController,
    private gameserviceService: GameserviceService,) { }


  ngOnInit() { }

  getsearchmsg(content: string) {

    let req: Requester<searchSimpleGameRequestParams> = {
      head: {
        uid: getCurrentUserCard().uid,
        type: 'searchSimpleGame'
      },
      body: {
        content: content
      } as searchSimpleGameRequestParams
    }
    try {
      this.gameserviceService.getsearchsimplegamelist(req)
        .subscribe({
          next: res => {
            console.log("SearchSimpleGameList");
            this.simpleGamelist = res.simplegamelist;
            // console.log(postCardsIndexRes);
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
}



