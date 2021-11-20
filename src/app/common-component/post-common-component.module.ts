import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { CommentAreaComponent } from './comment-area/comment-area.component';
import { CommentFooterComponent } from './comment-footer/comment-footer.component';
import { CommentEditerComponent } from './comment-editer/comment-editer.component';
import { UserCardComponent } from './user-card/user-card.component'
@NgModule({
  declarations: [
    PostComponent,
    CommentAreaComponent,
    CommentFooterComponent,
    CommentEditerComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class PostCommonComponentModule { }
