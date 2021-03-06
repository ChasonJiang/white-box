import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { detailedgame } from '../game';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType ,ImageOptions} from '@capacitor/camera';
import { from } from 'rxjs';
import { PhotoService } from 'src/app/services/photo.service';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { GamelistComponent } from '../gamelist/gamelist.component';
import { ShowlongcardComponent } from '../showlongcard/showlongcard.component';
import { adddetailedgameRequestParams, getdetailedgameRequestParams, Requester } from 'src/app/interface/Request';
import { getCurrentUserCard } from 'src/app/util/util';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-adddetailedgame',
  templateUrl: './adddetailedgame.component.html',
  styleUrls: ['./adddetailedgame.component.scss'],
})
export class AdddetailedgameComponent implements OnInit {
  @ViewChild('Container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  @Input() gameId: number;
  detailedgame: detailedgame
  hasimgUrl: boolean = false;
  direction:string = '';
  gameType: string = '';
  gameTypeerror: string = '';
  gameLable: string = '';
  gameLableerror: string = '';
  reqFailed: boolean;




  constructor(public modalController: ModalController,
    private photoService: PhotoService,
    private gameserviceService: GameserviceService,
    private imageCompress:NgxImageCompressService,
    public toastController: ToastController,
   ) { }

  ngOnInit() {
    this.getdetailedgame();
  }


  addgame(){
   
    let req: Requester<adddetailedgameRequestParams> = {
      head: {
        uid: getCurrentUserCard().uid,
        type: 'addgame'
      },
      body: {
        detailedgame:this.detailedgame
      } as adddetailedgameRequestParams
    }

    try {
      this.gameserviceService.addgame(req)
        .subscribe({
          next: res => {
            this.addgamepresentToast()
          console.log("addgame")
          this.dismiss()
  
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
  updategame(){
    let req: Requester<adddetailedgameRequestParams> = {
      head: {
        uid: getCurrentUserCard().uid,
        type: 'updategame'
      },
      body: {
        detailedgame:this.detailedgame
      } as adddetailedgameRequestParams
    }

    try {
      this.gameserviceService.updategame(req)
        .subscribe({
          next: res => {
            this.updategamepresentToast()
          console.log("updategame")
          this.dismiss()
  
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

getdetailedgame(){
  if(this.gameId!==undefined){
    this.direction="uptate"
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
  
  else{
    this.direction="add"
    this.detailedgame = this.gameserviceService.initdetailedgame();
  }
}

select(){
  
  if(this.direction=="add"){
    
    this.addgame()
  }
  else{
    
    this.updategame()
  }
}




  async showlongcardModel(detailedgame) {
    const modal = await this.modalController.create({
      component: ShowlongcardComponent,
      cssClass: 'my-custom-class',//modal???css
      componentProps: { "detailedgame": detailedgame }//??????title
    })
    return await modal.present();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  };
  insertImgUrl() {

    // let title = this.viewContainerRef.ele ment.nativeElement.querySelector('title');
    // let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    // console.log(main_textarea.innerText);


    // console.log(main_textarea.innerText);


    from(this.photoService.takePicture({quality: 0.1,allowEditing: true,resultType: CameraResultType.DataUrl}as ImageOptions)).subscribe(
      url => {
        this.imageCompress.compressFile(url, -2, 50, 30).then(img => {
          console.log(img);
          this.detailedgame.imgUrl = img;
          this.hasimgUrl = true;
        });

      }
      
      // {
      //   console.log(url);
      //   this.detailedgame.imgUrl = url;
      //   this.hasimgUrl = true;
      // }
    );


  }
  deleteshowimg(imgurl){
    let index = this.detailedgame.imgshow.indexOf(imgurl);
if (index > -1) {
  this.detailedgame.imgshow.splice(index, 1);
}
   
  }

  insertImgshow() {

   
    from(this.photoService.takePicture({quality: 1,allowEditing: true,resultType: CameraResultType.DataUrl}as ImageOptions)).subscribe(
      url => {
        this.imageCompress.compressFile(url, -2, 50, 30).then(img => {
          console.log(img);
        this.detailedgame.imgshow.push(img);
        });

      }
      
      
      // {
      //   console.log(url);
      //   this.detailedgame.imgshow.push(url);
      // }
    );
   
  }

  addgameType() {
    this.gameTypeerror = '';
    if (this.gameType == '') {
      this.gameTypeerror = '????????????????????????';
      return;
    }
    if (this.detailedgame.gameType.indexOf(this.gameType) !== -1) {
      this.gameTypeerror = '????????????????????????';
      return;
    }
    // if (this.gameType.length > 6) {
    //   this.gameTypeerror = '??????????????????';
    //   return;
    // }

    this.detailedgame.gameType.push(this.gameType);
    this.gameType='';
  }


  addgameLable() {
    this.gameLableerror = '';
    if (this.gameLable == '') {
      this.gameLableerror = '????????????????????????';
      return;
    }
    if (this.detailedgame.gameLable.indexOf(this.gameLable) !== -1) {
      this.gameLableerror = '????????????????????????';
      return;
    }
    // if (this.gameLable.length > 6) {
    //   this.gameLableerror = '??????????????????';
    //   return;
    // }

    this.detailedgame.gameLable.push(this.gameLable)
    this.gameLable = '';
    
  }


  removegameType() {
    this.gameTypeerror = '';
    let index = this.detailedgame.gameType.indexOf(this.gameType);
    if (index > -1) {
      this.detailedgame.gameType.splice(index, 1);
    }
  }

  removegameLable() {
    this.gameLableerror = '';
    let index = this.detailedgame.gameLable.indexOf(this.gameLable);
    if (index > -1) {
      this.detailedgame.gameLable.splice(index, 1);
    }
  }



  async addgamepresentToast() {

    const toast = await this.toastController.create({
      message: '??????????????????',
      duration: 3000
    });
    toast.present();
  }

  async updategamepresentToast() {

    const toast = await this.toastController.create({
      message: '??????????????????',
      duration: 3000
    });
    toast.present();
  }

}




