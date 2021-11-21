import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent }from './home.component'
import { PostCommonComponentModule } from '../common-component/post-common-component.module';
import { PostModule } from '../common-component/post/post.module';
import { PostCardComponent } from '../common-component/post-card/post-card.component';

@NgModule({
  declarations: [HomeComponent,],
  // entryComponents: [PostCardComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    PostModule
    // PostModule,
    // CommentAreaModule,
  ]
})
export class HomeModule { }
