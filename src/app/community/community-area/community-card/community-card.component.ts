import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() showMode:boolean = false;
  // @Output() onClick:EventEmitter<any> = new EventEmitter();
  @Input() callback?:Function=null;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}
  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      'topic':{tid:this.topicCard.tid,name:this.topicCard.name},
    });
  }


  click(event: Event){
    if(this.showMode){
      // this.onClick.emit({tid:this.topicCard.tid,name:this.topicCard.name});
      // this.callback({tid:this.topicCard.tid,name:this.topicCard.name});
      this.modalDismiss();
    }else{
      this.createTopicModal();
    }

  }

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
