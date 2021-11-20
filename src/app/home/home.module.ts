import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent }from './home.component'
import { PostCommonComponentModule } from '../common-component/post-common-component.module';
import { PostModule } from '../common-component/post/post.module';

@NgModule({
  declarations: [HomeComponent,],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    PostCommonComponentModule
    // PostModule,
    // CommentAreaModule,
  ]
})
export class HomeModule { }
