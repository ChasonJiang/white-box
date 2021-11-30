import { Component, OnInit, ViewEncapsulation ,ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';


import { GameserviceService } from '../services/gameservice.service';
import { simplegame ,storeshowimg} from './game';
import { GamelistComponent } from './gamelist/gamelist.component';
import { ModalController ,ActionSheetController} from '@ionic/angular';
import { DetailedGameComponent } from './detailedgame/detailedgame.component';



import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { GamelongcardComponent } from './gamelongcard/gamelongcard.component';
import { AdddetailedgameComponent } from './adddetailedgame/adddetailedgame.component';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class StoreComponent implements OnInit {
  simpleGamelist1?:simplegame[];
  simpleGamelist2?:simplegame[];
  simpleGamelist3?:simplegame[];
  simpleGamelist4?:simplegame[];

storeShowImg?:string[];

@ViewChild('gamelongcardContainer',{read: ViewContainerRef }) gamelongcardContainerViewContainerRef:ViewContainerRef;
  

  constructor(private gameService:GameserviceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    public modalController:ModalController,
    private gameserviceService:GameserviceService) { }

  ngOnInit() {
    this.simpleGamelist1=this.updategamelongcard();
    this.simpleGamelist2=this.updategamelongcard();
    this.simpleGamelist3=this.updategamelongcard();
    this.storeShowImg=this.gameService.getstoreShowImg();
  }
async showModel(title:string){
  const modal=await this.modalController.create({
    component:GamelistComponent,
    cssClass: 'my-custom-class',//modal的css
    componentProps:{"title":title}//传入title
  })
  return await modal.present();
}

async showModelDetailed(gameId:number){
  const modal=await this.modalController.create({
    component:DetailedGameComponent,
    cssClass: 'my-custom-class',//modal的css
    componentProps:{"gameId":gameId}//传入title
  })
  return await modal.present();
}


async showModeladdDetailedGame(){
  const modal=await this.modalController.create({
    component:AdddetailedgameComponent,
    cssClass: 'my-custom-class',//modal的css
  //  componentProps:{"gameId":gameId}//传入title
  })
  return await modal.present();
}



updategamelongcard(){
  let simpleGamelist:simplegame[];
   this.gameserviceService.getSimpleGame({header:{uid:JSON.parse(localStorage.getItem('userInfo')).uid,type:''}}).subscribe(_SimpleGamelist=>{
    simpleGamelist=_SimpleGamelist;
  })
  this.simpleGamelist4=simpleGamelist;
  return simpleGamelist;
}

lazyLoadgamelongcard(gamelongcard:simplegame[]){
  for (let item of this.simpleGamelist4)
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






