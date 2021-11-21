import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post.component';
import { CommentFooterModule } from '../comment-footer/comment-footer.module';
import { CommentFooterComponent } from '../comment-footer/comment-footer.component';
import { CommentAreaComponent } from '../comment-area/comment-area.component';
import { CommentEditerComponent } from '../comment-editer/comment-editer.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { CommentAreaModule } from '../comment-area/comment-area.module';
import { UserCardModule } from '../user-card/user-card.module';
import { CommentEditerModule } from '../comment-editer/comment-editer.module';
@NgModule({
  declarations: [
    PostComponent,
    // CommentFooterComponent,
    // // CommentAreaComponent,
    // CommentEditerComponent,
    // UserCardComponent,
    // CommentCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CommentFooterModule,
    CommentAreaModule,
    UserCardModule,
    CommentEditerModule
  ],
  exports: [
    PostComponent,
  ]
})
export class PostModule { }
