import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostEditerComponent } from 'src/app/common-component/post-editer/post-editer.component';
import { TopicCard } from 'src/app/interface/Topic';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input() topicCard:TopicCard;
  isFollow: boolean=false;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  goBack(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  follow(){
    this.isFollow=!this.isFollow;
    console.log(this.isFollow);
  }

  async createPostEditerModal(paperMode){
    const modal = await this.modalController.create({
      component:PostEditerComponent,
      cssClass: 'fullscreen-class',
      componentProps:{
        'paperMode' : paperMode,
        'topics':[this.topicCard],
      }
    });

    return await modal.present();
  }

  async createSearchModal() {
    const modal = await this.modalController.create({
      component:SearchComponent,
      cssClass:'fullscreen-class',
      
    });

    return await modal.present();
  }
}
