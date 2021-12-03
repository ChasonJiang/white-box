import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostCardDetailComponent } from 'src/app/common-component/post-card-detail/post-card-detail.component';
import { PostCardDetail } from 'src/app/interface/Post';
import { TopicSearchRequestParams } from 'src/app/interface/Request';
import { SearchService } from 'src/app/services/search.service';
import { PostCardDetailService } from '../../../services/post-card-detail.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit{
  @Input() tid:number;
  @ViewChild("SearchResultContainer",{read: ViewContainerRef}) searchResultContainer:ViewContainerRef;

  private searchResults:number[];
  private postCardsDetail:PostCardDetail[];

  constructor(
    private modalController: ModalController,
    private searchService: SearchService<TopicSearchRequestParams>,
    private PostCardDetailService:PostCardDetailService,
    private componentFactoryResolver: ComponentFactoryResolver,

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

  getpostCardDetail(){
    this.PostCardDetailService.requestPostCardDetail({
      header:{
        uid:JSON.parse(localStorage.getItem('userInfo')).uid,type:''
      },
    }).subscribe(postCardsDetail=>{this.postCardsDetail=postCardsDetail
        });
        return this.postCardsDetail;
  }

  lazyLoad(postCardsDetail:PostCardDetail[]){
    for (let postCardDetail of postCardsDetail)
    {
      const ComponentFactory=this.componentFactoryResolver.resolveComponentFactory(PostCardDetailComponent);
      const ComponentRef=this.searchResultContainer.createComponent(ComponentFactory);
      ComponentRef.instance.postCardDetail=postCardDetail;
    }
  }

  loadData(event) {
    this.lazyLoad(this.getpostCardDetail());
    event.target.complete();
  }

  doRefresh(event) {
    // console.log('Begin async operation');
      console.log('Async operation has ended');
      this.searchResultContainer.clear();
      this.lazyLoad(this.getpostCardDetail());
      event.target.complete();
    }

  log(){
    console.log('okk');
  }
  searchSubmit(content: string){
    this.searchService.search({
      header:{
        uid:JSON.parse(localStorage.getItem('userInfo')).uid,type:''
      },
      body:{
        tid:this.tid,
        content:content
      }as TopicSearchRequestParams
    }).subscribe(res => {
      this.searchResults=res.pid;
      this.lazyLoad(this.getpostCardDetail());
      // console.log(this.searchResults); 
    })

  }


}
