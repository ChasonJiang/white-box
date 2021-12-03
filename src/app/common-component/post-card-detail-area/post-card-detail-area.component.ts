import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { PostCardDetail } from 'src/app/interface/Post';
import { PostCardDetailComponent } from '../post-card-detail/post-card-detail.component';
import { PostCardDetailService } from '../../services/post-card-detail.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-post-card-detail-area',
  templateUrl: './post-card-detail-area.component.html',
  styleUrls: ['./post-card-detail-area.component.scss'],
})
export class PostCardDetailAreaComponent implements OnInit,AfterViewInit {

  @ViewChild("Container",{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() tid:number;
  postCardsDetail:PostCardDetail[];
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private PostCardDetailService: PostCardDetailService
  ) { }

  ngOnInit() {
    this.getpostCardDetail();

  }
  
  ngAfterViewInit(){
    this.lazyLoad(this.postCardsDetail);
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
      const ComponentRef=this.viewContainerRef.createComponent(ComponentFactory);
      ComponentRef.instance.postCardDetail=postCardDetail;
    }
  }

  loadData(event) {
    this.lazyLoad(this.getpostCardDetail());
    event.target.complete();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  doRefresh(event) {
    // console.log('Begin async operation');
      console.log('Async operation has ended');
      this.viewContainerRef.clear();
      this.lazyLoad(this.getpostCardDetail());
      event.target.complete();
    }

}
