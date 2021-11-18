import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent }from './home.component'
import { PostComponent } from '../common-component/post/post.component';

@NgModule({
  declarations: [HomeComponent,PostComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }