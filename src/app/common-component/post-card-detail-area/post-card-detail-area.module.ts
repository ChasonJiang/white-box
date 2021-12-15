import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardDetailModule } from '../post-card-detail/post-card-detail.module';
import { PostCardDetailAreaComponent } from './post-card-detail-area.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [PostCardDetailAreaComponent],
  imports: [
    IonicModule,
    CommonModule,
    PostCardDetailModule,

  ],
  exports:[
    PostCardDetailAreaComponent,
  ]
})
export class PostCardDetailAreaModule { }
