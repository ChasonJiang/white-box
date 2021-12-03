import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommunityCardComponent } from 'src/app/community/community-area/community-card/community-card.component';
import { TopicSearchRequestParams } from 'src/app/interface/Request';
import { Topic, TopicCard } from 'src/app/interface/Topic';
import { SearchService } from 'src/app/services/search.service';
import { TopicCardService } from 'src/app/services/topic-card.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
})
export class TopicListComponent implements OnInit, AfterViewInit{
  @Output() topic:Topic=null;
  @ViewChild("SearchResultContainer",{read: ViewContainerRef}) searchResultContainer:ViewContainerRef;
  private topicCards: TopicCard[];

  private searchResults:number[];

  constructor(
    private modalController: ModalController,
    private searchService: SearchService<TopicSearchRequestParams>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private topicCardService: TopicCardService,


  ) { }




  ngOnInit() {
    // this.getpostCardDetail();

  }
  
  ngAfterViewInit(){
    // this.lazyLoad(this.postCardsDetail);
  }

  goBack(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  getTopicCard() { 
    this.topicCardService.requestTopicCard().subscribe(topicCards=>this.topicCards=topicCards);
    return this.topicCards;
  }


  lazyLoad(topicCards:TopicCard[]){
    for (let topicCard of topicCards)
    {
      const ComponentFactory=this.componentFactoryResolver.resolveComponentFactory(CommunityCardComponent);
      const ComponentRef=this.searchResultContainer.createComponent(ComponentFactory);
      ComponentRef.instance.topicCard=topicCard;
    }
  }
  loadData(event) {
    this.lazyLoad(this.getTopicCard());
    event.target.complete();
  }

  doRefresh(event) {
    // console.log('Begin async operation');
      console.log('Async operation has ended');
      this.searchResultContainer.clear();
      this.lazyLoad(this.getTopicCard());
      event.target.complete();
    }

  searchSubmit(content: string){
    this.lazyLoad(this.getTopicCard());

  }

  searchChange(){

  }
}

