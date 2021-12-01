import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TopicCard } from 'src/app/interface/Topic';
import { TopicComponent } from '../../topic/topic.component';

@Component({
  selector: 'app-community-card',
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.scss'],
})
export class CommunityCardComponent implements OnInit {
  @Input() topicCard:TopicCard;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  async createTopicModal(){
    const modal = await this.modalController.create({
      component:TopicComponent,
      cssClass:"fullscreen-class",
      componentProps:{
        'topicCard':this.topicCard,
      }
    });
    // console.log("create topic modal");
    return await modal.present();
  }

}
