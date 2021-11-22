import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post.component';
import { CommentFooterModule } from '../comment-footer/comment-footer.module';
import { CommentAreaModule } from '../comment-area/comment-area.module';
import { UserCardModule } from '../user-card/user-card.module';

@NgModule({
  declarations: [
    PostComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    CommentFooterModule,
    CommentAreaModule,
    UserCardModule,
  ],
  exports: [
    PostComponent,
  ]
})
export class PostModule { }
