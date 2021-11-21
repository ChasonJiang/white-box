import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CommentFooterComponent } from './comment-footer.component';

@NgModule({
  declarations: [CommentFooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CommentFooterComponent
  ],
})
export class CommentFooterModule { }
