import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CommentEditerComponent } from './comment-editer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CommentEditerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [
    CommentEditerComponent
  ],
})
export class CommentEditerModule { }
