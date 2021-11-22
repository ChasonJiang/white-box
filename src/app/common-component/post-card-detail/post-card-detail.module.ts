import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardDetailComponent } from './post-card-detail.component';


@NgModule({
  declarations: [
    PostCardDetailComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostCardDetailComponent
  ]
})
export class PostCardDetailModule { }
