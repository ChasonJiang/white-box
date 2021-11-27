import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardDetailModule } from '../post-card-detail/post-card-detail.module';
import { PostCardDetailAreaComponent } from './post-card-detail-area.component';


@NgModule({
  declarations: [PostCardDetailAreaComponent],
  imports: [
    CommonModule,
    PostCardDetailModule,

  ],
  exports:[
    PostCardDetailAreaComponent,
  ]
})
export class PostCardDetailAreaModule { }
