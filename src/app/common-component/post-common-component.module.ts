import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { CommentAreaComponent } from './comment-area/comment-area.component';
import { CommentFooterComponent } from './comment-footer/comment-footer.component';
import { CommentEditerComponent } from './comment-editer/comment-editer.component';
import { UserCardComponent } from './user-card/user-card.component'
import { PostCardComponent } from './post-card/post-card.component'
import { CommentCardComponent } from './comment-card/comment-card.component'
import { PostModule } from './post/post.module';
import { CommentFooterModule } from './comment-footer/comment-footer.module';


@NgModule({
  declarations: [
    // PostComponent,
    // CommentAreaComponent,
    // CommentFooterComponent,
    // CommentEditerComponent,
    // UserCardComponent,
    // CommentCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PostModule,
    // CommentFooterModule,
  ]
})
export class PostCommonComponentModule { }
