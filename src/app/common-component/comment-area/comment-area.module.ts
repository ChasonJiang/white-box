import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CommentAreaComponent }from './comment-area.component'
import { CommentCardModule } from '../comment-card/comment-card.module';

@NgModule({
  declarations: [
    CommentAreaComponent,
    // CommentCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CommentCardModule,
    // FormsModule
  ],
  exports:[
    CommentAreaComponent,
  ]
})
export class CommentAreaModule { }
