import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CommentEditerComponent } from './comment-editer.component';


@NgModule({
  declarations: [
    CommentEditerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CommentEditerComponent
  ],
})
export class CommentEditerModule { }
