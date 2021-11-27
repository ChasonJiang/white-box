import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PostCardDetail } from 'src/app/interface/Post';
import { PostCardDetailComponent } from '../post-card-detail/post-card-detail.component';
import { PostCardDetailService } from '../../services/post-card-detail.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-post-card-detail-area',
  templateUrl: './post-card-detail-area.component.html',
  styleUrls: ['./post-card-detail-area.component.scss'],
})
export class PostCardDetailAreaComponent implements OnInit,AfterViewInit {

  @ViewChild("Container",{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  postCardsDetail:PostCardDetail[];
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private PostCardDetailService: PostCardDetailService
  ) { }
  ngAfterViewInit(){
    this.lazyLoad(this.postCardsDetail);
  }

  ngOnInit() {
    this.getpostCardDetail();

  }

  getpostCardDetail(){
    this.PostCardDetailService.requestPostCardDetail(
      {
        uid:0,
        type: 'PostCardDetailList',
        requestOptions:{pid:0}}).subscribe(postCardsDetail=>{this.postCardsDetail=postCardsDetail
        });
  }

  lazyLoad(postCardsDetail:PostCardDetail[]){
    for (let postCardDetail of postCardsDetail)
    {
      const ComponentFactory=this.componentFactoryResolver.resolveComponentFactory(PostCardDetailComponent);
      const ComponentRef=this.viewContainerRef.createComponent(ComponentFactory);
      ComponentRef.instance.postCardDetail=postCardDetail;
    }
  }

}
