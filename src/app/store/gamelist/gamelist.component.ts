import { Component, OnInit,Input, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ModalController } from '@ionic/angular';


import { GameserviceService } from 'src/app/services/gameservice.service';
import {simplegame}from'../game'
import { DetailedGameComponent } from '../detailedgame/detailedgame.component';
import{GamelongcardComponent} from '../gamelongcard/gamelongcard.component';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.scss'],
})
export class GamelistComponent implements OnInit {
  @ViewChild('gamelongcardContainer',{read: ViewContainerRef }) gamelongcardContainerViewContainerRef:ViewContainerRef;

simpleGamelists?:simplegame[];
  @Input() title: string;
  constructor( private componentFactoryResolver: ComponentFactoryResolver,
     public modalController:ModalController,
     private gameserviceService:GameserviceService) { }


  ngOnInit() {
    
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

  ngAfterViewInit(){
    this.lazyLoadgamelongcard(this.updategamelongcard());
    this.lazyLoadgamelongcard(this.updategamelongcard());
  }


  updategamelongcard(){
    let simpleGamelist:simplegame[];
     this.gameserviceService.getSimpleGame({header:{uid:JSON.parse(localStorage.getItem('userInfo')).uid,type:''}}).subscribe(_SimpleGamelist=>{
      simpleGamelist=_SimpleGamelist;
    })
    this.simpleGamelists=simpleGamelist;
    return simpleGamelist;
  }

  lazyLoadgamelongcard(gamelongcard:simplegame[]){
    for (let item of this.simpleGamelists)
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
      this.gamelongcardContainerViewContainerRef.clear();
      this.lazyLoadgamelongcard(this.updategamelongcard());
      event.target.complete();
    }

    loadData(event) {
      this.lazyLoadgamelongcard(this.updategamelongcard());
      event.target.complete();
}

}