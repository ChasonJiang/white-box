import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { detailedgame } from '../game';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { from } from 'rxjs';
import { PhotoService } from 'src/app/services/photo.service';
@Component({
  selector: 'app-adddetailedgame',
  templateUrl: './adddetailedgame.component.html',
  styleUrls: ['./adddetailedgame.component.scss'],
})
export class AdddetailedgameComponent implements OnInit {
  @ViewChild('Container',{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  detailedgame?:detailedgame;
  
  constructor( public modalController:ModalController,private photoService:PhotoService,) { }

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  };

  insertImg(){
    
    // let title = this.viewContainerRef.ele ment.nativeElement.querySelector('title');
    let imgshow = this.viewContainerRef.element.nativeElement.querySelector('.imgshow');
    console.log(imgshow.innerText);
    console.log(1);
    from(this.photoService.takePicture()).subscribe(
      url=>{
        imgshow.innerHTML+="<img src=" + url +" style='border-radius: 4px; margin-top:4px;margin-bottom:4px'><div><br></div>";
      });

    

  }

}
