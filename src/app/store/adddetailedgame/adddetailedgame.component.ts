import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { detailedgame } from '../game';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { from } from 'rxjs';
import { PhotoService } from 'src/app/services/photo.service';
import { GameserviceService } from 'src/app/services/gameservice.service';
import { GamelistComponent } from '../gamelist/gamelist.component';
import { ShowlongcardComponent } from '../showlongcard/showlongcard.component';
@Component({
  selector: 'app-adddetailedgame',
  templateUrl: './adddetailedgame.component.html',
  styleUrls: ['./adddetailedgame.component.scss'],
})
export class AdddetailedgameComponent implements OnInit {
  @ViewChild('Container',{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
   detailedgame?:detailedgame
  hasimgUrl:boolean = false;
  addgametable:string ='';
  gameType:string = '';
  gameTypeerror:string = '';




  constructor( public modalController:ModalController,
    private photoService:PhotoService,
    private gameserviceService:GameserviceService,) { }

  ngOnInit() {
    this.detailedgame=this.gameserviceService.initdetailedgame();
  }
  async showlongcardModel(detailedgame){
    const modal=await this.modalController.create({
      component:ShowlongcardComponent,
      cssClass: 'my-custom-class',//modal的css
      componentProps:{"detailedgame":detailedgame}//传入title
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

  insertImgUrl(){
   
    // let title = this.viewContainerRef.ele ment.nativeElement.querySelector('title');
    // let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    // console.log(main_textarea.innerText);
    

    // console.log(main_textarea.innerText);
  

      from(this.photoService.takePicture()).subscribe(
        url=>{
          this.detailedgame.imgUrl=url;
          this.hasimgUrl=true;
        }
        );
    

  }
  insertImgshow(){

    // let imgshow = this.viewContainerRef.element.nativeElement.querySelector('.imgshow');
    from(this.photoService.takePicture()).subscribe(
      url=>{
        console.log(url);
        this.detailedgame.imgshow.push(url);
      //  imgshow.innerHTML+="<img src=" + url +` (click)="showImg();" style='border-radius: 4px; margin-top:4px;margin-bottom:4px'><div><br></div>`;
      });
    }


    addgameType(){
      this.gameTypeerror='';
      if(this.detailedgame.gameType.indexOf(this.gameType)!==-1){
        this.gameTypeerror ='已经有该游戏类型';
        return;
      }
      if(this.gameType.length>6){
        this.gameTypeerror ='游戏类型过长';
        return;
      }
     
      this.detailedgame.gameType.push(this.gameType);
    }
    removegameType(){
      this.gameTypeerror='';
      let index = this.detailedgame.gameType.indexOf(this.gameType);
if (index > -1) {
  this.detailedgame.gameType.splice(index, 1);
}


    }

      
 



  }
  

  
  
