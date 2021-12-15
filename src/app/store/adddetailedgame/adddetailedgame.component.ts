import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { detailedgame } from '../game';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { from } from 'rxjs';
import { PhotoService } from 'src/app/services/photo.service';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { GamelistComponent } from '../gamelist/gamelist.component';
import { ShowlongcardComponent } from '../showlongcard/showlongcard.component';
import { adddetailedgameRequestParams, getdetailedgameRequestParams, Requester } from 'src/app/interface/Request';
import { getCurrentUserCard } from 'src/app/util/util';
@Component({
  selector: 'app-adddetailedgame',
  templateUrl: './adddetailedgame.component.html',
  styleUrls: ['./adddetailedgame.component.scss'],
})
export class AdddetailedgameComponent implements OnInit {
  @ViewChild('Container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  @Input() gameId: number;
  detailedgame?: detailedgame
  hasimgUrl: boolean = false;

  gameType: string = '';
  gameTypeerror: string = '';
  gameLable: string = '';
  gameLableerror: string = '';
  reqFailed: boolean;




  constructor(public modalController: ModalController,
    private photoService: PhotoService,
    private gameserviceService: GameserviceService,) { }

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


getdetailedgame(){
  if(this.gameId!==undefined){
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
    this.detailedgame = this.gameserviceService.initdetailedgame();
  }
}






  async showlongcardModel(detailedgame) {
    const modal = await this.modalController.create({
      component: ShowlongcardComponent,
      cssClass: 'my-custom-class',//modal的css
      componentProps: { "detailedgame": detailedgame }//传入title
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


    from(this.photoService.takePicture()).subscribe(
      url => {
        this.detailedgame.imgUrl = url;
        this.hasimgUrl = true;
      }
    );


  }
  deleteshowimg(imgurl){
    let index = this.detailedgame.imgshow.indexOf(imgurl);
if (index > -1) {
  this.detailedgame.imgshow.splice(index, 1);
}
   
  }

  insertImgshow() {

    // let imgshow = this.viewContainerRef.element.nativeElement.querySelector('.imgshow');
    from(this.photoService.takePicture()).subscribe(
      url => {
        console.log(url);
        this.detailedgame.imgshow.push(url);
        //  imgshow.innerHTML+="<img src=" + url +` (click)="showImg();" style='border-radius: 4px; margin-top:4px;margin-bottom:4px'><div><br></div>`;
      });
  }


  addgameType() {
    this.gameTypeerror = '';
    if (this.gameType == '') {
      this.gameTypeerror = '游戏类型不能为空';
      return;
    }
    if (this.detailedgame.gameType.indexOf(this.gameType) !== -1) {
      this.gameTypeerror = '已经有该游戏类型';
      return;
    }
    if (this.gameType.length > 6) {
      this.gameTypeerror = '游戏类型过长';
      return;
    }

    this.detailedgame.gameType.push(this.gameType);
  }


  addgameLable() {
    this.gameLableerror = '';
    if (this.gameLable == '') {
      this.gameLableerror = '游戏标签不能为空';
      return;
    }
    if (this.detailedgame.gameLable.indexOf(this.gameLable) !== -1) {
      this.gameLableerror = '已经有该游戏标签';
      return;
    }
    if (this.gameLable.length > 6) {
      this.gameLableerror = '游戏标签过长';
      return;
    }

    this.detailedgame.gameLable.push(this.gameLable)
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





}




