import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostEditerComponent } from './post-editer.component';


@NgModule({
  declarations: [PostEditerComponent],
  imports: [
    CommonModule
  ],
  exports: [PostEditerComponent]
})
export class PostEditerModule { }
