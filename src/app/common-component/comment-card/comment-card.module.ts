import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentCardComponent } from './comment-card.component';
import { UserCardModule } from '../user-card/user-card.module';
import { CommentEditerModule } from '../comment-editer/comment-editer.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    CommentCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    UserCardModule,
    CommentEditerModule
  ],
  exports:[
    CommentCardComponent
  ]
})
export class CommentCardModule { }
