import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { SwiperModule } from 'swiper/angular';
import { PostCardDetailAreaModule } from '../common-component/post-card-detail-area/post-card-detail-area.module';
import { PostEditerModule } from '../common-component/post-editer/post-editer.module';
@NgModule({
  declarations: [CommunityComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    SwiperModule,
    PostCardDetailAreaModule,
    PostEditerModule
  ]
})
export class CommunityModule { }
