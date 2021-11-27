import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardDetailComponent } from './post-card-detail.component';
import { UserCardModule } from '../user-card/user-card.module';


@NgModule({
  declarations: [
    PostCardDetailComponent,
  ],
  imports: [
    CommonModule,
    UserCardModule
  ],
  exports: [
    PostCardDetailComponent
  ]
})
export class PostCardDetailModule { }
