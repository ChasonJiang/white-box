import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostEditerComponent } from './post-editer.component';
import { TopicListModule } from './topic-list/topic-list.module';
import { NgxImageCompressService } from 'ngx-image-compress';


@NgModule({
  declarations: [PostEditerComponent],
  imports: [
    CommonModule,
    TopicListModule
  ],
  providers: [NgxImageCompressService],
  exports: [PostEditerComponent]
})
export class PostEditerModule { }
