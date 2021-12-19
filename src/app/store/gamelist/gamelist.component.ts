import { Component, OnInit,Input, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ModalController } from '@ionic/angular';


import { GameserviceService } from 'src/app/services/gameservice.service';
import {simplegame}from'../game'
import { DetailedGameComponent } from '../detailedgame/detailedgame.component';
import{GamelongcardComponent} from '../gamelongcard/gamelongcard.component';
import { IonInfiniteScroll } from '@ionic/angular';
import { getCurrentUserCard } from 'src/app/util/util';
import { Requester, SimpleGameRequestParams } from 'src/app/interface/Request';
@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.scss'],
})
export class GamelistComponent implements OnInit {
  @ViewChild('gamelongcardContainer',{read: ViewContainerRef }) gamelongcardContainerViewContainerRef:ViewContainerRef;

simpleGamelists?:simplegame[];
  @Input() title: string;
  reqFailed: boolean;
  index:number=0;
  s: boolean=true;
  constructor( private componentFactoryResolver: ComponentFactoryResolver,
     public modalController:ModalController,
     private gameserviceService:GameserviceService) { }


  ngOnInit() {
    this.updategamelongcard();
  }
 


  ngAfterViewInit(){
    
  }


  // updategamelongcard(){
  //   let simpleGamelist:simplegame[];
  //    this.gameserviceService.getSimpleGame({head:{uid:JSON.parse(localStorage.getItem('userInfo')).uid,type:''}}).subscribe(_SimpleGamelist=>{
  //     simpleGamelist=_SimpleGamelist;
  //   })
  //   this.simpleGamelists=simpleGamelist;
  //   return simpleGamelist;
  // }

  updategamelongcard(){
    let simpleGamelist:simplegame[];
    let req: Requester<SimpleGameRequestParams> = {
      head: {
        uid: getCurrentUserCard().uid,
        type: 'getSimpleGame'
      },
      body: {
        type: this.title,
        index:this.index
      } as SimpleGameRequestParams
    }
    try {
      this.gameserviceService.getsimplegamelist(req)
        .subscribe({
          next: res => {
            console.log("getSimpleGame");
            console.log(this.index+"list")
            this.lazyLoadgamelongcard(res.simplegamelist)
            this.index++;
            simpleGamelist=res.simplegamelist
            console.log(this.index)
          },
          complete:() =>{this.s=true},
          error: () => {
            this.reqFailed = true;
          }
        });

    } catch (err) {
      // console.log("do refresh");
      console.log(err.message);
    } finally {
      return simpleGamelist;
    }
  }

  lazyLoadgamelongcard(gamelongcard:simplegame[]){
    for (let item of gamelongcard)
    {
      
      const gamelongcardComponentFactory=this.componentFactoryResolver
        .resolveComponentFactory(GamelongcardComponent);
      const gamelongcardComponentRef=this.gamelongcardContainerViewContainerRef.createComponent(gamelongcardComponentFactory);
      gamelongcardComponentRef.instance.simplegame=item;
  
    }
  }
  doRefresh(event) {
    // console.log('Begin async operation');
      console.log('Async operation has ended');
      this.index=0;
      this.s=true;
      this.gamelongcardContainerViewContainerRef.clear();
      this.loadData(event)
      // this.updategamelongcard();
      event.target.complete();
    }

    loadData(event) {
      if(this.s){
      this.s=false;
      this.updategamelongcard();
      event.target.complete();
    }
    else{
      return
    }
     
}




async showModelDetailed(gameId:number){
  const modal=await this.modalController.create({
    component:DetailedGameComponent,
    cssClass: 'my-custom-class',//modal的css
    componentProps:{"gameId":gameId}//传入title
  })
  return await modal.present();
}


dismiss() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.modalController.dismiss({
    'dismissed': true
  });
}

}