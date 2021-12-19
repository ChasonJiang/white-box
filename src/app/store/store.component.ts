import { Component, OnInit, ViewEncapsulation ,ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';


import { GameserviceService } from '../services/gameservice.service';
import { simplegame, storeshow } from './game';
import { GamelistComponent } from './gamelist/gamelist.component';
import { ModalController ,ActionSheetController, IonInfiniteScroll} from '@ionic/angular';
import { DetailedGameComponent } from './detailedgame/detailedgame.component';



import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { GamelongcardComponent } from './gamelongcard/gamelongcard.component';
import { AdddetailedgameComponent } from './adddetailedgame/adddetailedgame.component';
import { GamesearchComponent } from './gamesearch/gamesearch.component';
import { Requester, SimpleGameRequestParams } from '../interface/Request';
import { getCurrentUserCard } from '../util/util';

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
storeshowid?:number[];
s:boolean=true;
@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
@ViewChild('gamelongcardContainer',{read: ViewContainerRef }) gamelongcardContainerViewContainerRef:ViewContainerRef;
  reqFailed: boolean;
  index: number=0;
  

  constructor(private gameService:GameserviceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    public modalController:ModalController,
    private gameserviceService:GameserviceService) { }

  ngOnInit() {
    this.getsimplegamelist(1,'最新游戏');
    this.getsimplegamelist(2,'为您推荐');
    this.getsimplegamelist(3,'tuijian');
    this.getstoreShowImg();
    
  }


  getstoreShowImg(){
    let req: Requester<null> = {
      head: {
        uid: getCurrentUserCard().uid,
        type: 'getstoreShowImg'
      },
      body: {
        
      } as null
    }
    try {
      this.gameserviceService.getstoreShowImg(req).subscribe({
          next: res => {
            console.log("getstoreShowImg");
            this.storeShowImg = res.storeShowImg;
           this.storeshowid=res.gid;
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



  updategamelongcard(event){
    let simpleGamelist:simplegame[];
    let req: Requester<SimpleGameRequestParams> = {
      head: {
        uid: getCurrentUserCard().uid,
        type: 'getSimpleGame'
      },
      body: {
        type: '推荐',
        index:this.index
      } as SimpleGameRequestParams
    }
    try {
      this.gameserviceService.getsimplegamelist(req)
        .subscribe({
          next: res => {
            
            
            console.log("getSimpleGame");
            this.lazyLoadgamelongcard(res.simplegamelist)
            this.index++;
            simpleGamelist=res.simplegamelist
            console.log(this.index)
            
           
            if(res.simplegamelist.length<8) {
              this.infiniteScroll.disabled = false;
              console.log(this.infiniteScroll.disabled+'==this.infiniteScroll.disabled')
            }
            this.s=true
            
            event.target.complete();
            this.infiniteScroll.complete();
          },
          // complete:() =>{this.s=true},
          error: () => {
            this.infiniteScroll.disabled = false;
            this.reqFailed = true;
            this.infiniteScroll.complete();
           
          }
        });

    } catch (err) {
      // console.log("do refresh");
      console.log(err.message);
    } finally {
      
    }
  }



getsimplegamelist(number: number,type:string){


 
    let req: Requester<SimpleGameRequestParams> = {
      head: {
        uid: getCurrentUserCard().uid,
        type: 'getSimpleGame'
      },
      body: {
        type: type,
        index:0,
      } as SimpleGameRequestParams
    }
    try {
      this.gameserviceService.getsimplegamelist(req)
        .subscribe({
          next: res => {
            console.log("getSimpleGame");
            if(number==1)
            this.simpleGamelist1 = res.simplegamelist.slice(0,4);
            if(number==2)
           this.simpleGamelist2 = res.simplegamelist.slice(0,4);
           if(number==3)
           this.simpleGamelist3 = res.simplegamelist.slice(0,4);
          
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
  // return simpleGamelist.slice(0,4);
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
    this.gamelongcardContainerViewContainerRef.clear();

    
    this.getsimplegamelist(1,'最新游戏');
    this.getsimplegamelist(2,'为您推荐');
    this.getsimplegamelist(3,'tuijian');
    this.getstoreShowImg();
this.index=0;
this.s=true;
this.loadData(event)
    // this.updategamelongcard();
    event.target.complete();
  }

  loadData(event) {
    try{
    if(this.s){
      this.s=false;
    this.updategamelongcard(event);
    // event.target.complete();
    }
    else{
      console.log("滚动条锁定")
      return
    }
  }
  catch(e){
    this.infiniteScroll.disabled = true;
  }
}






async showModel(title:string){
  const modal=await this.modalController.create({
    component:GamelistComponent,
    cssClass: 'fullscreen-class',//modal的css
    componentProps:{"title":title}//传入title
  })
  return await modal.present();
}

async showModelDetailed(gameId:number){
  const modal=await this.modalController.create({
    component:DetailedGameComponent,
    cssClass: 'fullscreen-class',//modal的css
    componentProps:{"gameId":gameId}//传入title
  })
  return await modal.present();
}


async showModeladdDetailedGame(){
  const modal=await this.modalController.create({
    component:AdddetailedgameComponent,
    cssClass: 'fullscreen-class',//modal的css
  //  componentProps:{"gameId":gameId}//传入title
  })
  return await modal.present();
}
async showModelgamesearch(operation:string){
  const modal=await this.modalController.create({
    component:GamesearchComponent,
    cssClass: 'fullscreen-class',//modal的css
   componentProps:{"operation":operation}//传入title
  })
  return await modal.present();
}



}






