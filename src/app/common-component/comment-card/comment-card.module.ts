import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentCardComponent } from './comment-card.component';
import { UserCardModule } from '../user-card/user-card.module';


@NgModule({
  declarations: [
    CommentCardComponent
  ],
  imports: [
    CommonModule,
    UserCardModule
  ],
  exports:[
    CommentCardComponent
  ]
})
export class CommentCardModule { }
