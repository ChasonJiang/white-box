import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Requester, SimpleGameRequestParams } from 'src/app/interface/Request';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { DetailedGameComponent } from 'src/app/store/detailedgame/detailedgame.component';
import { simplegame } from 'src/app/store/game';
import { GamelongcardComponent } from 'src/app/store/gamelongcard/gamelongcard.component';
import { getCurrentUserCard } from 'src/app/util/util';

@Component({
  selector: 'app-wishgame',
  templateUrl: './wishgame.component.html',
  styleUrls: ['./wishgame.component.scss'],
})
export class WishgameComponent implements OnInit {
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
      console.log("")
      let req: Requester<SimpleGameRequestParams> = {
        head: {
          uid: getCurrentUserCard().uid,
          type: 'getGamewish'
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
              console.log("getGamewish");
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
      cssClass: 'fullscreen-class',//modal的css
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