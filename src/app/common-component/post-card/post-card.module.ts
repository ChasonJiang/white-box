import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';
import { PostModule } from '../post/post.module';


@NgModule({
  declarations: [PostCardComponent],
  imports: [
    CommonModule,
    // PostModule
  ],
  exports: [
    PostCardComponent
  ]
})
export class PostCardModule { }
