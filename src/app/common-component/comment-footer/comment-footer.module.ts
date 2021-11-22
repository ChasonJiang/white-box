import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CommentFooterComponent } from './comment-footer.component';
import { CommentEditerModule } from '../comment-editer/comment-editer.module';
@NgModule({
  declarations: [CommentFooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    CommentEditerModule
  ],
  exports: [
    CommentFooterComponent,
    
  ],
})
export class CommentFooterModule { }
