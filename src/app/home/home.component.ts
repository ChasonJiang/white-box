import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostComponent } from '../common-component/post/post.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  async createModal(){
    const modal = await this.modalController.create({
      component:PostComponent,
      cssClass: 'fullscreen-class'
    });

    return await modal.present();
  }

}
