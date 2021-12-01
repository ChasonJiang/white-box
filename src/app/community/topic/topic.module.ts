import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import { PostCardDetailAreaModule } from 'src/app/common-component/post-card-detail-area/post-card-detail-area.module';


@NgModule({
  declarations: [TopicComponent],
  imports: [
    CommonModule,
    PostCardDetailAreaModule
  ],
  exports: [TopicComponent]
})
export class TopicModule { }
