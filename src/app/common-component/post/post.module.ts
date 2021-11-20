import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post.component';
import { CommonComponentModule } from '../common-component.module';
@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    IonicModule,
    CommonComponentModule
    // CommentAreaModule
  ]
})
export class PostModule { }
