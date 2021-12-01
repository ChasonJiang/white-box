import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TopicCard } from 'src/app/interface/Topic';
import { TopicCardService } from 'src/app/services/topic-card.service';
import { CommunityCardComponent } from './community-card/community-card.component';

@Component({
  selector: 'app-community-area',
  templateUrl: './community-area.component.html',
  styleUrls: ['./community-area.component.scss'],
})
export class CommunityAreaComponent implements OnInit, AfterViewInit {
  @ViewChild('TopicCardContainer',{read: ViewContainerRef}) TopicCardContainer:ViewContainerRef;
  private topicCards: TopicCard[];
  
  constructor(
    private topicCardService: TopicCardService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.getTopicCard();
  }
  ngAfterViewInit() {
    this.lazyLoad(this.topicCards);
  }

  getTopicCard() { 
    this.topicCardService.requestTopicCard().subscribe(topicCards=>this.topicCards=topicCards);
    return this.topicCards;
  }

  searchSubmit(searchContent:string){
    console.log(searchContent);
  }

  lazyLoad(topicCards:TopicCard[]){
    for (let topicCard of topicCards)
    {
      const ComponentFactory=this.componentFactoryResolver.resolveComponentFactory(CommunityCardComponent);
      const ComponentRef=this.TopicCardContainer.createComponent(ComponentFactory);
      ComponentRef.instance.topicCard=topicCard;
    }
  }
  loadData(event) {
    this.lazyLoad(this.getTopicCard());
    event.target.complete();
  }
}