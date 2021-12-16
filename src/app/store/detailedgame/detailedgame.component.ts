
import { Component, OnInit,Input, ViewEncapsulation} from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { modalController } from '@ionic/core';

import { detailedgame } from '../game';

import { GameserviceService } from 'src/app/services/gameservice.service';
import SwiperCore, { Autoplay, FreeMode, Keyboard, Navigation, Pagination, Scrollbar, Thumbs, Zoom } from 'swiper';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { GameintroduceComponent } from '../gameintroduce/gameintroduce.component';
import { BuygameComponent } from '../buygame/buygame.component';
import { buygameRequestParams, getdetailedgameRequestParams, Requester } from 'src/app/interface/Request';
import { getCurrentUserCard } from 'src/app/util/util';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom,FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'appdetailed-game',
  templateUrl: './detailedgame.component.html',
  styleUrls: ['./detailedgame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailedGameComponent implements OnInit {

detailedgamelist?:detailedgame[];
detailedgame?:detailedgame;
  @Input() gameId: number;
  @Input() _detailedgame?: detailedgame;

//暂时
isfollow:boolean=false;
  reqFailed: boolean;



// showimg:string='https://img1.baidu.com/it/u=1131786352,2450379066&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=391';


  constructor(public modalController:ModalController,
    private gameserviceService:GameserviceService,
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,) { }

  ngOnInit() {
    // this.detailedgamelist= this.gameserviceService.getDetaileGamelist()
   // this.detailedgame=this.gameserviceService.find(this.gameId)
   
    this.getdetailedgame()
    
    // .filter(element => element.id==this.gameId);
  }

  getdetailedgame(){
    // console.log(this._detailedgame);
if(this._detailedgame!=null){

  this.detailedgame=this._detailedgame;
}
else{
  let req: Requester<getdetailedgameRequestParams> = {
    head: {
      uid: getCurrentUserCard().uid,
      type: 'getdetailedgame'
    },
    body: {
      gameid:this.gameId
    } as getdetailedgameRequestParams
  }
  try {
    this.gameserviceService.getdetailedgame(req).subscribe({
        next: res => {
          console.log("getdetailedgame");
          console.log(res.detailedgame);
          this.detailedgame = res.detailedgame;
         
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
  // this.gameserviceService.getdetailedgame(this.gameId)
}
  }










  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  };
  // async presentActionSheet() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Albums',
  //     cssClass: 'my-custom-class',
  //     buttons: [{
  //       text: '商品类型'+this.gameId,
  //       role: 'destructive',
  //        icon: 'trash',
  //       handler: () => {
  //         console.log('Delete clicked');
  //       }
  //     }, 
  //    {
  //       text: 'Share',
  //       icon: 'share',
  //       handler: () => {
  //         console.log('Share clicked');
  //       }
  //     }, {
  //       text: 'Play (open modal)',
  //       icon: 'caret-forward-circle',
  //       handler: () => {
  //         console.log('Play clicked');
  //       }
  //     }, {
  //       text: 'Favorite',
  //       icon: 'heart',
  //       handler: () => {
  //         console.log('Favorite clicked');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();

  //   const { role } = await actionSheet.onDidDismiss();
    
  // };





  changefollowstatus(e){
    if(!this.isfollow){
      e.target.name='heart'
      e.target.style.color='red'
       this.isfollow=true;
       this.followgame()
    }
    else{
      e.target.name='heart-outline'
      e.target.style.color=''
       this.isfollow=false;
       this.cancelfollowgame()
    };

  }

  async showModelgameintroduce(detailedgame:detailedgame){
    const modal=await this.modalController.create({
      component:GameintroduceComponent,
      cssClass: 'my-custom-class',//modal的css
      componentProps:{"detailedgame":detailedgame}//传入title
    })
    return await modal.present();
  }

  async showModelbuygame(){
    const modal=await this.modalController.create({
      component:BuygameComponent,
      cssClass: 'transparent-class',//modal的css
      componentProps:{"detailedgame":this.detailedgame}//传入title
    })
    return await modal.present();
  }

// next(){

// }

// setInterval(){
//   setInterval
// }


followgame(){
  
  let req: Requester<buygameRequestParams> = {
    head: {
      uid: getCurrentUserCard().uid,
      type: 'followgame'
    },
    body: {
      gameid:this.detailedgame.gid
    } as buygameRequestParams
  }
  try {
    this.gameserviceService.buygame(req).subscribe({
        next: res => {
          console.log("followgame");
          console.log(res.success)
          this.followpresentToast()
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


async followpresentToast() {


 
  const toast = await this.toastController.create({
    message: '关注成功，感谢您对'+this.detailedgame+'的支持',
    duration: 3000
  });
  toast.present();
}

cancelfollowgame(){
  
  let req: Requester<buygameRequestParams> = {
    head: {
      uid: getCurrentUserCard().uid,
      type: 'cancelfollowgame'
    },
    body: {
      gameid:this.detailedgame.gid
    } as buygameRequestParams
  }
  try {
    this.gameserviceService.buygame(req).subscribe({
        next: res => {
          console.log("cancelfollowgame");
          console.log(res.success)
          this.cancelpresentToast()
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


async cancelpresentToast() {



  const toast = await this.toastController.create({
    message: '取消关注成功，小白盒会加油的哦！',
    duration: 3000
  });
  toast.present();
}

cancel

}
