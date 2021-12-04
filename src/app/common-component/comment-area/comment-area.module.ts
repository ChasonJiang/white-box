import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CommentAreaComponent }from './comment-area.component'
import { CommentCardModule } from '../comment-card/comment-card.module';
import { CommentEditerModule } from '../comment-editer/comment-editer.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CommentAreaComponent,
    // CommentCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CommentCardModule,

  ],
  exports:[
    CommentAreaComponent,
  ]
})
export class CommentAreaModule { }
