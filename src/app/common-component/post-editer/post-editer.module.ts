import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostEditerComponent } from './post-editer.component';
import { TopicListModule } from './topic-list/topic-list.module';


@NgModule({
  declarations: [PostEditerComponent],
  imports: [
    CommonModule,
    TopicListModule
  ],
  exports: [PostEditerComponent]
})
export class PostEditerModule { }
